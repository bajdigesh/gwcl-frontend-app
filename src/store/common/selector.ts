import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';

export const selectDistrictsData = (state: RootState) => state.common.districtsState.data;
export const selectDistrictsStatus = (state: RootState) => state.common.districtsState.status;
export const selectRolesStatus = (state: RootState) => state.common.rolesState.status;
export const selectRolesData = (state: RootState) => state.common.rolesState.data;
export const selectRegionsStatus = (state: RootState) => state.common.regionsState.status;
export const selectRegionsData = (state: RootState) => state.common.regionsState.data;
export const selectRoutesStatus = (state: RootState) => state.common.routesState.status;
export const selectRoutesData = (state: RootState) => state.common.routesState.data;

/**
 * createDraftSafeSelector is for memoized safe selector to perform operation for changing store data format without managing internal component state
 */
export const selectRolesOptions = createDraftSafeSelector(selectRolesStatus, selectRolesData, (status, data) => {
  if (status === 'success') {
    return data.payload.map((item: any) => ({ label: item.name, value: item.id }));
  } else {
    return [];
  }
});

export const selectRegionsOptions = createDraftSafeSelector(selectRegionsStatus, selectRegionsData, (status, data) => {
  if (status === 'success') {
    return data.payload.map((item: any) => ({ label: item.region_name, value: item.id }));
  } else {
    return [];
  }
});

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

export const selectRoutesOptions = createDraftSafeSelector(selectRoutesStatus, selectRoutesData, (status, data) => {
  if (status === 'success') {
    return data.payload.map((item: any) => ({ label: item.route_name, value: item.id }));
  } else {
    return [];
  }
});
