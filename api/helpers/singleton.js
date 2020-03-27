class Singleton {
    static instance = null;

    constructor() {
        return this.getInstance();
    }

    getInstance() {
        if (!this.constructor.instance) {
            this.constructor.instance = this;
        }
        return this.constructor.instance;
    }
}

module.exports = Singleton;
