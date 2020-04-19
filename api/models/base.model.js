const {Model} = require('objection');
const serviceLocator = require('../services/service.locator');

class Base extends Model {
    static uniqueFields = [];

    static async checkUnique(fields, currentUser = {}) {
        const uniqueFields = {};
        for (const field in fields) {
            if (this.uniqueFields.includes(field)) {
                uniqueFields[field] = fields[field];
            }
        }

        const usersExist = await this.query().modify(builder => {
            Object.keys(uniqueFields).forEach((uniqueField, index) => {
                const condition = {[uniqueField]: uniqueFields[uniqueField]};
                index === 0 ? builder.where(condition) : builder.orWhere(condition);
            });
            return builder;
        });

        const errors = {};
        for (const user of usersExist) {
            if (currentUser.id !== user.id) {
                for (const fieldName in uniqueFields) {
                    if (user[fieldName] === uniqueFields[fieldName]) {
                        errors[fieldName] = [
                            {
                                message: `${fieldName} already exists!`,
                                keyword: 'unique',
                            },
                        ];
                    }
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
