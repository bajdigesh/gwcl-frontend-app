import { lazy } from 'react';

const PaymentSourceManagement = lazy(
  () => import(/* webpackChunkName: "PaymentSourceManagement" */ './PaymentSourceManagement')
);

export default PaymentSourceManagement;
