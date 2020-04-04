import { createContext } from 'react'

const initialContext = {
  cart: { ...JSON.parse(localStorage.getItem('cart')) },
  setCart: () => {}
}

const CartContext = createContext(initialContext)

export default CartContext
