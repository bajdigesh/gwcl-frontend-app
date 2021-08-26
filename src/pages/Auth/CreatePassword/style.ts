import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  divider: {
    marginTop: theme.spacing(4.5),
    marginBottom: theme.spacing(3),
  },
  signUp: {
    '&> a': {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
  },
  title: {
    display: 'flex',
    textTransform: 'capitalize',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: theme.spacing(3),

    '& .gwcl-MuiAvatar-root': {
      marginLeft: theme.spacing(2),
      width: 30,
      height: 30,
    },
  },
  invitation: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.grey[500]}`,
    background: 'rgba(233,239,250,0.3)',
    marginBottom: theme.spacing(4),
  },
  avatar: {
    width: 36,
    height: 36,
    marginRight: theme.spacing(1.5),
  },
}));

export default useStyles;
