import PrivateRoute from 'components/Route/PrivateRoute';
import routePath from 'global/routePaths';
import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import DevicesRoute from './routes';

const Devices = () => {
  return (
    <>
      <Switch>
        <Redirect exact from={routePath.devices.base} to={routePath.devices.meters} />
      </Switch>
      <PrivateRoute appRoutes={DevicesRoute} />{' '}
    </>
  );
};

export default Devices;
