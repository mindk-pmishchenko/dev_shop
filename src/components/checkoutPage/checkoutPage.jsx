import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';

import CheckoutForm from './checkoutForm/';
import AppContext from './../../context/appContext';
import { axiousCustomRequest } from './../../utils/helpers';
import { useState } from 'react';

function CheckoutPage() {
    var orderDetails = 4;
    const { authData } = useContext(AppContext);
    const { isAuth, handleUserLogout } = authData;
    const [showCheckout, setShowCheckout] = useState(true);
    const [currentOrderId, setCurrentOrderId] = useState(true);

    if (isAuth) {
        var {
            userData: { id, avatar, last_name, first_name, email },
        } = authData;
    }

    const submit = ({ contact_phone, delivery_address, delivery_type }) => {
        console.log('values');
        const authToken = localStorage.getItem('bearer_token');
        const config = {
            url: '/api/orders/',
            method: 'post',
            data: {
                delivery_type,
                contact_phone,
                delivery_address,
            },
            headers: { Authorization: `Bearer ${authToken}` },
        };

        const accessData = axiousCustomRequest(config);

        accessData.then((res) => {
            orderDetails = res.data.data[0];
            setCurrentOrderId(orderDetails.id);
            if (res.status === 200) {
                setShowCheckout(false);
            }
        });
    };
    if (showCheckout === false) {
        return (
            <Redirect
                to={{
                    pathname: '/success',
                    state: { orderId: currentOrderId },
                }}
            />
        );
    }
    return (
        <>
            <Typography variant="body2" color="textPrimary" component="p">
                Здравствуйте, {last_name} {first_name}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
                <span>Ваш Email: {email}</span>
            </Typography>

            <Typography variant="body2" color="textPrimary" component="p">
                Укажите параметры заказа:
            </Typography>

            <CheckoutForm
                onSubmit={submit}
                initialValues={{ contact_phone: '', delivery_address: '', delivery_type: '' }}
            />
        </>
    );
}

export default CheckoutPage;
