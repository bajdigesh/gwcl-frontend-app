import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  drawerWrapper: {
    width: 300,
    position: 'relative',
    height: '100vh',
    padding: theme.spacing(2),
    overflow: 'auto',

    [theme.breakpoints.up('sm')]: {
      width: 480,
      padding: theme.spacing(3),
    },
  },

  closeIcon: {
    position: 'absolute',
    cursor: 'pointer',
    right: theme.spacing(1),
    top: theme.spacing(1),
    zIndex: 1,

    [theme.breakpoints.up('sm')]: {
      right: theme.spacing(1.5),
      top: theme.spacing(1.5),
    },
  },
}));

export default useStyles;
