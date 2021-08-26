import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { TFulfilledAction, TPendingAction, TRejectedAction } from 'types/store';
import {
  commonInitialState,
  handleFulfilledMatcherCase,
  handlePendingMatcherCase,
  handleRejectedMatcherCase,
} from 'utils';
const namespace = 'devices/phones';

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

// INITIAL STATE

const initialState: Record<string, ISliceState<any>> = {
  getPhonesState: commonInitialState,
  getPhoneStatusState: commonInitialState,
  getPhoneByIdState: commonInitialState,
  getPhoneModelState: commonInitialState,
  getPhoneHistoriesByIdState: commonInitialState,
  savePhoneState: commonInitialState,
  deletePhoneByIdState: commonInitialState,
};

// Slice
const phonesApiSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    resetGetPhonesState: state => {
      state.getPhonesState = commonInitialState;
    },
    resetGetPhoneByIdState: state => {
      state.getPhoneByIdState = commonInitialState;
    },
    resetGetPhoneHistoriesByIdState: state => {
      state.getPhoneHistoriesByIdState = commonInitialState;
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

export const { resetGetPhonesState, resetGetPhoneByIdState, resetGetPhoneHistoriesByIdState } = phonesApiSlice.actions;
export default phonesApiSlice.reducer;
