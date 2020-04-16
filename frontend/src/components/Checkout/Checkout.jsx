import React, { useContext } from 'react'
import { useHistory, Redirect } from 'react-router-dom'

import CheckoutForm from './CheckoutForm/CheckoutForm'
import CartContext from '../../context/cartContext'
import SnackbarContext from '../../context/snackbarContext'
import AppContext from '../../context/appContext'
import { fetchData } from '../../utils/helper'

const Checkout = () => {
  const history = useHistory()

  const { cart, setCart } = useContext(CartContext)
  const { products } = cart

  const { showSnackbar } = useContext(SnackbarContext)

  const { appState, setUser } = useContext(AppContext)

  if (!products) {
    return <Redirect to="/" />
  }

  const userId = appState.user.id
  const defaultValues = appState.user

  const details = products.map(({ id: productId, quantity }) => ({ productId, quantity }))

  const handleSubmit = async (data) => {
    try {
      const userResponse = await fetchData({ url: `/users/${userId}`, method: 'PUT', data })
      if (userResponse.success) {
        setUser(userResponse.data)

        const orderResponse = await fetchData({ url: '/orders', method: 'POST', data: { details } })
        if (orderResponse.success) {
          showSnackbar({ message: 'Заказ успешно создан', type: 'success' })
          setCart({})
          history.push('/')
        }
      }
    } catch (error) {
      showSnackbar({ message: 'Произошла ошибка при создании заказа', type: 'error' })
    }
  }

  return <CheckoutForm defaultValues={defaultValues} onSubmit={handleSubmit} />
}

export default Checkout
