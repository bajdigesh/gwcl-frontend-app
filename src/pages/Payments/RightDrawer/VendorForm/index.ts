import { lazy } from 'react';

const VendorForm = lazy(() => import(/* webpackChunkName: "PaymentsVendorForm" */ './VendorForm'));
export default VendorForm;
