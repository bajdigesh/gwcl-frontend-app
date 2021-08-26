import { fade, makeStyles } from '@material-ui/core/styles';

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
  summaryHeaders: {
    color: theme.palette.grey['700'],
    marginBottom: theme.spacing(1),
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightMedium,
  },
  summaryFigures: {
    color: theme.palette.primary.main,
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightMedium,

    '& span': {
      color: theme.palette.grey['900'],
      fontSize: theme.typography.pxToRem(13),
      '&:before': {
        content: `'/'`,
        fontSize: theme.typography.pxToRem(14),
        display: 'inline-block',
        margin: `0 ${theme.spacing(0.5)}px`,
      },
    },
  },
  amount: {
    '&:before': {
      content: `'$'`,
    },
  },
  summaryTotal: {
    '& > h4': {
      paddingBottom: theme.spacing(2),
      marginBottom: theme.spacing(2),
      borderBottom: `1px dashed ${theme.palette.grey['600']}`,
    },
    '& > p': {
      '&:not': {
        '&(:last-of-type)': {
          marginBottom: theme.spacing(1),
        },
      },
      '& label': {
        color: theme.palette.grey['700'],
        marginRight: theme.spacing(0.75),
        '&:after': {
          content: `':'`,
        },
      },
      '& span': {
        color: theme.palette.grey['900'],
      },
    },
  },
  billingExceptions: {
    background: 'rgba(187, 139, 15, 0.1)',
    '& > svg': {
      width: 28,
      height: 'auto',
      color: 'rgba(187, 139, 15, 1)',
      flex: '0 0 28px',
      '& path': {
        fill: 'currentColor',
      },
    },
    '& h5': {
      color: 'rgba(187, 139, 15, 1)',
      fontSize: theme.typography.pxToRem(16),
      fontWeight: theme.typography.fontWeightBold,
      flex: 1,
      padding: `0 ${theme.spacing(5)}px`,
    },
    '& a': {
      fontWeight: theme.typography.fontWeightBold,
      textDecoration: 'none',
      color: theme.palette.primary.main,
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        marginLeft: theme.spacing(1.25),
        flex: '0 0 12px',
        '& path': {
          fill: 'currentColor',
        },
      },
    },
  },
  highestRevenueSummary: {
    '& > h4': {
      fontSize: theme.typography.pxToRem(13),
      fontWeight: theme.typography.fontWeightBold,
      textTransform: 'uppercase',
    },
    '& > div': {
      marginTop: theme.spacing(2),
      '&:not': {
        '&(:first-of-type)': {
          paddingTop: theme.spacing(2),
          borderTop: `1px solid ${theme.palette.grey['500']}`,
        },
      },
      '& > h4': {
        fontSize: theme.typography.pxToRem(14),
        fontWeight: 600,
      },
      '& p': {
        fontWeight: theme.typography.fontWeightMedium,
        margin: `${theme.spacing(0.5)}px 0 ${theme.spacing(1)}px`,
      },
      '& a': {
        color: theme.palette.primary.main,
        textDecoration: 'none',
      },
    },
  },
  lineChart: {
    overflowX: 'auto',
    '& .chart-container': {
      position: 'relative',
      minWidth: '750px',
      height: 'auto',
    },
  },
}));

export default useStyles;
