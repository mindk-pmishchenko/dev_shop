import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import BasketContext from '../../context/basketContext';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const MediaCard = ({
    available,
    description,
    id,
    manufacturer,
    photo,
    price,
    quantity,
    title,
    valid_until,
    weight,
}) => {
    const {
        basketContext: { basket, setBasket },
    } = useContext(BasketContext);

    const {
        basketOpenContext: { basketOpen, setBasketOpen },
    } = useContext(BasketContext);

    const addToCart = () => {
        setBasket((prevBasket) => {
            let tempResult;
            let currentPrev = [...prevBasket];
            const idx = currentPrev.findIndex((el) => el.id === id);
            if (idx > -1) {
                const updatedItem = {
                    ...currentPrev[idx],
                    quantity: currentPrev[idx].quantity + 1,
                };
                tempResult = [
                    ...prevBasket.slice(0, idx),
                    updatedItem,
                    ...prevBasket.slice(idx + 1),
                ];
            } else {
                tempResult = [...prevBasket];
                tempResult.push({
                    id,
                    quantity: 1,
                    title,
                    price,
                });
            }
            setBasketOpen(true);
            return tempResult;
        });
    };

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={photo}
                    title={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        {title}
                    </Typography>
                    <Typography
                        gutterBottom
                        color="textSecondary"
                        variant="h5"
                        component="h3"
                    >
                        {price} грн.
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="secondary" onClick={addToCart}>
                    В корзину
                </Button>
                {!1 && (
                    <Button size="small" color="primary">
                        For further development
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

MediaCard.propTypes = {
    title: PropTypes.string.isRequired,
    available: PropTypes.bool,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    manufacturer: PropTypes.number,
    photo: PropTypes.string,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number,
    valid_until: PropTypes.string,
    weight: PropTypes.string,
};
export default MediaCard;
