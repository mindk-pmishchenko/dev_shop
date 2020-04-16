import React, { useContext } from 'react'
import MSnackbar from '@material-ui/core/Snackbar'
import MAlert from '@material-ui/lab/Alert'

import SnackbarContext from '../../context/snackbarContext'

const Snackbar = () => {
  const { snackbarState, hideSnackbar } = useContext(SnackbarContext)
  const { message, type, open } = snackbarState

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    hideSnackbar()
  }

  return (
    <MSnackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MAlert onClose={handleClose} severity={type}>
        {message}
      </MAlert>
    </MSnackbar>
  )
}

export default Snackbar
