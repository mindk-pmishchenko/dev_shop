import React from 'react';
import { SnackbarProvider } from 'notistack';

import Layout from '../../containers/Layout/Layout';
import BasketContext from './../../../src/context/basketContext';
import useStateWithLocalStorage from '../../../src/utils/hooks/useStateWithLocalStorage';

import './app.css';

const App = () => {
    const [basket, setBasket] = useStateWithLocalStorage('savedProducts');

    const basketContext = { basket, setBasket };

    const [basketOpen, setBasketOpen] = useStateWithLocalStorage(
        'basketOpen',
        false
    );
    const basketOpenContext = { basketOpen, setBasketOpen };

    const [
        itemsInCartQuantity,
        setItemsInCartQuantity,
    ] = useStateWithLocalStorage('itemsInCartQuantity', 0);
    const itemsInCartQuantityContext = {
        itemsInCartQuantity,
        setItemsInCartQuantity,
    };

    const context = {
        basketContext,
        basketOpenContext,
        itemsInCartQuantityContext,
    };

    return (
        <>
            <BasketContext.Provider value={context}>
                <SnackbarProvider maxSnack={1}>
                    <Layout />
                </SnackbarProvider>
            </BasketContext.Provider>
        </>
    );
};

export default App;
