import React, {useContext, useState} from "react";
import Grid from "@material-ui/core/Grid";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import Menu from "../Menu/Menu";
import Category from "../../components/Category/Category";
import ErrorBoundary from "../../components/ErrorBoundry/ErrorBoundary";
import useDataApi from "../../utils/hooks/useDataApi";
import Basket from "../../components/Basket/Basket";
import BasketContext from "../../context/basketContext";
import Checkout from "../../components/Checkout/Checkout";
import Auth from "../../components/Auth/Auth";
import useStyles from "./styles";

function Layout() {
    const classes = useStyles();
    const { rawData, isLoading } = useDataApi({ url: '/categories' });

    const [openBasket, setOpenBasket] = useState(false);
    const handleCloseBasket = () => setOpenBasket(false);
    const {basket, setBasket} = useContext(BasketContext);

    const handleDeleteProduct = name => () => {
        setBasket(prevBasket => prevBasket);
    };

    const setProductCount = name => count => {
        setBasket(prevBasket => prevBasket);
    };

    return (
        <ErrorBoundary>
            <BrowserRouter>
                <Grid container classes={classes.app}>
                    <Grid container direction="raw">
                        <Grid className={classes.menu}>
                            {isLoading && <CircularProgress />}
                            {rawData && <Menu categories={rawData} />}
                        </Grid>
                        <Grid className={classes.mainSection}>
                            <Switch>
                                <Route exact path="/">
                                    Main Page
                                </Route>
                                <Route exact path="/login">
                                    <Auth />
                                </Route>
                                <Route exact path="/checkout">
                                    <Checkout />
                                </Route>
                                <Route path="/category/:alias">
                                    {isLoading && <CircularProgress />}
                                    {rawData && <Category categories={rawData} />}
                                </Route>
                                <Route>
                                    404
                                </Route>
                            </Switch>
                        </Grid>
                    </Grid>
                </Grid>
            </BrowserRouter>
            <Basket
                open={openBasket}
                onClose={handleCloseBasket}
                basket={basket}
                handleDeleteProduct={handleDeleteProduct}
                setProductCount={setProductCount}
            />
        </ErrorBoundary>
    );
}

export default Layout;