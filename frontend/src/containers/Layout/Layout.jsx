import React from 'react'
import Grid from '@material-ui/core/Grid'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import useStyles from './styles'
import Menu from '../Menu/Menu'
import Spinner from '../../components/Spinner/Spinner'
import CategoryPage from '../CategoryPage/CategoryPage'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import useDataApi from '../../utils/hooks/useDataApi'

const Layout = () => {
  const classes = useStyles()

  const { rawData, isLoading, isError } = useDataApi({ url: '/categories?filter={"limit": 100}', method: 'GET' })
  const categories = rawData && !isError ? rawData.results : []

  return (
    <Router>
      <Grid container className={classes.app}>
        <Grid container direction="row">
          <Grid className={classes.menu}>{isLoading ? <Spinner /> : <Menu categories={categories} />}</Grid>
          <Grid className={classes.mainSection}>
            <Switch>
              <Route exact path="/">
                Main page
              </Route>
              <Route path="/category">
                <CategoryPage categories={categories} />
              </Route>
              <Route>
                <NotFoundPage />
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Grid>
    </Router>
  )
}

export default Layout
