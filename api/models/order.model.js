const {Model} = require('objection');
const Base = require('./base.model');
const OrderDetail = require('./order-detail.model');

class Order extends Base {
    static get tableName() {
        return 'orders';
    }

    static get relationMappings() {
        return {
            details: {
                relation: Model.HasManyRelation,
                modelClass: OrderDetail,
                join: {
                    from: 'orders.id',
                    to: 'order_details.orderId',
                },
            },
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                userId: {type: 'integer', minimum: 1},
                status: {type: 'string', minimum: 1},
                totalPrice: {type: 'number', minimum: 0},
            },
        };
    }
}

module.exports = Order;
