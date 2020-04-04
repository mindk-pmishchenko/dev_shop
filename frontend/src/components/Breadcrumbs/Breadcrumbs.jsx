import React from 'react'
import MBreadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'

import useStyles from './styles'

const Breadcrumbs = ({ breadcrumbs }) => {
  const classes = useStyles()

  return (
    <MBreadcrumbs component="div" className={classes.breadcrumbs}>
      {breadcrumbs.map((breadcrumb, index) => (
        <Typography key={index}>{breadcrumb}</Typography>
      ))}
    </MBreadcrumbs>
  )
}

export default Breadcrumbs
