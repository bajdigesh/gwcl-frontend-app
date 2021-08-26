import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  inputRoot: {
    color: 'inherit',
    border: `1px solid ${theme.palette.grey[500]}`,
    padding: theme.spacing(1.75, 2),
    borderRadius: 8,
    boxSizing: 'border-box',

    '&.Mui-focused': {
      boxShadow: theme.shadows[1],
      borderColor: theme.palette.grey[600],
    },

    '& > svg': {
      marginRight: theme.spacing(1.5),
      width: 16,
      height: 16,

      '& path': {
        fill: theme.palette.grey[700],
      },
    },
  },
  inputInput: {
    padding: 0,

    '&::placeholder': {
      color: theme.palette.grey[700],
      fontWeight: 400,
    },
  },
}));

export default useStyles;
