import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Switch, Route } from 'react-router-dom';

import Menu from '../Menu/Menu';
import useStyles from './styles';
import HomePage from '../../components/pages/homePage';
import CategoryPage from '../../components/pages/categoryPage';
import NotFound from '../../components/pages/notFound';
import useDataApi from '../../utils/hooks/useDataApi';
import ErrorBoundary from './../../components/ErrorBoundary/ErrorBoundary';

const Layout = () => {
  const classes = useStyles();

  const config = {
    url: '/categories',
    method: 'GET',
    data: ''
  };
  const { rawData: categoriesList, isLoading } = useDataApi(
    config
  );

  return (
    <ErrorBoundary>
      <Grid container classes={classes.app}>
        <Grid container direction="row">
          <Grid className={classes.menu}>
            {isLoading ? (
              'Loading'
            ) : (
              <Menu categories={categoriesList} />
            )}
          </Grid>
          <Grid className={classes.mainSection}>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route
                path="/categories/:alias"
                children={
                  categoriesList && (
                    <CategoryPage
                      categories={categoriesList}
                    />
                  )
                }
              />
              <Route path="*" component={NotFound} />
            </Switch>
          </Grid>
        </Grid>
      </Grid>
    </ErrorBoundary>
  );
};

export default Layout;
