import { lazy } from 'react';

const UsersTab = lazy(() => import(/* webpackChunkName: "UserTabs" */ './UsersTab'));
export default UsersTab;
