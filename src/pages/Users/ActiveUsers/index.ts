import { lazy } from 'react';

const ActiveUsers = lazy(() => import(/* webpackChunkName: "ActiveUsers" */ './ActiveUsers'));
export default ActiveUsers;
