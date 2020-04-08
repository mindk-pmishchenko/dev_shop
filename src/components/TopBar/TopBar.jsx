import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";


import {useStyles} from "./styles";

function TopBar() {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h1" className={classes.title} variant="h6">
                    Super Shop
                </Typography>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={1} color="secondary">
                        <ShoppingCart />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;