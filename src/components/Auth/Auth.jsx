import React, {useContext, useState} from "react";
import GoogleLogin from "react-google-login";

import AppContext from "../../context/appContext";

const REACT_APP_GOOGLE_CLIENT_ID = "542565575573-aq5ipnu78qtv3uhav6rdo30anseak03k.apps.googleusercontent.com";

function Auth() {
    const { authData } = useContext(AppContext);
    const { isAuth, handleUserLogin } = authData;
    const [accessTokenState, setAccessTokenState] = useState();

    const handleLogin = ({accessToken}) => {
        console.log(accessToken);
        setAccessTokenState(accessToken);

        //TODO: get authToken from the API
        const authToken = 'test-token';
        localStorage.setItem("bearer_token", authToken);
        handleUserLogin(authToken);
    };

    return (
        <>
            {isAuth ? "Yes" : "No"}
        <GoogleLogin
            clientId={REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Sing in"
            cookiePolicy="single_host_origin"
            onSuccess={handleLogin}
        />
        </>
    )
}

export default Auth;