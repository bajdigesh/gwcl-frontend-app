import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from 'global/endpoints';
import { IServiceAgreementQuery } from './types';
import apiService from 'service/apiService';
import { encodeQuery, isEmptyObject } from 'utils';
import { matcherNameSpace } from './slice';

const serviceEndpoints = endpoints.billing.serviceAgreement;

/** resetData keyword is added to reset the infinite scrolling data if resetData appears true
 *  resetData keyword is not related to searchQuery
 */
const handleGetServiceAgreementsApiCall = async (searchQuery: IServiceAgreementQuery) => {
  const { resetData, ...originalSearchQuery } = searchQuery;
  const endpoints = isEmptyObject(originalSearchQuery)
    ? serviceEndpoints.serviceAgreement
    : serviceEndpoints.serviceAgreement + '?' + encodeQuery(originalSearchQuery);
  const response = await apiService({}).get(endpoints);
  return { ...response, resetData: resetData || false };
};

// API CALLS
export const getServiceAgreements = createAsyncThunk(
  matcherNameSpace + '/[getServiceAgreements]',
  handleGetServiceAgreementsApiCall
);

// API CALLS
export const getServiceAgreementsOption = createAsyncThunk(
  matcherNameSpace + '/[getServiceAgreementsOption]',
  handleGetServiceAgreementsApiCall
);

export const saveServiceAgreements = createAsyncThunk(
  matcherNameSpace + '/[saveServiceAgreements]',
  async (formData: any, { rejectWithValue }) => {
    try {
      let response;
      if (formData.id) {
        response = await apiService({}).put(serviceEndpoints.serviceAgreement, formData);
      } else {
        const { id, ...postData } = formData;
        response = await apiService({}).post(serviceEndpoints.serviceAgreement, postData);
      }
      return { ...response, showSuccessToast: true };
    } catch (err) {
      return rejectWithValue(err?.errors);
    }
  }
);
