import { lazy } from 'react';

const PaymentsTab = lazy(() => import(/* webpackChunkName: "Users" */ './PaymentsTab'));
export default PaymentsTab;
