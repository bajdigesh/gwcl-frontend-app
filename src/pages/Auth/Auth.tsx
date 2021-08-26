import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import { loginBg, logo } from 'assets/images';
import PublicRoute from 'components/Route/PublicRoute';
import authenticationRoutes from 'pages/Auth/routes';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    background: `url(${loginBg}) center bottom`,
    backgroundSize: 'cover',
    height: '100vh',
    width: '100%',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end',
      padding: `${theme.spacing(2)}px ${theme.spacing(12)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    },
  },
  card: {
    maxWidth: 472,
    width: '100%',
    padding: theme.spacing(3),
    boxShadow: '0 4px 20px rgba(0,78,194,0.05)',
    borderRadius: theme.spacing(2.5),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6, 4.5, 4.5, 4.5),
    },
  },
  header: {
    padding: 0,
    marginBottom: theme.spacing(4),
  },
  content: {
    padding: `0 !important`,
    '& h2': {
      marginBottom: theme.spacing(4),
      lineHeight: 1.5,
    },

    '& .gwcl-MuiFormControl-root': {
      marginBottom: theme.spacing(5),
    },
  },
  avatar: {
    width: theme.spacing(12.5),
    height: theme.spacing(12.5),
  },
}));

const Auth = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardHeader
            avatar={<Avatar aria-label="Logo" src={logo} className={classes.avatar} />}
            className={classes.header}
          />
          <CardContent className={classes.content}>
            <PublicRoute appRoutes={authenticationRoutes} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
