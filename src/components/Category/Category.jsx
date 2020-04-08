import React from "react";
import {withRouter} from "react-router";
import PropTypes from 'prop-types';
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import category from "../../types/category";
import useDataApi from "../../utils/hooks/useDataApi";
import Product from "../Product/Product";
import {useStyles} from "./styles";
import Grid from "@material-ui/core/Grid";


function Category({categories, match: {params}}) {
    const classes = useStyles();
    const {alias} = params;
    const category = categories.find(({alias: categoryAlias}) => categoryAlias === alias);

    const { rawData: products, isLoading} = useDataApi({ url: '/products' });

    if (!category) {
        return '404';
    }
    return <>
        <Typography className={classes.category} variant="h2">
            {`${category.id} - ${category.title}`}
        </Typography>
        {isLoading && <CircularProgress />}
        <Grid container>
            {products && products
                .filter(({cat_id: categoryId}) => categoryId === category.id)
                .map(product => (<Product key={product.id} product={product}/>))}
        </Grid>
    </>;
}

Category.propTypes = {
    categories: PropTypes.arrayOf(category).isRequired,
};

export default withRouter(Category);