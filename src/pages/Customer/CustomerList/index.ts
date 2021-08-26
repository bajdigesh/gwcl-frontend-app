import { lazy } from 'react';
const CustomerList = lazy(() => import(/* webpackChunkName: "CustomerList" */ './CustomerList'));
export default CustomerList;
