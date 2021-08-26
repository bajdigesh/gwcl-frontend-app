import { lazy } from 'react';
const CustomerTab = lazy(() => import(/* webpackChunkName: "CustomerTab" */ './CustomerTab'));
export default CustomerTab;
