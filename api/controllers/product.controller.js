const BaseController = require('./base.controller');
class ProductController extends BaseController {
    async create(req, res, next) {
        if (!req.body.photo) {
            req.body.photo = `${req.protocol}://${req.get('host')}/no-photo.jpg`;
        }
        await super.create(req, res, next);
    }
}

module.exports = ProductController;
