import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import Register from './Register/Register'
import Login from './Login/Login'
import Logout from './Logout/Logout'

const Auth = () => {
  const { url } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${url}/register`}>
        <Register />
      </Route>
      <Route path={`${url}/logout`}>
        <Logout />
      </Route>
      <Route>
        <Login />
      </Route>
    </Switch>
  )
}

export default Auth
