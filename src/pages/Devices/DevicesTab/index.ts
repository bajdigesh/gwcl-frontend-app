import { lazy } from 'react';

const DevicesTab = lazy(() => import(/* webpackChunkName: "DevicesTab"*/ './DevicesTab'));
export default DevicesTab;
