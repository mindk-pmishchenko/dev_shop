import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import LoginSchema from '../../../../validationSchemas/LoginSchema'
import useStyles from './styles'

const LoginForm = ({ onSubmit }) => {
  const { handleSubmit, register, formState, errors, reset } = useForm({
    validationSchema: LoginSchema,
    mode: 'onChange',
    reValidateMode: 'onChange'
  })
  const { isSubmitting } = formState

  const customSubmitHandler = (...args) => {
    onSubmit(...args)
    reset()
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

      <Grid container justify="space-between" alignItems="center">
        <Link href="#" component={RouterLink} to="/auth/register" color="inherit" variant="subtitle1">
          Нет аккаунта? Зарегистрироваться.
        </Link>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} disabled={isSubmitting}>
          Отправить
          {isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
        </Button>
      </Grid>
    </form>
  )
}

export default LoginForm
