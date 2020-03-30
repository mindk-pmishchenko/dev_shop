import React from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

import NotFoundPage from '../NotFoundPage/NotFoundPage'
import category from '../../types/category'
import { checkPath, getCategory } from '../../utils/helper'
import useStyles from './styles'

const Category = ({ categories }) => {
  const classes = useStyles()
  const { pathname } = useLocation()

  if (categories.length === 0) {
    return null
  }

  if (!checkPath(pathname, categories)) {
    return <NotFoundPage />
  }

  const { id, name } = getCategory(pathname, categories)

  return (
    <Grid container direction="row" justify="center" alignItems="center" className={classes.categoryPage}>
      <Grid>
        <Grid className={classes.field}>CategoryName: {name}</Grid>
        <Grid className={classes.field}> CategoryID: {id}</Grid>
      </Grid>
    </Grid>
  )
}

Category.propTypes = {
  categories: PropTypes.arrayOf(category).isRequired
}

export default Category
