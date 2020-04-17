import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'

const Logo = () => {
  return (
    <Typography variant="h5">
      <Link href="#" component={RouterLink} to="/" color="inherit" underline="none">
        SuperShop
      </Link>
    </Typography>
  )
}

export default Logo
