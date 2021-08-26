import { lazy } from 'react';

const ElectronicVendors = lazy(
  () => import(/* webpackChunkName: "PaymentSourceManagementElectronicVendors" */ './ElectronicVendors')
);
export default ElectronicVendors;
