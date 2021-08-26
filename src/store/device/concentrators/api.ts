import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from 'global/endpoints';
import { IConcentratorSearchQuery, IGetMetersByConcentratorIdSearchQuery } from 'pages/Devices/Shared/types';
import apiService from 'service/apiService';
import { encodeQuery, isEmptyObject } from 'utils';
import { namespace } from './slice';

interface IGetMetersByConcentratorIdParams {
  id: string;
  searchQuery: IGetMetersByConcentratorIdSearchQuery;
}

const concentratorEndPoints = endpoints.devices.concentrators;

// API CALLS

export const bulkLinkConcentratorWithMeter = createAsyncThunk(
  namespace + '/[bulkLinkConcentratorWithMeter]',
  async ({ concentratorId, postData }: { concentratorId: string; postData: { meter_ids: Array<number> } }) => {
    const endpoints = concentratorEndPoints.concentratorMeterBulklink.replace('{concentratorId}', concentratorId);
    const response = await apiService({}).post(endpoints, postData);
    const responseWithSuccessToast = { ...response, showSuccessToast: true };
    return responseWithSuccessToast;
  }
);

export const bulkUnLinkConcentratorWithMeter = createAsyncThunk(
  namespace + '/[bulkUnLinkConcentratorWithMeter]',
  async ({ concentratorId, postData }: { concentratorId: string; postData: { meter_ids: Array<number> } }) => {
    const endpoints = concentratorEndPoints.concentratorMeterBulkUnlink.replace('{concentratorId}', concentratorId);
    const response = await apiService({}).delete(endpoints, postData);
    const responseWithSuccessToast = { ...response, showSuccessToast: true };
    return responseWithSuccessToast;
  }
);

export const deleteConcentratorById = createAsyncThunk(
  namespace + '/[deleteConcentratorById]',
  async (data: { id: number }) => {
    const deleteEndpoints = concentratorEndPoints.concentratorById.replace('{concentratorId}', data.id.toString());

    const response = await apiService({}).delete(deleteEndpoints);
    return { ...response, showSuccessToast: true };
  }
);

export const downloadConcentratorMeters = createAsyncThunk(
  namespace + '/[downloadConcentratorMeters]',
  async (id: string) => {
    const endpoints = concentratorEndPoints.downloadMeters.replace('{concentratorId}', id);
    const response = await apiService({}).get(endpoints);
    return response;
  }
);

export const getConcentrators = createAsyncThunk(
  namespace + '/[getConcentrators]',
  async (searchQuery: IConcentratorSearchQuery) => {
    const endpoints = isEmptyObject(searchQuery)
      ? concentratorEndPoints.concentrators
      : concentratorEndPoints.concentrators + '?' + encodeQuery(searchQuery);
    const response = await apiService({}).get(endpoints);
    return response;
  }
);

export const getConcentratorById = createAsyncThunk(namespace + '/[getConcentratorById]', async (id: string) => {
  const endpoints = concentratorEndPoints.concentratorById.replace('{concentratorId}', id);
  const response = await apiService({}).get(endpoints);
  return response;
});

export const getConcentratorHistoriesById = createAsyncThunk(
  namespace + '/[getConcentratorHistoriesById]',
  async (id: string) => {
    const endpoints = concentratorEndPoints.concentratorHistoriesById.replace('{concentratorId}', id);
    const response = await apiService({}).get(endpoints);
    return response;
  }
);

export const getMetersByConcentratorId = createAsyncThunk(
  namespace + '/[getMetersByConcentratorId]',
  async ({ id, searchQuery }: IGetMetersByConcentratorIdParams) => {
    let endpoints = concentratorEndPoints.metersByConcentratorId.replace('{concentratorId}', id);
    endpoints = isEmptyObject(searchQuery) ? endpoints : endpoints + '?' + encodeQuery(searchQuery);
    const response = await apiService({}).get(endpoints);
    return response;
  }
);

export const linkConcentratorWithMeter = createAsyncThunk(
  namespace + '/[linkConcentratorWithMeter]',
  async ({ concentratorId, postData }: { concentratorId: string; postData: { meter_id: number } }) => {
    const endpoints = concentratorEndPoints.metersByConcentratorId.replace('{concentratorId}', concentratorId);
    const response = await apiService({}).post(endpoints, postData);
    const responseWithSuccessToast = { ...response, showSuccessToast: true };
    return responseWithSuccessToast;
  }
);

export const resetGPRS = createAsyncThunk(namespace + '/[resetGPRS]', async (concentratorId: string) => {
  const endpoints = concentratorEndPoints.resetGPRS.replace('{concentratorId}', concentratorId);
  const response = await apiService({}).patch(endpoints, null);
  const responseWithSuccessToast = { ...response, showSuccessToast: true };
  return responseWithSuccessToast;
});

export const saveConcentrator = createAsyncThunk(
  namespace + '/[saveConcentrator]',
  async (formData: any, { rejectWithValue }) => {
    try {
      let response;
      if (formData.id) {
        response = await apiService({}).put(concentratorEndPoints.concentrators, formData);
      } else {
        const { id, ...postData } = formData;
        response = await apiService({}).post(concentratorEndPoints.concentrators, postData);
      }
      return { ...response, showSuccessToast: true };
    } catch (err) {
      return rejectWithValue(err?.errors);
    }
  }
);

export const unLinkConcentratorWithMeter = createAsyncThunk(
  namespace + '/[unLinkConcentratorWithMeter]',
  async ({ concentratorId, postData }: { concentratorId: string; postData: { meter_id: number } }) => {
    const endpoints = concentratorEndPoints.metersByConcentratorId.replace('{concentratorId}', concentratorId);
    const response = await apiService({}).delete(endpoints, postData);
    const responseWithSuccessToast = { ...response, showSuccessToast: true };
    return responseWithSuccessToast;
  }
);

export const updateConcentratorIp = createAsyncThunk(
  namespace + '/[updateConcentratorIp]',
  async ({
    concentratorId,
    postData,
  }: {
    concentratorId: string;
    postData: { ip_address: string; ip_address_confirmation: string };
  }) => {
    const endpoints = concentratorEndPoints.updateConcentratorIp.replace('{concentratorId}', concentratorId);
    const response = await apiService({}).patch(endpoints, postData);
    const responseWithSuccessToast = { ...response, showSuccessToast: true };
    return responseWithSuccessToast;
  }
);

export const updateConcentratorClockCalibration = createAsyncThunk(
  namespace + '/[updateConcentratorClockCalibration]',
  async (concentratorId: string) => {
    const endpoints = concentratorEndPoints.updateClockCalibration.replace('{concentratorId}', concentratorId);
    const response = await apiService({}).patch(endpoints, null);
    const responseWithSuccessToast = { ...response, showSuccessToast: true };
    return responseWithSuccessToast;
  }
);
