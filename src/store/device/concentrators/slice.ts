import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { TFulfilledAction, TPendingAction, TRejectedAction } from 'types/store';
import { handleFulfilledMatcherCase, handlePendingMatcherCase, handleRejectedMatcherCase } from 'utils';

export const namespace = 'devices/concentrators';

// Reducer Matcher Case
function isPendingAction(action: AnyAction): action is TPendingAction {
  return action.type.includes(namespace) && action.type.endsWith('pending');
}

function isFulfilledAction(action: AnyAction): action is TFulfilledAction {
  return action.type.includes(namespace) && action.type.endsWith('fulfilled');
}

function isRejectedAction(action: AnyAction): action is TRejectedAction {
  return action.type.includes(namespace) && action.type.endsWith('rejected');
}

// INITIAL STATE
const initialCommonState = { status: null, data: null };

const initialState: Record<string, ISliceState<any>> = {
  bulkLinkConcentratorWithMeterState: initialCommonState,
  bulkUnLinkConcentratorWithMeterState: initialCommonState,
  downloadConcentratorMetersState: initialCommonState,
  deleteConcentratorByIdState: initialCommonState,
  getConcentratorByIdState: initialCommonState,
  getConcentratorHistoriesByIdState: initialCommonState,
  getConcentratorsState: initialCommonState,
  getMetersByConcentratorIdState: initialCommonState,
  linkConcentratorWithMeterState: initialCommonState,
  saveConcentratorState: initialCommonState,
  unLinkConcentratorWithMeterState: initialCommonState,
  updateConcentratorClockCalibrationState: initialCommonState,
  updateConcentratorIpState: initialCommonState,
  resetGPRSState: initialCommonState,
};

// Slice
const concentratorsApiSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    resetDownloadConcentratorMetersState: state => {
      state.downloadConcentratorMetersState = initialCommonState;
    },
    resetGetConcentratorsState: state => {
      state.getConcentratorsState = initialCommonState;
    },
    resetGetConcentratorByIdState: state => {
      state.getConcentratorByIdState = initialCommonState;
    },
    resetGetMetersByConcentratorState: state => {
      state.getMetersByConcentratorIdState = initialCommonState;
    },
    resetResetGPRSState: state => {
      state.resetGPRSState = initialCommonState;
    },
    resetUpdateConcentratorClockCalibrationState: state => {
      state.updateConcentratorClockCalibrationState = initialCommonState;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(isPendingAction, handlePendingMatcherCase)
      .addMatcher(isFulfilledAction, handleFulfilledMatcherCase)
      .addMatcher(isRejectedAction, handleRejectedMatcherCase)
      .addDefaultCase(state => state);
  },
});

export const {
  resetDownloadConcentratorMetersState,
  resetGetConcentratorsState,
  resetGetConcentratorByIdState,
  resetGetMetersByConcentratorState,
  resetResetGPRSState,
  resetUpdateConcentratorClockCalibrationState,
} = concentratorsApiSlice.actions;
export default concentratorsApiSlice.reducer;
