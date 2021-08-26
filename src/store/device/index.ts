import { combineReducers } from '@reduxjs/toolkit';
import { concentratorsReducer } from './concentrators';
import { concentratorStatusReducer } from './concentratorStatus';
import { metersReducer } from './meters';
import { phonesReducer } from './phones';

const deviceReducer = combineReducers({
  concentrators: concentratorsReducer,
  concentratorStatus: concentratorStatusReducer,
  meters: metersReducer,
  phones: phonesReducer,
});

export default deviceReducer;
