const AppError = require('./../utils/appError');
const BaseModel = require('./base.model');
const bcrypt = require('bcryptjs');
var verifier = require('google-id-token-verifier');

class User extends BaseModel {
    constructor(req) {
        super('users');
        Object.assign(this, req);
    }

    findByEmail(email) {
        return this.table
            .where({
                email: email,
            })
            .select('*');
    }

    findByResetToken(token) {
        return this.table
            .where({
                reset_token: token,
            })
            .select('id', 'email', 'reset_token_expiration', 'user_active_status');
    }

    findAndUpdate = async filteredFields => {
        try {
            return await this.table
                .update(filteredFields)
                .where('id', this.user.id)
                .returning('id')
                .catch(err => {
                    console.log(err);
                });
        } catch (err) {
            return await this.next(new AppError(err));
        }
    };

    getUserData = async () => {
        try {
            return await this.table
                .select(
                    'id',
                    'email',
                    'user_active_status',
                    'role',
                    'last_name',
                    'first_name',
                    'avatar'
                )
                .where('id', this.user.id)

                .catch(err => {
                    console.log(err);
                });
        } catch (err) {
            return await this.next(new AppError(err));
        }
    };

    saveUserTokenToDb = async (user, token) => {
        try {
            return await this.table
                .insert({
                    token: token,
                    user_id: user.id * 1,
                })
                .returning('id')
                .into('tokens')
                .then(async () => {
                    return token;
                })
                .catch(err => {
                    console.log(err);

                    return this.next(new AppError(err, 400));
                });
        } catch (err) {
            return await this.next(new AppError(err));
        }
    };

    static comparePassword = async (candidatePassword, userPassword) => {
        return await bcrypt.compare(candidatePassword, userPassword);
    };

    checkUserByTokenId = async id => {
        return this.table
            .select(
                'users.id',
                'users.email',
                'role',
                'last_name',
                'first_name',
                'user_active_status',
                'token'
            )
            .where('users.id', id)
            .from('users')
            .innerJoin('tokens', 'users.id', 'tokens.user_id');
    };

    createNewUser = async () => {
        let newUserId;
        const verifiedData = {};
        //allowed fields from body
        const allowedFields = [
            'email',
            'password',
            'passwordConfirmation',
            'last_name',
            'first_name',
        ];
        //obj with allowed fields generation
        Object.keys(this.body).forEach(el => {
            if (allowedFields.includes(el)) {
                verifiedData[el] = this.body[el];
            }
        });
        //required data
        if (!verifiedData['password'] || !verifiedData['passwordConfirmation']) {
            return this.next(new AppError("Password or PasswordConfirmation can't be blank"));
        }
        //must be the same
        if (verifiedData['password'] !== verifiedData['passwordConfirmation']) {
            return this.next(
                new AppError('Password and PasswordConfirmation feilds must be the same')
            );
        } else {
            delete verifiedData.passwordConfirmation;
            verifiedData['user_active_status'] = 1;
            verifiedData['role'] = 1;
            verifiedData['password'] = await bcrypt.hash(verifiedData['password'], 12);
        }

        try {
            /// try to insert newUser to DB
            const isEmailUsed = await this.table
                .select('email')
                .from('users')
                .where('email', verifiedData['email'])
                .catch(err => {
                    return this.next(new AppError(err, 400));
                });
            if (Array.isArray(isEmailUsed) && isEmailUsed.length) {
                return this.next(new AppError('This e-mail is already used', 400));
            }
            return await this.table
                .insert(verifiedData)
                .returning('id')
                .into('users')
                .then(async id => {
                    //newUserId
                    return { newUserId: id * 1 };
                })
                .catch(err => {
                    return this.next(new AppError(err, 400));
                });
        } catch (err) {
            console.log(err);
        }
    };

    //getAllUsers
    async getAllUsers() {
        //query LIMIT default value
        const perPageLimit = 100;
        //default offsetLimit
        const offsetLimit = (this.query.page * 1 - 1) * perPageLimit * 1;
        if (this.query.page * 1 <= 0) return this.next(new AppError('Wrong page parameter', 400));
        const order = 'asc';
        /// order BY
        const orderBy = 'id';

        const allUsers = await this.table
            .select(
                'users.id',
                'users.email',
                'roles.title as role',
                'last_name',
                'first_name',
                'user_active_status'
            )
            .from('users')
            .innerJoin('roles', 'users.role', 'roles.id')
            .limit(perPageLimit)
            .offset(offsetLimit)
            .orderBy(orderBy, order);
        //.toSQL()
        //.toNative();

        if (typeof allUsers !== 'undefined' && allUsers.length) {
            return allUsers;
        } else {
            return { code: 204 };
        }
    }

    //google login
    googleLogin = async temporaryPassword => {
        let tokenVerified = false;
        const {
            email,
            familyName,
            givenName,
            imageUrl,
            accessToken,
            tokenId,
            REACT_APP_GOOGLE_CLIENT_ID,
        } = this.body;

        //console.log(this.body);

        //console.log(email, tokenId, googleId);
        //if (!email || !tokenId || !googleId) {
        if (!email || !tokenId) {
            return this.next(new AppError('Bad request', 400));
        }

        verifier.verify(tokenId, REACT_APP_GOOGLE_CLIENT_ID, function(err, tokenInfo) {
            if (!err) {
                console.log('tokenInfo', tokenInfo);
                tokenVerified = true;
            }
        });

        if (!tokenVerified) return this.next(new AppError('Error during authorization', 403));

        let newUserId;
        const verifiedData = {};
        //allowed fields from body
        const allowedFields = ['email', 'avatar', 'last_name', 'first_name'];
        // const allowedFields = ['email', 'familyName', 'givenName', 'imageUrl'];
        //obj with allowed fields generation
        Object.keys(this.body).forEach(el => {
            if (allowedFields.includes(el)) {
                verifiedData[el] = this.body[el];
            }
        });
        //required data

        verifiedData['password'] = temporaryPassword;

        verifiedData['user_active_status'] = 1;
        verifiedData['role'] = 1;
        verifiedData['password'] = await bcrypt.hash(verifiedData['password'], 12);
        console.log('verifiedData', verifiedData);

        try {
            /// try to insert newUser to DB
            const isEmailUsed = await this.table
                .select('email')
                .from('users')
                .where('email', verifiedData['email']);
            //.where('email', 'obvadov@gmail.com');

            console.log('bbb', isEmailUsed);

            if (Array.isArray(isEmailUsed) && !!isEmailUsed.length) {
                console.log('============1===============');

                return await this.table
                    .update({
                        password: verifiedData['password'],
                    })
                    .where('email', email)
                    .returning('id')
                    .then(async id => {
                        //newUserId
                        console.log('here we are');
                        console.log('id: ', id);
                        console.log('email: ', email);
                        console.log('password: ', temporaryPassword);
                        return { newUserId: id * 1, email, password: temporaryPassword };
                    })
                    .catch(err => {
                        return this.next(new AppError(err, 400));
                    });
            } else {
                return await this.table
                    .insert(verifiedData)
                    .returning('id')
                    .into('users')
                    .then(async id => {
                        //newUserId
                        return { newUserId: id * 1, email, password: temporaryPassword };
                    })
                    .catch(err => {
                        return this.next(new AppError(err, 400));
                    });
            }
        } catch (err) {
            console.log(err);
        }
    };

    //
}

module.exports = User;
