import React, { useReducer } from 'react';
import { SnackbarProvider } from 'notistack';

import Layout from '../../containers/Layout/Layout';
import BasketContext from './../../../src/context/basketContext';
import useStateWithLocalStorage from '../../../src/utils/hooks/useStateWithLocalStorage';
import AppContext from './../../context/appContext';
import authReducer from './../../reducers/authReducer';
import { axiousCustomRequest } from './../../utils/helpers';

import './app.css';

const App = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [basket, setBasket] = useStateWithLocalStorage('savedProducts');

    const basketContext = { basket, setBasket };

    const [basketOpen, setBasketOpen] = useStateWithLocalStorage('basketOpen', false);
    const basketOpenContext = { basketOpen, setBasketOpen };

    const [itemsInCartQuantity, setItemsInCartQuantity] = useStateWithLocalStorage(
        'itemsInCartQuantity',
        0
    );
    const itemsInCartQuantityContext = {
        itemsInCartQuantity,
        setItemsInCartQuantity,
    };

    const context = {
        basketContext,
        basketOpenContext,
        itemsInCartQuantityContext,
    };

    const authInitState = {};
    const [authState, dispatch] = useReducer(authReducer, authInitState);

    if (authState && !Object.keys(authState).length) {
        if (userInfo) {
            dispatch({ type: 'SET_LOGIN', payload: userInfo });
        }
    }

    const handleUserLogin = (userData) => {
        dispatch({ type: 'SET_LOGIN', payload: userData });
    };
    const handleUserLogout = () => {
        dispatch({ type: 'SET_GUEST' });

        localStorage.removeItem('userInfo', '');
        localStorage.removeItem('bearer_token');
    };

    const authToken = localStorage.getItem('bearer_token');

    const config = {
        url: '/api/users/get_user_data',
        method: 'get',
        headers: { Authorization: `Bearer ${authToken}` },
    };

    const userData = axiousCustomRequest(config);

    userData.then((userData) => {
        console.log('userData', userData);
        try {
            const {
                data: {
                    data: { id, email, user_active_status, role, last_name, first_name, avatar },
                },
            } = userData;

            localStorage.setItem(
                'userInfo',
                JSON.stringify({
                    id,
                    email,
                    user_active_status,
                    role,
                    last_name,
                    first_name,
                    avatar,
                })
            );
        } catch (err) {
            console.log(err);
        }
    });

    const appContext = {
        authData: {
            ...authState.authData,
            handleUserLogin,
            handleUserLogout,
        },
    };

    return (
        <>
            <AppContext.Provider value={appContext}>
                <BasketContext.Provider value={context}>
                    <SnackbarProvider maxSnack={1}>
                        <Layout />
                    </SnackbarProvider>
                </BasketContext.Provider>
            </AppContext.Provider>
        </>
    );
};

export default App;
