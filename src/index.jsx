import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import { Provider } from "react-redux";

import * as serviceWorker from './serviceWorker';
import Layout from "./containers/Layout/Layout";
import BasketContext from "./context/basketContext";
import useStateWithLocalStorage from "./utils/hooks/useStateWithLocalStorage";

function App() {
    const [basket, setBasket] = useStateWithLocalStorage("savedProducts");
    const basketContext = {basket, setBasket};

    const rootReducer = combineReducers({
        form: formReducer
    });

    const store = createStore(rootReducer);

    return (
        <Provider store={store}>
            <BasketContext.Provider value={basketContext}>
                <Layout />
            </BasketContext.Provider>
        </Provider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
