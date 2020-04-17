import React from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

import ProductList from './ProductList/ProductList'
import Spinner from '../../components/Spinner/Spinner'
import Pagination from '../../components/Pagination/Pagination'
import usePagination from '../../utils/hooks/usePagination'
import useDataApi from '../../utils/hooks/useDataApi'
import useStyles from './styles'

const Products = ({ limit, query, setOpenCart }) => {
  const { setPage, filter } = usePagination({ limit, query })

  const { rawData, isLoading, isError } = useDataApi({
    url: `/products?filter=${filter}`,
    method: 'GET'
  })
  const products = rawData && !isError ? rawData.results : []
  const totalProducts = rawData && !isError ? rawData.total : 0

  const { pageCount, hasPagination } = usePagination({ limit, totalProducts })

  const classes = useStyles()

  return (
    <Grid container direction="column" className={classes.categoryPage}>
      {isLoading ? <Spinner /> : <ProductList products={products} setOpenCart={setOpenCart} />}
      {hasPagination && <Pagination pageCount={pageCount} setPage={setPage} />}
    </Grid>
  )
}

Products.defaultProps = {
  limit: 10
}

Products.propTypes = {
  limit: PropTypes.number,
  query: PropTypes.object.isRequired,
  setOpenCart: PropTypes.func.isRequired
}

export default Products
