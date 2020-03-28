const Base = require('./base.model');

class OrderDetail extends Base {
    static get tableName() {
        return 'order_details';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['productId', 'quantity', 'sumPrice'],
            properties: {
                productId: {type: 'integer', minimum: 1},
                quantity: {type: 'integer', minimum: 1},
                sumPrice: {type: 'number', minimum: 0},
            },
        };
    }
}

module.exports = OrderDetail;
