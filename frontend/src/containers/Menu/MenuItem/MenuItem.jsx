import React from 'react'
import List from '@material-ui/core/List'
import PropTypes from 'prop-types'

import ListItemLink from '../../../components/ListItemLink/ListItemLink'
import category from '../../../types/category'
import useStyles from './styles'

const MenuItem = ({ category, path }) => {
  const classes = useStyles()

  const categoryPath = `${path === '' ? '' : `${path}/`}${category.slug}`

  return (
    <List className={classes.list}>
      {category.children.map(subcategory => {
        const categoryUrl = `/category/${path === '' ? '' : `${path}/`}${category.slug}/${subcategory.slug}`

        return (
          <ListItemLink key={subcategory.id} primary={subcategory.name} className={classes.listItem} to={categoryUrl}>
            <MenuItem category={subcategory} path={categoryPath} />
          </ListItemLink>
        )
      })}
    </List>
  )
}

MenuItem.defaultProps = {
  path: ''
}

MenuItem.propTypes = {
  category: category.isRequired,
  path: PropTypes.string
}

export default MenuItem
