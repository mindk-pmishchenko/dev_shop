import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useLocation } from 'react-router-dom'

import useStyles from './styles'
import categoriesPropTypes from '../../types/categoriesPropTypes'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import { checkPath, getCategory } from '../../utils/helper'

const CategoryPage = categories => {
  const classes = useStyles()
  const { pathname } = useLocation()

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

CategoryPage.propTypes = {
  categories: categoriesPropTypes
}

export default CategoryPage
