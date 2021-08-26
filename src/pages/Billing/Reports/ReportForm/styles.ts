import { fade, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  backIcon: {
    marginRight: theme.spacing(3),
    transform: 'translateY(-10px)',
  },
  headers: {
    color: theme.palette.grey['700'],
    fontSize: theme.typography.pxToRem(12),
    textTransform: 'uppercase',
    marginBottom: theme.spacing(1),
    fontWeight: 500,
  },
  reportType: {
    '& label': {
      position: 'relative',
      padding: theme.spacing(1.25, 2),
      cursor: 'pointer',
      margin: theme.spacing(0, 1, 1, 0),
      '& > input': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        border: `1px solid ${theme.palette.grey['500']}`,
        borderRadius: 4,
        appearance: 'none',
        '& + span': {
          fontWeight: 500,
        },
        '&:checked': {
          backgroundColor: fade(theme.palette.primary.main, 0.1),
          '& + span': {
            color: theme.palette.primary.main,
          },
        },
        '&:focus': {
          outline: 'none',
        },
      },
    },
  },
  period: {
    '& .react-datepicker-wrapper': {
      width: '100%',
    },
  },
  btnMoreFilters: {
    padding: theme.spacing(1.25, 2),
    color: theme.palette.primary.main,
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.25),
    },
    '& .gwcl-MuiButton-label': {
      fontWeight: 500,
    },
  },
  buttonsContainer: {
    '& .gwcl-MuiButton-label': {
      fontWeight: 500,
    },
    '& button': {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        '&:first-of-type': {
          minWidth: theme.spacing(32.5),
        },
      },
    },
  },
  frequentlyCreated: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(10),
      marginTop: 0,
    },
    '& h4': {
      fontSize: theme.typography.pxToRem(24),
      marginBottom: theme.spacing(2),
    },
    '& button': {
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 'fit-content',
      },
      '& .gwcl-MuiButton-label': {
        fontWeight: 400,
      },
    },
  },
}));

export default useStyles;
