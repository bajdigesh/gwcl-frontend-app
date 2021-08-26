import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  innerContainer: {
    padding: theme.spacing(0, 0, 0, 4),
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3, 3, 3, 4.5),
    },
  },

  // header
  header: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',

    '& .gwcl-MuiTypography-root': {
      marginBottom: 0,
    },
  },
  backIcon: {
    cursor: 'pointer',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-30%)',
    right: 'calc(100% + 15px)',

    '& > svg': {
      width: '24px',
      height: '18px',
    },
  },
  headerBtnGroup: {
    display: 'flex',
    '& > .gwcl-MuiButtonBase-root:last-child': {
      marginLeft: theme.spacing(1.5),
    },

    '& > .gwcl-MuiButtonBase-root': {
      '& .gwcl-MuiButton-iconSizeSmall > *:first-child path': {
        fill: theme.palette.primary.main,
      },
    },
  },

  moreMenuIcon: {
    cursor: 'pointer',
    color: theme.palette.grey['600'],
    transition: 'color 0.25s ease',
    marginLeft: theme.spacing(2),

    '& svg': {
      color: 'currentColor',

      '& path': {
        fill: 'currentColor',
      },
    },

    '&:hover': {
      color: theme.palette.grey['700'],
    },
  },

  menuList: {
    '& .gwcl-MuiListItem-root': {
      alignItems: 'center',
      color: fade(theme.palette.common.white, 0.9),
      transition: 'all 0.25s ease',

      '& svg': {
        color: 'currentColor',
        marginRight: theme.spacing(1),

        '& path': {
          fill: 'currentColor',
        },
      },

      '&:hover': {
        color: fade(theme.palette.common.white, 1),
      },

      '&.deleteMenuItem': {
        color: theme.palette.error.main,

        '& svg': {
          color: 'currentColor',
        },
      },
    },
  },

  // details
  details: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(4),
  },
  detailsWrapper: {
    marginTop: theme.spacing(3),
  },
  detailsInfo: {
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(2),
    },
    '& > label': {
      marginRight: theme.spacing(1),
      color: theme.palette.grey[700],
    },
    '& > strong': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  detailsInfoSuccess: {
    color: theme.palette.success.main,
    '& span': {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      marginRight: theme.spacing(1),
      background: theme.palette.success.main,
    },
  },
  detailsBtn: {
    borderRadius: 10,
    color: theme.palette.primary.main,
    marginTop: theme.spacing(2),

    '& .gwcl-MuiButton-iconSizeLarge > *:first-child ': {
      width: '0.6rem',
      height: '0.7rem',
    },
  },

  // timeline
  historyTimeline: {
    marginTop: 24,
  },
  historyTimelineTitle: {
    marginBottom: theme.spacing(3),
  },
  filterWrap: {
    display: 'flex',

    '& > *': {
      marginRight: theme.spacing(1.5),
    },
  },
}));

export default useStyles;
