import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  type TFunction,
  translate,
} from 'react-i18next';
import classnames from 'classnames';
import {
  compose,
  withHandlers,
  lifecycle,
} from 'recompose';

import { Currency } from '../../shared/types/pricesTypes';
import { IsDesktopContext } from '../../shared/contexts';
import CoinBlock from './CoinBlock';

import styles from './Prices.m.css';

type Props = {
  amount: number,
  currencies: Array<Currency>,
};
type PropsFromHOC = {
  t: TFunction,
  amountChange: (e: SyntheticEvent<>) => mixed,
};

const Prices = ({
  t,
  amount,
  amountChange,
  currencies,
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
              currencies.map(currency => (
                <CoinBlock
                  key={currency.title}
                  isDesktop={isDesktop}
                  inputAmount={amount}
                  currency={currency}
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
  withHandlers({
    isValidFloat: () => (value) => {
      const floatDigits = value.split('.')[1];
      if (!floatDigits) return true;
      if (floatDigits && floatDigits.length < 3) {
        return true;
      }

      return false;
    },
    isLeadingZero: () => (value) => {
      const allChars = value.split('');
      return allChars[0] === '0' && allChars[1] !== '.';
    },
  }),
  withHandlers({
    amountChange: props => (e) => {
      const {
        setAmount,
        isValidFloat,
        isLeadingZero,
      } = props;
      const value = e.target.value;

      if (!isNaN(Number(value)) && isValidFloat(value)) {
        if (isLeadingZero(value)) {
          setAmount(0);
        } else {
          setAmount(value);
        }
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.requestCurrencies();
    },
  }),
);

export default hoc(Prices);
