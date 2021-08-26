import { RootState } from 'store/rootReducer';
export const selectGetSurcharges = (state: RootState) => state.billing.surcharges.getSurchargesState;
export const selectSaveSurcharge = (state: RootState) => state.billing.surcharges.saveSurchargeState;
