import { lazy } from 'react';
const Payments = lazy(() => import(/* webpackChunkName: "Payments" */ './Payments'));
export default Payments;
