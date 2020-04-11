import React, { useContext } from 'react'
import MSnackbar from '@material-ui/core/Snackbar'
import MAlert from '@material-ui/lab/Alert'

import SnackbarContext from '../../context/snackbarContext'
import { HIDE_SNACKBAR } from '../../constants/snackbar'

const Snackbar = () => {
  const [{ message, type, open }, dispatch] = useContext(SnackbarContext)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch({ type: HIDE_SNACKBAR })
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
