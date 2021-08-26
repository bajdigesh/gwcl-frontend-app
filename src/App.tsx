import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createGenerateClassName, StylesProvider } from '@material-ui/core/styles';
import 'assets/scss/app.scss';
import ErrorBoundary from 'components/ErrorBoundary';
import PrivateRoute from 'components/Route/PrivateRoute';
import AppTheme from 'global/AppTheme';
import routePath from 'global/routePaths';
import Auth from 'pages/Auth';
import Dashboard from 'pages/Dashboard';
import { HashRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Pusher from 'pusher-js/with-encryption';
import { useEffect } from 'react';

const generateClassName = createGenerateClassName({
  seed: 'gwcl',
});

const appRoutes: Array<TAppRoutes> = [
  {
    path: routePath.auth.login,
    component: Auth,
  },
  {
    path: routePath.dashboard.base,
    component: Dashboard,
  },
];

function App() {
  useEffect(() => {
    const pusher = new Pusher('1186623', { cluster: 'ap2' });

    pusher.connection.bind('connected', function () {
      console.log('pusher is connected');
    });

    pusher.connection.bind('error', function (error: any) {
      console.error('connection error', error);
    });

    pusher.connection.bind('state_change', function (states: any) {
      console.log(states, 'states pusher');
    });

    const channel = pusher.subscribe('bill-completion');
    console.log(channel);
  }, []);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={AppTheme}>
        <CssBaseline />
        <ErrorBoundary>
          <Router>
            <PrivateRoute appRoutes={appRoutes} />
          </Router>
        </ErrorBoundary>
        <ToastContainer position="bottom-center" autoClose={4000} closeOnClick />
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;

// preview
