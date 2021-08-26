import { lazy } from 'react';
const NewConnectionRequest = lazy(
  () => import(/* webpackChunkName: "CustomerNewConnectionRequest" */ './NewConnectionRequest')
);
export default NewConnectionRequest;
