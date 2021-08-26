import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  filtersWrapper: {
    marginTop: theme.spacing(3),
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
    },
  },

  filterForm: {
    width: '100%',
    '& .gwcl-MuiAutocomplete-root': {
      flex: '1 1 175px',
      margin: theme.spacing(0, 0, 1),
      [theme.breakpoints.up('md')]: {
        margin: 0,
      },
    },

    '& .react-datepicker-wrapper': {
      margin: theme.spacing(0, 0, 1),
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, 1),
      },
    },

    '& .gwcl-MuiFormControl-root': {
      marginBottom: 0,
    },

    '& .gwcl-MuiFormHelperText-root': {
      display: 'none',
    },

    '& .gwcl-MuiFormControlLabel-root': {
      margin: theme.spacing(1, 0, 0),
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, 0, 0, 1),
      },
      '& .gwcl-MuiFormControlLabel-label': {
        whiteSpace: 'nowrap',
      },
    },

    [theme.breakpoints.between('sm', 'lg')]: {
      marginBottom: theme.spacing(1),
    },

    [theme.breakpoints.up('lg')]: {
      flex: 2,
    },
  },

  filterButton: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  filterAndSort: {
    '& > div:first-of-type': {
      order: 2,

      '& > .gwcl-MuiInputBase-root': {
        position: 'static',

        [theme.breakpoints.up('lg')]: {
          position: 'absolute',
        },
      },

      [theme.breakpoints.up('lg')]: {
        order: 1,
      },
    },

    '& .gwcl-MuiBox-root': {
      margin: theme.spacing(1, 0),
      order: 1,

      [theme.breakpoints.up('md')]: {
        margin: 0,
      },

      [theme.breakpoints.up('lg')]: {
        order: 2,
      },
    },

    [theme.breakpoints.up('lg')]: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  },
}));

export default useStyles;
