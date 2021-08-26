import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';

export const selectGetServiceAgreements = (state: RootState) =>
  state.billing.serviceAgreement.getServiceAgreementsState;

const selectGetServiceAgreementsOptionData = (state: RootState) =>
  state.billing.serviceAgreement.getServiceAgreementsOptionState.data;
export const selectGetServiceAgreementsOptionStatus = (state: RootState) =>
  state.billing.serviceAgreement.getServiceAgreementsOptionState.status;

export const selectSaveServiceAgreements = (state: RootState) =>
  state.billing.serviceAgreement.saveServiceAgreementsState;

// Memoized selector
export const selectServiceAgreementOptions = createDraftSafeSelector(
  selectGetServiceAgreementsOptionStatus,
  selectGetServiceAgreementsOptionData,
  (status, data) => {
    if (status === 'success') {
      return data.payload.map((item: any) => ({ label: item.name, value: item.id }));
    } else {
      return [];
    }
  }
);
