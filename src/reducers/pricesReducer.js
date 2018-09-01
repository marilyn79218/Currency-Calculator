// @flow
import { SET_AMOUNT } from '../actions/types';

type State = {
  +amount: number,
};
type Action = {
  type: string,
  payload: any,
};

const initialState: State = {
  amount: -1,
};

type Prices = (State, Action) => State;

const prices: Prices = (state = initialState, action) => {
  switch (action.type) {
    case SET_AMOUNT:
      return {
        ...state,
        amount: action.payload,
      };
    default:
      return state;
  }
};

export default prices;
