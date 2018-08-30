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

import CoinBlock from './CoinBlock';

import styles from './Prices.m.css';

const ENDPOINT = 'https://api.coinbase.com/v2/exchange-rates?currency=USD';

const COIN_CURRENCIES = [
  {
    title: 'Bitcoin',
    abbName: 'BTC',
    imgSrc: '',
    rate: 0,
  },
  {
    title: 'Ethereum',
    abbName: 'ETH',
    imgSrc: '',
    rate: 0,
  },
  {
    title: 'Litecoin',
    abbName: 'LTC',
    imgSrc: '',
    rate: 0,
  },
  {
    title: 'Ethereum Classic',
    abbName: 'ETC',
    imgSrc: '',
    rate: 0,
  },
];

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
  coinCurrencies,
}: Props | PropsFromHOC) => {
  console.log('Prices render', coinCurrencies);

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
      <div
        className={styles['currency-container']}
      >
        {
          coinCurrencies.map(coinCurrency => (
            <CoinBlock
              key={coinCurrency.title}
              coinCurrency={coinCurrency}
            />
          ))
        }
      </div>
    </div>
  );
};

const hoc = compose(
  withRouter,
  translate('default'),
  withState('amount', 'setAmount', 0),
  withState('coinCurrencies', 'setCoinCurrencies', COIN_CURRENCIES),
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
      fetch(ENDPOINT, {
        method: 'GET',
      })
        .then(res => res.json())
        .then(resJson => Promise.resolve(resJson))
        .then((res) => {
          const {
            data: {
              rates: allRates,
            },
          } = res;

          const {
            coinCurrencies,
            setCoinCurrencies,
          } = this.props;

          const updatedCurrencies = coinCurrencies.map(coinCurrency => ({
            ...coinCurrency,
            rate: allRates[coinCurrency.abbName],
          }));
          setCoinCurrencies(updatedCurrencies);
        });
    },
  }),
);

export default hoc(Prices);
