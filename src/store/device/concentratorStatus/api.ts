import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from 'global/endpoints';
import apiService from 'service/apiService';
import { namespace } from './slice';

const concentratorStatusEndpoint = endpoints.devices.concentratorStatus;

// API CALLS
export const getConcentratorStatus = createAsyncThunk(namespace + '/[getConcentratorStatus]', async () => {
  const response = await apiService({}).get(concentratorStatusEndpoint.concentratorStatus);
  return response;
});
