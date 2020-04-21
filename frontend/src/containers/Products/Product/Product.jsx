import React, { useContext } from 'react'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

import CartContext from '../../../context/cartContext'
import product from '../../../types/product'
import useStyles from './styles'

const Product = ({ product, setOpenCart }) => {
  const { cart, setCart } = useContext(CartContext)
  const { products = [] } = cart

  const productInCart = products.find((cartProduct) => cartProduct.id === product.id)

  const createNewCart = () => {
    const newCart = { ...cart, products }

    if (!productInCart) {
      newCart.products.push({ ...product, quantity: 1 })
    }

    return newCart
  }

  const handleClick = () => {
    setCart(createNewCart())
    setOpenCart(true)
  }

  const { photo, name, price } = product

  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <Grid>
        <CardMedia component="img" className={classes.media} image={photo} title={name} />
      </Grid>
      <Grid className={classes.cardContent}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
        <Grid container component="footer" className={classes.cardFooter}>
          <Typography component="p">
            <Typography component="span" color="secondary" variant="h5">
              {price}
            </Typography>
            <Typography component="span" color="secondary" variant="h6">
              {' грн. '}
            </Typography>
          </Typography>
          <CardActions className={classes.cardActions}>
            <Button variant="contained" color="primary" onClick={handleClick} disabled={!!productInCart}>
              {!!productInCart ? 'В корзине' : 'Купить'}
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  )
}

Product.propTypes = {
  product: product.isRequired,
  setOpenCart: PropTypes.func.isRequired
}

export default Product
