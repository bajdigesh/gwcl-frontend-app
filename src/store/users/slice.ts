import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { TFulfilledAction, TPendingAction, TRejectedAction } from 'types/store';
import { handleFulfilledMatcherCase, handlePendingMatcherCase, handleRejectedMatcherCase } from 'utils';

export const namespace = 'users';
export const matcherNamespace = 'users/matcher';

// Reducer Matcher Case
function isPendingAction(action: AnyAction): action is TPendingAction {
  return action.type.includes(matcherNamespace) && action.type.endsWith('pending');
}

function isFulfilledAction(action: AnyAction): action is TFulfilledAction {
  return action.type.includes(matcherNamespace) && action.type.endsWith('fulfilled');
}

function isRejectedAction(action: AnyAction): action is TRejectedAction {
  return action.type.includes(matcherNamespace) && action.type.endsWith('rejected');
}

// INITIAL STATE
const initialCommonState = { status: null, data: null };

const initialState: Record<string, ISliceState<any> | any> = {
  getUsersState: initialCommonState,
  getInactiveUsersState: initialCommonState,
  userByIdState: initialCommonState,
  saveUserState: initialCommonState,
  updateUserActivationByIdState: initialCommonState,
  updateMultipleUsersActivationState: initialCommonState,
  deleteUserByIdState: initialCommonState,
  deleteMultipleUsersState: initialCommonState,
  getDistrictsState: initialCommonState,
  getTechniciansState: initialCommonState,
  saveTechnicianState: initialCommonState,
  technicianByIdState: initialCommonState,
  deleteTechnicianByIdState: initialCommonState,
};

// Slice
const usersApiSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    resetGetUsers: state => {
      state.getUsersState = initialCommonState;
    },
    resetGetInactiveUsers: state => {
      state.getInactiveUsersState = initialCommonState;
    },
    resetUserByIdState: state => {
      state.userByIdState = initialCommonState;
    },
    resetGetTechnicians: state => {
      state.getTechniciansState = initialCommonState;
    },
    resetTechnicianByIdState: state => {
      state.technicianByIdState = initialCommonState;
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
  resetUserByIdState,
  resetGetUsers,
  resetGetInactiveUsers,
  resetGetTechnicians,
  resetTechnicianByIdState,
} = usersApiSlice.actions;
const userReducer = usersApiSlice.reducer;
export default userReducer;
