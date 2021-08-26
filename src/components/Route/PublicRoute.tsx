import { FallBackLoader } from 'components/Loader';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

interface IProps {
  appRoutes: Array<TAppRoutes>;
}

const PublicRoute: React.FC<IProps> = ({ appRoutes }) => {
  return (
    <Suspense fallback={<FallBackLoader />}>
      <Switch>
        {appRoutes.map(({ component: Component, exact, path, ...rest }: TAppRoutes, index) => (
          <Route {...rest} key={index} path={path} exact={exact} component={Component} />
        ))}
      </Switch>
    </Suspense>
  );
};

export default PublicRoute;
