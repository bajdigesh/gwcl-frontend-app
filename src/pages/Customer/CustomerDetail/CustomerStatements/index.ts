import { lazy } from 'react';
const CustomerStatements = lazy(
  () => import(/* webpackChunkName: "CustomerDetailCustomerStatements" */ './CustomerStatements')
);

export default CustomerStatements;
