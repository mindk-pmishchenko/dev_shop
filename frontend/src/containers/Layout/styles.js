import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  app: {
    height: '100vh',
    width: '100%'
  },
  menu: {
    height: '100%',
    width: '300px'
  },
  mainSection: {
    height: '100%',
    width: 'calc(100% - 360px)'
  }
}))

export default useStyles
