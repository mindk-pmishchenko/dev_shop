import React, { useContext } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import AppMenu from './../../components/appMenu';
import HomePage from '../../components/pages/homePage';
import RegularPageView from '../../components/pages/regularPageView';
import CategoryPage from '../../components/pages/categoryPage';
import NotFound from '../../components/pages/notFound';
import useDataApi from '../../utils/hooks/useDataApi';
import ErrorBoundary from './../../components/ErrorBoundary/ErrorBoundary';
import staticMenuList from './staticMenuList';
import Basket from './../../components/basket';
import BasketContext from '../../context/basketContext';
import useStyles from './styles';
import AppHeader from '../../components/appHeader';
import CheckoutPage from '../../components/checkoutPage';

const Layout = () => {
    const classes = useStyles();
    const {
        basketContext: { basket, setBasket },
    } = useContext(BasketContext);
    const {
        basketOpenContext: { basketOpen, setBasketOpen },
    } = useContext(BasketContext);
    const config = {
        url: '/api/categories',
        method: 'GET',
        data: '',
    };

    const { rawData: categoriesList } = useDataApi(config);

    if (!categoriesList) return <CircularProgress />;
    const handleCloseBasket = () => setBasketOpen(false);

    return (
        <ErrorBoundary>
            <div className={clsx('App', classes.root)}>
                <CssBaseline />
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <AppMenu categories={staticMenuList} staticMenu={true} />
                    <Divider />

                    <ListItem button component={Link} to="/categories">
                        <ListItemText primary="Categories" inset={false} />
                    </ListItem>

                    <AppMenu categories={categoriesList} />
                </Drawer>
                <main className={classes.content}>
                    <AppHeader />
                    <Container maxWidth="lg" className={classes.container}>
                        <Switch>
                            <Route exact path="/">
                                <HomePage />
                            </Route>
                            <Route path="/account/">
                                <RegularPageView page="account" />
                            </Route>
                            <Route path="/cart/">
                                <RegularPageView page="cart" />
                            </Route>
                            <Route path="/orders/">
                                <RegularPageView page="orders" />
                            </Route>
                            <Route path="/manufacturers/">
                                <RegularPageView page="manufacturers" />
                            </Route>
                            <Route path="/delivery/">
                                <RegularPageView page="delivery" />
                            </Route>
                            <Route path="/checkout/">
                                <CheckoutPage />
                            </Route>
                            <Route
                                path="/category/:alias?"
                                children={
                                    categoriesList ? (
                                        <CategoryPage
                                            categories={categoriesList}
                                        />
                                    ) : (
                                        <CircularProgress />
                                    )
                                }
                            />
                            <Route
                                path="/categories/"
                                children={
                                    categoriesList ? (
                                        <CategoryPage
                                            categories={categoriesList}
                                        />
                                    ) : (
                                        <CircularProgress />
                                    )
                                }
                            />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </Container>
                </main>
            </div>
            <Basket
                open={basketOpen}
                onClose={handleCloseBasket}
                basket={basket}
            />
        </ErrorBoundary>
    );
};

export default Layout;
