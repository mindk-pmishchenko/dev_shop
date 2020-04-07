import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    background: '#535454',
    color: '#fff'
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

export default useStyles;

/*import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    app: {
        height: '100%',
        width: '100%'
    },
    menu: {
        height: '100%',
        width: '300px'
    },
    mainSection: {
        height: '100%',
        width: 'calc(100% - 300px)'
    }
}));

export default useStyles;*/
