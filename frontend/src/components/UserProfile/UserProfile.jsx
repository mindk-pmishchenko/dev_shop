import React, { useContext } from 'react'

import UserProfileForm from './UserProfileForm/UserProfileForm'
import AppContext from '../../context/appContext'
import SnackbarContext from '../../context/snackbarContext'
import fetchData from '../../utils/helper/fetchData'

const UserProfile = () => {
  const { authData } = useContext(AppContext)
  const { userData, handleUserLogin } = authData

  const { showSnackbar } = useContext(SnackbarContext)

  const submitHandler = async (data) => {
    try {
      const response = await fetchData({ url: `/users/${userData.id}`, method: 'PUT', data })
      if (response.success) {
        handleUserLogin(response.data)
        showSnackbar({ message: 'Данные успешно обновлены' })
      }
    } catch (error) {
      showSnackbar({ message: 'Не удалось обновить данные', type: 'error' })
      throw error
    }
  }

  return <UserProfileForm defaultValues={userData} onSubmit={submitHandler} />
}

export default UserProfile
