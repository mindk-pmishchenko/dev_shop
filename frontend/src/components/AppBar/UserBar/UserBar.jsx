import React, { useContext } from 'react'

import AppContext from '../../../context/appContext'
import UserPanel from './UserPanel/UserPanel'
import NoUser from './NoUser/NoUser'

const UserBar = () => {
  const { authData } = useContext(AppContext)
  const { isAuth } = authData

  return isAuth ? <UserPanel /> : <NoUser />
}

export default UserBar
