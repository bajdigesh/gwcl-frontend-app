import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  filterButton: {
    margin: theme.spacing(1, 0),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 1),
    },
  },
}));

export default useStyles;
