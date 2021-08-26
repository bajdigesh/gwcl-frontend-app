import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { TFulfilledAction, TPendingAction, TRejectedAction } from 'types/store';
import { handleFulfilledMatcherCase, handlePendingMatcherCase, handleRejectedMatcherCase } from 'utils';

export const namespace = 'common/matcher';

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

// Initial Data
const initialCommonApiData = { data: [], status: null };
const initialState: Record<string, ISliceState<any>> = {
  districtsState: initialCommonApiData,
  rolesState: initialCommonApiData,
  regionsState: initialCommonApiData,
  routesState: initialCommonApiData,
};

// Slice
const commonApiSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    resetDistrictStore: state => {
      state.districts = initialCommonApiData;
    },
    resetRolesStore: state => {
      state.roles = initialCommonApiData;
    },
    resetRegions: state => {
      state.regions = initialCommonApiData;
    },
    resetRoutes: state => {
      state.routes = initialCommonApiData;
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

export const { resetDistrictStore, resetRolesStore, resetRegions, resetRoutes } = commonApiSlice.actions;

export default commonApiSlice.reducer;
