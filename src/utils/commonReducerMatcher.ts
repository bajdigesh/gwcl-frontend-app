import { AnyAction } from '@reduxjs/toolkit';
import toast from 'components/Toast';
import { extractMiddleString } from 'utils';

export const commonInitialState = { status: null, data: null };

/**
 * @param state state Object from reducer
 * @param action action Object from reducer
 */
export const handlePendingMatcherCase = (state: Record<string, ISliceState<any>>, action: AnyAction) => {
  const stateKey = extractMiddleString(action.type, '[', ']') + 'State';
  state[stateKey].status = 'loading';
};

/**
 * @param state state Object from reducer
 * @param action action Object from reducer
 */
export const handleFulfilledMatcherCase = (state: Record<string, ISliceState<any>>, action: AnyAction) => {
  const stateKey = extractMiddleString(action.type, '[', ']') + 'State';
  state[stateKey].data = action.payload;
  state[stateKey].status = 'success';
  if (action.payload.showSuccessToast) {
    toast.success(action.payload.message);
  }
};

/**
 * @param state state Object from reducer
 * @param action action Object from reducer
 */
export const handleRejectedMatcherCase = (state: Record<string, ISliceState<any>>, action: AnyAction) => {
  const stateKey = extractMiddleString(action.type, '[', ']') + 'State';
  state[stateKey].status = 'failed';
  state[stateKey].data = null;
  /**
   * Doesnot fire toaster if there is error of name 'AbortError'
   * toastId option is provied, so that no duplicate error toast or double toast appears on ui.
   */
  if (action.error?.name !== 'AbortError' && action.error?.name !== 'RejectWithValue') {
    toast.error(action.error.message, { toastId: 'error-toast' });
  }
};
