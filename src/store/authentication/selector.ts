import { RootState } from 'store/rootReducer';

export const selectUser = (state: RootState) => state.authentication.user;
export const selectLogin = (state: RootState) => state.authentication.postLoginState;
export const selectLoginStatus = (state: RootState) => state.authentication.postLoginState.status;
export const selectEmailVerification = (state: RootState) => state.authentication.emailVerificationState;
export const selectCreatePassword = (state: RootState) => state.authentication.createPasswordState;
export const selectForgotPassword = (state: RootState) => state.authentication.forgotPasswordState;
export const selectResetPassword = (state: RootState) => state.authentication.resetPasswordState;
