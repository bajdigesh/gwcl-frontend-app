import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from 'global/endpoints';
import apiService from 'service/apiService';
import { encodeQuery, isEmptyObject } from 'utils';
import { matcherNameSpace } from './slice';
import { IserviceRates, IServiceRatesByServiceAgreement, IServiceRatesHistoriesByServiceAgreementId } from './types';

const serviceEndpoints = endpoints.billing.serviceRates;

// API CALLS
export const getServiceRates = createAsyncThunk(
  matcherNameSpace + '/[getServiceRates]',
  async (searchQuery: IserviceRates) => {
    const endpoints = isEmptyObject(searchQuery)
      ? serviceEndpoints.serviceRates
      : serviceEndpoints.serviceRates + '?' + encodeQuery(searchQuery);
    const response = await apiService({}).get(endpoints);
    return response;
  }
);

/** resetData keyword is added to reset the infinite scrolling data if resetData appears true
 *  resetData keyword is not related to searchQuery
 */
export const getServiceRatesByServiceAgreements = createAsyncThunk(
  matcherNameSpace + '/[getServiceRatesByServiceAgreement]',
  async (searchQuery: IServiceRatesByServiceAgreement) => {
    const { resetData, ...originalSearchQuery } = searchQuery;
    const endpoints = isEmptyObject(originalSearchQuery)
      ? serviceEndpoints.serviceRatesByServiceAgreement
      : serviceEndpoints.serviceRatesByServiceAgreement + '?' + encodeQuery(originalSearchQuery);
    const response = await apiService({}).get(endpoints);
    return { ...response, resetData: resetData || false };
  }
);

export const getServiceRatesHistoriesByServiceAgreementId = createAsyncThunk(
  matcherNameSpace + '/[getServiceRatesHistoriesByServiceAgreeementId]',
  async ({ serviceAgreementId, searchQuery }: IServiceRatesHistoriesByServiceAgreementId) => {
    let endpoints = serviceEndpoints.serviceRatesHistoriesByServiceAgreeementId.replace(
      '{serviceAgreementId}',
      serviceAgreementId
    );

    endpoints = isEmptyObject(searchQuery) ? endpoints : endpoints + '?' + encodeQuery(searchQuery);

    const response = await apiService({}).get(endpoints);
    return response;
  }
);

export const saveServiceRate = createAsyncThunk(
  matcherNameSpace + '/[saveServiceRate]',
  async (formData: any, { rejectWithValue }) => {
    try {
      let response;
      if (formData.id) {
        response = await apiService({}).put(serviceEndpoints.serviceRates, formData);
      } else {
        const { id, ...postData } = formData;
        response = await apiService({}).post(serviceEndpoints.serviceRates, postData);
      }
      return { ...response, showSuccessToast: true };
    } catch (err) {
      return rejectWithValue(err?.errors);
    }
  }
);
