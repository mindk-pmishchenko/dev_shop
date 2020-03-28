import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  listItem: {
    flexDirection: 'column',
    alignItems: 'start'
  },
  list: {
    paddingLeft: '15px',
    paddingTop: '2px',
    paddingBottom: '2px'
  }
}))

export default useStyles
