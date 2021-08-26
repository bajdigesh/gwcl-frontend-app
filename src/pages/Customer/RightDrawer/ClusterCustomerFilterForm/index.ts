import { lazy } from 'react';

const ClusterCustomerFilterForm = lazy(
  () => import(/* webpackChunkName: "ClusterCustomerFilterForm" */ './ClusterCustomerFilterForm')
);
export default ClusterCustomerFilterForm;
