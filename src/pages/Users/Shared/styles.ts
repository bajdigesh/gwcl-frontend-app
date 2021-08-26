import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  userName: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  staffCode: {
    color: theme.palette.grey['700'],
    fontSize: 12,
    marginTop: theme.spacing(1),
    '&:before': {
      content: `'#'`,
    },
  },
  contactInfo: {
    '& svg': {
      flex: '0 0 calc(100% - 16px)',
      maxWidth: 16,
      marginRight: theme.spacing(1),
      lineHeight: 0,
    },
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
    '@media (max-width: 1180px)': {
      gridTemplateColumns: '1fr',
      gridGap: theme.spacing(1.5),
      '& div[class*=justifySelfEnd]': {
        justifyContent: 'flex-start',
        width: '100%',
        '& div[class*=sortOption]': {
          marginLeft: 0,
        },
      },
      '& .gwcl-MuiIconButton-root': {
        order: 2,
      },
    },
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
    padding: '11px 16px',
  },
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
  userTitle: {
    '& > .gwcl-MuiTypography-root': {
      marginBottom: 0,
    },
    [theme.breakpoints.down('sm')]: {
      '& button': {
        background: theme.palette.primary.contrastText,
        color: theme.palette.primary.main,
        '&:hover': {
          background: theme.palette.primary.contrastText,
          color: theme.palette.primary.dark,
        },
      },
    },
  },
  deactivateBtn: {
    borderColor: theme.palette.grey['500'],
    color: theme.palette.grey['700'],
    '& svg': {
      fontSize: '16px !important',
    },
  },
  deleteBtn: {
    borderColor: theme.palette.grey['500'],
    color: theme.palette.error.main,
    '& svg': {
      fontSize: '16px !important',
    },
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
      '& span[class*=icon]': {
        marginRight: 8,
      },
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
  autoCompleteFields: {
    marginBottom: theme.spacing(3),
    '& .gwcl-MuiInputLabel-root': {
      fontWeight: 500,
      color: theme.palette.grey['600'],
    },
    '& .gwcl-MuiOutlinedInput-root': {
      padding: '0 65px 0 0 !important',
      marginTop: '16px !important',
      '& > input': {
        padding: '6px 0 10px !important',
      },
    },
  },
  searchFilterInput: {
    '& .gwcl-MuiOutlinedInput-input': {
      height: 'auto',
      padding: '16px 0px',
      width: '5px',
      transition: 'all 0.25s ease',
    },
    '& .gwcl-MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent',
      transition: 'all 0.25s ease',
    },
    '& .gwcl-MuiInputLabel-root': {
      transform: 'translate(16px, 18px) scale(1)',
      color: theme.palette.grey['700'],
      opacity: 0,
      '&.gwcl-MuiInputLabel-shrink': {
        opacity: 0,
      },
    },
    '& .gwcl-MuiOutlinedInput-root': {
      '&.Mui-focused': {
        '& .gwcl-MuiOutlinedInput-input': {
          width: 'auto',
          padding: 16,
          transition: 'all 0.25s ease',
        },
        '& .gwcl-MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.grey['500'],
        },
      },
    },
    '&:focus-within': {
      '& .gwcl-MuiOutlinedInput-input': {
        width: 'auto',
        padding: 16,
        transition: 'all 0.25s ease',
      },
      '& .gwcl-MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey['500'],
      },
    },
    '& .gwcl-MuiInputAdornment-positionEnd': {
      pointerEvents: 'none',
    },
  },
}));
