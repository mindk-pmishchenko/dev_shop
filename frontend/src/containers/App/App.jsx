import React, { useReducer } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { Provider } from 'react-redux'

import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'
import CartContext from '../../context/cartContext'
import SnackbarContext from '../../context/snackbarContext'
import snackbarReducer from '../../reducers/snackbarReducer'
import Layout from '../Layout/Layout'
import useStateWithLocalStorage from '../../utils/hooks/useStateWithLocalStorage'

const App = () => {
  const [cart, setCart] = useStateWithLocalStorage('cart')
  const cartContext = { cart, setCart }

  const rootReducer = combineReducers({ form: formReducer })
  const store = createStore(rootReducer)

  const snackbarInitialState = { message: '', type: 'success', open: false }
  const snackbarContext = useReducer(snackbarReducer, snackbarInitialState)

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <SnackbarContext.Provider value={snackbarContext}>
          <CartContext.Provider value={cartContext}>
            <BrowserRouter>
              <Layout />
            </BrowserRouter>
          </CartContext.Provider>
        </SnackbarContext.Provider>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
