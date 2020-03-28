const BaseController = require('./base.controller');
const successResponse = require('../helpers/success-response');
const Product = require('../models/product.model');

class OrderController extends BaseController {
    async create({body: {details: srcDetails}, user: {id: userId}}, res, next) {
        if (!srcDetails.every(({productId, quantity}) => productId && quantity)) {
            next(new Error('Order must be array of objects {productId: productId, quantity: count}'));
        }

        const details = await this._prepareDetails(srcDetails);
        const totalPrice = details.reduce((acc, {sumPrice}) => acc + sumPrice, 0);

        res.status(201).json(
            successResponse(
                await this.model.transaction(
                    async trx =>
                        await this.model.query().insertGraph({
                            userId,
                            totalPrice,
                            status: 'new',
                            details,
                        })
                )
            )
        );
    }

    async read({params: {id}, queryCondition}, res) {
        res.status(200).json(
            successResponse(
                await this.model
                    .query()
                    .findById(id)
                    .where(queryCondition)
                    .withGraphJoined('details')
                    .throwIfNotFound()
            )
        );
    }

    async delete({params: {id}}, res, next) {
        this.model.transaction(async trx => {
            try {
                const details = await this.model
                    .relatedQuery('details')
                    .for([id])
                    .delete()
                    .returning('*')
                    .throwIfNotFound();

                const order = await this.model
                    .query()
                    .deleteById(id)
                    .returning('*')
                    .throwIfNotFound();

                res.status(200).json(
                    successResponse({
                        ...order,
                        details,
                    })
                );
            } catch (error) {
                next(error);
            }
        });
    }

    async update({body: {details: srcDetails, ...fields}, params: {id}}, res) {
        await this.model.transaction(async trx => {
            const details = await this._prepareDetails(srcDetails);
            res.status(200).json(successResponse(await this.model.query().upsertGraph({id, details, ...fields})));
        });
    }

    async _prepareDetails(details) {
        const _details = [];
        for (const {id, ...props} of details) {
            if (id) {
                _details.push({'#dbRef': id, ...props});
            } else {
                const product = await Product.query().findById(props.productId);
                const sumPrice = product.price * props.quantity;
                _details.push({...props, sumPrice});
            }
        }
        return _details;
    }
}
module.exports = OrderController;
