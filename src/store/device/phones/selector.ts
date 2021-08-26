import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';

export const selectGetPhonesState = (state: RootState) => state.device.phones.getPhonesState;
export const selectGetPhoneByIdState = (state: RootState) => state.device.phones.getPhoneByIdState;
export const selectGetPhoneHistoriesByIdState = (state: RootState) => state.device.phones.getPhoneHistoriesByIdState;
export const selectGetPhoneStatusState = (state: RootState) => state.device.phones.getPhoneStatusState;
const selectGetPhoneStatusData = (state: RootState) => state.device.phones.getPhoneStatusState.data;
const selectGetPhoneStatusStatus = (state: RootState) => state.device.phones.getPhoneStatusState.status;

export const selectGetPhoneModelState = (state: RootState) => state.device.phones.getPhoneModelState;
const selectGetPhoneModelData = (state: RootState) => state.device.phones.getPhoneModelState.data;
const selectGetPhoneModelStatus = (state: RootState) => state.device.phones.getPhoneModelState.status;
export const selectSavePhone = (state: RootState) => state.device.phones.savePhoneState;

export const selectDeletePhoneById = (state: RootState) => state.device.phones.deletePhoneByIdState;

export const selectPhoneStatusOptions = createDraftSafeSelector(
  selectGetPhoneStatusStatus,
  selectGetPhoneStatusData,
  (status, data) => {
    if (status === 'success') {
      return data.payload.map((item: any) => ({ label: item.name, value: item.id }));
    } else {
      return [];
    }
  }
);

export const selectPhoneModelOptions = createDraftSafeSelector(
  selectGetPhoneModelStatus,
  selectGetPhoneModelData,
  (status, data) => {
    if (status === 'success') {
      return data.payload.map((item: any) => ({ label: item.name, value: item.id }));
    } else {
      return [];
    }
  }
);
