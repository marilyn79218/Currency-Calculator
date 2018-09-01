// @flow
import type {
  DispatchType,
  GetState,
} from '../shared/types/reduxTypes';
import {
  SET_AMOUNT,
  SET_CURRENCIES,
} from './types';
import type { Currency } from '../shared/types/pricesTypes';

import { getRate as getRateApi } from '../apis/pricesApi';
import { INIT_CURRENCIES } from '../shared/constants';

export const setAmount = (amount: number) => ({
  type: SET_AMOUNT,
  payload: amount,
});

const setCurrencies = (currencies: Array<Currency>) => ({
  type: SET_CURRENCIES,
  payload: currencies,
});

type RequestCurrenciesAction = () => (dispatch: DispatchType, getState?: GetState) => Promise<*>
export const requestCurrenciesAction: RequestCurrenciesAction = () => dispatch =>
  getRateApi()
    .then((res) => {
      const {
        data: {
          rates: allRates,
        },
      } = res;

      const updatedCurrencies = INIT_CURRENCIES.map(currency => ({
        ...currency,
        rate: allRates[currency.abbName],
      }));

      dispatch(setCurrencies(updatedCurrencies));
    });
