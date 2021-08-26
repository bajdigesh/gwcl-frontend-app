import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from 'global/endpoints';
import { userFormData } from 'pages/Users/RightDrawer/UserForm/schema';
import { IGetUsersSearchQuery } from 'pages/Users/Shared/types';
import { technicianFormData } from 'pages/Users/Technicians/schema';
import apiService from 'service/apiService';
import { encodeQuery, isEmptyObject } from 'utils';
import { matcherNamespace } from './slice';

export const getUsers = createAsyncThunk(
  matcherNamespace + '/[getUsers]',
  async (searchQuery: IGetUsersSearchQuery) => {
    const getUsersEndPoint = isEmptyObject(searchQuery)
      ? endpoints.user.users
      : endpoints.user.users + '?' + encodeQuery(searchQuery);
    const response = await apiService({}).get(getUsersEndPoint);
    return response;
  }
);

export const getInactiveUsers = createAsyncThunk(
  matcherNamespace + '/[getInactiveUsers]',
  async (searchQuery: IGetUsersSearchQuery) => {
    const getUsersEndPoint = isEmptyObject(searchQuery)
      ? endpoints.user.users
      : endpoints.user.users + '?' + encodeQuery(searchQuery);
    const response = await apiService({}).get(getUsersEndPoint);
    return response;
  }
);

export const getUserById = createAsyncThunk(matcherNamespace + '/[userById]', async (data: { id: string }) => {
  const getUserById = endpoints.user.userById.replace('{userId}', data.id);
  const response = await apiService({}).get(getUserById);
  return response;
});

export const saveUser = createAsyncThunk(
  matcherNamespace + '/[saveUser]',
  async (formData: typeof userFormData, { rejectWithValue }) => {
    try {
      let response;
      if (formData.id) {
        response = await apiService({}).put(endpoints.user.users, formData);
      } else {
        const { id, ...postData } = formData;
        response = await apiService({}).post(endpoints.user.users, postData);
      }
      return { ...response, showSuccessToast: true };
    } catch (err) {
      return rejectWithValue(err?.errors);
    }
  }
);

export const updateUserActivationById = createAsyncThunk(
  matcherNamespace + '/[updateUserActivationById]',
  async (data: { id: string; value: any }) => {
    const patchEndPoints = endpoints.user.userActivationById.replace('{userId}', data.id);
    const response = await apiService({}).patch(patchEndPoints, data);
    return { ...response, showSuccessToast: true };
  }
);

export const updateMultipleUsersActivation = createAsyncThunk(
  matcherNamespace + '/[updateMultipleUsersActivation]',
  async (data: { ids: Array<number>; value: any }) => {
    const response = await apiService({}).patch(endpoints.user.usersActivation, data);
    return { ...response, showSuccessToast: true };
  }
);

export const deleteUserById = createAsyncThunk(matcherNamespace + '/[deleteUserById]', async (data: { id: number }) => {
  const deleteEndpoints = endpoints.user.userById.replace('{userId}', data.id.toString());

  const response = await apiService({}).delete(deleteEndpoints);
  return { ...response, showSuccessToast: true };
});

export const deleteMultipleUsers = createAsyncThunk(
  matcherNamespace + '/[deleteMultipleUsers]',
  async (data: { ids: Array<number> }) => {
    const response = await apiService({}).delete(endpoints.user.users, data);
    return { ...response, showSuccessToast: true };
  }
);

export const getDistricts = createAsyncThunk(
  matcherNamespace + '/[getDistricts]',
  async (searchQuery: { [key: string]: string } = {}) => {
    const getDistrictsEndPoint = isEmptyObject(searchQuery)
      ? endpoints.common.districts
      : endpoints.common.districts + '?' + encodeQuery(searchQuery);
    const response = await apiService({}).get(getDistrictsEndPoint);
    return response;
  }
);

export const getTechnicians = createAsyncThunk(
  matcherNamespace + '/[getTechnicians]',
  async (searchQuery: IGetUsersSearchQuery) => {
    const getUsersEndPoint = isEmptyObject(searchQuery)
      ? endpoints.user.technicians
      : endpoints.user.technicians + '?' + encodeQuery(searchQuery);
    const response = await apiService({}).get(getUsersEndPoint);
    return response;
  }
);

export const saveTechnician = createAsyncThunk(
  matcherNamespace + '/[saveTechnician]',
  async (formData: typeof technicianFormData) => {
    let response;
    if (formData.id) {
      response = await apiService({}).put(endpoints.user.technicians, formData);
    } else {
      const { id, ...postData } = formData;
      response = await apiService({}).post(endpoints.user.technicians, postData);
    }
    return { ...response, showSuccessToast: true };
  }
);

export const getTechnicianById = createAsyncThunk(
  matcherNamespace + '/[technicianById]',
  async (data: { id: string }) => {
    const getTechnicianById = endpoints.user.technicianById.replace('{technicianId}', data.id);
    const response = await apiService({}).get(getTechnicianById);
    return response;
  }
);

export const deleteTechnicianById = createAsyncThunk(
  matcherNamespace + '/[deleteTechnicianById]',
  async (data: { id: number }) => {
    const deleteEndpoints = endpoints.user.technicianById.replace('{technicianId}', data.id.toString());

    const response = await apiService({}).delete(deleteEndpoints);
    return { ...response, showSuccessToast: true };
  }
);
