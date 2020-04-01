import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import BasketProduct from "./BasketProduct/BasketProduct";

function Basket({open, onClose, basket, handleDeleteProduct, setProductCount}) {
    const products = Object.entries(basket);
    const baskIsEmpty = !!products.length;
    const total = 100;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Basket
            </DialogTitle>
            <DialogContent>
                {baskIsEmpty && (
                    <Grid container alignItems="center">
                        <Grid item xs={12}>
                            <Grid container justify="center">
                                <Typography variant="h5">
                                    Empty basket....
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
                {!baskIsEmpty && (
                    <Grid container>
                        {products.map(product => <BasketProduct product={product} />)}
                    </Grid>
                )}
            </DialogContent>
            <Grid container>
                <Grid item xs={3}>
                    <Grid container justify="center">
                        <Typography variant="h5">
                            {`Total: $${total}`}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    Back
                </Grid>
                <Grid item xs={3}>
                    Buy
                </Grid>
            </Grid>
        </Dialog>
    );
}

export default Basket;