const {PermissionError} = require('../helpers/errors');

const Roles = {GUEST: 'guest', USER: 'user', ADMIN: 'admin'};

const check = ({role}, condition, next) => {
    if (condition(role)) {
        next(new PermissionError(`Permission Denied for role ${role}!`));
    }
    next();
};

const allowRoles = (...roles) => ({user}, res, next) => check(user, role => !roles.includes(role), next);
const disallowRoles = (...roles) => ({user}, res, next) => check(user, role => roles.includes(role), next);

module.exports = {Roles, allowRoles, disallowRoles};
