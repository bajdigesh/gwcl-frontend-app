import { lazy } from 'react';

const ExistingCashiers = lazy(() => import(/* webpackChunkName: "PaymentsExistingCashiers" */ './ExistingCashiers'));
export default ExistingCashiers;
