import React, { useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom'

import AppContext from '../../../../context/appContext'
import useStyles from './styles'

const UserPanel = () => {
  const { authData } = useContext(AppContext)
  const { userData } = authData

  const classes = useStyles()

  return (
    <div className={classes.userPanel}>
      <Typography>{`Привет ${userData.firstName}, `}</Typography>
      <Button color="inherit" component={RouterLink} to="/auth/logout">
        Выйти
      </Button>
    </div>
  )
}

export default UserPanel
