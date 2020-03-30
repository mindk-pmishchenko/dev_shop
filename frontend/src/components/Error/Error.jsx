import React from 'react'
import Grid from '@material-ui/core/Grid'

const Error = ({ type = '404' }) => (
  <Grid container justify="center">
    {type}
  </Grid>
)

export default Error
