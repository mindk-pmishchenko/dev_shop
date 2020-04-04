import React from 'react'

import CartContext from '../../context/cartContext'
import Layout from '../Layout/Layout'
import useStateWithLocalStorage from '../../utils/hooks/useStateWithLocalStorage'

const App = () => {
  const [cart, setCart] = useStateWithLocalStorage('cart')
  const cartContext = { cart, setCart }

  return (
    <CartContext.Provider value={cartContext}>
      <Layout />
    </CartContext.Provider>
  )
}

export default App
