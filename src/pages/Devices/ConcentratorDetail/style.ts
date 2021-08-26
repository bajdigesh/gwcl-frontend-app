import { fade, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  innerContainer: {
    padding: theme.spacing(0, 0, 0, 4),
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3, 3, 3, 4.5),
    },
  },

  // header
  header: {
    '& .gwcl-MuiTypography-root': {
      marginBottom: 0,
    },
    '& h3': {
      lineHeight: 1.5,
    },
  },
  backIcon: {
    cursor: 'pointer',
    position: 'absolute',
    top: 9,
    left: -30,
    [theme.breakpoints.up('md')]: {
      top: 15,
      left: -32,
    },
  },
  moreMenuButton: {
    marginLeft: theme.spacing(1),
  },
  headerBtnGroup: {
    '& > .gwcl-MuiButtonBase-root:last-child': {
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(1.5),
      },
    },

    '& > .gwcl-MuiButtonBase-root': {
      '& .gwcl-MuiButton-iconSizeSmall > *:first-child path': {
        fill: theme.palette.primary.main,
      },
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
    margin: theme.spacing(2, 0),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(3, 0, 4, 0),
    },
    '& h4': {
      lineHeight: 1.5,
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.pxToRem(20),
      },
    },
  },
  detailsInfo: {
    marginBottom: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(3),
    },
    '& > label': {
      marginRight: theme.spacing(1),
      color: theme.palette.grey[700],
    },
    '& > strong': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  detailsInfoText: {
    '& svg': {
      width: 16,
      height: 'auto',
      marginRight: theme.spacing(1),
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
    lineHeight: 1.5,
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(20),
    },
  },
}));
