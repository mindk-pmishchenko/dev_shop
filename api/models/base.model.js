const {Model} = require('objection');
const serviceLocator = require('../services/service.locator');

class Base extends Model {
    static async checkUnique(fields) {
        const {username, email, mobilePhone} = fields;

        const usersExist = await this.query()
            .where({username})
            .orWhere({email})
            .orWhere({mobilePhone});

        const errors = {};
        for (const user of usersExist) {
            for (const fieldName in fields) {
                if (user[fieldName] === fields[fieldName]) {
                    errors[fieldName] = [
                        {
                            message: `${fieldName} already exists!`,
                            keyword: 'unique',
                        },
                    ];
                }
            }
        }

        if (Object.keys(errors).length) {
            throw this.createValidationError({
                type: 'ModelValidation',
                message: 'Unique validation error',
                data: errors,
            });
        }
    }
}

Base.knex(serviceLocator.get('connection'));

module.exports = Base;
