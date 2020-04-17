import React, { useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

import CartContext from '../../../context/cartContext'
import useStyles from './styles'

const Cart = ({ setOpenCart }) => {
  const { cart } = useContext(CartContext)
  const { products } = cart

  const totalCostInCart = products ? products.reduce((acc, { price, quantity }) => acc + price * quantity, 0) : 0

  const handleClick = () => setOpenCart(true)

  const classes = useStyles()

  return (
    <div className={classes.cart}>
      <IconButton color="inherit" className={classes.cartIcon} onClick={handleClick}>
        <ShoppingCart />
        <div className={classes.cartTotal}>
          <Typography className={classes.cartTotalCost}>{totalCostInCart}</Typography>
          <Typography>₴</Typography>
        </div>
      </IconButton>
    </div>
  )
}

Cart.propTypes = {
  setOpenCart: PropTypes.func.isRequired
}

export default Cart
