import { lazy } from 'react';

const ElectronicPayment = lazy(
  () => import(/* webpackChunkName: "RecievedPaymentsElectronicPayment" */ './ElectronicPayment')
);
export default ElectronicPayment;
