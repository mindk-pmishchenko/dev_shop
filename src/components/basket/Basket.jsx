import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';

import BasketContext from '../../context/basketContext';
import { axiousCustomRequest } from './../../utils/helpers';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function Basket({ open, onClose, basket }) {
    const classes = useStyles();

    const notificationMessages = {
        minQuantityError: 'Кол-во единиц товара не может быть меньше одного',
        successfullyIncreased: 'Вы добавили ещё одну единицу товара',
        successfullyDecreased: 'Вы уменьшили количество единиц товара',
        successfullyRemoved: 'Товар успешно удален',
    };
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const {
        itemsInCartQuantityContext: { itemsInCartQuantity, setItemsInCartQuantity },
    } = useContext(BasketContext);

    const {
        basketOpenContext: { basketOpen, setBasketOpen },
    } = useContext(BasketContext);

    const {
        basketContext: { setBasket },
    } = useContext(BasketContext);

    const updateCurrentItem = (currentPrev = [], idx, op) => {
        let updatedItem =
            op === 'dec'
                ? {
                      ...currentPrev[idx],
                      quantity: currentPrev[idx].quantity - 1,
                  }
                : {
                      ...currentPrev[idx],
                      quantity: currentPrev[idx].quantity + 1,
                  };

        return op === 'remove'
            ? [...currentPrev.slice(0, idx), ...currentPrev.slice(idx + 1)]
            : [...currentPrev.slice(0, idx), updatedItem, ...currentPrev.slice(idx + 1)];
    };

    const changeCartItemAPI = async (id, action) => {
        const authToken = localStorage.getItem('bearer_token');
        const config = {
            url: '',
            method: 'post',
            headers: { Authorization: `Bearer ${authToken}` },
        };

        switch (action) {
            case 'inc':
                config.url = `/api/orders/change-cart-item-quantity/${id}/inc`;
                break;
            case 'dec':
                config.url = `/api/orders/change-cart-item-quantity/${id}/dec`;
                break;

            case 'del':
                config.url = `/api/orders/cart/${id}`;
                config.method = 'delete';
                break;

            default:
                break;
        }

        const accessData = axiousCustomRequest(config);
        return await accessData
            .then((res) => {
                return;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleIncQuantity = (id) => {
        setBasket((prevBasket) => {
            const apiResponse = changeCartItemAPI(id, 'inc');
            if (!apiResponse) {
                return false;
            }

            let tempResult;
            let currentPrev = [...prevBasket];

            const idx = currentPrev.findIndex((el) => el.id === id);
            if (idx > -1) {
                tempResult = updateCurrentItem(currentPrev, idx, 'inc');
            } else {
                console.log('Error');
                return prevBasket;
            }
            enqueueSnackbar(notificationMessages.successfullyIncreased, {
                variant: 'success',
            });
            return tempResult;
        });
    };

    const handleDecQuantity = (id) => {
        setBasket((prevBasket) => {
            let tempResult;
            let currentPrev = [...prevBasket];
            const idx = currentPrev.findIndex((el) => el.id === id);
            if (idx > -1) {
                if (currentPrev[idx].quantity <= 1) {
                    enqueueSnackbar(notificationMessages.minQuantityError, {
                        variant: 'error',
                    });
                    return prevBasket;
                }
                const apiResponse = changeCartItemAPI(id, 'dec');
                if (!apiResponse) {
                    return false;
                }
                tempResult = updateCurrentItem(currentPrev, idx, 'dec');
            } else {
                console.log('Error');
                return prevBasket;
            }
            enqueueSnackbar(notificationMessages.successfullyDecreased, {
                variant: 'success',
            });
            return tempResult;
        });
    };

    const handleRemItem = (id) => {
        setBasket((prevBasket) => {
            let tempResult;
            let currentPrev = [...prevBasket];

            const idx = currentPrev.findIndex((el) => el.id === id);
            if (idx > -1) {
                const apiResponse = changeCartItemAPI(id, 'del');
                if (!apiResponse) {
                    return false;
                } else {
                    tempResult = updateCurrentItem(currentPrev, idx, 'remove');
                }
            } else {
                console.log('Error');
                return prevBasket;
            }
            enqueueSnackbar(notificationMessages.successfullyRemoved, {
                variant: 'success',
            });
            return tempResult;
        });
    };

    const products = basket ? Object.entries(basket) : [];
    const baskIsEmpty = !products.length;
    let total = 0;
    let quantityInCart = 0;

    products.forEach((product) => {
        total = parseInt(product[1].price, 10)
            ? total + parseInt(product[1].price, 10) * parseInt(product[1].quantity, 10)
            : total;

        quantityInCart = parseInt(product[1].quantity, 10)
            ? quantityInCart + parseInt(product[1].quantity, 10)
            : quantityInCart;
    });
    setItemsInCartQuantity(quantityInCart);

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
                <DialogTitle>Корзина</DialogTitle>
                <DialogContent>
                    {baskIsEmpty && (
                        <Grid container alignItems="center">
                            <Grid item xs={12}>
                                <Grid container justify="center">
                                    <Typography variant="h5">
                                        Корзина пуста.... Выберите свой первый товар
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    {!baskIsEmpty && (
                        <Grid container>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Наименование</TableCell>
                                            <TableCell align="right">Количество</TableCell>
                                            <TableCell align="right">Цена</TableCell>
                                            <TableCell align="right">
                                                Редактировать кол-во
                                            </TableCell>
                                            <TableCell align="right">Удалить</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {products.map((product) => (
                                            <TableRow key={product[1].id}>
                                                <TableCell component="th" scope="row">
                                                    {product[1].title} (#
                                                    {product[1].id})
                                                </TableCell>
                                                <TableCell align="right">
                                                    {product[1].quantity}
                                                    &nbsp;шт.
                                                </TableCell>
                                                <TableCell align="right">
                                                    {product[1].price}
                                                    &nbsp;грн.
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button
                                                        onClick={() => {
                                                            handleIncQuantity(product[1].id);
                                                        }}
                                                    >
                                                        <ControlPointIcon />
                                                    </Button>

                                                    <Button
                                                        onClick={() => {
                                                            handleDecQuantity(product[1].id);
                                                        }}
                                                    >
                                                        <RemoveCircleOutlineIcon />
                                                    </Button>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button
                                                        color="secondary"
                                                        onClick={() => {
                                                            handleRemItem(product[1].id);
                                                        }}
                                                    >
                                                        Удалить
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    )}
                </DialogContent>
                <Grid container>
                    <Grid item xs={3}>
                        <Grid container justify="center">
                            <Typography variant="h6">{`Сумма: ${total} грн.`}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Button color="secondary" onClick={onClose}>
                            Продолжить покупки
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={onClose} color="primary" to="/checkout" component={Link}>
                            Оформить заказ
                        </Button>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    );
}

Basket.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.bool,
    basket: PropTypes.object,
};

export default Basket;
