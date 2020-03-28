const passport = require('../passport');
const {Roles} = require('./check-roles');

const auth = () => (req, res, next) =>
    passport.authenticate('bearer', {session: false}, (err, user, info) => {
        req.user = user || {role: Roles.GUEST};
        next();
    })(req, res, next);

module.exports = auth;
