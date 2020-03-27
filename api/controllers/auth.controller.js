const passport = require('../passport');
const successResponse = require('../helpers/success-response');
const User = require('../models/user.model');
const serviceLocator = require('../services/service.locator');
const {CredentialError, ResetTokenError} = require('../helpers/errors');

class AuthController {
    static isStatic = true;
    static mailer = serviceLocator.get('mailer');

    static login(req, res, next) {
        passport.authenticate('login', {session: false}, (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(new CredentialError(info.message));
            }
            res.status(200).json(successResponse(user));
        })(req, res, next);
    }

    static async logout(req, res, next) {
        await req.user.updateToken();
        delete req.user;
        res.status(200).json(successResponse());
    }

    static register(req, res, next) {
        passport.authenticate('register', {session: false}, (err, user, info) => {
            if (err) {
                return next(err);
            }
            res.status(201).json(successResponse(user));
        })(req, res, next);
    }

    static async recover({body: {username}}, res, next) {
        if (!username) {
            return next(new ResetTokenError(`Username is required`));
        }
        const user = await User.query().findOne({username});
        if (!user) {
            return next(new ResetTokenError(`User wasn't found with username: ${username}`));
        }
        const token = await user.updateResetPasswordToken();
        const link = `${process.env.FRONTEND_URL}/auth/reset?token=${token}`;
        await this.mailer.send('recover', {user, link}, {to: user.email, subject: 'Recovery password message'});
        res.status(200).json(successResponse());
    }

    static async checkResetPasswordToken({query: {token}}, res, next) {
        await this._getUserByResetPasswordToken(token);
        res.status(200).json(successResponse());
    }

    static async reset({query: {token}, body: {password, confirmedPassword}}, res, next) {
        const user = await this._getUserByResetPasswordToken(token);
        if (password !== confirmedPassword) {
            return next(new ResetTokenError('Provided passwords are not equal'));
        }
        await User.query().patchAndFetchById(user.id, {password, resetPasswordToken: null, resetPasswordExpires: null});
        res.status(200).json(successResponse());
    }

    static async _getUserByResetPasswordToken(token) {
        if (!token) {
            throw new ResetTokenError('Token is required');
        }
        const user = await User.query().findOne({resetPasswordToken: token});
        if (!user || user.checkResetPasswordToken()) {
            throw new ResetTokenError('Provided token is not valid');
        }
        return user;
    }
}

module.exports = AuthController;
