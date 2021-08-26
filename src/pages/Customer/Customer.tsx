import PrivateRoute from 'components/Route/PrivateRoute';
import routePath from 'global/routePaths';
import customerRoutes from 'pages/Customer/routes';
import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

const Customer = () => {
  return (
    <>
      <Switch>
        <Redirect exact from={routePath.customers.base} to={routePath.customers.customerList} />
      </Switch>
      <PrivateRoute appRoutes={customerRoutes} />
    </>
  );
};

export default Customer;
