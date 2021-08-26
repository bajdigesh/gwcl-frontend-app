import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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

  paymentTrend: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 500,

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

  viewTrend: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2, 0, 0),

    '& > svg': {
      marginRight: theme.spacing(1),
    },

    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 0, 0, 2.5),
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

  paymentsReceived: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(0, 0, 2, 0),

    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 2, 0, 3),
      padding: theme.spacing(0, 2, 0, 0),
    },

    '& p': {
      marginBottom: theme.spacing(1),
    },

    '& h4': {
      marginBottom: theme.spacing(2),
      fontWeight: 500,
    },
  },

  paymentBreakdown: {
    borderTop: `1px dashed ${theme.palette.grey['600']}`,

    [theme.breakpoints.up('md')]: {
      borderLeft: `1px dashed ${theme.palette.grey['600']}`,
      borderTop: 0,
    },

    '& > div': {
      margin: theme.spacing(2, 0, 0),

      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, 0, 0, 2.5),
      },
    },
  },

  paymentsIndex: {
    position: 'relative',
    paddingLeft: theme.spacing(2.5),
    marginBottom: theme.spacing(1.5),

    '&:before': {
      width: 12,
      height: 12,
      borderRadius: 3,
      content: `''`,
      position: 'absolute',
      top: 4,
      left: 0,
    },

    '& label': {
      color: theme.palette.grey['700'],

      '&:after': {
        content: `':'`,
        margin: theme.spacing(0, 0.5),
      },
    },
  },

  chart: {
    maxWidth: 275,
    width: '100%',
    margin: '0 auto',

    '& > canvas': {
      width: '100% !important',
      height: 'auto !important',
    },

    [theme.breakpoints.up('md')]: {
      margin: 0,
    },
  },

  type1: {
    '&:before': {
      background: '#FFCC9D',
    },
  },

  type2: {
    '&:before': {
      background: '#887caa',
    },
  },

  type3: {
    '&:before': {
      background: '#8cc5c9',
    },
  },
}));
export default useStyles;
