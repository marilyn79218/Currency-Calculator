// @flow
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Prices from '../components/Prices';
import {
  getCurrencies as getCurrenciesAction,
  setAmount as setAmountAction,
} from '../actions/pricesActions';

import {
  getAmount,
  getCoinCurrencies,
} from '../selectors/pricesSelector';

const mapStateToProps = createStructuredSelector({
  amount: getAmount,
  coinCurrencies: getCoinCurrencies,
});

const mapDispatchToProps = dispatch => ({
  getCurrencies: () => dispatch(getCurrenciesAction()),
  setAmount: amount => dispatch(setAmountAction(amount)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Prices);
