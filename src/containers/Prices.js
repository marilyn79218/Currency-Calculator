// @flow
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Prices from '../components/Prices';
import {
  requestCurrenciesAction,
  setAmount as setAmountAction,
} from '../actions/pricesActions';

import {
  getAmount,
  getCurrencies,
} from '../selectors/pricesSelector';

const mapStateToProps = createStructuredSelector({
  amount: getAmount,
  currencies: getCurrencies,
});

const mapDispatchToProps = dispatch => ({
  setAmount: amount => dispatch(setAmountAction(amount)),
  requestCurrencies: () => dispatch(requestCurrenciesAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Prices);
