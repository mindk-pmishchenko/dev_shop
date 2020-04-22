import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AppContext from './../../context/appContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authData } = useContext(AppContext);
    const { isAuth } = authData;
    console.log('authData', authData);

    return (
        <Route
            {...rest}
            render={(props) => (isAuth ? <Component {...props} /> : <Redirect to="/login" />)}
        />
    );
};

export default PrivateRoute;
