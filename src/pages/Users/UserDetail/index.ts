import { lazy } from 'react';

const UserDetail = lazy(() => import(/* webpackChunkName: "UserDetails" */ './UserDetail'));
export default UserDetail;
