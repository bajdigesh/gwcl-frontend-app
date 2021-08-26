import { lazy } from 'react';

const InProgressRequest = lazy(
  () => import(/* webpackChunkName: "NewServiceRequestInProgressRequest" */ './InProgressRequest')
);
export default InProgressRequest;
