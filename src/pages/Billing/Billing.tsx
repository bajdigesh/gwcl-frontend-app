import PrivateRoute from 'components/Route/PrivateRoute';
import routePath from 'global/routePaths';
import React from 'react';
import { Redirect, Switch } from 'react-router';
import billingRoutes from './routes';

const Billing = () => {
  return (
    <>
      <Switch>
        <Redirect exact from={routePath.billing.base} to={routePath.billing.summary} />
      </Switch>
      <PrivateRoute appRoutes={billingRoutes} />
    </>
  );
};

export default Billing;
