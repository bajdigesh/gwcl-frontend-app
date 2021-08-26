import PrivateRoute from 'components/Route/PrivateRoute';
import routePath from 'global/routePaths';
import React from 'react';
import { Redirect, Switch } from 'react-router';
import userRoutes from './routes';

const User: React.FC<any> = () => {
  return (
    <>
      <Switch>
        <Redirect exact from={routePath.users.base} to={routePath.users.activeUsers} />
      </Switch>
      <PrivateRoute appRoutes={userRoutes} />
    </>
  );
};

export default User;
