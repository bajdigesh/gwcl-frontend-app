import { lazy } from 'react';

const UserForm = lazy(() => import(/* webpackChunkName: "UserForm" */ './UserForm'));
export default UserForm;
