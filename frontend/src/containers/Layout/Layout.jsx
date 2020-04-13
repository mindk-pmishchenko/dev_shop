import React, { useState, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import { Switch, Route } from 'react-router-dom'

import useDataApi from '../../utils/hooks/useDataApi'
import Menu from '../Menu/Menu'
import Spinner from '../../components/Spinner/Spinner'
import Category from '../Category/Category'
import Cart from '../../components/Cart/Cart'
import Error from '../../components/Error/Error'
import CartContext from '../../context/cartContext'
import Checkout from '../../components/Checkout/Checkout'
import useStyles from './styles'
import Snackbar from '../../components/Snackbar/Snackbar'

const Layout = ({ user }) => {
  const { rawData, isLoading, isError } = useDataApi({
    url: '/categories?filter={"limit": 100}',
    method: 'GET'
  })
  const categories = rawData && !isError ? rawData.results : []

  const [openCart, setOpenCart] = useState(false)
  const handleCloseCart = () => setOpenCart(false)

  const { cart, setCart } = useContext(CartContext)

  const handleDeleteProduct = (id) => () => {
    const filteredProducts = cart.products.filter((product) => product.id !== id)
    if (filteredProducts.length === 0) {
      const newCart = { ...cart }
      delete newCart.products
      setCart(newCart)
    } else {
      setCart({ ...cart, products: filteredProducts })
    }
  }

  const setProductCount = (id) => (count) => () => {
    setCart({
      ...cart,
      products: cart.products.map((product) => {
        if (product.id === id && !(product.quantity <= 1 && count < 0)) {
          product.quantity += count
        }
        return product
      })
    })
  }

  const classes = useStyles()

  return (
    <>
      <Grid container className={classes.app}>
        <Grid container direction="row" spacing={3}>
          <Grid className={classes.menu1} item xs={12} sm={4} md={3}>
            {isLoading ? <Spinner /> : <Menu categories={categories} />}
          </Grid>
          <Grid className={classes.mainSection1} item xs={12} sm={8} md={9}>
            <Switch>
              <Route exact path="/">
                Main page
              </Route>
              <Route exact path="/checkout">
                <Checkout user={user} />
              </Route>
              <Route path="/category">
                {isLoading ? <Spinner /> : <Category categories={categories} setOpenCart={setOpenCart} />}
              </Route>
              <Route>
                <Error />
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Grid>
      <Cart
        open={openCart}
        onClose={handleCloseCart}
        cart={cart}
        handleDeleteProduct={handleDeleteProduct}
        setProductCount={setProductCount}
      />
      <Snackbar />
    </>
  )
}

export default Layout
