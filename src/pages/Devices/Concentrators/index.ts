import { lazy } from 'react';

const Concentrator = lazy(() => import(/* webpackChunkName: "Concentrators"*/ './Concentrators'));
export default Concentrator;
