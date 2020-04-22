import React, { useContext, useState } from 'react';
import GoogleLogin from 'react-google-login';

import AppContext from './../../context/appContext';

import { axiousCustomRequest } from './../../utils/helpers';

import { useHistory } from 'react-router-dom';

require('dotenv').config();

const Auth = () => {
    const { authData } = useContext(AppContext);

    const { isAuth, handleUserLogin } = authData;
    if (isAuth) {
        var {
            userData: { id, avatar, last_name, first_name, email },
        } = authData;
    }
    let history = useHistory();
    const handleLogin = ({
        accessToken,
        //  googleId,
        tokenId,
        profileObj: { email, familyName, givenName, imageUrl },
    }) => {
        const userGoogleData = {
            email,
            last_name: familyName,
            first_name: givenName,
            avatar: imageUrl,
            accessToken,
            tokenId,
            //googleId,
            REACT_APP_GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        };

        const config = {
            url: '/api/users/google-login',
            data: userGoogleData,
            method: 'post',
        };

        const accessData = axiousCustomRequest(config);
        accessData
            .then((res) => {
                const {
                    data: {
                        data: { token: authToken },
                    },
                } = res;

                localStorage.setItem('bearer_token', authToken);
                handleUserLogin(authToken);
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            {isAuth ? 'Authorized' : 'Guest'}
            {isAuth && (
                <div>
                    {
                        <>
                            <img src={avatar} alt={last_name} />
                            <span>
                                Name: {last_name} {first_name}
                            </span>
                            <br></br>
                            <span>Email: {email}</span>
                        </>
                    }
                </div>
            )}

            {!isAuth && (
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Sing in"
                    cookiePolicy="single_host_origin"
                    onSuccess={handleLogin}
                />
            )}
        </>
    );
};
export default Auth;
