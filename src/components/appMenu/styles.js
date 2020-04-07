import {
  makeStyles,
  createStyles
} from '@material-ui/core/styles';

const drawerWidth = 300;

const useStyles = makeStyles(theme =>
  createStyles({
    appMenu: {
      width: '100%'
    },
    navList: {
      width: drawerWidth
    },
    menuItem: {
      width: drawerWidth
    },
    menuItemIcon: {
      color: '#97c05c'
    }
  })
);

export default useStyles;
