import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  backIcon: {
    margin: theme.spacing(0, 2.5, 3, 0),
  },
  statusInfo: {
    '& svg': {
      marginRight: theme.spacing(1),
    },
  },
  amount: {
    '&:before': {
      content: `'$'`,
      marginRight: theme.spacing(0.5),
    },
  },
  actionButtons: {
    '& > a': {
      '&:not': {
        '&(:first-of-type)': {
          marginLeft: theme.spacing(3),
        },
      },
    },
    '& svg': {
      '& > path': {
        fill: 'currentColor',
      },
    },
  },
}));
export default useStyles;
