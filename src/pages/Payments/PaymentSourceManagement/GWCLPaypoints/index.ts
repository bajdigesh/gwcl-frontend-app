import { lazy } from 'react';

const GWCLPaypoints = lazy(
  () => import(/* webpackChunkName: "PaymentSourceManagementGWCLPaypoints" */ './GWCLPaypoints')
);
export default GWCLPaypoints;
