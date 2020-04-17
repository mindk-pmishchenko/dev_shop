import React, { useReducer } from 'react'
import { BrowserRouter } from 'react-router-dom'

import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'
import Layout from '../Layout/Layout'
import CartContext from '../../context/cartContext'
import SnackbarContext from '../../context/snackbarContext'
import snackbarReducer from '../../reducers/snackbarReducer'
import { SHOW_SNACKBAR, HIDE_SNACKBAR } from '../../constants/snackbar'
import AppContext from '../../context/appContext'
import authReducer from '../../reducers/authReducer'
import { SET_LOGIN, SET_GUEST } from '../../constants/auth'
import useStateWithLocalStorage from '../../utils/hooks/useStateWithLocalStorage'

const App = () => {
  const [cart, setCart] = useStateWithLocalStorage('cart')
  const cartContext = { cart, setCart }

  const snackbarInitialState = { message: '', type: 'success', open: false }
  const [snackbarState, snackbarDispatch] = useReducer(snackbarReducer, snackbarInitialState)
  const showSnackbar = ({ message, type }) => snackbarDispatch({ type: SHOW_SNACKBAR, payload: { message, type } })
  const hideSnackbar = () => snackbarDispatch({ type: HIDE_SNACKBAR })
  const snackbarContext = { snackbarState, showSnackbar, hideSnackbar }

  const authInitialState = { authData: { userData: {}, isAuth: false }, isLoading: false }
  const [authState, authDispatch] = useReducer(authReducer, authInitialState)
  const handleUserLogin = (userData) => authDispatch({ type: SET_LOGIN, payload: userData })
  const handleUserLogout = () => authDispatch({ type: SET_GUEST })
  const appContext = { authData: { ...authState.authData, handleUserLogin, handleUserLogout } }

  return (
    <ErrorBoundary>
      <AppContext.Provider value={appContext}>
        <SnackbarContext.Provider value={snackbarContext}>
          <CartContext.Provider value={cartContext}>
            <BrowserRouter>
              <Layout />
            </BrowserRouter>
          </CartContext.Provider>
        </SnackbarContext.Provider>
      </AppContext.Provider>
    </ErrorBoundary>
  )
}

export default App
