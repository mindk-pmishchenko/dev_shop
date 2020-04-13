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
import Spinner from '../../components/Spinner/Spinner'
import useStateWithLocalStorage from '../../utils/hooks/useStateWithLocalStorage'
import useDataApi from '../../utils/hooks/useDataApi'

const App = () => {
  const [cart, setCart] = useStateWithLocalStorage('cart')
  const cartContext = { cart, setCart }

  const rootReducer = combineReducers({ form: formReducer })
  const store = createStore(rootReducer)

  const snackbarInitialState = { message: '', type: 'success', open: false }
  const snackbarContext = useReducer(snackbarReducer, snackbarInitialState)

  // const token = localStorage.setItem('bearer_token', '468f1875-fcac-4936-9316-4c9880d7fdbe')
  const { rawData, isLoading, isError } = useDataApi({
    url: `/users?filter=${JSON.stringify({ token: localStorage.getItem('bearer_token') })}`,
    method: 'GET'
  })
  const user = rawData && rawData.results && !isError ? rawData.results[0] : {}

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <SnackbarContext.Provider value={snackbarContext}>
          <CartContext.Provider value={cartContext}>
            <BrowserRouter>{isLoading ? <Spinner /> : <Layout user={user} />}</BrowserRouter>
          </CartContext.Provider>
        </SnackbarContext.Provider>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
