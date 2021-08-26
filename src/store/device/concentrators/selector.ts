import { RootState } from 'store/rootReducer';

export const selectBulkLinkConcentratorWithMeterState = (state: RootState) =>
  state.device.concentrators.bulkLinkConcentratorWithMeterState;
export const selectBulkUnLinkConcentratorWithMeterState = (state: RootState) =>
  state.device.concentrators.bulkUnLinkConcentratorWithMeterState;
export const selectDownloadConcentratorMeters = (state: RootState) =>
  state.device.concentrators.downloadConcentratorMetersState;
export const selectDeleteConcentratorById = (state: RootState) =>
  state.device.concentrators.deleteConcentratorByIdState;
export const selectGetConcentratorByIdState = (state: RootState) => state.device.concentrators.getConcentratorByIdState;
export const selectGetConcentratorHistoriesById = (state: RootState) =>
  state.device.concentrators.getConcentratorHistoriesByIdState;
export const selectGetConcentratorsState = (state: RootState) => state.device.concentrators.getConcentratorsState;
export const selectGetMetersByConcentratorIdState = (state: RootState) =>
  state.device.concentrators.getMetersByConcentratorIdState;
export const selectLinkConcentratorWithMeterState = (state: RootState) =>
  state.device.concentrators.linkConcentratorWithMeterState;
export const selectUnLinkConcentratorWithMeterState = (state: RootState) =>
  state.device.concentrators.unLinkConcentratorWithMeterState;
export const selectResetGPRS = (state: RootState) => state.device.concentrators.resetGPRSState;
export const selectSaveConcentrator = (state: RootState) => state.device.concentrators.saveConcentratorState;
export const selectUpdateConcentratorClockCalibration = (state: RootState) =>
  state.device.concentrators.updateConcentratorClockCalibrationState;
export const selectUpdateConcentratorIpState = (state: RootState) =>
  state.device.concentrators.updateConcentratorIpState;
