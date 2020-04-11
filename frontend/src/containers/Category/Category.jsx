import React from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

import useDataApi from '../../utils/hooks/useDataApi'
import Error from '../../components/Error/Error'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import ProductList from '../ProductList/ProductList'
import Spinner from '../../components/Spinner/Spinner'
import Pagination from '../../components/Pagination/Pagination'
import category from '../../types/category'
import { checkPath, getCategoryIds, preparePathForBreadcrumbs } from '../../utils/helper'
import usePagination from '../../utils/hooks/usePagination'
import useStyles from './styles'

const Category = ({ categories, setOpenCart }) => {
  const classes = useStyles()
  const { pathname } = useLocation()

  const breadcrumbs = preparePathForBreadcrumbs(pathname)
  const categoryIds = getCategoryIds(pathname, categories)

  const limit = 10

  const { setPage, filter } = usePagination({ limit, categoryIds })

  const { rawData, isLoading, isError } = useDataApi({
    url: `/products?filter=${filter}`,
    method: 'GET'
  })
  const products = rawData && !isError ? rawData.results : []
  const totalProducts = rawData && !isError ? rawData.total : 0

  const pageCount = Math.ceil(totalProducts / limit)
  const hasPagination = totalProducts > limit

  if (categories.length === 0) {
    return null
  }

  if (!checkPath(pathname, categories)) {
    return <Error />
  }

  return (
    <Grid container direction="column" className={classes.categoryPage}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {isLoading ? <Spinner /> : <ProductList products={products} setOpenCart={setOpenCart} />}
      {hasPagination && <Pagination pageCount={pageCount} setPage={setPage} />}
    </Grid>
  )
}

Category.propTypes = {
  categories: PropTypes.arrayOf(category).isRequired,
  setOpenCart: PropTypes.func.isRequired
}

export default Category
