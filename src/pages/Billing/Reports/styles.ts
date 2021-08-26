import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  titleContainer: {
    marginBottom: theme.spacing(2),
    '& .gwcl-MuiTypography-root': {
      marginBottom: 0,
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(3),
    },
  },
  createReportBtn: {
    minWidth: theme.spacing(30),
    '& .gwcl-MuiButton-label': {
      fontWeight: 500,
    },
  },
}));

export default useStyles;
