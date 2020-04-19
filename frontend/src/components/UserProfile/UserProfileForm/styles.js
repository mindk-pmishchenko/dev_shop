import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  buttonGroup: {
    alignSelf: 'flex-end',
    marginTop: 20
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}))

export default useStyles
