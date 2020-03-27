const Base = require('./base.model');
const Password = require('objection-password')();
const uuid = require('uuid/v4');
class User extends Password(Base) {
    static get tableName() {
        return 'users';
    }

    async $beforeInsert(context) {
        await super.$beforeInsert(context);
        const {username, email, mobilePhone} = this;
        await User.checkUnique({username, email, mobilePhone});
        this.token = uuid();
    }

    async updateToken() {
        const token = this.generateToken();
        await User.query().patchAndFetchById(this.id, {token});
        return token;
    }

    async updateResetPasswordToken() {
        const tokenExpires = 1 * 60 * 60 * 1000;
        const resetPasswordToken = this.generateToken();
        const resetPasswordExpires = new Date(Date.now() + tokenExpires);
        await User.query().patchAndFetchById(this.id, {resetPasswordToken, resetPasswordExpires});
        return resetPasswordToken;
    }

    checkResetPasswordToken() {
        return this.resetPasswordExpires > Date.now();
    }

    generateToken() {
        return uuid();
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['username', 'password', 'firstName', 'lastName', 'email', 'address', 'mobilePhone'],
            properties: {
                username: {type: 'string', minLength: 6, maxLength: 50},
                password: {type: 'string', minLength: 6, maxLength: 50},
                firstName: {type: 'string', minLength: 2, maxLength: 50},
                lastName: {type: 'string', minLength: 4, maxLength: 50},
                email: {type: 'string', format: 'email'},
                address: {type: 'string', minLength: 10, maxLength: 100},
                mobilePhone: {type: 'string', minLength: 12, maxLength: 12},
            },
        };
    }
}

module.exports = User;
