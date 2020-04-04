import { createContext } from 'react'

const initialContext = {
  products: { ...JSON.parse(localStorage.getItem('cart')) },
  setProducts(newProducts) {
    this.products = newProducts
  }
}

const CartContext = createContext(initialContext)

export default CartContext
