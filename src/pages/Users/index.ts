import { lazy } from 'react';
const Users = lazy(() => import(/* webpackChunkName: "Users" */ './Users'));
export default Users;
