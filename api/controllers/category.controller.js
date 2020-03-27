const BaseController = require('./base.controller');

class CategoryController extends BaseController {
    async index(req, res, next) {
        req.queryCallback = this._prepareCategories;
        await super.index(req, res, next);
    }

    _prepareCategories(rawData) {
        const {results, total} = rawData;
        const categories = results.filter(category => {
            category.children = results.filter(cat => cat.parentId === category.id);
            return category.parentId === null;
        });

        return {results: categories, total};
    }
}

module.exports = CategoryController;
