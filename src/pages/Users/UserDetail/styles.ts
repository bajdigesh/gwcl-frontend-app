import { fade, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  innerContainer: {
    paddingLeft: theme.spacing(4),
    position: 'relative',
  },

  userInfoTopBar: {
    marginBottom: theme.spacing(5),

    '& h3': {
      margin: 0,
      lineHeight: 1.5,
    },

    [theme.breakpoints.up('sm')]: {
      marginBottom: 0,
    },
  },

  backIcon: {
    position: 'absolute',
    left: -44,
    top: 4,
    cursor: 'pointer',

    '& path': {
      transition: 'all 0.25s ease',
    },

    '&:hover': {
      '& path': {
        fill: theme.palette.grey['900'],
      },
    },

    [theme.breakpoints.up('sm')]: {
      top: 5,
    },
  },

  userStatus: {
    background: theme.palette.grey[400],
    color: theme.palette.text.secondary,
    padding: theme.spacing(0.625, 1.75),
    borderRadius: 8,
    fontWeight: 500,
    position: 'absolute',
    top: theme.spacing(5),

    '& > svg': {
      marginRight: theme.spacing(1),
      lineHeight: 0,
    },

    [theme.breakpoints.up('sm')]: {
      position: 'static',
    },
  },

  statusActive: {
    background: 'rgba(52, 164, 137, 0.1)',
    color: theme.palette.success.main,
  },

  moreMenuIcon: {
    cursor: 'pointer',
    color: theme.palette.grey['600'],
    transition: 'color 0.25s ease',

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

  userAddedDate: {
    marginTop: theme.spacing(1.25),
  },

  userBasicInfo: {
    '&:before': {
      content: `''`,
      position: 'absolute',
      left: '-52px',
      top: 0,
      width: `calc(100% + 40px + ${theme.spacing(4)}px)`,
      height: 1,
      background: theme.palette.grey['500'],
    },

    '& > .gwcl-MuiGrid-root:not(:last-of-type)': {
      marginBottom: theme.spacing(1.5),
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(3),
      },
    },
  },

  userInfo: {
    color: theme.palette.grey['700'],

    '& > label': {
      marginRight: theme.spacing(1),
      '&:after': {
        content: `':'`,
      },
    },
    '& > span': {
      color: theme.palette.grey['900'],
      fontWeight: 600,
    },
  },

  activityLogs: {
    borderTop: `1px solid ${theme.palette.grey['500']}`,
  },

  tabsGroup: {
    '& button': {
      background: '#fff',
      border: `1px solid ${theme.palette.grey['500']}`,
      fontWeight: 500,
      color: theme.palette.grey['600'],
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px 0`,
      '&:hover': {
        background: '#fff',
        color: theme.palette.grey['700'],
      },
    },
  },

  radioButton: {
    '& > label': {
      position: 'relative',
      margin: 0,

      '& > span': {
        '&[class*=MuiRadio-root]': {
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0,
        },

        '&[class*=MuiFormControlLabel-label]': {
          padding: theme.spacing(1.75, 2),
          border: `1px solid ${theme.palette.grey['500']}`,
          color: theme.palette.grey['700'],
          borderRadius: theme.spacing(0.5),
          margin: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px 0`,
          fontWeight: 500,
        },

        '&.Mui-checked': {
          '& + span': {
            color: theme.palette.primary.main,
            background: theme.palette.grey['500'],
          },
        },
      },
    },
  },
}));

export default useStyles;
