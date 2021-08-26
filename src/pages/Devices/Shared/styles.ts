import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  innerContainer: {
    paddingLeft: theme.spacing(4),
    position: 'relative',
  },
  displayFlex: {
    display: 'flex',
    alignItems: 'center',
    '& i': {
      lineHeight: 0,
    },
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  userName: {
    color: theme.palette.primary.main,
    fontWeight: 500,
    marginRight: 8,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  staffCode: {
    color: theme.palette.grey['700'],
    fontSize: 12,
    fontWeight: 500,
    marginTop: 1,
  },
  contactInfo: {
    '& span': {
      flex: '0 0 calc(100% - 24px)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '&:not(:first-of-type)': {
      marginTop: theme.spacing(1),
    },
  },
  filtersRowGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gridGap: theme.spacing(4),
    '& div[class*=autoCompleteField]': {
      '&:not(:last-of-type)': {
        marginRight: 8,
      },
    },
  },
  filterButton: {
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.grey['500']}`,
    alignSelf: 'stretch',
    padding: `${theme.spacing(1.25)}px ${theme.spacing(1)}px`,
  },
  justifySelfEnd: {
    justifySelf: 'flex-end',
  },
  sortOption: {
    marginLeft: theme.spacing(1),
    padding: `${theme.spacing(1.75)}px ${theme.spacing(3)}px`,
    border: `1px solid ${theme.palette.grey['500']}`,
    borderRadius: 4,
    cursor: 'pointer',
    '& > span': {
      color: theme.palette.grey['700'],
      marginLeft: theme.spacing(1),
      fontWeight: 500,
      '&:last-of-type': {
        color: theme.palette.grey['900'],
        marginRight: theme.spacing(1),
        '& + i': {
          width: 8,
        },
      },
    },
    '&:focus-within': {
      '& span': {
        '&:last-of-type': {
          '& + i': {
            transform: 'rotate(180deg)',
          },
        },
      },
    },
  },
  sortDropdown: {
    '& .gwcl-MuiPopover-paper': {
      marginTop: theme.spacing(7),
      width: 220,
    },
  },
  icon: {
    lineHeight: 0,
  },
  statusIcon: {
    '& svg': {
      width: 12,
      height: 12,
    },
  },
  emptyRecords: {
    padding: theme.spacing(2),
    background: theme.palette.grey['500'],
    fontWeight: 500,
    borderRadius: 4,
  },
  userStatusIcons: {},
  userStatus: {
    padding: `${theme.spacing(1)}px ${theme.spacing(1.75)}px`,
    borderRadius: 8,
    fontWeight: 500,
  },
  statusActive: {
    background: 'rgba(52, 164, 137, 0.1)',
    color: theme.palette.success.main,
  },
  userMenuPopover: {
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
  userInfoTopBar: {
    gap: theme.spacing(2.5),
  },
  userMenuDropdowns: {
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
  userAddedDate: {
    marginTop: theme.spacing(1.25),
  },
  userBasicInfo: {
    display: 'block',
    margin: `${theme.spacing(3)}px 0 0`,
    paddingTop: `${theme.spacing(4)}px`,
    position: 'relative',
    '&:before': {
      content: `''`,
      position: 'absolute',
      left: '-56px',
      top: 0,
      width: `calc(100% + 48px + ${theme.spacing(4)}px)`,
      height: 1,
      background: theme.palette.grey['500'],
    },
    '& > .gwcl-MuiGrid-root:not(:last-of-type)': {
      marginBottom: theme.spacing(3),
    },
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
  autoCompleteFields: {
    marginBottom: theme.spacing(3),
    '& .gwcl-MuiInputLabel-root': {
      fontWeight: 500,
      color: theme.palette.grey['600'],
    },
  },
  dialogActionGrid: {
    display: 'flex',
    width: '100%',
    textAlign: 'center',
    '& button': {
      cursor: 'pointer',
      transition: 'all 0.25s ease-in-out',
      fontWeight: 600,
      padding: `${theme.spacing(1.5)}px ${theme.spacing(1.25)}px}`,
      background: theme.palette.primary.main,
      color: '#fff',
      width: '100%',
      '&:hover': {
        background: theme.palette.primary.dark,
      },
    },
  },
  userTitle: {
    position: 'absolute',
    left: 0,
    top: theme.spacing(2),
    width: '100%',
    padding: `0 ${theme.spacing(2)}px`,
  },
  usersLists: {
    '& .gwcl-MuiTabs-root': {
      marginTop: theme.spacing(6),
    },
  },
}));
