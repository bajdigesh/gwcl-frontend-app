import { lazy } from 'react';

const Customers = lazy(() => import(/* webpackChunkName: "DebtManagementCustomers" */ './Customers'));
export default Customers;
