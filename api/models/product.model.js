const {Model} = require('objection');
const Base = require('./base.model');
const Category = require('../models/category.model');

class Product extends Base {
    static get tableName() {
        return 'products';
    }

    static relationMappings() {
        return {
            categories: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: 'products.categoryId',
                    to: 'categories.id',
                },
            },
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'slug', 'description', 'price', 'categoryId'],
            properties: {
                name: {type: 'string', minLength: 6, maxLength: 50},
                slug: {type: 'string', minLength: 6, maxLength: 50},
                description: {type: 'string', minLength: 20},
                price: {type: 'number'},
                categoryId: {type: 'integer', minimum: 1},
            },
        };
    }
}

module.exports = Product;
