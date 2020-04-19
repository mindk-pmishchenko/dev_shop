import React, { forwardRef } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import { Link } from 'react-router-dom'

const MenuItemLink = forwardRef(({ handleClose, children, ...others }, ref) => {
  return (
    <li>
      {
        <MenuItem ref={ref} onClick={handleClose} component={Link} {...others}>
          {children}
        </MenuItem>
      }
    </li>
  )
})

export default MenuItemLink
