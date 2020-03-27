import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ListItemLink = ({ primary, children, ...other }) => (
  <li>
    <ListItem button {...other} component={Link}>
      <ListItemText primary={primary} />
    </ListItem>
    {children}
  </li>
)

ListItemLink.propTypes = {
  primary: PropTypes.string
}

ListItemLink.defaultProps = {
  primary: ''
}

export default ListItemLink
