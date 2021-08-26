import { AppBar, Drawer, Hidden, IconButton } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import clsx from 'clsx';
import { Header, Sidebar } from 'components/Layout';
import PrivateRoute from 'components/Route/PrivateRoute';
import routePath from 'global/routePaths';
import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import dashboardRoutes from './routes';

const sideNavWidth = 280;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100%',
  },

  appBar: {
    marginLeft: 100,
    width: 'calc(100% - 72px)',
    padding: theme.spacing(1.25, 2),
    borderBottom: `1px solid ${theme.palette.grey['500']}`,
    background: '#fff',
    transition: 'all 0.25s ease-in-out',
    '& button': {
      '& svg': {
        transform: 'rotate(180deg)',
        transition: 'all 0.25s ease-in-out',
      },
    },
    '& + aside + .appContent': {
      '& div[class*=tableFooter]': {
        paddingLeft: 100,
        transition: 'all 0.25s ease-in-out',
      },
      '& .stepperContent': {
        '& .stepperFooter': {
          [theme.breakpoints.up('md')]: {
            paddingLeft: 100,
            transition: 'all 0.25s ease-in-out',
          },
        },
      },
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(1.25, 3),
    },
  },

  appBarShift: {
    width: '100%',
    transition: 'all 0.25s ease-in-out',
    [theme.breakpoints.between('sm', 'lg')]: {
      width: `calc(100% - ${sideNavWidth}px + 72px)`,
      marginLeft: sideNavWidth - 72,
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: sideNavWidth,
      width: `calc(100% - ${sideNavWidth}px)`,
    },
    '& button': {
      '& svg': {
        transform: 'rotate(0)',
      },
    },
    '&  + aside + .appContent': {
      '& div[class*=tableFooter]': {
        [theme.breakpoints.between('sm', 'lg')]: {
          paddingLeft: sideNavWidth - 72 + 16,
          transition: 'all 0.25s ease-in-out',
        },
        [theme.breakpoints.up('xl')]: {
          paddingLeft: `calc(${sideNavWidth}px + 16px)`,
          transition: 'all 0.25s ease-in-out',
        },
      },
      '& .stepperContent': {
        '& .stepperFooter': {
          [theme.breakpoints.between('sm', 'lg')]: {
            paddingLeft: sideNavWidth - 72 + 16,
            transition: 'all 0.25s ease-in-out',
          },
          [theme.breakpoints.up('xl')]: {
            paddingLeft: `calc(${sideNavWidth}px + 16px)`,
            transition: 'all 0.25s ease-in-out',
          },
        },
      },
    },
  },

  sideNav: {
    width: 72,
    border: 0,
    transition: 'all 0.25s ease-in-out',
    '& i': {
      flex: '0 0 24px',
    },
    '& p': {
      whiteSpace: 'nowrap',
      opacity: 0,
      marginLeft: 8,
      transform: 'translateX(-9999rem)',
      transformOrigin: '0 0',
      transition: 'transform 0.25s ease-in-out, opacity 0.25s ease-in-out 0.1s',
    },
    '& .gwcl-MuiDrawer-paper': {
      background: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
    },
  },

  sideNavOpen: {
    width: sideNavWidth,
    transition: 'all 0.25s ease-in-out',
    [theme.breakpoints.between('sm', 'lg')]: {
      width: sideNavWidth - 72,
    },
    '& p': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },
  appContent: {
    flexGrow: 1,
    padding: theme.spacing(2.5),
    marginTop: theme.spacing(8),
    maxWidth: '100%',
    position: 'relative',
    transition: 'all 0.25s ease-in-out',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2, 3),
    },
  },
  sideBarToggle: {
    position: 'absolute',
    left: theme.spacing(1),
    top: '50%',
    transform: 'translateY(-50%)',
  },
  drawerPaper: {
    width: sideNavWidth,
  },
}));

interface IDashboardProps {}

const Dashboard: React.FC<IDashboardProps> = props => {
  const [sideBarShift, setSideBarShift] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const container = window.document.body || undefined;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        className={clsx(classes.appBar, { [classes.appBarShift]: !sideBarShift })}
      >
        <Hidden smUp implementation="css">
          <IconButton onClick={handleDrawerToggle} color="primary" className={classes.sideBarToggle}>
            <MenuOpenIcon />
          </IconButton>
        </Hidden>

        <Hidden xsDown implementation="css">
          <IconButton onClick={() => setSideBarShift(!sideBarShift)} color="primary" className={classes.sideBarToggle}>
            <MenuOpenIcon />
          </IconButton>
        </Hidden>
        <Header />
      </AppBar>

      <aside>
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            className={clsx(classes.sideNav, { [classes.sideNavOpen]: !sideBarShift })}
            classes={{
              paper: clsx(classes.sideNav, { [classes.sideNavOpen]: !sideBarShift }),
            }}
          >
            <Sidebar />
          </Drawer>
        </Hidden>

        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            className={clsx(classes.sideNav, { [classes.sideNavOpen]: !sideBarShift })}
            open
            classes={{
              paper: clsx(classes.sideNav, { [classes.sideNavOpen]: !sideBarShift }),
            }}
          >
            <Sidebar />
          </Drawer>
        </Hidden>
      </aside>

      <div className={clsx(classes.appContent, 'appContent')}>
        <Switch>
          <Redirect exact from={routePath.dashboard.base} to={routePath.home.base} />
        </Switch>
        <PrivateRoute appRoutes={dashboardRoutes} />
      </div>
    </div>
  );
};

export default Dashboard;
