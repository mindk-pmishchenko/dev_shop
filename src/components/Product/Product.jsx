import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';

import {useStyles} from "./styles";
import Button from "@material-ui/core/Button";


function Product({products, cat_id}) {
    const classes = useStyles();
    const productsByCateg = products.filter(({cat_id: categoryId}) => categoryId === cat_id );

    const onBuyClick = (event) => {
        console.log(event);
    };

    return (
        <Grid className={classes.grid}>
            {productsByCateg.map(product => (
                <Card className={classes.root} key={product.id}>
                    <CardContent>
                        <Typography className={classes.title} variant="h3">
                            {product.title}
                        </Typography>
                        <Button
                            variant="contained"
                            endIcon={<AddShoppingCart/>}
                            onClick={onBuyClick}
                        >
                            Buy
                        </Button>&nbsp;
                        <strong>
                            {product.price}
                        </strong>

                    </CardContent>
                </Card>
            ))}
        </Grid>
    );
}

export default Product;