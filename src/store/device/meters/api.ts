import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from 'global/endpoints';
import { IInitialFinalReadingsQuery, IMeterSearchQuery } from 'pages/Devices/Shared/types';
import apiService from 'service/apiService';
import { encodeQuery, isEmptyObject } from 'utils';
import { meterFormData } from 'pages/Devices/RightDrawer/MeterForm/schema';
import { matcherNameSpace as namespace } from './slice';

const meterEndPoints = endpoints.devices.meters;

// API CALLS
export const getMeters = createAsyncThunk(namespace + '/[getMeters]', async (searchQuery: IMeterSearchQuery) => {
  const getMeterEndPoints = isEmptyObject(searchQuery)
    ? meterEndPoints.meters
    : meterEndPoints.meters + '?' + encodeQuery(searchQuery);
  const response = await apiService({}).get(getMeterEndPoints);
  return response;
});

export const getMeterById = createAsyncThunk(namespace + '/[getMeterById]', async (id: string) => {
  const meterById = meterEndPoints.meterById.replace('{meterId}', id);
  const response = await apiService({}).get(meterById);
  return response;
});

export const saveMeter = createAsyncThunk(namespace + '/[saveMeter]', async (formData: typeof meterFormData) => {
  let response;
  if (formData.id) {
    response = await apiService({}).put(meterEndPoints.meters, formData);
  } else {
    const { id, ...postData } = formData;
    response = await apiService({}).post(meterEndPoints.meters, postData);
  }
  return { ...response, showSuccessToast: true };
});

export const deleteMeterById = createAsyncThunk(namespace + '/[deleteMeterById]', async (id: string) => {
  const meterById = meterEndPoints.meterById.replace('{meterId}', id);
  const response = await apiService({}).delete(meterById, { action: 'delete' });
  const responseWithSuccessToast = { ...response, showSuccessToast: true };
  return responseWithSuccessToast;
});

export const getMeterByMeterNumber = createAsyncThunk(
  namespace + '/[getMeterByMeterNumber]',
  async (meterNumber: string) => {
    const endPoint = meterEndPoints.meterByMeterNumber.replace('{meterNumber}', meterNumber);
    const response = await apiService({}).get(endPoint);
    return response;
  }
);

export const uploadMetersCsv = createAsyncThunk(namespace + '/[uploadMetersCsv]', async (formData: FormData) => {
  const response = await apiService({ headerType: 'multipart' }).post(meterEndPoints.meterCsvUploads, formData);
  return response;
});

export const changeValveStatusByMeterNumber = createAsyncThunk(
  namespace + '/[changeValveStatusByMeterNumber]',
  async (data: { meterNumber: string; type: string }) => {
    let endPoint;
    if (data.type === 'open') {
      endPoint = meterEndPoints.meterValveOpening.replace('{meterNumber}', data.meterNumber);
    } else {
      endPoint = meterEndPoints.meterValveClosing.replace('{meterNumber}', data.meterNumber);
    }
    const response = await apiService({}).patch(endPoint, '');
    return response;
  }
);
export const getMeterBrands = createAsyncThunk(namespace + '/[getMeterBrands]', async () => {
  const response = await apiService({}).get(meterEndPoints.meterBrands);
  return response;
});
export const getMeterModels = createAsyncThunk(namespace + '/[getMeterModels]', async () => {
  const response = await apiService({}).get(meterEndPoints.meterModels);
  return response;
});
export const getMeterSizes = createAsyncThunk(namespace + '/[getMeterSizes]', async () => {
  const response = await apiService({}).get(meterEndPoints.meterSizes);
  return response;
});
export const getMeterTypes = createAsyncThunk(namespace + '/[getMeterTypes]', async () => {
  const response = await apiService({}).get(meterEndPoints.meterTypes);
  return response;
});
export const getMeterStatus = createAsyncThunk(namespace + '/[getMeterStatus]', async () => {
  const response = await apiService({}).get(meterEndPoints.meterStatus);
  return response;
});
export const getMeterStates = createAsyncThunk(namespace + '/[getMeterStates]', async () => {
  const response = await apiService({}).get(meterEndPoints.meterStates);
  return response;
});
export const getMeterInstallStages = createAsyncThunk(namespace + '/[getMeterInstallStages]', async () => {
  const response = await apiService({}).get(meterEndPoints.meterInstallStages);
  return response;
});
export const getMeterReadings = createAsyncThunk(
  namespace + '/[getMeterReadings]',
  async (data: { id: string; requestQuery: IMeterSearchQuery }) => {
    const meterReadingsById = meterEndPoints.meterReadings.replace('{meterId}', data.id);
    const getMeterReadingsByQuery = isEmptyObject(data.requestQuery)
      ? meterReadingsById
      : meterReadingsById + '?' + encodeQuery(data.requestQuery);
    const response = await apiService({}).get(getMeterReadingsByQuery);
    return response;
  }
);
export const getMeterInstallationHistory = createAsyncThunk(
  namespace + '/[getMeterInstallationHistory]',
  async (id: string) => {
    const meterInstallationHistoryById = meterEndPoints.meterInstallationHistory.replace('{meterId}', id);
    const response = await apiService({}).get(meterInstallationHistoryById);
    return response;
  }
);
export const getMeterInitialFinalReadings = createAsyncThunk(
  namespace + '/[getMeterInitialFinalReadings]',
  async (data: { id: string; requestQuery: IInitialFinalReadingsQuery }) => {
    const getMeterInitialFinalReadingsById = meterEndPoints.meterInitialFinalReadings.replace('{meterId}', data.id);
    const getMeterInitialFinalReadingsByQuery = isEmptyObject(data.requestQuery)
      ? getMeterInitialFinalReadingsById
      : getMeterInitialFinalReadingsById + '?' + encodeQuery(data.requestQuery);
    const response = await apiService({}).get(getMeterInitialFinalReadingsByQuery);
    return response;
  }
);
