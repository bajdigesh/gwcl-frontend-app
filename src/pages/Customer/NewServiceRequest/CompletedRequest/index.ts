import { lazy } from 'react';

const CompletedRequest = lazy(
  () => import(/* webpackChunkName: "NewServiceRequestCompletedRequest" */ './CompletedRequest')
);
export default CompletedRequest;
