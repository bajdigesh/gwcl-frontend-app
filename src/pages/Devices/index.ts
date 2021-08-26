import { lazy } from 'react';
const Devices = lazy(() => import(/* webpackChunkName: "Devices" */ './Devices'));
export default Devices;
