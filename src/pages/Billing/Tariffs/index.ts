import { lazy } from 'react';

const Tariffs = lazy(() => import(/* webpackChunkName: "BillingTariffs" */ './Tariffs'));
export default Tariffs;
