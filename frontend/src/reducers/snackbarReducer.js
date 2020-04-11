import { SHOW_SNACKBAR, HIDE_SNACKBAR } from '../constants/snackbar'

const snackbarReducer = (state, action) => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return { ...state, ...action.payload, open: true }
    case HIDE_SNACKBAR:
      return { ...state, open: false }
    default:
      return state
  }
}

export default snackbarReducer
