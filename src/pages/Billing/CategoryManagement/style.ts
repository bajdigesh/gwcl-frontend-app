import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  categories: {
    paddingTop: theme.spacing(7.5),
    [theme.breakpoints.up('md')]: {
      paddingTop: 0,
    },
  },
  btnNewCategory: {
    position: 'absolute',
    right: '0',
    top: '0',
  },
}));

export default useStyles;
