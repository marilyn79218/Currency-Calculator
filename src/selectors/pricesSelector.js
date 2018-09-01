// @flow
import {
  prop,
  compose,
} from 'ramda';

import type {
  AllState,
} from '../reducers';
import { CoinCurrency } from '../shared/types/pricesTypes';

const fromPrices: AllState => any = prop('prices');

type GetAmount = AllState => number;
export const getAmount: GetAmount = compose(
  prop('amount'),
  fromPrices,
);

type GetCoinCurrencies = AllState => Array<CoinCurrency>;
export const getCoinCurrencies: GetCoinCurrencies = compose(
  prop('coinCurrencies'),
  fromPrices,
);
