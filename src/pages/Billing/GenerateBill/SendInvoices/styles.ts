import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  header: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 600,
    color: theme.palette.grey['900'],
    marginBottom: theme.spacing(2.5),
    '&.Mui-focused': {
      color: theme.palette.grey['900'],
    },
  },
  sendInvoiceFormControl: {
    '& .gwcl-MuiFormControlLabel-label': {
      fontWeight: 500,
    },
  },
  title: {
    marginBottom: 0,
  },
  buttonsContainer: {
    borderRadius: theme.spacing(9),
    background: theme.palette.grey['400'],
    '& button': {
      borderRadius: theme.spacing(9),
      background: 'transparent',
      '& .gwcl-MuiButton-label': {
        fontWeight: 500,
      },
    },
  },
  filterWrapper: {
    '& > div:not(.react-datepicker__tab-loop)': {
      marginRight: theme.spacing(1),
      width: '100%',
      maxWidth: 175,
    },
  },
  tableContainer: {
    borderLeft: `1px solid ${theme.palette.grey['500']}`,
  },
  customerBillingTable: {
    '& tr': {
      '&:hover': {
        '& td': {
          '& svg': {
            opacity: 1,
          },
        },
      },
    },
    '& td': {
      '& svg': {
        marginLeft: theme.spacing(1.5),
      },
    },
  },
  hoverableIcon: {
    opacity: 0,
  },
  statusInfo: {
    '& svg': {
      marginRight: theme.spacing(1),
    },
  },
  amount: {
    '&:before': {
      content: `'$'`,
      marginRight: theme.spacing(0.5),
    },
  },
}));
export default useStyles;
