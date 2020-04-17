import React from 'react'
import MAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

import Logo from './Logo/Logo'
import Cart from './Cart/Cart'
import UserBar from './UserBar/UserBar'
import useStyles from './styles'

const AppBar = ({ setOpenCart }) => {
  const classes = useStyles()

  return (
    <MAppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Logo />
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <Cart setOpenCart={setOpenCart} />
          <UserBar />
        </Grid>
      </Toolbar>
    </MAppBar>
  )
}

AppBar.propTypes = {
  setOpenCart: PropTypes.func.isRequired
}

export default AppBar
