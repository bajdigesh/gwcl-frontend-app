import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from 'global/endpoints';
import apiService from 'service/apiService';
import { encodeQuery, isEmptyObject } from 'utils';
import { namespace } from './slice';

export const getRoles = createAsyncThunk(namespace + '/[roles]', async () => {
  const response = await apiService({}).get(endpoints.common.roles);
  return response;
});

export const getRegions = createAsyncThunk(namespace + '/[regions]', async () => {
  const response = await apiService({}).get(endpoints.common.regions);
  return response;
});

export const getDistricts = createAsyncThunk(
  namespace + '/[districts]',
  async (searchQuery: { [key: string]: string } = {}) => {
    const getDistrictsEndPoint = isEmptyObject(searchQuery)
      ? endpoints.common.districts
      : endpoints.common.districts + '?' + encodeQuery(searchQuery);
    const response = await apiService({}).get(getDistrictsEndPoint);
    return response;
  }
);

export const getRoutes = createAsyncThunk(
  namespace + '/[routes]',
  async (searchQuery: { [key: string]: string } = {}) => {
    const getRoutesEnpoints = isEmptyObject(searchQuery)
      ? endpoints.common.routes
      : endpoints.common.routes + '?' + encodeQuery(searchQuery);
    const response = await apiService({}).get(getRoutesEnpoints);
    return response;
  }
);
