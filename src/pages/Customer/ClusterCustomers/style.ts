import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  clusterContainer: {
    position: 'relative',
  },

  buttonPosition: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '14px 20px',
    fontSize: '0.875rem',
    fontWeight: 600,

    [theme.breakpoints.up('md')]: {
      top: 10,
    },

    '& .button-label': {
      marginRight: '8px',
    },

    '& svg': {
      color: theme.palette.primary.contrastText,

      '& > path': {
        fill: 'currentColor',
      },
    },

    [theme.breakpoints.down('sm')]: {
      background: theme.palette.primary.contrastText,
      color: theme.palette.primary.main,

      '& svg': {
        color: theme.palette.primary.main,
      },

      '&:hover': {
        background: theme.palette.primary.contrastText,
        color: theme.palette.primary.dark,

        '& svg': {
          color: theme.palette.primary.dark,
        },
      },
    },
  },

  buttonOptions: {
    width: '105px',
  },
}));
export default useStyles;
