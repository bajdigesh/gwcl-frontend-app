import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { TFulfilledAction, TPendingAction, TRejectedAction } from 'types/store';
import { handleFulfilledMatcherCase, handlePendingMatcherCase, handleRejectedMatcherCase } from 'utils';

export const namespace = 'devices/concentrator-status';

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
  getConcentratorStatusState: initialCommonState,
};

// Slice
const concentratorStatusSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(isPendingAction, handlePendingMatcherCase)
      .addMatcher(isFulfilledAction, handleFulfilledMatcherCase)
      .addMatcher(isRejectedAction, handleRejectedMatcherCase)
      .addDefaultCase(state => state);
  },
});

export const {} = concentratorStatusSlice.actions;
export default concentratorStatusSlice.reducer;
