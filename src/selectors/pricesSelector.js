// @flow
import {
  prop,
  compose,
} from 'ramda';

import type {
  AllState,
} from '../reducers';
import { Currency } from '../shared/types/pricesTypes';

const fromPrices: AllState => any = prop('prices');

type GetAmount = AllState => number;
export const getAmount: GetAmount = compose(
  prop('amount'),
  fromPrices,
);

type GetCurrencies = AllState => Array<Currency>;
export const getCurrencies: GetCurrencies = compose(
  prop('currencies'),
  fromPrices,
);
