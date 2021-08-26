import { lazy } from 'react';

const UnBilledCustomers = lazy(() => import(/* webpackChunkName: "UnbilledCustomers" */ './UnBilledCustomers'));

export default UnBilledCustomers;
