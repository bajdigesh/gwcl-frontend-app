import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  link: {
    display: 'block',
    color: theme.palette.primary.main,
    fontSize: theme.typography.pxToRem(12),
    marginTop: theme.spacing(0.5),
    textDecoration: 'none',
    fontWeight: theme.typography.fontWeightMedium,
  },
  title: {
    display: 'flex',
    lineHeight: 1.5,
    '& .gwcl-MuiAvatar-root': {
      marginLeft: theme.spacing(2),
      letterSpacing: '0.01em',
    },
  },
  avatar: {
    width: theme.spacing(2),
    height: 'auto',
  },
  divider: {
    marginTop: theme.spacing(4.5),
    marginBottom: theme.spacing(3.75),
    backgroundColor: theme.palette.grey['500'],
  },
  signUp: {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.grey['900'],
    '& > a': {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
  },
}));

export default useStyles;
