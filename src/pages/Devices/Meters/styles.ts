import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  meterNumber: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    textDecoration: 'none',
  },
  accountNumber: {
    color: theme.palette.grey['700'],
    fontSize: 12,
    fontWeight: 500,
    marginTop: 4,
    display: 'block',
  },
  accountName: {
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
  meterStatus: {
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    '& > svg': {
      marginRight: 8,
    },
  },
  statusActive: {
    color: theme.palette.success.main,
  },
  statusInActive: {
    color: theme.palette.error.main,
  },
  concentratorNumber: {
    color: theme.palette.primary.main,
    marginTop: 4,
    fontWeight: 500,
  },
  cost: {
    fontWeight: 700,
  },
  readingDate: {
    color: theme.palette.grey['700'],
    fontSize: 12,
    marginTop: 4,
    display: 'block',
  },
  filterWrap: {
    display: 'flex',

    '& > *': {
      marginRight: theme.spacing(1.5),
    },
  },
}));

export default useStyles;
