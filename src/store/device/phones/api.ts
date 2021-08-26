import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from 'global/endpoints';
import { phoneInitialData } from 'pages/Devices/RightDrawer/AddPhone/schema';
import { IPhoneSearchQuery } from 'pages/Devices/Shared/types';
import apiService from 'service/apiService';
import { encodeQuery, isEmptyObject } from 'utils';
import { matcherNameSpace } from './slice';

const phoneEndPoints = endpoints.devices.phones;

export const getPhones = createAsyncThunk(matcherNameSpace + '/[getPhones]', async (searchQuery: IPhoneSearchQuery) => {
  const endpoints = isEmptyObject(searchQuery)
    ? phoneEndPoints.phones
    : phoneEndPoints.phones + '?' + encodeQuery(searchQuery);
  const response = await apiService({}).get(endpoints);
  return response;
});

export const getPhoneById = createAsyncThunk(matcherNameSpace + '/[getPhoneById]', async (phoneId: string) => {
  const endPoint = phoneEndPoints.phoneById.replace('{phoneId}', phoneId);
  const response = await apiService({}).get(endPoint);
  return response;
});

export const getPhoneStatus = createAsyncThunk(matcherNameSpace + '/[getPhoneStatus]', async () => {
  const response = await apiService({}).get(phoneEndPoints.phoneStatuses);
  return response;
});

export const getPhoneHistoriesById = createAsyncThunk(
  matcherNameSpace + '/[getPhoneHistoriesById]',
  async (phoneId: string) => {
    const endPoint = phoneEndPoints.phoneHistoriesById.replace('{phoneId}', phoneId);
    const response = await apiService({}).get(endPoint);
    return response;
  }
);

export const getPhoneModel = createAsyncThunk(matcherNameSpace + '/[getPhoneModel]', async () => {
  const response = await apiService({}).get(phoneEndPoints.phoneModels);
  return response;
});

export const savePhone = createAsyncThunk(
  matcherNameSpace + '/[savePhone]',
  async (formData: typeof phoneInitialData) => {
    let response;
    if (formData.id) {
      response = await apiService({}).put(phoneEndPoints.phones, formData);
    } else {
      const { id, ...postData } = formData;
      response = await apiService({}).post(phoneEndPoints.phones, postData);
    }

    return { ...response, showSuccessToast: true };
  }
);

export const deletePhoneById = createAsyncThunk(
  matcherNameSpace + '/[deletePhoneById]',
  async (data: { id: number }) => {
    const deleteEndpoints = phoneEndPoints.phoneById.replace('{phoneId}', data.id.toString());

    const response = await apiService({}).delete(deleteEndpoints);
    return { ...response, showSuccessToast: true };
  }
);
