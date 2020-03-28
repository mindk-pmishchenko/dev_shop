const serviceLocator = require('./services/service.locator');

serviceLocator.register('connection', require('knex')(require('./knexfile')));
serviceLocator.register('mailer', require('./services/mailer'));

module.exports = () => {};
