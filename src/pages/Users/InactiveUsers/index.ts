import { lazy } from 'react';

const InactiveUsers = lazy(() => import(/* webpackChunkName: "InActiveUsers" */ './InactiveUsers'));
export default InactiveUsers;
