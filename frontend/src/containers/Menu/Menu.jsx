import React, { useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import PropTypes from 'prop-types'

import SubHeader from '../../components/SubHeader/SubHeader'
import ListItemLink from '../../components/ListItemLink/ListItemLink'
import category from '../../types/category'
import useStyles from './styles'

const Menu = ({ categories }) => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const handleCategoriesClick = () => setOpen(!open)

  const renderRecursiveCategories = (category, path = '') => {
    if (category.children.length > 0) {
      return (
        <List className={classes.list}>
          {category.children.map(subcategory => (
            <ListItemLink
              key={subcategory.id}
              primary={subcategory.name}
              className={classes.listItem}
              to={`/category/${path === '' ? '' : `${path}/`}${category.slug}/${subcategory.slug}`}
            >
              {renderRecursiveCategories(subcategory, `${path === '' ? `` : `${path}/`}${category.slug}`)}
            </ListItemLink>
          ))}
        </List>
      )
    }
  }

  return (
    <nav>
      <List>
        <SubHeader />
        {categories.map(category => (
          <div key={category.id}>
            <ListItem button onClick={handleCategoriesClick}>
              <ListItemText primary={category.name} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse component="li" in={open} timeout="auto" unmountOnExit>
              {renderRecursiveCategories(category)}
            </Collapse>
          </div>
        ))}
      </List>
    </nav>
  )
}

Menu.propTypes = {
  categories: PropTypes.arrayOf(category).isRequired
}

export default Menu
