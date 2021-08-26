import { RootState } from 'store/rootReducer';

export const selectGetMetersState = (state: RootState) => state.device.meters.getMetersState;
export const selectGetMeterByIdState = (state: RootState) => state.device.meters.getMeterByIdState;
export const selectDeleteMeterByIdState = (state: RootState) => state.device.meters.deleteMeterByIdState;
export const selectGetMeterByMeterNumberState = (state: RootState) => state.device.meters.getMeterByMeterNumberState;
export const selectUploadMetersCsvState = (state: RootState) => state.device.meters.uploadMetersCsvState;
export const selectChangeValveStatusByMeterNumberState = (state: RootState) =>
  state.device.meters.changeValveStatusByMeterNumberState;
export const selectSaveMeterState = (state: RootState) => state.device.meters.saveMeterState;
export const selectGetMeterReadingsState = (state: RootState) => state.device.meters.getMeterReadingsState;
export const selectGetMeterInitialFinalReadingsState = (state: RootState) =>
  state.device.meters.getMeterInitialFinalReadingsState;
export const selectGetMeterInstallationHistoryState = (state: RootState) =>
  state.device.meters.getMeterInstallationHistoryState;
export const selectGetMeterBrandsOptionsStatus = (state: RootState) => state.device.meters.getMeterBrandsState.status;
export const selectGetMeterBrandsOptionsData = (state: RootState) => state.device.meters.getMeterBrandsState.data;
export const selectGetMeterModelsOptionsStatus = (state: RootState) => state.device.meters.getMeterModelsState.status;
export const selectGetMeterModelsOptionsData = (state: RootState) => state.device.meters.getMeterModelsState.data;
export const selectGetMeterSizesOptionsStatus = (state: RootState) => state.device.meters.getMeterSizesState.status;
export const selectGetMeterSizesOptionsData = (state: RootState) => state.device.meters.getMeterSizesState.data;
export const selectGetMeterTypesOptionsStatus = (state: RootState) => state.device.meters.getMeterTypesState.status;
export const selectGetMeterTypesOptionsData = (state: RootState) => state.device.meters.getMeterTypesState.data;
export const selectGetMeterStatusOptionsStatus = (state: RootState) => state.device.meters.getMeterStatusState.status;
export const selectGetMeterStatusOptionsData = (state: RootState) => state.device.meters.getMeterStatusState.data;
export const selectGetMeterStatesOptionsStatus = (state: RootState) => state.device.meters.getMeterStatesState.status;
export const selectGetMeterStatesOptionsData = (state: RootState) => state.device.meters.getMeterStatesState.data;
export const selectGetMeterInstallStagesOptionsStatus = (state: RootState) =>
  state.device.meters.getMeterInstallStagesState.status;
export const selectGetMeterInstallStagesOptionsData = (state: RootState) =>
  state.device.meters.getMeterInstallStagesState.data;

export const selectGetMeterFormAutocompleteOptions = (state: RootState) =>
  state.device.meters.meterFormAutoCompleteOptions;
