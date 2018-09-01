// @flow
import {
  prop,
  compose,
} from 'ramda';

import type {
  AllState,
} from '../reducers';

const fromPrices: AllState => any = prop('prices');

type GetAmount = AllState => number;
export const getAmount: GetAmount = compose(
  prop('amount'),
  fromPrices,
);
