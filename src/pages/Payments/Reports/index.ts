import { lazy } from 'react';

const Reports = lazy(() => import(/* webpackChunkName: "PaymentsReports" */ './Reports'));

export default Reports;
