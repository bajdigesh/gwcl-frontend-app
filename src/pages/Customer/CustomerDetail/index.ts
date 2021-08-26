import { lazy } from 'react';
const CustomerDetail = lazy(() => import(/* webpackChunkName: "CustomerDetail" */ './CustomerDetail'));
export default CustomerDetail;
