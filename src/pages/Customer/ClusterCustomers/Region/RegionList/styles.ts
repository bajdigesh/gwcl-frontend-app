import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  tableFilterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(0.5),
    paddingRight: theme.spacing(2),
  },
  tableContainer: {
    '& > div': {
      paddingTop: theme.spacing(2),
    },
  },
}));
export default useStyles;
