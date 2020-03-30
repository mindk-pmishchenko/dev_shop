import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import PropTypes from 'prop-types'

import MenuItem from '../MenuItem/MenuItem'
import category from '../../../types/category'

const MenuCollapse = ({ categories }) => {
  const [open, setOpen] = useState(false)
  const handleCategoriesClick = () => setOpen(!open)

  return categories.map(category => (
    <div key={category.id}>
      <ListItem button onClick={handleCategoriesClick}>
        <ListItemText primary={category.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse component="li" in={open} timeout="auto" unmountOnExit>
        <MenuItem category={category} />
      </Collapse>
    </div>
  ))
}

MenuCollapse.propTypes = {
  categories: PropTypes.arrayOf(category).isRequired
}

export default MenuCollapse
