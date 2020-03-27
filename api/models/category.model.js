const Base = require('./base.model');

class Category extends Base {
    static get tableName() {
        return 'categories';
    }
}

module.exports = Category;
