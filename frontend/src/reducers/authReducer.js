import { SET_LOGIN, SET_GUEST, SET_LOADING } from '../constants/auth'

const authReducer = (state, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        authData: {
          userData: action.payload,
          isAuth: true
        },
        isLoading: false
      }
    case SET_GUEST:
      return {
        ...state,
        authData: {
          userData: {},
          isAuth: false
        },
        isLoading: false
      }
    case SET_LOADING:
      return {
        ...state,
        isLoading: true
      }
    default:
      return state
  }
}

export default authReducer
