import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'components/Toast';
import endpoints from 'global/endpoints';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import apiService from 'service/apiService';
import tokenService from 'service/tokenService';
import { TFulfilledAction, TPendingAction, TRejectedAction } from 'types/store';
import { handleFulfilledMatcherCase, handlePendingMatcherCase, handleRejectedMatcherCase } from 'utils';

const namespace = 'auth';
export const matcherNamespace = 'auth/matcher';

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

export const postLogin = createAsyncThunk(namespace + '/postLogin', async (loginData: any) => {
  const response = await apiService({}).post(endpoints.auth.login, loginData);
  return response;
});

export const postLogout = createAsyncThunk(namespace + '/postLogout', async () => {
  const response = await apiService({}).post(endpoints.auth.logout, null);
  return response;
});

// INITIAL STATE
const initialCommonState = { status: null, data: null };

const initialState: Record<string, any> = {
  user: null,
  postLoginState: initialCommonState,
  createPasswordState: initialCommonState,
  emailVerificationState: initialCommonState,
  forgotPasswordState: initialCommonState,
  resetPasswordState: initialCommonState,
};

// Slice
const authSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    logout: state => {
      tokenService.clearToken();
      state.user = null;
    },
    resetCreatePassword: state => {
      state.createPasswordState = initialCommonState;
    },
    resetEmailVerification: state => {
      state.emailVerificationState = initialCommonState;
    },
    resetForgotPassword: state => {
      state.forgotPasswordState = initialCommonState;
    },
    resetResetPassword: state => {
      state.resetPasswordState = initialCommonState;
    },
  },
  extraReducers: builder => {
    builder
      //login
      .addCase(postLogin.pending, (state, action) => {
        state.postLoginState.status = 'loading';
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.postLoginState.status = 'success';
        state.user = action.payload.payload.user;
        tokenService.setToken({
          access_token: action.payload.payload.token,
        });
        toast.success(action.payload.message);
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.postLoginState.status = 'failed';
        state.postLoginState.user = null;
        toast.error(action.error.message);
      })

      // logout
      .addCase(postLogout.fulfilled, (state, action) => {
        tokenService.clearToken();
        toast.success(action.payload?.message);
        return initialState;
      })
      .addCase(postLogout.rejected, (state, action) => {
        toast.error(action.error.message);
      })

      // default matcher case for all api calls
      .addMatcher(isPendingAction, handlePendingMatcherCase)
      .addMatcher(isFulfilledAction, handleFulfilledMatcherCase)
      .addMatcher(isRejectedAction, handleRejectedMatcherCase)
      .addDefaultCase(state => state);
  },
});

// persistedReducer will store users data in localStorage and rehydrate redux with localstorage data in every page refresh
const persistConfig = {
  key: 'auth/user',
  storage,
  whitelist: ['user'],
};

export const {
  logout,
  resetCreatePassword,
  resetEmailVerification,
  resetForgotPassword,
  resetResetPassword,
} = authSlice.actions;
const authReducer = persistReducer(persistConfig, authSlice.reducer);
export default authReducer;
