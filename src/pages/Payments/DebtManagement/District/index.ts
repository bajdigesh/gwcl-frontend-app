import { lazy } from 'react';

const District = lazy(() => import(/* webpackChunkName: "DebtManagementDistrict" */ './District'));
export default District;
