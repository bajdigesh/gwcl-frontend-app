import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';

export const selectGetConcentratorStatus = (state: RootState) =>
  state.device.concentratorStatus.getConcentratorStatusState;
export const selectGetConcentratorStatusStatus = (state: RootState) =>
  state.device.concentratorStatus.getConcentratorStatusState.status;
const selectGetConcentratorStatusData = (state: RootState) =>
  state.device.concentratorStatus.getConcentratorStatusState.data;

export const selectConcentratorStatusOptions = createDraftSafeSelector(
  selectGetConcentratorStatusStatus,
  selectGetConcentratorStatusData,
  (status, data) => {
    if (status === 'success') {
      return data.payload.map((item: any) => ({ label: item.name, value: item.id }));
    } else {
      return [];
    }
  }
);
