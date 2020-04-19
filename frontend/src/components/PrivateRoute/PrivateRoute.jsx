import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import AppContext from '../../context/appContext'
import Spinner from '../../components/Spinner/Spinner'

const PrivateRoute = ({ children, redirectTo, component: Component, ...props }) => {
  const { authData, isLoading } = useContext(AppContext)
  const { isAuth } = authData

  if (isLoading) {
    return <Spinner />
  }
  if (!isAuth) {
    return <Redirect to={redirectTo} />
  }

  return (
    <Route render={Component} {...props}>
      {children}
    </Route>
  )
}

PrivateRoute.defaultProps = {
  redirectTo: '/'
}

export default PrivateRoute
