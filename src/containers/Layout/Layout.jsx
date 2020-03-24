import React from "react";
import Grid from "@material-ui/core/Grid";

import Menu from "../Menu/Menu";
import useStyles from "./styles";

function Layout() {
    const classes = useStyles();

    return (
        <Grid container classes={classes.app}>
            <Grid container direction="raw">
                <Grid className={classes.menu}>
                    <Menu/>
                </Grid>
                <Grid className={classes.mainSection}>
                    Products
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Layout;