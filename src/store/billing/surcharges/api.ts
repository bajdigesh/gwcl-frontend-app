import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from 'global/endpoints';
import apiService from 'service/apiService';
import { encodeQuery, isEmptyObject } from 'utils';
import { matcherNameSpace } from './slice';
import { ISurcharges } from './types';

const surchargeEndpoints = endpoints.billing.surcharges;

//API CALLS
export const getSurcharges = createAsyncThunk(
  matcherNameSpace + '/[getSurcharges]',
  async (searchQuery: ISurcharges) => {
    const { resetData, ...originalSearchQuery } = searchQuery;
    const endpoints = isEmptyObject(originalSearchQuery)
      ? surchargeEndpoints.surcharges
      : surchargeEndpoints.surcharges + '?' + encodeQuery(originalSearchQuery);
    const response = await apiService({}).get(endpoints);
    return { ...response, resetData: resetData || false };
  }
);

export const saveSurcharges = createAsyncThunk(
  matcherNameSpace + '/[saveSurcharge]',
  async (formData: any, { rejectWithValue }) => {
    try {
      let response;
      if (formData.id) {
        response = await apiService({}).put(surchargeEndpoints.surcharges, formData);
      } else {
        const { id, ...postData } = formData;
        response = await apiService({}).post(surchargeEndpoints.surcharges, postData);
      }
      return { ...response, showSuccessToast: true };
    } catch (err) {
      return rejectWithValue(err?.errors);
    }
  }
);
