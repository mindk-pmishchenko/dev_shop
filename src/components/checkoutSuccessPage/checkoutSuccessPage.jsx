import React from 'react';
import PropTypes from 'prop-types';

const CheckoutSuccessPage = (props) => {
    console.log('props.location.state', props.location.state);

    return `success checkout order# ${props.location.state.orderId}`;
};

export default CheckoutSuccessPage;
