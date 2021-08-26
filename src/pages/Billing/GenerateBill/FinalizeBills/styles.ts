import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  arrowIcon: {
    width: 8,
    height: 'auto',
    color: theme.palette.primary.main,
    '& path': {
      fill: 'currentColor',
    },
  },
  dropDownOptions: {
    padding: theme.spacing(1, 2),
    '& > a': {
      color: theme.palette.primary.contrastText,
      textDecoration: 'none',
      fontWeight: 400,
      '& + a': {
        marginTop: theme.spacing(2),
      },
    },
  },
  primaryText: {
    color: theme.palette.primary.main,
  },
  subText: {
    color: theme.palette.grey['700'],
    fontSize: theme.typography.pxToRem(12),
  },
}));

export default useStyles;
