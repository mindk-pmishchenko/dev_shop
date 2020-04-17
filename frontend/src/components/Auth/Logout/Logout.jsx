import React from 'react'
import { useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import SnackbarContext from '../../../context/snackbarContext'
import AppContext from '../../../context/appContext'
import fetchData from '../../../utils/helper/fetchData'

const Logout = () => {
  const { showSnackbar } = useContext(SnackbarContext)

  const { authData } = useContext(AppContext)
  const { handleUserLogout } = authData

  useEffect(() => {
    const removeToken = async () => {
      await fetchData({ url: '/auth/logout', method: 'POST' })
      localStorage.removeItem('bearer_token')
      handleUserLogout()
      showSnackbar({ message: 'Выход выполнен успешно', type: 'success' })
    }
    removeToken()
  }, [handleUserLogout, showSnackbar])

  return <Redirect to="/" />
}

export default Logout
