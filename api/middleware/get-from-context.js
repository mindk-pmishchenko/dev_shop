const {getNamespace} = require('cls-hooked');
const asyncHandler = require('./async-handler');

const getFromContext = (name, action) =>
    asyncHandler((req, res, next) =>
        getNamespace('context')
            .get(name)
            [action](req, res, next)
    );

module.exports = getFromContext;
