import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  type TFunction,
  translate,
} from 'react-i18next';

import {
  compose,
  withState,
  withHandlers,
  lifecycle,
} from 'recompose';

import BTCIconSVG from '../../shared/assets/crypto/btc/lightbg.svg';
import ETHIconSVG from '../../shared/assets/crypto/eth/lightbg.svg';
import ETCIconSVG from '../../shared/assets/crypto/etc.svg';
import LTCIconSVG from '../../shared/assets/crypto/ltc.svg';
import CoinBlock from './CoinBlock';

import styles from './Prices.m.css';


const ENDPOINT = 'https://api.coinbase.com/v2/exchange-rates?currency=USD';
const COIN_CURRENCIES = [
  {
    title: 'Bitcoin',
    abbName: 'BTC',
    imgSrc: BTCIconSVG,
    rate: 0,
  },
  {
    title: 'Ethereum',
    abbName: 'ETH',
    imgSrc: ETHIconSVG,
    rate: 0,
  },
  {
    title: 'Litecoin',
    abbName: 'LTC',
    imgSrc: LTCIconSVG,
    rate: 0,
  },
  {
    title: 'Ethereum Classic',
    abbName: 'ETC',
    imgSrc: ETCIconSVG,
    rate: 0,
  },
];

type Props = {};
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
              inputAmount={amount}
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
    isValidFloat: () => (value) => {
      const floatDigits = value.split('.')[1];
      if (!floatDigits) return true;
      if (floatDigits && floatDigits.length < 3) {
        return true;
      }

      return false;
    },
  }),
  withHandlers({
    amountChange: props => (e) => {
      const {
        setAmount,
        isValidFloat,
      } = props;
      const value = e.target.value;

      if (!isNaN(Number(value)) && isValidFloat(value)) {
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
