import React from 'react'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom'

const NoUser = () => {
  return (
    <Button color="inherit" component={RouterLink} to="/auth/login">
      Войти
    </Button>
  )
}

export default NoUser
