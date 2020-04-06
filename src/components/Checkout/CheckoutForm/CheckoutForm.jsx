import React from "react";
import {reduxForm, Field} from "redux-form";
import {TextField} from "@material-ui/core";

const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
}) => (
    <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
);

function CheckoutForm({ handleSubmit, reset }) {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name="firstName" component={renderTextField} type="text" label="First Name"/>
            </div>
            <button type="submit">Submit!</button>
            <button type="button" onClick={reset}>Clear Form!</button>
        </form>
    );
}

export default reduxForm({
    form: 'checkout'
})(CheckoutForm);