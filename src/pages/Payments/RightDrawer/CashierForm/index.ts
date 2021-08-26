import { lazy } from 'react';

const CashierForm = lazy(() => import(/* webpackChunkName: "PaymentsCashierForm" */ './CashierForm'));
export default CashierForm;
