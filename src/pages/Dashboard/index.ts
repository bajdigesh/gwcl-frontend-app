import { lazy } from 'react';

const Dashboard = lazy(() => import(/* webpackChunkName: "Dashboard" */ './Dashboard'));
export default Dashboard;
