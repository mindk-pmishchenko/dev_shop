import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: 304,
    height: '100%'
  },
  media: {},
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px'
  },
  cardActions: {
    padding: 0
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1
  }
}))

export default useStyles
