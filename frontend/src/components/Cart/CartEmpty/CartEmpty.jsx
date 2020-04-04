import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const CartEmpty = () => {
  return (
    <Grid container alignItems="center">
      <Grid item xs={12}>
        <Grid container justify="center">
          <Typography variant="h5">Товары пока не были добавлены...</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CartEmpty
