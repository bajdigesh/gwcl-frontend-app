import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  filterDrawerToggleButton: {
    lineHeight: 1.42,
    width: '100%',
  },

  filterFormWrapper: {
    marginTop: theme.spacing(3),
    '& .gwcl-MuiTypography-gutterBottom': {
      dsiaply: 'block',
    },
    '& .react-datepicker-wrapper': {
      marginBottom: theme.spacing(3),
    },
    '& .gwcl-MuiFormControl-root': {
      marginBottom: '0 !important',
    },
  },

  formGroup: {
    margin: theme.spacing(3, 0),
  },

  filterButton: {
    marginLeft: '8px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  searchAndSort: {
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridGap: theme.spacing(1.5),
      width: '100%',
    },
  },

  filterAndSort: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },

  checkboxLabel: {
    textTransform: 'none',
    color: theme.palette.text.primary,
  },

  drawerFooter: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    marginRight: '0!important',
    '& .gwcl-MuiButtonBase-root': {
      padding: theme.spacing(2.5),
    },
    '& Button:first-child': {
      width: '30%',
      background: 'rgba(13, 76, 160, 0.1)',
      color: theme.palette.primary.main,
    },
    '& Button:nth-child(2)': {
      width: '70%',
    },
    '& Button': {
      maxHeight: '60px',
    },
  },
}));

export default useStyles;
