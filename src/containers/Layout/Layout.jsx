import React from "react";
import Grid from "@material-ui/core/Grid";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Menu from "../Menu/Menu";
import useStyles from "./styles";

function Layout() {
    const classes = useStyles();

    return (
        <BrowserRouter>
            <Grid container classes={classes.app}>
                <Grid container direction="raw">
                    <Grid className={classes.menu}>
                        <Menu/>
                    </Grid>
                    <Grid className={classes.mainSection}>
                        <Switch>
                            <Route exact path="/">
                                Main Page
                            </Route>
                            <Route path="/category">
                                {/*<CategoryPage />*/}
                            </Route>
                            <Route>
                                404
                            </Route>
                        </Switch>
                    </Grid>
                </Grid>
            </Grid>
        </BrowserRouter>
    );
}

export default Layout;