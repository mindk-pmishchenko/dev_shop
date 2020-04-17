import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

import Error from '../../components/Error/Error'
import Products from '../../containers/Products/Products'
import category from '../../types/category'
import { checkPath, getCategoryIds } from '../../utils/helper'

const Category = ({ categories, setOpenCart }) => {
  const { pathname } = useLocation()

  const categoryIds = getCategoryIds(pathname, categories)

  const query = { relations: { categories: { id: categoryIds } } }

  if (categories.length === 0) {
    return null
  }

  if (!checkPath(pathname, categories)) {
    return <Error />
  }

  return <Products query={query} setOpenCart={setOpenCart} />
}

Category.propTypes = {
  categories: PropTypes.arrayOf(category).isRequired,
  setOpenCart: PropTypes.func.isRequired
}

export default Category
