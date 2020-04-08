import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import BasketProduct from "./BasketProduct/BasketProduct";

function Basket({open, onClose, basket, handleDeleteProduct, setProductCount}) {
    const baskIsEmpty = !basket.length;
    const total = basket.reduce((total, product) => total + (product.count * product.price), 0);

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
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography variant="h6" >Title</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6">Price</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6">Count</Typography>
                        </Grid>
                        <Grid item xs={2}/>
                        {basket.map(product => <BasketProduct product={product} handleDeleteProduct={handleDeleteProduct} setProductCount={setProductCount}/>)}
                    </Grid>
                )}
            </DialogContent>
            <Grid container>
                <Grid item xs={4}>
                    Back
                </Grid>
                <Grid item xs={4}>
                    Buy
                </Grid>
                <Grid item xs={4}>
                    <Grid container justify="center">
                        <Typography variant="h5">
                            {`Total: $${total}`}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Dialog>
    );
}

export default Basket;