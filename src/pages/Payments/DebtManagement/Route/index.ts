import { lazy } from 'react';

const Route = lazy(() => import(/* webpackChunkName: "DebtManagementRoute" */ './Route'));
export default Route;
