import { fade, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  billingSummary: {
    '& .gwcl-MuiBox-root': {
      height: 'calc(100% - 12px)',
      alignItems: 'center',
    },
    '& h5': {
      color: theme.palette.grey['700'],
      fontWeight: theme.typography.fontWeightMedium,
      marginBottom: theme.spacing(1),
      fontSize: theme.typography.pxToRem(14),
    },
    '& h4': {
      fontWeight: 600,
      marginTop: theme.spacing(1.5),
      '& span': {
        fontWeight: 500,
        '&:before': {
          content: `'/'`,
          display: 'inline-block',
          margin: theme.spacing(0, 0.5),
        },
      },
    },
    '& h3': {
      fontSize: theme.typography.pxToRem(20),
      fontWeight: theme.typography.fontWeightMedium,
      paddingBottom: theme.spacing(2),
      borderBottom: `1px dashed ${theme.palette.grey['600']}`,
      marginBottom: theme.spacing(2),
    },
    '& p': {
      fontWeight: theme.typography.fontWeightMedium,
      '&:not(:last-of-type)': {
        marginBottom: theme.spacing(1),
      },
      '& > label': {
        color: theme.palette.grey['700'],
        '&:after': {
          content: `':'`,
          marginRight: theme.spacing(0.5),
        },
      },
      '& > span': {},
    },
  },
  arrerarsSummary: {
    '& > h3': {
      margin: 0,
      padding: 0,
      border: 0,
    },
  },
  amount: {
    '&:before': {
      content: `'$'`,
    },
  },
  deliveredInvoiceRecords: {
    flex: 1,
    [theme.breakpoints.up('md')]: {
      '&:not(:last-of-type)': {
        marginRight: theme.spacing(3),
      },
    },
  },
  viewAllButton: {
    '& > a': {
      background: fade(theme.palette.primary.main, 0.05),
      color: theme.palette.primary.main,
      textDecoration: 'none',
      fontWeight: 600,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.spacing(1),
      transition: 'all 0.25s ease',
      padding: theme.spacing(2, 1.5),
      '& > svg': {
        width: 8,
        height: 'auto',
        marginLeft: theme.spacing(2),
        color: theme.palette.primary.main,
        '& > path': {
          fill: 'currentColor',
        },
      },
      '&:hover': {
        background: fade(theme.palette.primary.main, 0.1),
      },
    },
  },
  resultsLists: {
    '& > h3': {
      fontSize: theme.typography.pxToRem(18),
      fontWeight: theme.typography.fontWeightMedium,
      '& > span': {
        fontWeight: 600,
      },
    },
  },
  statusInfo: {
    '& svg': {
      marginRight: theme.spacing(1),
    },
  },
  actionButtons: {},
  arrowIcon: {
    transition: 'all 0.25s ease',
  },
  hideRecords: {
    transform: 'rotate(180deg)',
  },
  filterDrawerToggleButton: {
    lineHeight: 1.42,
    width: '100%',
  },
}));

export default useStyles;
