import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  tabsGroup: {
    '& button': {
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px 0`,
      '&:last-of-type': {
        marginRight: 0,
      },
    },
  },
}));
export default useStyles;
