import React from "react";
import Grid from "@material-ui/core/Grid";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import Menu from "../Menu/Menu";
import Category from "../../components/Category/Category";
import ErrorBoundary from "../../components/ErrorBoundry/ErrorBoundary";
import useDataApi from "../../utils/hooks/useDataApi";
import useStyles from "./styles";

function Layout() {
    const classes = useStyles();
    const { rawData, isLoading } = useDataApi({ url: '/categories' });

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
        </ErrorBoundary>
    );
}

export default Layout;