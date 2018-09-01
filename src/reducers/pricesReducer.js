// @flow
import {
  SET_AMOUNT,
  SET_COIN_CURRENCIES,
} from '../actions/types';
import { COIN_CURRENCIES } from '../shared/constants';

type State = {
  +amount: number,
};
type Action = {
  type: string,
  payload: any,
};

const initialState: State = {
  amount: -1,
  coinCurrencies: COIN_CURRENCIES,
};

type Prices = (State, Action) => State;

const prices: Prices = (state = initialState, action) => {
  switch (action.type) {
    case SET_AMOUNT:
      return {
        ...state,
        amount: action.payload,
      };
    case SET_COIN_CURRENCIES:
      return {
        ...state,
        coinCurrencies: action.payload,
      };
    default:
      return state;
  }
};

export default prices;
