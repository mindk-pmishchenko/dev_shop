import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import CheckoutForm from './CheckoutForm/CheckoutForm'
import CartContext from '../../context/cartContext'
import SnackbarContext from '../../context/snackbarContext'
import { SHOW_SNACKBAR } from '../../constants/snackbar'
import { fetchData } from '../../utils/helper'
import user from '../../types/user'

const Checkout = ({ user }) => {
  const { cart, setCart } = useContext(CartContext)

  const [, dispatch] = useContext(SnackbarContext)

  const history = useHistory()

  const details =
    cart.products && cart.products.map(({ id: productId, quantity }) => ({ productId: productId, quantity }))

  const { id, firstName, lastName, address, email, mobilePhone } = user
  const initialValues = { firstName, lastName, address, email, mobilePhone }

  const handleSubmit = (data, dispatch, props) => {
    return new Promise(async (resolve, reject) => {
      try {
        await fetchData({ url: `/users/${id}`, method: 'PUT', data })
        await fetchData({ url: '/orders', method: 'POST', data: { details } })

        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  const handleSubmitSuccess = (result, reduxFormDispatch, { values, initialize }) => {
    dispatch({ type: SHOW_SNACKBAR, payload: { message: 'Заказ успешно создан', type: 'success' } })
    setCart({})
    initialize(values)
    // history.push('/')
  }

  const handleSubmitFail = (errors, reduxFormDispatch, submitError, props) => {
    if (submitError) {
      dispatch({ type: SHOW_SNACKBAR, payload: { message: 'Произошла ошибка при создании заказа', type: 'error' } })
    }
  }

  return (
    <CheckoutForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  )
}

Checkout.propTypes = {
  user
}

export default Checkout
