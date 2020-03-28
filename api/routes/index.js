const router = require('express').Router();
const attachResourceController = require('../middleware/attach-resource-controller')(router);
const UserController = require('../controllers/user.controller');
const CategoryController = require('../controllers/category.controller');
const OrderController = require('../controllers/order.controller');
const ProductController = require('../controllers/product.controller');
const AuthController = require('../controllers/auth.controller');
const {Roles, disallowRoles, allowRoles} = require('../middleware/check-roles');
const UploaderController = require('../controllers/uploader.controller');
const limitQuery = require('../middleware/limit-query');

attachResourceController('/upload', UploaderController, {
    bindings: [{route: '/', method: 'POST', action: 'upload', middleware: [disallowRoles(Roles.GUEST)]}],
});

attachResourceController('/auth', AuthController, {
    bindings: [
        {route: '/login', method: 'POST', action: 'login'},
        {route: '/logout', method: 'POST', action: 'logout', middleware: [disallowRoles(Roles.GUEST)]},
        {route: '/register', method: 'POST', action: 'register'},
        {route: '/recover', method: 'POST', action: 'recover', middleware: [allowRoles(Roles.GUEST)]},
        {route: '/reset', method: 'GET', action: 'checkResetPasswordToken', middleware: [allowRoles(Roles.GUEST)]},
        {route: '/reset', method: 'POST', action: 'reset', middleware: [allowRoles(Roles.GUEST)]},
    ],
});
attachResourceController('/users', UserController, {middleware: [allowRoles(Roles.ADMIN)]});
attachResourceController('/categories', CategoryController, {
    bindings: [
        {route: '/', method: 'GET', action: 'index'},
        {route: '/:id', method: 'GET', action: 'read'},
        {route: '/', method: 'POST', action: 'create', middleware: [allowRoles(Roles.ADMIN)]},
        {route: '/:id', method: 'PUT', action: 'update', middleware: [allowRoles(Roles.ADMIN)]},
        {route: '/:id', method: 'DELETE', action: 'delete', middleware: [allowRoles(Roles.ADMIN)]},
    ],
});
attachResourceController('/orders', OrderController, {
    bindings: [
        {route: '/', method: 'GET', action: 'index', middleware: [disallowRoles(Roles.GUEST), limitQuery()]},
        {route: '/:id', method: 'GET', action: 'read', middleware: [disallowRoles(Roles.GUEST), limitQuery()]},
        {route: '/', method: 'POST', action: 'create', middleware: [disallowRoles(Roles.GUEST)]},
        {route: '/:id', method: 'PUT', action: 'update', middleware: [allowRoles(Roles.ADMIN)]},
        {route: '/:id', method: 'DELETE', action: 'delete', middleware: [allowRoles(Roles.ADMIN)]},
    ],
});
attachResourceController('/products', ProductController, {
    bindings: [
        {route: '/', method: 'GET', action: 'index'},
        {route: '/:id', method: 'GET', action: 'read'},
        {route: '/', method: 'POST', action: 'create', middleware: [allowRoles(Roles.ADMIN)]},
        {route: '/:id', method: 'PUT', action: 'update', middleware: [allowRoles(Roles.ADMIN)]},
        {route: '/:id', method: 'DELETE', action: 'delete', middleware: [allowRoles(Roles.ADMIN)]},
    ],
});

exports.routes = router;
