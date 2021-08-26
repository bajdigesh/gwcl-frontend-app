import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authentication';
import billingReducer from './billing';
import commonReducer from './common';
import deviceReducer from './device';
import usersReducer from './users';

const rootReducer = combineReducers({
  authentication: authReducer,
  billing: billingReducer,
  common: commonReducer,
  device: deviceReducer,
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
