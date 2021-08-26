import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  readingInfoRow: {
    marginBottom: theme.spacing(2),
    fontSize: '0.825rem',

    '&:last-of-type': {
      marginBottom: 0,
    },

    '& > label': {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: theme.palette.grey[700],
      lineHeight: 1.42857,

      '&:after': {
        content: `':'`,
        marginRight: theme.spacing(0.75),
      },
    },

    '& > span': {
      fontWeight: 500,
      fontSize: '0.875rem',
      color: theme.palette.grey[900],

      '& > a': {
        color: 'currentColor',
        textDecoration: 'none',
      },
    },

    '& > i': {
      marginLeft: theme.spacing(1.5),
    },
  },
}));
export default useStyles;
