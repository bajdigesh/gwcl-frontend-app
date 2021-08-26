import { lazy } from 'react';

const ThirdPartyPaypoint = lazy(
  () => import(/* webpackChunkName: "RecievedPaymentsThirdPartyPaypoint" */ './ThirdPartyPaypoint')
);
export default ThirdPartyPaypoint;
