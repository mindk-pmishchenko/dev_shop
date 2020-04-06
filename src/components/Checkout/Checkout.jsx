import React from "react";
import CheckoutForm from "./CheckoutForm/CheckoutForm";

function Checkout() {
    const submit = values => {
        console.log(values);
    };

    return <CheckoutForm onSubmit={submit} initialValues={{firstName: "test"}}/>
}

export default Checkout;