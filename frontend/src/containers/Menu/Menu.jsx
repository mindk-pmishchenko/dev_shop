import React from 'react'
import List from '@material-ui/core/List'
import PropTypes from 'prop-types'

import SubHeader from './SubHeader/SubHeader'
import MenuCollapse from './MenuCollapse/MenuCollapse'
import category from '../../types/category'

const Menu = ({ categories }) => (
  <nav>
    <List>
      <SubHeader />
      <MenuCollapse categories={categories} />
    </List>
  </nav>
)

Menu.propTypes = {
  categories: PropTypes.arrayOf(category).isRequired
}

export default Menu
