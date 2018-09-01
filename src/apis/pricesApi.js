// @flow
import fetchUtil from '../shared/utils/fetchUtil';

const endpoint = 'https://api.coinbase.com/v2/exchange-rates?currency=USD';
const fetchRate = fetchUtil(endpoint);

export const getRate = () => fetchRate.get();
