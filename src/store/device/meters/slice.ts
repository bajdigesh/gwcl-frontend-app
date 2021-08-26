import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TFulfilledAction, TPendingAction, TRejectedAction } from 'types/store';
import { handleFulfilledMatcherCase, handlePendingMatcherCase, handleRejectedMatcherCase } from 'utils';
import toast from 'components/Toast';
import apiService from 'service/apiService';
import endpoints from 'global/endpoints';

const namespace = 'devices/meters';
export const matcherNameSpace = 'devices/meters/matcher';
const meterEndPoints = endpoints.devices.meters;

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

export const getMeterFormAutoCompleteOptions = createAsyncThunk(
  namespace + '/[getMeterFormAutoCompleteOptions]',
  async () => {
    const response = await Promise.allSettled([
      apiService({}).get(meterEndPoints.meterBrands),
      apiService({}).get(meterEndPoints.meterModels),
      apiService({}).get(meterEndPoints.meterSizes),
      apiService({}).get(meterEndPoints.meterTypes),
      apiService({}).get(meterEndPoints.meterStatus),
      apiService({}).get(meterEndPoints.meterStates),
      apiService({}).get(meterEndPoints.meterInstallStages),
    ]);
    return response;
  }
);

const autoCompleteOptionPos = [
  { label: 'Meter brand', stateKey: 'meterBrands' },
  { label: 'Meter model', stateKey: 'meterModels' },
  { label: 'Meter size', stateKey: 'meterSizes' },
  { label: 'Meter types', stateKey: 'meterTypes' },
  { label: 'Meter status', stateKey: 'meterStatus' },
  { label: 'Meter states', stateKey: 'meterStates' },
  { label: 'Meter installed stages', stateKey: 'meterInstallStages' },
];

// meter auto complete initial value
const meterAutoCompleteOptionsInitialValue = {
  status: null,
  data: {
    meterBrands: [],
    meterModels: [],
    meterSizes: [],
    meterTypes: [],
    meterStatus: [],
    meterStates: [],
    meterInstallStages: [],
  },
};

// INITIAL STATE
const initialCommonState = { status: null, data: null };

const initialState: Record<string, ISliceState<any>> = {
  getMetersState: initialCommonState,
  getMeterByIdState: initialCommonState,
  deleteMeterByIdState: initialCommonState,
  getMeterByMeterNumberState: initialCommonState,
  uploadMetersCsvState: initialCommonState,
  getMeterDetailState: initialCommonState,
  changeValveStatusByMeterNumberState: initialCommonState,
  saveMeterState: initialCommonState,

  // meter details
  getMeterBrandsState: initialCommonState,
  getMeterModelsState: initialCommonState,
  getMeterSizesState: initialCommonState,
  getMeterTypesState: initialCommonState,
  getMeterStatusState: initialCommonState,
  getMeterStatesState: initialCommonState,
  getMeterInstallStagesState: initialCommonState,
  getMeterReadingsState: initialCommonState,
  getMeterInstallationHistoryState: initialCommonState,
  getMeterInitialFinalReadingsState: initialCommonState,
  meterFormAutoCompleteOptions: meterAutoCompleteOptionsInitialValue,
};

// Slice
const metersApiSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    resetGetMetersState: state => {
      state.getMetersState = initialCommonState;
    },
    resetGetMeterByIdState: state => {
      state.getMeterByIdState = initialCommonState;
    },
    resetDeleteMeterByIdState: state => {
      state.deleteMeterByIdState = initialCommonState;
    },
    resetUploadMetersCsvState: state => {
      state.uploadMetersCsvState = initialCommonState;
    },
    resetGetMeterByMeterNumberState: state => {
      state.getMeterByMeterNumberState = initialCommonState;
    },
    resetChangeValveStatusByMeterNumberState: state => {
      state.openValveByMeterNumberState = initialCommonState;
    },
    resetSaveMeterState: state => {
      state.saveMeterState = initialCommonState;
    },
    resetGetMeterBrandsState: state => {
      state.getMeterBrandState = initialCommonState;
    },
    resetGetMeterModelsState: state => {
      state.getMeterModelsState = initialCommonState;
    },
    resetGetMeterTypesState: state => {
      state.getMeterTypesState = initialCommonState;
    },
    resetGetMeterSizesState: state => {
      state.getMeterSizesState = initialCommonState;
    },
    resetGetMeterStatusState: state => {
      state.getMeterStatusState = initialCommonState;
    },
    resetGetMeterStatesState: state => {
      state.getMeterStatesState = initialCommonState;
    },
    resetGetMeterInstallStagesState: state => {
      state.getMeterInstallStagesState = initialCommonState;
    },
    resetGetMeterReadingsState: state => {
      state.getMetersReadingsState = initialCommonState;
    },
    resetGetMeterInstallationHistoryState: state => {
      state.getMeterInstallationHistoryState = initialCommonState;
    },
    resetGetMeterInitialFinalReadingsState: state => {
      state.getMeterInitialFinalReadingsState = initialCommonState;
    },
    resetMeterFormAutoCompleteOptions: state => {
      state.meterFormAutoCompleteOptions = meterAutoCompleteOptionsInitialValue;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMeterFormAutoCompleteOptions.pending, state => {
        state.meterFormAutoCompleteOptions.status = 'loading';
      })
      .addCase(getMeterFormAutoCompleteOptions.fulfilled, (state, action) => {
        state.meterFormAutoCompleteOptions.status = 'success';
        action.payload.forEach((item: any, index: number) => {
          if (item.status === 'rejected') {
            toast.error(
              item.reason?.message
                ? `${autoCompleteOptionPos[index].label}: ${item.reason.message}`
                : `Error fetching ${autoCompleteOptionPos[index].label}`
            );
          }
          if (item.status === 'fulfilled') {
            const mappedOption = item.value?.payload.map((option: any) => ({ label: option.name, value: option.id }));
            const stateAccessor = autoCompleteOptionPos[index].stateKey;
            if (stateAccessor) state.meterFormAutoCompleteOptions.data[stateAccessor] = mappedOption;
          }
        });
      })
      .addCase(getMeterFormAutoCompleteOptions.rejected, state => {
        state.meterFormAutoCompleteOptions.status = 'failed';
        state.meterFormAutoCompleteOptions.data = meterAutoCompleteOptionsInitialValue;
      })
      .addMatcher(isPendingAction, handlePendingMatcherCase)
      .addMatcher(isFulfilledAction, handleFulfilledMatcherCase)
      .addMatcher(isRejectedAction, handleRejectedMatcherCase)
      .addDefaultCase(state => state);
  },
});

export const {
  resetGetMetersState,
  resetGetMeterByIdState,
  resetGetMeterByMeterNumberState,
  resetDeleteMeterByIdState,
  resetUploadMetersCsvState,
  resetChangeValveStatusByMeterNumberState,
  resetSaveMeterState,
  resetGetMeterBrandsState,
  resetGetMeterModelsState,
  resetGetMeterTypesState,
  resetGetMeterSizesState,
  resetGetMeterStatusState,
  resetGetMeterStatesState,
  resetGetMeterInstallStagesState,
  resetGetMeterReadingsState,
  resetMeterFormAutoCompleteOptions,
  resetGetMeterInstallationHistoryState,
  resetGetMeterInitialFinalReadingsState,
} = metersApiSlice.actions;
export default metersApiSlice.reducer;
