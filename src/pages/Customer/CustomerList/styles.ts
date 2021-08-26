import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  addBtn: {
    [theme.breakpoints.down('sm')]: {
      background: theme.palette.primary.contrastText,
      color: theme.palette.primary.main,
      '&:hover': {
        background: theme.palette.primary.contrastText,
        color: theme.palette.primary.dark,
      },
    },
  },
  filterButton: {
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.grey['500']}`,
    padding: '11px 16px',
  },
  icon: {
    lineHeight: 0,
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
  deactivateBtn: {},
  deleteBtn: {},
  customerAccount: {
    '& > a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
    '& > span': {
      marginLeft: theme.spacing(1),
      '& > svg': {
        width: 13,
        height: 12,
      },
    },
  },
  capitalizedText: {
    textTransform: 'capitalize',
  },
  meterStatus: {
    '& svg': {
      marginRight: theme.spacing(1),
    },
  },
  statusFaulty: {
    color: theme.palette.error.main,
  },
  statusWorking: {
    color: theme.palette.success.main,
  },
  actionButtons: {},
}));

export default useStyles;
