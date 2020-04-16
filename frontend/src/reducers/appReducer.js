import { SET_USER } from '../constants/app'

const appReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload }
    default:
      return state
  }
}

export default appReducer
