import { lazy } from 'react';

const ReceivedPayments = lazy(() => import(/* webpackChunkName: "ReceivedPayments" */ './ReceivedPayments'));

export default ReceivedPayments;
