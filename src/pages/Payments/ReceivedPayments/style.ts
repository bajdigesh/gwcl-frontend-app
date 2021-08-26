import { makeStyles } from '@material-ui/core';

const receivedPaymentStyles = makeStyles(theme => ({
  userName: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
    textDecoration: 'none',

    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },

  userType: {
    color: theme.palette.grey['700'],
    fontSize: 12,
    marginTop: theme.spacing(1),
  },

  amount: {
    '&:before': {
      content: `'$'`,
    },
  },

  paymentTrendContainer: {
    padding: theme.spacing(0, 0, 2, 0),
    margin: theme.spacing(0, 0, 2, 0),
    borderBottom: `1px solid ${theme.palette.grey['500']}`,

    '& h4': {
      fontWeight: 500,
    },

    '@media(max-width: 1400px)': {
      '& .gwcl-MuiBox-root': {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0, 5, 0, 0),
      margin: theme.spacing(0, 5, 0, 0),
      borderRight: `1px solid ${theme.palette.grey['500']}`,
      border: 0,
    },
  },

  paymentTrend: {
    marginLeft: theme.spacing(0),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 500,

    [theme.breakpoints.up('xl')]: {
      marginLeft: theme.spacing(5),
    },
    '& > svg': {
      marginRight: theme.spacing(0.5),

      '& path': {
        fill: 'currentColor',
      },
    },
  },

  positiveTrend: {
    color: theme.palette.success.main,

    '& > svg': {
      color: theme.palette.success.main,
      transform: 'rotate(180deg)',
    },
  },

  negativeTrend: {
    color: theme.palette.error.main,

    '& > svg': {
      color: theme.palette.error.main,
    },
  },

  paymentClassification: {
    flex: 1,
    gridGap: theme.spacing(2),
    gridTemplateColumns: '1fr',
    alignItems: 'center',

    '& h4': {
      fontWeight: 500,
    },

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gridGap: theme.spacing(4.5),
    },
  },

  viewTrend: {
    display: 'flex',
    alignItems: 'center',

    '& > svg': {
      marginRight: theme.spacing(1),
    },
  },

  exportTable: {
    margin: theme.spacing(1, 0, 2),

    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      right: 0,
      top: -60,
      margin: 0,
    },

    '& > a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',

      '& > svg': {
        marginRight: theme.spacing(1),
      },
    },
  },
}));
export default receivedPaymentStyles;
