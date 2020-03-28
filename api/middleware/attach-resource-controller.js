const addToContext = require('./add-to-context');
const getFromContext = require('./get-from-context');

const attachResourceController = router => (
    path,
    Controller,
    {
        middleware: commonMiddleware = [],
        bindings = [
            {route: '/', method: 'GET', action: 'index', middleware: []},
            {route: '/:id', method: 'GET', action: 'read', middleware: []},
            {route: '/', method: 'POST', action: 'create', middleware: []},
            {route: '/:id', method: 'PUT', action: 'update', middleware: []},
            {route: '/:id', method: 'DELETE', action: 'delete', middleware: []},
        ],
    } = {}
) => {
    for (const {route, middleware = [], method, action} of bindings) {
        const controller = 'controller';

        router
            .route(`${path}${route}`)
            .all([addToContext(controller, Controller), ...commonMiddleware, ...middleware])
            [method.toLocaleLowerCase()](getFromContext(controller, action));
    }

    return router;
};

module.exports = attachResourceController;
