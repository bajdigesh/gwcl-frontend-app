import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { TFulfilledAction, TPendingAction, TRejectedAction } from 'types/store';
import {
  commonInitialState,
  handleFulfilledMatcherCase,
  handlePendingMatcherCase,
  handleRejectedMatcherCase,
} from 'utils';

const namespace = 'billing/surcharges';
export const matcherNameSpace = namespace + '/matcher';

// Reducer Matcher Case
function isPendingAction(action: AnyAction): action is TPendingAction {
  return action.type.includes(matcherNameSpace) && action.type.endsWith('pending');
}

function isFulfilledAction(action: AnyAction): action is TFulfilledAction {
  return action.type.includes(matcherNameSpace) && action.type.endsWith('fulfilled');
}

function isRejectedAction(action: AnyAction): action is TRejectedAction {
  return action.type.includes(matcherNameSpace) && action.type.endsWith('rejected');
}

const initialState: Record<string, ISliceState<any>> = {
  getSurchargesState: commonInitialState,
  saveSurchargeState: commonInitialState,
};

// Slice
const surcharges = createSlice({
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

export const {} = surcharges.actions;
export default surcharges.reducer;
