import { lazy } from 'react';

const Meters = lazy(() => import(/* webpackChunkName: "Meters"*/ './Meters'));
export default Meters;
