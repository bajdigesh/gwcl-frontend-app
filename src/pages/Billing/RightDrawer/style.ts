import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  footerFixedBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    '& .gwcl-MuiButtonBase-root': {
      padding: theme.spacing(2.5),
    },
  },
  drawerContent: {
    marginTop: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    height: `calc(100% - 100px)`,
    overflowY: 'auto',
  },
}));

export default useStyles;
