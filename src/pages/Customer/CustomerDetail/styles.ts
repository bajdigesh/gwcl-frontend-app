import { fade, makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  innerContainer: {
    paddingLeft: theme.spacing(4),
    position: 'relative',
  },
  primaryColorText: {
    color: theme.palette.primary.main,
  },
  capitalizedText: {
    textTransform: 'capitalize',
  },
  upperCasedText: {
    textTransform: 'uppercase',
  },
  bolderText: {
    fontWeight: 600,
  },

  // CUSTOMER DETAIL TOPBAR STYLES
  topBar: {
    '& h3': {
      marginBottom: 0,
    },
    '& > span': {
      marginLeft: theme.spacing(1.5),
    },
  },
  accountNumber: {
    color: theme.palette.grey['700'],
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 600,
    '&:before': {
      width: theme.spacing(1),
      height: theme.spacing(1),
      borderRadius: '50%',
      content: `''`,
      display: 'inline-block',
      verticalAlign: 'middle',
      marginRight: theme.spacing(2),
      background: theme.palette.grey['700'],
    },
  },
  accountStatus: {
    padding: '5px 12px',
    fontSize: theme.typography.pxToRem(12),
    borderRadius: 8,

    '&:before': {
      width: theme.spacing(1),
      height: theme.spacing(1),
      borderRadius: '50%',
      content: `''`,
      display: 'inline-block',
      verticalAlign: 'middle',
      marginRight: theme.spacing(1),
    },
  },
  statusActive: {
    color: theme.palette.success.main,
    background: fade(theme.palette.success.main, 0.1),
    '&:before': {
      background: theme.palette.success.main,
    },
  },
  statusSuspended: {
    color: theme.palette.grey['700'],
    background: fade(theme.palette.grey['700'], 0.1),
    '&:before': {
      background: theme.palette.grey['700'],
    },
  },
  backIcon: {
    position: 'absolute',
    left: '-32px',
    top: 9,
    cursor: 'pointer',
    '& path': {
      transition: 'all 0.25s ease',
    },
    '&:hover': {
      '& path': {
        fill: theme.palette.grey['900'],
      },
    },
  },
  customerActivityInfoSummary: {
    marginRight: theme.spacing(1.5),
    marginTop: 8,
    '& > label': {
      color: theme.palette.grey['700'],
      '&:after': {
        content: `':'`,
      },
    },
    '& > span': {
      marginLeft: theme.spacing(0.5),
    },
    '&:not(:first-of-type)': {
      '&:before': {
        width: 4,
        height: 4,
        borderRadius: '50%',
        display: 'inline-block',
        verticalAlign: 'middle',
        marginRight: theme.spacing(1.5),
        background: theme.palette.grey['700'],
        content: `''`,
      },
    },
  },
  moreMenuIcon: {
    cursor: 'pointer',
  },
  menuList: {
    '& .gwcl-MuiButtonBase-root': {
      alignItems: 'center',
      '& svg': {
        color: theme.palette.grey['600'],
        marginRight: theme.spacing(1),
        transition: 'all 0.25s ease',
        '& path': {
          fill: 'currentColor',
        },
      },
      '&.deleteMenuItem': {
        color: theme.palette.error.main,

        '& svg': {
          color: 'currentColor',
        },
      },
    },
  },
  //-----------------------------------------------------

  customerDetailTabs: {
    position: 'relative',
    marginTop: theme.spacing(3),
    '&:after': {
      position: 'absolute',
      top: theme.spacing(6),
      left: '-52px',
      background: theme.palette.grey['500'],
      content: `''`,
      width: 'calc(100% + 32px + 40px)',
      height: 1,
    },
    '& .gwcl-MuiTabs-indicator': {
      marginTop: -1,
    },
  },

  // FILTERBAR STYLES FOR USER DETAIL TAB CONTENTS
  filterRowGrid: {
    gridTemplateColumns: '2fr 1fr',
    gridGap: theme.spacing(2),
    '@media (max-width: 1180px)': {
      gridTemplateColumns: '1fr',
      gridGap: theme.spacing(1),
    },
  },
  tabsGroup: {
    '& form': {
      '& .gwcl-MuiAutocomplete-root': {
        flex: '0 1 175px',
        '& .gwcl-MuiFormControl-root': {
          marginBottom: 0,
        },
      },
    },
    '& .gwcl-MuiFormHelperText-root': {
      display: 'none',
    },
    '& button': {
      marginBottom: theme.spacing(1),
      '&:not(:last-of-type)': {
        marginRight: theme.spacing(1.5),
      },
      [theme.breakpoints.up('md')]: {
        marginBottom: 0,
      },
    },
  },
  filterButton: {},
  sortOption: {
    marginLeft: theme.spacing(1),
    padding: '13px 16px',
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
  icon: {},
  //-----------------------------------------------------

  customerTimeline: {
    marginTop: theme.spacing(3),
    '& .customerTimelineCard': {
      width: '100%',
      '& a': {
        color: theme.palette.primary.main,
        textDecoration: 'none',
      },
    },
  },
  billMonth: {
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    '& > svg': {
      marginLeft: theme.spacing(2),
    },
  },
  amount: {
    '&:before': {
      content: `'$'`,
    },
  },
  subRecords: {
    color: theme.palette.grey['700'],
    fontWeight: 500,
    marginTop: theme.spacing(1),
    display: 'block',
    fontSize: theme.typography.pxToRem(12),
  },
  complaintStatus: {
    fontSize: theme.typography.pxToRem(12),
    padding: '7px 12px',
    borderRadius: 4,
    width: 'fit-content',
  },
  resolved: {
    color: theme.palette.success.main,
    background: fade(theme.palette.success.main, 0.1),
  },
  assigned: {
    color: theme.palette.grey['700'],
    background: theme.palette.grey['500'],
  },
}));

export default useStyles;
