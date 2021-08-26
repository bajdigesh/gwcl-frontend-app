import { lazy } from 'react';
const Customer = lazy(() => import(/* webpackChunkName: "Customer" */ './Customer'));
export default Customer;
