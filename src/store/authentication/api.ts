import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from 'global/endpoints';
import apiService from 'service/apiService';
import { matcherNamespace, resetCreatePassword, resetForgotPassword, resetResetPassword } from './slice';

/**
 * matcherNamespace is used for default matchercase slice state use [stateName] for type
 * namespace is used for addCase in which we have to add addCase for respective actions use stateName for type
 */

export const createPassword = createAsyncThunk(
  matcherNamespace + '/[createPassword]',
  async (postData: any, { dispatch }) => {
    const response = await apiService({}).post(endpoints.auth.createPassword, postData);
    if (response.status === 'ok') {
      setTimeout(() => {
        dispatch(resetCreatePassword());
      }, 100);
    }
    const updatedResponse = { ...response, showSuccessToast: true };
    return updatedResponse;
  }
);

export const emailVerification = createAsyncThunk(
  matcherNamespace + '/[emailVerification]',
  async (postData: any, { dispatch }) => {
    const response = await apiService({}).post(endpoints.auth.emailVerification, postData);
    return response;
  }
);

export const forgotPassword = createAsyncThunk(
  matcherNamespace + '/[forgotPassword]',
  async (postData: any, { dispatch }) => {
    const response = await apiService({}).post(endpoints.auth.forgotPassword, postData);
    if (response.status === 'ok') {
      setTimeout(() => {
        dispatch(resetForgotPassword());
      }, 100);
    }
    const updatedResponse = { ...response, showSuccessToast: true };
    return updatedResponse;
  }
);

export const resetPassword = createAsyncThunk(
  matcherNamespace + '/[resetPassword]',
  async (postData: any, { dispatch }) => {
    const response = await apiService({}).post(endpoints.auth.resetPassword, postData);
    if (response.status === 'ok') {
      setTimeout(() => {
        dispatch(resetResetPassword());
      }, 100);
    }
    const updatedResponse = { ...response, showSuccessToast: true };
    return updatedResponse;
  }
);
