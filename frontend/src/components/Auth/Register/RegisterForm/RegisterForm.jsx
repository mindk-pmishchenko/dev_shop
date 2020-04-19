import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useForm } from 'react-hook-form'

import RegisterSchema from '../../../../validationSchemas/RegisterSchema'
import { setServerValidationErrors } from '../../../../utils/helper'
import useStyles from './styles'

const RegisterForm = ({ onSubmit }) => {
  const { handleSubmit, register, formState, errors, reset, setError } = useForm({
    validationSchema: RegisterSchema,
    mode: 'onChange',
    reValidateMode: 'onChange'
  })
  const { isSubmitting } = formState

  const customSubmitHandler = async (...args) => {
    try {
      await onSubmit(...args)
      reset()
    } catch (error) {
      setServerValidationErrors(error, setError)
    }
  }

  const classes = useStyles()

  return (
    <form className={classes.form} onSubmit={handleSubmit(customSubmitHandler)}>
      <TextField
        label="Логин:"
        name="username"
        type="text"
        error={!!errors.username}
        helperText={errors.username && errors.username.message}
        inputRef={register}
        InputLabelProps={{ shrink: true }}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Пароль:"
        name="password"
        type="password"
        error={!!errors.password}
        helperText={errors.password && errors.password.message}
        inputRef={register}
        InputLabelProps={{ shrink: true }}
        margin="normal"
        fullWidth
      />
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

      <Grid container justify="flex-end" alignItems="center">
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} disabled={isSubmitting}>
          Отправить
          {isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
        </Button>
      </Grid>
    </form>
  )
}

export default RegisterForm
