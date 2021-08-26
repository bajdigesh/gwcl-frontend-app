import { RootState } from 'store/rootReducer';

export const selectGetServiceRates = (state: RootState) => state.billing.serviceRates.getServiceRatesState;
export const selectGetServiceRatesByServiceAgreement = (state: RootState) =>
  state.billing.serviceRates.getServiceRatesByServiceAgreementState;
export const selectGetServiceRatesHistoriesByServiceAgreeementId = (state: RootState) =>
  state.billing.serviceRates.getServiceRatesHistoriesByServiceAgreeementIdState;
export const selectSaveServiceRate = (state: RootState) => state.billing.serviceRates.saveServiceRateState;
