import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  type TFunction,
  translate,
} from 'react-i18next';
import classnames from 'classnames';

import {
  compose,
  withState,
  withHandlers,
  lifecycle,
} from 'recompose';

import { IsDesktopContext } from '../../shared/contexts';
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
}: Props | PropsFromHOC) => (
  <IsDesktopContext.Consumer>
    {
      isDesktop => (
        <div
          className={styles.container}
        >
          <div
            className={styles['money-container']}
          >
            <input
              type="text"
              className={
                classnames({
                  [styles['money-input']]: isDesktop,
                  [styles['mobile-money-input']]: !isDesktop,
                })
              }
              placeholder={t('money_amount')}
              value={amount >= 0 ? amount : ''}
              onChange={amountChange}
            />
          </div>
          <div
            className={
              classnames({
                [styles['currency-container']]: isDesktop,
                [styles['mobile-currency-container']]: !isDesktop,
              })
            }
          >
            {
              coinCurrencies.map(coinCurrency => (
                <CoinBlock
                  key={coinCurrency.title}
                  isDesktop={isDesktop}
                  inputAmount={amount}
                  coinCurrency={coinCurrency}
                />
              ))
            }
          </div>
        </div>
      )
    }
  </IsDesktopContext.Consumer>
);

const hoc = compose(
  withRouter,
  translate('default'),
  withState('amount', 'setAmount', -1),
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
        const allChars = value.split('');
        if (allChars[0] === '0' && allChars[1] === '0') {
          setAmount(0);
        } else {
          setAmount(value);
        }
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
