import { combineReducers } from '@reduxjs/toolkit';
import { serviceAgreementReducer } from './serviceAgreements';
import { serviceRatesReducer } from './serviceRates';
import { surchargesReducer } from './surcharges';

const billingReducer = combineReducers({
  serviceAgreement: serviceAgreementReducer,
  serviceRates: serviceRatesReducer,
  surcharges: surchargesReducer,
});

export default billingReducer;
