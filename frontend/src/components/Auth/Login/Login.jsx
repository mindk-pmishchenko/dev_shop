import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import LoginForm from './LoginForm/LoginForm'
import fetchData from '../../../utils/helper/fetchData'
import SnackbarContext from '../../../context/snackbarContext'
import AppContext from '../../../context/appContext'

const Login = () => {
  const history = useHistory()

  const { showSnackbar } = useContext(SnackbarContext)

  const { authData } = useContext(AppContext)
  const { handleUserLogin } = authData

  const handleSubmit = async (data) => {
    try {
      const response = await fetchData({ url: `/auth/login`, method: 'POST', data })
      if (response.success) {
        showSnackbar({ message: 'Вход выполнен успешно', type: 'success' })
        localStorage.setItem('bearer_token', response.data.token)
        handleUserLogin(response.data)
        history.push('/')
      }
    } catch (error) {
      showSnackbar({ message: 'Не удалось выполнить вход', type: 'error' })
    }
  }

  return <LoginForm onSubmit={handleSubmit} />
}

export default Login
