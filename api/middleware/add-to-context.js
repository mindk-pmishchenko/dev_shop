const {createNamespace} = require('cls-hooked');

const addToContext = (name, Controller) => (req, res, next) => {
    const context = createNamespace('context');
    const controller = Controller.isStatic ? Controller : new Controller();
    context.run(() => {
        context.set(name, controller);
        next();
    });
};

module.exports = addToContext;
