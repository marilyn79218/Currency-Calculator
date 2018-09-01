// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {
  LOG_OUT_CALLBACK,
} from '../actions/types';
import authReducer from './authReducer';
import pricesReducer from './pricesReducer';

export type AllState = {
  auth: mixed,
  router: mixed,
  prices: mixed,
}

type AppReducers = (allState?: AllState, action: { type: string }) => AllState;

const appReducers: AppReducers = combineReducers({
  auth: authReducer,
  router: routerReducer,
  prices: pricesReducer,
});

type Reducers = (state: AllState, action: {
  type: string,
}) => AllState;

const reducers: Reducers = (state, action) => {
  switch (action.type) {
    case LOG_OUT_CALLBACK:
      return appReducers(undefined, action);
    default:
      return appReducers(state, action);
  }
};

export default reducers;
