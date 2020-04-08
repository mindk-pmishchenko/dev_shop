import React, {useContext} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";


import {useStyles} from "./styles";
import BasketContext from "../../context/basketContext";


function TopBar({setOpenBasket}) {
    const classes = useStyles();

    const {basket} = useContext(BasketContext);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.title} component="h1" variant="h6">
                    Super Shop
                </Typography>
                <IconButton color="inherit" onClick={() => setOpenBasket(true)}>
                    <Badge badgeContent={basket.length} color="secondary">
                        <ShoppingCart />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;