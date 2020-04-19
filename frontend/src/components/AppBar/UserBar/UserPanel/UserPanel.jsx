import React, { useState, createRef } from 'react'
import Menu from '@material-ui/core/Menu'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'

import MenuItemLink from '../../../MenuItemLink/MenuItemLink'

const UserPanel = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const handleMenu = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const open = Boolean(anchorEl)

  const ref = createRef()

  return (
    <div>
      <IconButton onClick={handleMenu} color="inherit">
        <AccountCircle />
      </IconButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
      >
        <MenuItemLink ref={ref} handleClose={handleClose} to="/profile">
          Профиль
        </MenuItemLink>
        <MenuItemLink ref={ref} handleClose={handleClose} to="/orders">
          Заказы
        </MenuItemLink>
        <MenuItemLink ref={ref} handleClose={handleClose} to="/auth/logout">
          Выйти
        </MenuItemLink>
      </Menu>
    </div>
  )
}

export default UserPanel
