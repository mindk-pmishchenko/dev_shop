import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

import Product from '../Product/Product'
import product from '../../../types/product'
import useStyles from './styles'

const ProductList = ({ products, setOpenCart }) => {
  const noProducts = products.length === 0
  const classes = useStyles()

  return noProducts ? (
    <Typography component="h2" align="center">
      Товаров еще не было добавлено
    </Typography>
  ) : (
    <Grid container spacing={3} className={classes.productList}>
      {products.map((product) => (
        <Grid item key={product.id}>
          <Product product={product} setOpenCart={setOpenCart} />
        </Grid>
      ))}
    </Grid>
  )
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(product).isRequired,
  setOpenCart: PropTypes.func.isRequired
}

export default ProductList
