import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  exportTableBtn: {
    padding: '0.875rem 1rem',
    marginRight: theme.spacing(3),
  },
  amount: {
    '&:before': {
      content: `'$'`,
    },
  },
  receivedPayment: {
    fontWeight: 500,
  },
  goToHistory: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
}));
export default useStyles;
