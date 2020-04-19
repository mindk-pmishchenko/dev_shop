import React, { useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

import UserSchema from '../../../validationSchemas/UserSchema'
import user from '../../../types/user'
import useStyles from './styles'

const CheckoutForm = ({ defaultValues, onSubmit }) => {
  const { handleSubmit, register, formState, reset, errors } = useForm({
    validationSchema: UserSchema,
    mode: 'onChange',
    reValidateMode: 'onChange'
  })
  const { isSubmitting, dirty } = formState

  useEffect(() => reset(defaultValues), [defaultValues, reset])

  const handleResetForm = () => reset(defaultValues)

  const classes = useStyles()

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Имя:"
        name="firstName"
        type="text"
        error={!!errors.firstName}
        helperText={errors.firstName && errors.firstName.message}
        inputRef={register}
        InputLabelProps={{ shrink: true }}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Фамилия:"
        name="lastName"
        type="text"
        error={!!errors.lastName}
        helperText={errors.lastName && errors.lastName.message}
        inputRef={register}
        InputLabelProps={{ shrink: true }}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Адрес:"
        name="address"
        type="text"
        error={!!errors.address}
        helperText={errors.address && errors.address.message}
        inputRef={register}
        InputLabelProps={{ shrink: true }}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Email:"
        name="email"
        type="text"
        error={!!errors.email}
        helperText={errors.email && errors.email.message}
        inputRef={register}
        InputLabelProps={{ shrink: true }}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Телефон:"
        name="mobilePhone"
        type="text"
        error={!!errors.mobilePhone}
        helperText={errors.mobilePhone && errors.mobilePhone.message}
        inputRef={register}
        InputLabelProps={{ shrink: true }}
        margin="normal"
        fullWidth
      />

      <ButtonGroup className={classes.buttonGroup}>
        <Button variant="contained" color="secondary" onClick={handleResetForm} disabled={!dirty || isSubmitting}>
          Очистить
        </Button>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} disabled={isSubmitting}>
          Отправить
          {isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
        </Button>
      </ButtonGroup>
    </form>
  )
}

CheckoutForm.propTypes = {
  defaultValues: user,
  onSubmit: PropTypes.func.isRequired
}

export default CheckoutForm
