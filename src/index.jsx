import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import Layout from "./containers/Layout/Layout";
import BasketContext from "./context/basketContext";
import useStateWithLocalStorage from "./utils/hooks/useStateWithLocalStorage";

function App() {
    const [basket, setBasket] = useStateWithLocalStorage("savedProducts");
    const basketContext = {basket, setBasket};

    return (
        <BasketContext.Provider value={basketContext}>
            <Layout />
        </BasketContext.Provider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
