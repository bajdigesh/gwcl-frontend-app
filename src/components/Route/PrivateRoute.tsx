import ErrorBoundary from 'components/ErrorBoundary';
import { FallBackLoader } from 'components/Loader';
import routePath from 'global/routePaths';
import Page404 from 'pages/Page404';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import tokenService from '../../service/tokenService';

interface IProps {
  appRoutes: Array<TAppRoutes>;
}

/**
 * If user is authenticated then users can't access routes related to authentication
 * If user is not authenticated then users can't access routes other than authentication
 * Don't use variable for storing tokenService accessToken because it returns old value even we update the token value
 */
const PrivateRoute: React.FC<IProps> = ({ appRoutes }) => {
  return (
    <Suspense fallback={<FallBackLoader />}>
      <ErrorBoundary>
        <Switch>
          {appRoutes.map(({ component: Component, exact, path, ...rest }: TAppRoutes, index) => (
            <Route
              {...rest}
              key={index}
              path={path}
              exact={exact}
              render={props => {
                if (tokenService.getAccessToken()) {
                  return path?.includes(routePath.auth.login) ? (
                    <Redirect to={routePath.home.base} />
                  ) : (
                    <Component {...props} />
                  );
                } else {
                  return path?.includes(routePath.auth.login) ? <Component {...props} /> : <Redirect to="/auth" />;
                }
              }}
            />
          ))}
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </ErrorBoundary>
    </Suspense>
  );
};

export default PrivateRoute;
