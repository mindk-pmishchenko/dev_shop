import React, { useState, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import { Switch, Route } from 'react-router-dom'
import useDeepCompareEffect from 'use-deep-compare-effect'

import useDataApi from '../../utils/hooks/useDataApi'
import Menu from '../Menu/Menu'
import Spinner from '../../components/Spinner/Spinner'
import Category from '../Category/Category'
import Cart from '../../components/Cart/Cart'
import Error from '../../components/Error/Error'
import CartContext from '../../context/cartContext'
import AppContext from '../../context/appContext'
import Checkout from '../../components/Checkout/Checkout'
import Snackbar from '../../components/Snackbar/Snackbar'
import useStyles from './styles'

const Layout = () => {
  const { setUser } = useContext(AppContext)

  const { rawData: categoriesRawData, isLoading: isCategoriesLoading, isError: isCategoriesError } = useDataApi({
    url: '/categories?filter={"limit": 100}',
    method: 'GET'
  })
  const categories = categoriesRawData && !isCategoriesError ? categoriesRawData.results : []

  const bearerToken = localStorage.getItem('bearer_token')
  const { rawData: userRawData, isLoading: isUserLoading, isError: isUserError } = useDataApi(
    {
      url: `/users?filter=${JSON.stringify({ token: bearerToken })}`,
      method: 'GET'
    },
    bearerToken
  )
  const user = userRawData && userRawData.results && !isUserError ? userRawData.results[0] : {}

  useDeepCompareEffect(() => setUser(user), [user])

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

  return isUserLoading ? (
    <Spinner />
  ) : (
    <>
      <Grid container className={classes.app}>
        <Grid container direction="row" spacing={3}>
          <Grid className={classes.menu1} item xs={12} sm={4} md={3}>
            {isCategoriesLoading ? <Spinner /> : <Menu categories={categories} />}
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
                {isCategoriesLoading ? <Spinner /> : <Category categories={categories} setOpenCart={setOpenCart} />}
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
