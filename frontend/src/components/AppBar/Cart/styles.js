import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  cart: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 10
  },
  cartIcon: {
    padding: 0
  },
  cartTotal: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 5
  },
  cartTotalCost: {
    marginRight: 5
  }
}))

export default useStyles
