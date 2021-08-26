import { lazy } from 'react';

const Phones = lazy(() => import(/* webpackChunkName: "Phones"*/ './Phones'));
export default Phones;
