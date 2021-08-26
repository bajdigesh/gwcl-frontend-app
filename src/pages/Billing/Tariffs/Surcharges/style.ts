import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  btnAction: {
    width: '100%',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      right: 0,
      top: -84,
      width: 'auto',
      marginBottom: 0,
    },
  },
}));
export default useStyles;
