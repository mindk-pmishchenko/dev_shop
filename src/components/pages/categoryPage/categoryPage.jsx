import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import category from '../../../types/category';
import useDataApi from '../../../utils/hooks/useDataApi';
import MediaCard from './../../mediaCard';
import './categoryPage.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    catLabel: {
        marginBottom: '2rem',
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));

const CategoryPage = ({ categories, productPage, limitPerPage }) => {
    const classes = useStyles();
    const [categoryId, setCategoryId] = useState(null);
    let { pathname } = useLocation();
    let cats = pathname.split('/');
    const alias = cats[cats.length - 1];

    let currentCat = categories.filter((el) => {
        return el.alias === alias;
    });

    const { id, title } = currentCat[0] || {
        id: null,
        title: 'All categories',
    };

    useEffect(() => {
        setCategoryId(id);
    });

    //getting products from category
    const config = {
        url:
            categoryId !== null
                ? `/api/products/?page=${productPage}&limit=${limitPerPage}&category_id=${categoryId}`
                : `/api/products/?page=${productPage}&limit=${limitPerPage}`,
        method: 'GET',
        data: '',
    };

    const data = useDataApi(config);

    if (!currentCat[0] && alias !== 'categories') {
        return <>Smth went wrong</>;
    }
    if (!categories) return <div>loading...</div>;

    return (
        <>
            <Grid container className={classes.catLabel}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h5">
                        {title}
                    </Typography>
                </Grid>
            </Grid>

            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2}>
                        {data.rawData &&
                            data.rawData.data.map((item) => (
                                <Grid key={item.id}>
                                    <MediaCard
                                        className={classes.paper}
                                        {...item}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

CategoryPage.propTypes = {
    categories: PropTypes.arrayOf(category).isRequired,
};

CategoryPage.defaultProps = {
    productPage: 1,
    limitPerPage: 12,
    categoryId: null,
};

export default CategoryPage;
