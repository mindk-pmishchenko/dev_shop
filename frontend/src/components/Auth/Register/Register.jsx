import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import RegisterForm from './RegisterForm/RegisterForm'
import SnackbarContext from '../../../context/snackbarContext'
import AppContext from '../../../context/appContext'
import fetchData from '../../../utils/helper/fetchData'

const Register = () => {
  const history = useHistory()

  const { showSnackbar } = useContext(SnackbarContext)

  const { authData } = useContext(AppContext)
  const { handleUserLogin } = authData

  const handleSubmit = async (data) => {
    try {
      const response = await fetchData({ url: '/auth/register', method: 'POST', data })

      if (response.success) {
        showSnackbar({ message: 'Регистрация успешна', type: 'success' })
        localStorage.setItem('bearer_token', response.data.token)
        handleUserLogin(response.data)
        history.push('/')
      }
    } catch (error) {
      showSnackbar({ message: 'Не удалось зарегистрироваться', type: 'error' })
      throw error
    }
  }

  return <RegisterForm onSubmit={handleSubmit} />
}

export default Register
