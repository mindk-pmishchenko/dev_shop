const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const {Strategy: BearerStrategy} = require('passport-http-bearer');
const User = require('./models/user.model');

passport.use(
    'login',
    new LocalStrategy({usernameField: 'username', passwordField: 'password'}, async (username, password, done) => {
        try {
            const user = await User.query().findOne({username});
            if (!user) {
                return done(null, false, {message: 'Wrong credentials supplied.'});
            }
            const passwordsAreEqual = await user.verifyPassword(password);
            if (!passwordsAreEqual) {
                return done(null, false, {message: 'Wrong credentials supplied.'});
            }
            await user.updateToken();
            return done(null, user, {message: 'Logged in successfully!'});
        } catch (error) {
            return done(error);
        }
    })
);

passport.use(
    new BearerStrategy({passReqToCallback: true}, async (req, token, done) => {
        try {
            const user = await User.query().findOne({token});
            if (!user) {
                return done(null, false, {message: `There is no user with token: ${token}`});
            }
            return done(null, user), {message: `User ${user.username} with token ${token} is authenticated`};
        } catch (error) {
            done(error);
        }
    })
);

passport.use(
    'register',
    new LocalStrategy(
        {usernameField: 'username', passwordField: 'password', passReqToCallback: true},
        async ({body}, username, password, done) => {
            try {
                const user = await User.query()
                    .insert(body)
                    .returning('*');
                return done(null, user, {message: 'User created successfully!'});
            } catch (error) {
                return done(error);
            }
        }
    )
);

module.exports = passport;
