export {
  getPhoneById,
  getPhoneHistoriesById,
  getPhoneModel,
  getPhones,
  getPhoneStatus,
  savePhone,
  deletePhoneById,
} from './api';
export {
  selectDeletePhoneById,
  selectGetPhoneByIdState,
  selectGetPhoneHistoriesByIdState,
  selectGetPhoneModelState,
  selectGetPhonesState,
  selectGetPhoneStatusState,
  selectPhoneModelOptions,
  selectPhoneStatusOptions,
  selectSavePhone,
} from './selector';
export {
  default as phonesReducer,
  resetGetPhoneByIdState,
  resetGetPhoneHistoriesByIdState,
  resetGetPhonesState,
} from './slice';
