import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import CartEmpty from './CartEmpty/CartEmpty'
import CartDetails from './CartDetails/CartDetails'
import useStyles from './styles'

const Cart = ({ open, onClose, cart, handleDeleteProduct, setProductCount }) => {
  const products = cart.products || []

  const cartIsEmpty = !products.length

  const classes = useStyles()

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Корзина</DialogTitle>
      <DialogContent>
        {cartIsEmpty ? (
          <CartEmpty />
        ) : (
          <CartDetails
            products={products}
            handleDeleteProduct={handleDeleteProduct}
            setProductCount={setProductCount}
          />
        )}
      </DialogContent>
      <DialogActions className={classes.cartActions}>
        <Button variant="contained" onClick={onClose}>
          Назад
        </Button>
        <Button variant="contained" color="primary">
          Купить
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default Cart
