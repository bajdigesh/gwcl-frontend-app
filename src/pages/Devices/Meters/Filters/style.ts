import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  filterRowGrid: {
    gridTemplateColumns: '2fr 1fr',
    gridGap: theme.spacing(2),
    '& .gwcl-MuiFormHelperText-root': {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
      gridTemplateColumns: '1fr',
    },
  },
  filterFormWrapper: {
    display: 'flex',
    alignItems: 'center',
    '& > div:not(.react-datepicker__tab-loop)': {
      marginRight: theme.spacing(1),
      flex: '0 1 175px',
      '&.react-datepicker-wrapper': {
        flex: '0 1 240px',
      },
    },
    '& .gwcl-MuiFormControl-root': {
      marginBottom: 0,
    },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      '& > div': {
        width: '100%',
        marginBottom: theme.spacing(1.5),
      },
    },
    '& .react-datepicker__close-icon': {
      right: 6,
      '&:after': {
        width: 20,
        height: 20,
        fontSize: 17,
      },
    },
  },
  filterButton: {
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
}));

export default useStyles;
