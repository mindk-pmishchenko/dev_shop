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

        const applyFilters = filters => builder => {
            for (const filter in filters) {
                const filterValue = filters[filter];

                if (filterValue instanceof Array) {
                    builder.whereIn(filter, filterValue);
                } else if (filterValue instanceof Object) {
                    for (const field in filterValue) {
                        const filterValue = filters[filter][field];

                        if (filterValue instanceof Array) {
                            builder.whereIn(`${filter}.${field}`, filterValue);
                        } else {
                            builder.where(`${filter}.${field}`, filterValue);
                        }
                    }
                } else {
                    builder.where(filters);
                }
            }
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
                        .modify(applyFilters(relationFilters))
                        .orderBy(orderRules)
                        .modify(builder => (queryCondition ? builder.where(queryCondition) : builder))
                        .modify(applyFilters(filters))
                        .range(offset, limit + offset - 1)
                )
            )
        );
    }

    async create(req, res) {
        res.status(201).json(successResponse(await this.model.query().insertAndFetch(req.body)));
    }

    async read(req, res) {
        res.status(200).json(successResponse(await this.model.query().findById(req.params.id).throwIfNotFound()));
    }

    async update(req, res) {
        await this.model.checkUnique(req.body, req.user);

        res.status(200).json(
            successResponse(await this.model.query().patchAndFetchById(req.params.id, req.body).throwIfNotFound())
        );
    }

    async delete(req, res) {
        res.status(200).json(
            successResponse(await this.model.query().deleteById(req.params.id).returning('*').throwIfNotFound())
        );
    }
}

module.exports = BaseController;
