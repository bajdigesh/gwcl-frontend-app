import { lazy } from 'react';
const Payments = lazy(() => import(/* webpackChunkName: "CustomerDetailPayments" */ './Payments'));
export default Payments;
