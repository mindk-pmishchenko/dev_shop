import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  buttonGroup: {
    alignSelf: 'flex-end',
    marginTop: 20
  }
}))

export default useStyles
