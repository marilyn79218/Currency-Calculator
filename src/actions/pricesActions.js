// @flow
// import type {
//   DispatchType,
//   GetState,
// } from '../shared/types/reduxTypes';
import { SET_AMOUNT } from './types';

export const setAmount = (amount: number) => ({
  type: SET_AMOUNT,
  payload: amount,
});
