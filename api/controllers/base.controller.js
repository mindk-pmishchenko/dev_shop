const successResponse = require('../helpers/success-response');
class BaseController {
    constructor() {
        this.model = require(`../models/${this.modelName}.model.js`);
    }

    get modelName() {
        const [, name] = this.constructor.name.match(/^(.+)Controller$/);
        return name.toLocaleLowerCase();
    }

    async index({query: {filter = '{}'}, queryCondition, queryCallback = data => data}, res) {
        const {
            limit = 10,
            offset = 0,
            order = [],
            json: jsonFilters = {},
            relations: relationFilters = {},
            ...filters
        } = await JSON.parse(filter);

        const orderRules = order.map(rule => {
            const [column, order] = rule.split(' ');
            return {column, order};
        });

        const jsonRules = jsonFilters => {
            const rules = {};
            for (const filter in jsonFilters) {
                for (const field in jsonFilters[filter]) {
                    rules[field] = jsonFilters[filter][field];
                }
            }

            return rules;
        };

        const relationFiltersRules = filters => {
            const filterRules = {};
            for (const filter in filters) {
                for (const field in filters[filter]) {
                    filterRules[`${filter}.${field}`] = filters[filter][field];
                }
            }
            return filterRules;
        };

        res.status(200).json(
            successResponse(
                queryCallback(
                    await this.model
                        .query()
                        .modify(builder =>
                            Object.keys(jsonFilters).length > 0
                                ? builder.whereJsonSupersetOf(Object.keys(jsonFilters)[0], jsonRules(jsonFilters))
                                : null
                        )
                        .joinRelated(`${Object.keys(relationFilters)}`)
                        .where(relationFiltersRules(relationFilters))
                        .orderBy(orderRules)
                        .modify(builder => {
                            if (queryCondition) {
                                builder.where(queryCondition).andWhere(filters);
                            } else {
                                builder.where(filters);
                            }
                        })
                        .range(offset, limit + offset - 1)
                )
            )
        );
    }

    async create(req, res) {
        res.status(201).json(successResponse(await this.model.query().insertAndFetch(req.body)));
    }

    async read(req, res) {
        res.status(200).json(
            successResponse(
                await this.model
                    .query()
                    .findById(req.params.id)
                    .throwIfNotFound()
            )
        );
    }

    async update(req, res) {
        res.status(200).json(
            successResponse(
                await this.model
                    .query()
                    .patchAndFetchById(req.params.id, req.body)
                    .throwIfNotFound()
            )
        );
    }

    async delete(req, res) {
        res.status(200).json(
            successResponse(
                await this.model
                    .query()
                    .deleteById(req.params.id)
                    .returning('*')
                    .throwIfNotFound()
            )
        );
    }
}

module.exports = BaseController;
