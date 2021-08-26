import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  topBarInfo: {
    position: 'relative',
    '& h3': {
      margin: theme.spacing(0, 1, 0, 0),
      lineHeight: 1.5,
    },
    '& > p': {
      margin: theme.spacing(0.5, 1),
    },
  },
  backIcon: {
    position: 'static',
    cursor: 'pointer',
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      left: '-32px',
      top: '50%',
      transform: 'translateY(-50%)',
      marginRight: 0,
    },
    '& path': {
      transition: 'all 0.25s ease',
    },
    '&:hover': {
      '& path': {
        fill: theme.palette.grey['900'],
      },
    },
  },
  menuPopover: {
    cursor: 'pointer',
    '& svg': {
      color: theme.palette.grey['600'],
      transition: 'all 0.25s ease',
      '& path': {
        fill: 'currentColor',
      },
    },
    '&:hover': {
      '& svg': {
        color: theme.palette.primary.main,
      },
    },
  },

  dropDownMenus: {
    '& .gwcl-MuiPopover-paper': {
      borderRadius: 8,
      background: theme.palette.grey['900'],
      marginTop: theme.spacing(5),
    },
    '& .gwcl-MuiListItem-root': {
      color: theme.palette.primary.contrastText,
      paddingRight: theme.spacing(4.5),
      opacity: 0.9,
      transition: 'all 0.25s ease',
      '& svg': {
        marginRight: 8,
        '& path': {
          fill: theme.palette.primary.contrastText,
        },
      },
      '&:hover': {
        opacity: 1,
      },
      '&:last-of-type': {
        color: theme.palette.error.main,
        opacity: 1,
        '& svg': {
          '& path': {
            fill: theme.palette.error.main,
          },
        },
      },
    },
  },
  accountNumber: {
    fontWeight: 600,
    color: theme.palette.grey['700'],
    '&:before': {
      content: `''`,
      width: 8,
      height: 8,
      background: 'currentColor',
      display: 'inline-block',
      borderRadius: '50%',
      marginRight: theme.spacing(1),
      verticalAlign: 'middle',
    },
  },
  meterInfo: {
    fontWeight: 600,
    '& label': {
      color: theme.palette.grey['700'],
      marginRight: theme.spacing(1),
      '&:after': {
        content: `':'`,
      },
    },
    '& span': {
      '& i': {
        fontStyle: 'normal',
        color: theme.palette.primary.main,
      },
    },
  },
  infoSummary: {
    marginRight: theme.spacing(1.5),

    '&:not(:first-of-type)': {
      '&:before': {
        width: 6,
        height: 6,
        content: `''`,
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: theme.spacing(1.5),
        background: theme.palette.grey['700'],
      },
    },
  },
  meterButtons: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, max-content))',
  },
}));
export default useStyles;
