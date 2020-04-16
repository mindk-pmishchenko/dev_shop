import React, { useReducer } from 'react'
import { BrowserRouter } from 'react-router-dom'

import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'
import Layout from '../Layout/Layout'
import CartContext from '../../context/cartContext'
import SnackbarContext from '../../context/snackbarContext'
import snackbarReducer from '../../reducers/snackbarReducer'
import { SHOW_SNACKBAR, HIDE_SNACKBAR } from '../../constants/snackbar'
import AppContext from '../../context/appContext'
import appReducer from '../../reducers/appReducer'
import { SET_USER } from '../../constants/app'
import useStateWithLocalStorage from '../../utils/hooks/useStateWithLocalStorage'

const App = () => {
  const [cart, setCart] = useStateWithLocalStorage('cart')
  const cartContext = { cart, setCart }

  const snackbarInitialState = { message: '', type: 'success', open: false }
  const [snackbarState, snackbarDispatch] = useReducer(snackbarReducer, snackbarInitialState)
  const showSnackbar = ({ message, type }) => snackbarDispatch({ type: SHOW_SNACKBAR, payload: { message, type } })
  const hideSnackbar = () => snackbarDispatch({ type: HIDE_SNACKBAR })
  const snackbarContext = { snackbarState, showSnackbar, hideSnackbar }

  const appInitialState = { user: {} }
  const [appState, appDispatch] = useReducer(appReducer, appInitialState)
  const setUser = (user) => appDispatch({ type: SET_USER, payload: user })

  const appContext = { appState, setUser }

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
