// @flow
import fetchUtil from '../shared/utils/fetchUtil';
import { APP_DOLLAR } from '../shared/constants';

const endpoint = '/v2/exchange-rates';
const fetchRate = fetchUtil(endpoint);

const rateQuery = {
  currency: APP_DOLLAR,
};
export const getRate = () => fetchRate.get({ query: rateQuery });
