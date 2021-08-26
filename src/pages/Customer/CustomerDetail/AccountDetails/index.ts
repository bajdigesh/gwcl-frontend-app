import { lazy } from 'react';

const AccountDetails = lazy(() => import(/* webpackChunkName: "CustomerDetailAcountDetails" */ './AccountDetails'));
export default AccountDetails;
