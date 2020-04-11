import React from 'react'
import { reduxForm, Field } from 'redux-form'

import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import TextField from '../../TextField/TextField'
import { email, required } from '../../../validation'
import useStyles from './styles'

const CheckoutForm = ({ handleSubmit, reset, pristine, submitting }) => {
  const classes = useStyles()

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Field
        label="Имя:"
        name="firstName"
        type="text"
        component={TextField}
        validate={[required]}
        margin="normal"
        fullWidth
      />
      <Field
        label="Фамилия:"
        name="lastName"
        type="text"
        component={TextField}
        validate={[required]}
        margin="normal"
        fullWidth
      />
      <Field
        label="Адрес:"
        name="address"
        type="text"
        component={TextField}
        validate={[required]}
        margin="normal"
        fullWidth
      />
      <Field
        label="Email:"
        name="email"
        type="text"
        component={TextField}
        validate={[required, email]}
        margin="normal"
        fullWidth
      />
      <Field
        label="Телефон:"
        name="mobilePhone"
        type="text"
        component={TextField}
        validate={[required]}
        margin="normal"
        fullWidth
      />

      <ButtonGroup className={classes.buttonGroup}>
        <Button variant="contained" color="secondary" onClick={reset} disabled={pristine || submitting}>
          Очистить
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={submitting}>
          Отправить
        </Button>
      </ButtonGroup>
    </form>
  )
}

export default reduxForm({ form: 'checkout' })(CheckoutForm)
