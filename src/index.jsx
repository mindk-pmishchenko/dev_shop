import React, {useReducer} from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import { Provider } from "react-redux";

import * as serviceWorker from './serviceWorker';
import Layout from "./containers/Layout/Layout";
import BasketContext from "./context/basketContext";
import AppContext from "./context/appContext";
import useStateWithLocalStorage from "./utils/hooks/useStateWithLocalStorage";
import authReducer from "./reducers/authReducer";

function App() {
    const [basket, setBasket] = useStateWithLocalStorage("savedProducts");
    const basketContext = {basket, setBasket};

    const authInitState = {};
    const [authState, dispatch] = useReducer(authReducer, authInitState);

    const handleUserLogin = userData => {
        dispatch({ type: "SET_LOGIN", payload: userData });
    };


    const authToken = localStorage.getItem("bearer_token");
    //TODO: get user data from the API

    const appContext = {
        authData: {
            ...authState.authData,
            handleUserLogin
        }
    };

    const rootReducer = combineReducers({
        form: formReducer
    });

    const store = createStore(rootReducer);

    return (
        <Provider store={store}>
            <AppContext.Provider value={appContext}>
                <BasketContext.Provider value={basketContext}>
                    <Layout />
                </BasketContext.Provider>
            </AppContext.Provider>
        </Provider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
