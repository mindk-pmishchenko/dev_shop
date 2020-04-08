const SET_LOGIN = "SET_LOGIN";
const SET_GUEST = "SET_GUEST";
const SET_LOADING = "SET_LOADING";

const authReducer = (state, action) => {
    switch (action.type) {
        case SET_LOGIN:
            return {
                authData: {
                    userData: action.payload,
                    isAuth: true
                },
                isLoading: false
            };
        case SET_GUEST:
            return {
                authData: {
                    isAuth: false
                },
                isLoading: false
            };
        case SET_LOADING:
            return {
                isLoading: true
            };
        default:
            return state;
    }
};

export default authReducer;