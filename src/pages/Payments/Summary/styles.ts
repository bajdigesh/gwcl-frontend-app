import { fade, makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  searchForm: {
    position: 'relative',

    '& > svg': {
      width: 20,
      height: 'auto',
      position: 'absolute',
      left: theme.spacing(2),
      top: '50%',
      transform: 'translateY(-50%)',

      [theme.breakpoints.up('md')]: {
        left: theme.spacing(3),
      },
    },

    '& input': {
      width: '100%',
      border: '1px solid transparent',
      borderRadius: 8,
      background: fade(theme.palette.grey['500'], 0.4),
      padding: theme.spacing(1.75, 2, 1.75, 6),
      fontSize: theme.typography.pxToRem(14),
      fontFamily: 'Inter',

      '&::placeholder': {
        fontWeight: 400,
      },

      '&:focus': {
        outline: '0 none',
        borderColor: theme.palette.grey['500'],
      },

      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(1.75, 2, 1.75, 7.5),
      },
    },
  },
  paymentSummary: {
    '& p': {
      color: theme.palette.grey['700'],
    },
  },
  amount: {
    fontWeight: 500,
    '&:before': {
      content: `'$'`,
    },
  },
  paymentsReceived: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginTop: 0,
    },
    '& p': {
      marginBottom: theme.spacing(1),
    },
    '& h2': {
      color: theme.palette.success.main,
      marginBottom: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      borderBottom: `1px dashed ${theme.palette.grey['500']}`,
    },
    '& .gwcl-MuiBox-root': {
      '&:not': {
        '&(:first-of-type)': {
          marginTop: theme.spacing(1),
        },
      },
      '& label': {
        color: theme.palette.grey['700'],
        '&:after': {
          content: `':'`,
          margin: theme.spacing(0, 0.5),
        },
      },
      '& span': {
        color: theme.palette.grey['900'],
      },
    },
  },
  paymentsIndex: {
    position: 'relative',
    paddingLeft: theme.spacing(2.5),
    '&:before': {
      width: 12,
      height: 12,
      borderRadius: 3,
      content: `''`,
      position: 'absolute',
      top: 4,
      left: 0,
    },
  },
  cashier: {
    '&:before': {
      background: '#FFCC9D',
    },
  },
  vendor: {
    '&:before': {
      background: '#887caa',
    },
  },
  online: {
    '&:before': {
      background: '#8cc5c9',
    },
  },
  totalArrears: {
    '& p': {
      marginBottom: theme.spacing(1.5),
    },
    '& h2': {
      fontWeight: 500,
      '&:first-of-type': {
        marginBottom: theme.spacing(2),
        color: theme.palette.error.main,
        [theme.breakpoints.up('md')]: {
          marginBottom: theme.spacing(4),
        },
      },
      '&:last-of-type': {
        marginTop: theme.spacing(1.5),
        color: theme.palette.primary.main,
      },
    },
    '& .gwcl-MuiBox-root': {
      color: theme.palette.grey['700'],
      '& > svg': {
        marginLeft: theme.spacing(0.5),
        flex: '0 0 12px',
        height: 'auto',
        color: theme.palette.grey['700'],
        '& > path': {
          fill: 'currentColor',
        },
      },
    },
  },
  totalBilledAmount: {
    '& p': {
      marginBottom: theme.spacing(1.5),
    },
    '& h2': {
      fontWeight: 500,
      '&:first-of-type': {
        color: theme.palette.primary.main,
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
          marginBottom: theme.spacing(4),
        },
      },
      '&:last-of-type': {
        marginTop: theme.spacing(1.5),
        color: theme.palette.primary.main,
      },
    },
    '& .gwcl-MuiBox-root': {
      color: theme.palette.grey['700'],
      '& > svg': {
        marginLeft: theme.spacing(0.5),
        flex: '0 0 12px',
        height: 'auto',
        color: theme.palette.grey['700'],
        '& > path': {
          fill: 'currentColor',
        },
      },
    },
  },
  chart: {
    maxWidth: 225,
    margin: '0 auto',
    '& > canvas': {
      width: '100% !important',
      height: 'auto !important',
    },
    [theme.breakpoints.up('md')]: {
      margin: 0,
    },
  },
  filterChart: {
    '& > div': {
      width: '100%',
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        width: 'auto',
        marginBottom: 0,
      },
    },
    '& .gwcl-MuiFormControl-root': {
      marginBottom: 0,
    },
    '& .gwcl-MuiFormHelperText-root': {
      display: 'none',
    },
  },
  filterData: {
    '& .gwcl-MuiInputBase-root': {
      background: theme.palette.primary.contrastText,
    },
  },
  highestRecords: {
    '& > h4': {
      fontSize: theme.typography.pxToRem(13),
      fontWeight: 600,
      color: theme.palette.grey['700'],
      marginBottom: theme.spacing(2),
      textTransform: 'uppercase',
    },
    '& > div': {
      '&:not': {
        '&(:first-of-type)': {
          borderTop: `1px solid ${theme.palette.grey['500']}`,
          marginTop: theme.spacing(1.5),
          paddingTop: theme.spacing(1.5),
        },
      },
      '& p': {
        color: theme.palette.grey['900'],
        fontWeight: 600,
        '& label': {
          '&:after': {
            content: `':'`,
            margin: theme.spacing(0, 0.5),
          },
        },
      },
      '& a': {
        color: theme.palette.primary.main,
        textDecoration: 'none',
      },
    },
    [theme.breakpoints.down('sm')]: {
      '&:first-of-type': {
        marginTop: 0,
      },
    },
  },
  barChart: {
    overflowX: 'auto',

    '& .chart-container': {
      position: 'relative',
      height: '500px',
      minWidth: '600px',

      [theme.breakpoints.down('sm')]: {
        height: '250px',
      },
    },

    [theme.breakpoints.up('md')]: {
      marginTop: -50,
    },
  },
}));
export default useStyles;
