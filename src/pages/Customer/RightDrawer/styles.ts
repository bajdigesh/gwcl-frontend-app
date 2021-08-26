import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    height: '100vh',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3, 0),
    },
  },
  drawerTitle: {},
  drawerContent: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(0, 0.5, 0, 0),
    height: `calc(100% - 100px)`,
    overflowY: 'auto',
  },
  drawerFooter: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,

    '& .gwcl-MuiButtonBase-root': {
      padding: theme.spacing(2.5),
    },
  },

  customInput: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.palette.grey[400],
    border: `1px solid ${theme.palette.grey[500]}`,
    padding: theme.spacing(0.5, 2),
    marginBottom: theme.spacing(2),
  },
}));

export default useStyles;
