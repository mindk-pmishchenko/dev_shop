import React, { useContext } from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField } from '@material-ui/core';
import { render } from '@testing-library/react';

const renderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => {
    return (
        <TextField
            label={label}
            placeholder={label}
            error={touched && invalid}
            helperText={touched && error}
            {...input}
            {...custom}
        />
    );
};

const renderSelectField = ({
    name,
    /*@ToFigureOut it doesn't work with the prop NAME - why?*/
    selectName,
    input,
    label,
    options,
    meta: { touched, invalid, error },
    ...custom
}) => {
    let formOptionsHtml = [];
    options.forEach((el) => {
        formOptionsHtml.push(<option value={el.id}>{el.company_name}</option>);
    });

    return (
        <Field
            name={selectName}
            component="select"
            label={label}
            error={touched && invalid}
            helperText={touched && error}
            {...custom}
            {...input}
        >
            <option></option>
            {formOptionsHtml}
        </Field>
    );
};

const CheckoutForm = ({ handleSubmit, reset }) => {
    /*
    @TODO - Delivery list from API

    const getDeliveryServices = async () => {
        const authToken = localStorage.getItem('bearer_token');
        const config = {
            url: '/api/deliveries/',
            method: 'get',
            headers: { Authorization: `Bearer ${authToken}` },
        };

        const accessData = axiousCustomRequest(config);

        return await accessData
            .then((res) => {
                console.log('res', res);

                return res;
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const deliverySevices = getDeliveryServices();*/

    /* Temporary */
    const delivery = [
        {
            id: '1',
            company_name: 'Новая Почта',
            company_address: 'г. Киев, ул. Тараса Шевченка 15/234',
            company_phone: '380446548711',
        },
        {
            id: '2',
            company_name: 'УкрПочта',
            company_address: 'г. Киев, Контрактовая Площадь 1/23/№234',
            company_phone: '38044888991',
        },
        {
            id: '3',
            company_name: 'InTime',
            company_address: 'г. Киев, Площадь Льва Толстого 34/3',
            company_phone: '38044799588',
        },
        {
            id: '4',
            company_name: 'Ночной Экспресс',
            company_address: 'г. Киев, бульвар Богдана Хмельницкого 9/1',
            company_phone: '380449876545',
        },
        {
            id: '5',
            company_name: 'UA-Delivery',
            company_address: 'г. Киев, бульвар Максима Загребельного 9/1',
            company_phone: '380447893684',
        },
    ];

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field
                    name="contact_phone"
                    component={renderTextField}
                    type="text"
                    label="Contact phone"
                />
            </div>
            <div>
                <Field
                    name="delivery_address"
                    component={renderTextField}
                    type="text"
                    label="Delivery address"
                />
            </div>
            <div>
                <Field
                    name="delivery_type"
                    selectName="delivery_type"
                    component={renderSelectField}
                    options={delivery}
                    type="text"
                    label="Delivery type"
                />
            </div>
            <button type="submit">Оформить заказ</button>
            <button type="button" onClick={reset}>
                Очистить
            </button>
        </form>
    );
};

export default reduxForm({
    form: 'checkout',
})(CheckoutForm);
