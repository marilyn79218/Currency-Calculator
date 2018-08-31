import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {
  type TFunction,
  translate,
} from 'react-i18next';

import {
  compose,
  withState,
  withHandlers,
} from 'recompose';
import classnames from 'classnames';

import { IsDesktopContext } from '../../shared/contexts';
// import DropdownList from '../DropdownList';
import LangSwitcher from '../LangSwitcher';
import PricesIconSVG from '../../shared/assets/icon/navi/prices@1.5x.svg';
import PricesCheckedIconSVG from '../../shared/assets/icon/navi/prices_active@1.5x.svg';
import WalletIconSVG from '../../shared/assets/icon/navi/wallet@1.5x.svg';
import WalletCheckedIconSVG from '../../shared/assets/icon/navi/wallet_active@1.5x.svg';
import AccountIconSVG from '../../shared/assets/icon/navi/account@1.5x.svg';
import AccountCheckedIconSVG from '../../shared/assets/icon/navi/account_active@1.5x.svg';

import styles from './Menu.m.css';

type LangObj = {
  value: string,
  label: string,
};

type Props = {
  LANG_OPTIONS?: Array<LangObj>,
  langValue: string,
  clickLangHandler?: LangObj => any,
};
type PropsFromHOC = {
  t: TFunction,
};

const CHECKED_VALUES = {
  prices: true,
  wallet: false,
  account: false,
};

const Menu = ({
  t,
  checkedValues: {
    prices: pricesChecked,
    wallet: walletChecked,
    account: accountChecked,
  },
  clickTabHandler,
  LANG_OPTIONS,
  langValue,
  clickLangHandler,
}: Props | PropsFromHOC) => {
  console.log('Menu render');

  return (
    <IsDesktopContext.Consumer>
      {
        isDesktop => (
          <div
            className={
              classnames({
                [styles.container]: isDesktop,
                [styles['mobile-container']]: !isDesktop,
              })
            }
          >
            <div
              className={
                classnames({
                  [styles.menu]: isDesktop,
                  [styles['mobile-menu']]: !isDesktop,
                })
              }
            >
              <input
                id="price-checkbox"
                className={styles['price-checkbox-style']}
                type="checkbox"
                role="button"
                checked={pricesChecked}
                onChange={clickTabHandler('prices')}
              />
              <label
                className={styles['price-label']}
                htmlFor="price-checkbox"
              >
                {
                  isDesktop ? (
                    <span>
                      {t('prices')}
                    </span>
                  ) : (
                    <Fragment>
                      <img
                        className={styles['mobile-icon']}
                        src={pricesChecked ? PricesCheckedIconSVG : PricesIconSVG}
                        alt="pic"
                      />
                      <span>
                        {t('prices')}
                      </span>
                    </Fragment>
                  )
                }
              </label>
              <input
                id="wallet-checkbox"
                className={styles['wallet-checkbox-style']}
                type="checkbox"
                role="button"
                checked={walletChecked}
                onChange={clickTabHandler('wallet')}
              />
              <label
                className={styles['wallet-label']}
                htmlFor="wallet-checkbox"
              >
                {
                  isDesktop ? (
                    <span>
                      {t('wallet')}
                    </span>
                  ) : (
                    <Fragment>
                      <img
                        className={styles['mobile-icon']}
                        src={walletChecked ? WalletCheckedIconSVG : WalletIconSVG}
                        alt="pic"
                      />
                      <span>
                        {t('wallet')}
                      </span>
                    </Fragment>
                  )
                }
              </label>
              <input
                id="account-checkbox"
                className={styles['account-checkbox-style']}
                type="checkbox"
                role="button"
                checked={accountChecked}
                onChange={clickTabHandler('account')}
              />
              <label
                className={styles['account-label']}
                htmlFor="account-checkbox"
              >
                {
                  isDesktop ? (
                    <span>
                      {t('account')}
                    </span>
                  ) : (
                    <Fragment>
                      <img
                        className={styles['mobile-icon']}
                        src={accountChecked ? AccountCheckedIconSVG : AccountIconSVG}
                        alt="pic"
                      />
                      <span>
                        {t('account')}
                      </span>
                    </Fragment>
                  )
                }
              </label>
              {
                isDesktop ? (
                  <LangSwitcher
                    isDesktop={isDesktop}
                    value={langValue}
                    options={LANG_OPTIONS}
                    onChange={clickLangHandler}
                  />
                ) : null
              }
            </div>
          </div>
        )
      }
    </IsDesktopContext.Consumer>
  );
};

const hoc = compose(
  withRouter,
  translate('default'),
  withState('checkedValues', 'setCheckedValues', CHECKED_VALUES),
  withHandlers({
    clickTabHandler: props => (nextTabName = 'prices') => () => {
      const {
        history: {
          push,
        },
        checkedValues: legacyValues,
        setCheckedValues,
        langValue: curLangValue,
      } = props;

      /* eslint-disable */
      const updatedValues = {};
      Object.keys(legacyValues).reduce((pV, cV) => {
        if (cV !== nextTabName) {
          pV[cV] = false;
        } else {
          pV[cV] = true;
        }

        return pV;
      }, updatedValues);

      setCheckedValues(updatedValues);
      push(`/${curLangValue}/${nextTabName}`);
    },
  }),
);

export default hoc(Menu);
