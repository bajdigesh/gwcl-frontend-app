import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  drawerContent: {},
  drawerFooter: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,

    '& .gwcl-MuiButtonBase-root': {
      padding: theme.spacing(2.5),
    },
  },
}));
export default useStyles;
