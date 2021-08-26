import { lazy } from 'react';

const TechnicianDetail = lazy(() => import(/* webpackChunkName: "TechnicianDetails" */ './TechnicianDetail'));
export default TechnicianDetail;
