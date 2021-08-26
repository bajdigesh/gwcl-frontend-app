import { lazy } from 'react';

const Region = lazy(() => import(/* webpackChunkName: "DebtManagementRegion" */ './Region'));
export default Region;
