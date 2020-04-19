import React, { useState, useContext, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { Switch, Route } from 'react-router-dom'
import { isEmpty } from 'lodash-es'
import { useLocation } from 'react-router-dom'

import useDataApi from '../../utils/hooks/useDataApi'
import Menu from '../Menu/Menu'
import Spinner from '../../components/Spinner/Spinner'
import Category from '../Category/Category'
import Cart from '../../components/Cart/Cart'
import Error from '../../components/Error/Error'
import AppBar from '../../components/AppBar/AppBar'
import Auth from '../../components/Auth/Auth'
import NewProducts from '../../components/NewProducts/NewProducts'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import UserProfile from '../../components/UserProfile/UserProfile'
import Orders from '../../components/Orders/Orders'
import Order from '../../components/Order/Order'
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute'
import CartContext from '../../context/cartContext'
import AppContext from '../../context/appContext'
import Checkout from '../../components/Checkout/Checkout'
import Snackbar from '../../components/Snackbar/Snackbar'
import { preparePathForBreadcrumbs } from '../../utils/helper'
import useStyles from './styles'

const Layout = () => {
  const { pathname } = useLocation()
  const breadcrumbs = preparePathForBreadcrumbs(pathname)

  const { authData, handleUserLoading } = useContext(AppContext)
  const { handleUserLogin, handleUserLogout } = authData

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

  useEffect(() => {
    handleUserLoading(isUserLoading)
  }, [isUserLoading]) // eslint-disable-line react-hooks/exhaustive-deps

  useDeepCompareEffect(() => {
    if (!isEmpty(user)) {
      handleUserLogin(user)
    } else {
      handleUserLogout()
    }
  }, [user])

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
      <Grid container>
        <Grid container className={classes.appBarContainer}>
          <AppBar setOpenCart={setOpenCart} />
        </Grid>
        <Grid container direction="row" spacing={3}>
          <Grid item xs={12} sm={4} md={3}>
            {isCategoriesLoading ? <Spinner /> : <Menu categories={categories} />}
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <Switch>
              <Route exact path="/">
                <NewProducts setOpenCart={setOpenCart} />
              </Route>
              <Route exact path="/checkout">
                <Checkout user={user} />
              </Route>
              <Route path="/auth">
                <Auth />
              </Route>
              <Route path="/category">
                {isCategoriesLoading ? <Spinner /> : <Category categories={categories} setOpenCart={setOpenCart} />}
              </Route>
              <PrivateRoute path="/profile">
                <UserProfile />
              </PrivateRoute>
              <PrivateRoute exact path="/orders">
                <Orders />
              </PrivateRoute>
              <PrivateRoute path="/orders/:id">
                <Order />
              </PrivateRoute>
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
