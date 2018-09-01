// @flow
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Prices from '../components/Prices';
import {
  setAmount as setAmountAction,
} from '../actions/pricesActions';

import {
  getAmount,
} from '../selectors/pricesSelector';

const mapStateToProps = createStructuredSelector({
  amount: getAmount,
});

const mapDispatchToProps = dispatch => ({
  setAmount: amount => dispatch(setAmountAction(amount)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Prices);
