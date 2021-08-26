import { lazy } from 'react';

const PhoneDetail = lazy(() => import(/* webpackChunkName: "PhoneDetail"*/ './PhoneDetail'));
export default PhoneDetail;
