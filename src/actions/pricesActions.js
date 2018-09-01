// @flow
import type {
  DispatchType,
  GetState,
} from '../shared/types/reduxTypes';
import {
  SET_AMOUNT,
  SET_COIN_CURRENCIES,
} from './types';
import { CoinCurrency } from '../shared/types/pricesTypes';

import { getRate as getRateApi } from '../apis/pricesApi';
import { COIN_CURRENCIES } from '../shared/constants';

export const setAmount = (amount: number) => ({
  type: SET_AMOUNT,
  payload: amount,
});

const setCoinCurrencies = (coinCurrencies: Array<CoinCurrency>) => ({
  type: SET_COIN_CURRENCIES,
  payload: coinCurrencies,
});

type GetCurrencies = () => (dispatch: DispatchType, getState?: GetState) => Promise<*>
export const getCurrencies: GetCurrencies = () => dispatch =>
  getRateApi()
    .then((res) => {
      const {
        data: {
          rates: allRates,
        },
      } = res;

      const updatedCurrencies = COIN_CURRENCIES.map(coinCurrency => ({
        ...coinCurrency,
        rate: allRates[coinCurrency.abbName],
      }));

      dispatch(setCoinCurrencies(updatedCurrencies));
    });
