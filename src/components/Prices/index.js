import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  type TFunction,
  translate,
} from 'react-i18next';

import {
  compose,
  withState,
  // withProps,
  withHandlers,
  lifecycle,
} from 'recompose';

import styles from './Prices.m.css';

type Props = {
  // isLabel: boolean,
  // labelJob: boolean => Promise<*>,
};

type PropsFromHOC = {
  t: TFunction,
};

const Prices = ({
  t,
  amount,
  amountChange,
}: Props | PropsFromHOC) => {
  console.log('Prices render', amount);

  return (
    <div
      className={styles.container}
    >
      <div
        className={styles['money-container']}
      >
        <input
          type="text"
          className={styles['money-input']}
          placeholder={t('money_amount')}
          value={amount > 0 ? amount : ''}
          onChange={amountChange}
        />
      </div>
    </div>
  );
};

const hoc = compose(
  withRouter,
  translate('default'),
  withState('amount', 'setAmount', 0),
  withHandlers({
    amountChange: props => (e) => {
      const { setAmount } = props;
      const value = e.target.value;

      if (!isNaN(Number(value))) {
        setAmount(value);
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      console.log('Prices componentDidMount', this.props);
    },
  }),
);

export default hoc(Prices);
