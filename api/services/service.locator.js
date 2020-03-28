const Singleton = require('../helpers/singleton');

class ServiceLocator extends Singleton {
    constructor() {
        super();
        this.services = {};
    }

    register(name, service) {
        this.services[name] = service;
    }

    get(name) {
        return this.services[name];
    }
}

module.exports = new ServiceLocator();
