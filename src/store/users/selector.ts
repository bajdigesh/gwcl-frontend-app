import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';

const selectGetUsersStatus = (state: RootState) => state.users.getUsersState.status;
const selectGetUsersData = (state: RootState) => state.users.getUsersState.data;
export const selectGetUsers = (state: RootState) => state.users.getUsersState;
export const selectGetInactiveUsers = (state: RootState) => state.users.getInactiveUsersState;
export const selectUserById = (state: RootState) => state.users.userByIdState;
export const selectSaveUser = (state: RootState) => state.users.saveUserState;
export const selectUpdateUserActivationById = (state: RootState) => state.users.updateUserActivationByIdState;
export const selectUpdateMultipleUsersActivation = (state: RootState) => state.users.updateMultipleUsersActivationState;
export const selectDeleteMultipleUsers = (state: RootState) => state.users.deleteMultipleUsersState;
export const selectDeleteUserById = (state: RootState) => state.users.deleteUserByIdState;
export const selectDistrictsData = (state: RootState) => state.users.getDistrictsState.data;
export const selectDistrictsStatus = (state: RootState) => state.users.getDistrictsState.status;
export const selectGetTechnicians = (state: RootState) => state.users.getTechniciansState;
export const selectSaveTechnician = (state: RootState) => state.users.saveTechnicianState;
export const selectTechnicianById = (state: RootState) => state.users.technicianByIdState;
export const selectDeleteTechnicianById = (state: RootState) => state.users.deleteTechnicianByIdState;

/**
 * createDraftSafeSelector is for memoized safe selector to perform operation for changing store data format without managing internal component state
 */

export const selectDistrictsOptions = createDraftSafeSelector(
  selectDistrictsStatus,
  selectDistrictsData,
  (status, data) => {
    if (status === 'success') {
      return data.payload.map((item: any) => ({ label: item.district_name, value: item.id }));
    } else {
      return [];
    }
  }
);

export const selectUsersOptions = createDraftSafeSelector(selectGetUsersStatus, selectGetUsersData, (status, data) => {
  if (status === 'success') {
    return data.payload.map((item: any) => ({ label: item.first_name, value: item.id }));
  } else {
    return [];
  }
});
