import { lazy } from 'react';
const Technicians = lazy(() => import(/* webpackChunkName: "Technicians" */ './Technicians'));
export default Technicians;
