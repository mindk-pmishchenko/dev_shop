import { createContext } from 'react'

const initialContext = {
  message: '',
  type: 'success',
  open: false
}

const SnackbarContext = createContext(initialContext)

export default SnackbarContext
