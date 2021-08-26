import { lazy } from 'react';

const Summary = lazy(() => import(/* webpackChunkName: "BillingSummary" */ './Summary'));
export default Summary;
