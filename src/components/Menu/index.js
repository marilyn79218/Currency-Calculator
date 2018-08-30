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

import i18n from '../../Root/i18next';

import DropdownList from '../DropdownList';

import styles from './Menu.m.css';

type Props = {
  // isLabel: boolean,
  // labelJob: boolean => Promise<*>,
};

type PropsFromHOC = {
  t: TFunction,
};

const CHECKED_VALUES = {
  pricesValue: true,
  walletValue: false,
  accountValue: false,
};
const LANGS = [
  {
    label: '繁體中文',
    value: 'zh-TW',
  },
  {
    label: 'English',
    value: 'en-US',
  },
];

const Menu = ({
  t,
  history: {
    push,
  },
  // location: {
  //   pathname,
  // },
  checkedValues: {
    pricesValue,
    walletValue,
    accountValue,
  },
  clickTabHandler,
  clickLangHandler,
}: Props | PropsFromHOC) => {
  console.log('render pricesValue', pricesValue);
  // console.log('render walletValue', walletValue);
  // console.log('render accountValue', accountValue);

  return (
    <div
      className={styles.container}
    >
      <div
        className={styles.menu}
      >
        <input
          id="price-checkbox"
          className={styles['price-checkbox-style']}
          type="checkbox"
          role="button"
          checked={pricesValue}
          onChange={clickTabHandler('pricesValue')}
        />
        <label
          className={styles['price-label']}
          htmlFor="price-checkbox"
        >
          <span>
            {t('prices')}
          </span>
        </label>
        <input
          id="wallet-checkbox"
          className={styles['wallet-checkbox-style']}
          type="checkbox"
          role="button"
          checked={walletValue}
          onChange={clickTabHandler('walletValue')}
        />
        <label
          className={styles['wallet-label']}
          htmlFor="wallet-checkbox"
        >
          <span>
            {t('wallet')}
          </span>
        </label>
        <input
          id="account-checkbox"
          className={styles['account-checkbox-style']}
          type="checkbox"
          role="button"
          checked={accountValue}
          onChange={clickTabHandler('accountValue')}
        />
        <label
          className={styles['account-label']}
          htmlFor="account-checkbox"
        >
          <span>
            {t('account')}
          </span>
        </label>
        <DropdownList
          value={'zh-TW'}
          options={LANGS}
          onChange={clickLangHandler}
        />
        <div>
          Lang Switch
          <button
            onClick={() => {
              push('/en-US/prices');
              i18n.changeLanguage('en-US');
            }}
          >
            En price
          </button>
          <button
            onClick={() => {
              push('/zh-TW/prices');
              i18n.changeLanguage('zh-TW');
            }}
          >
            Tw price
          </button>
        </div>
      </div>
    </div>
  );
};

const hoc = compose(
  withState('checkedValues', 'setCheckedValues', CHECKED_VALUES),
  withHandlers({
    clickTabHandler: props => (tabName = 'pricesValue') => () => {
      const {
        checkedValues: legacyValues,
      } = props;

      /* eslint-disable */
      const updatedValues = {};
      Object.keys(legacyValues).reduce((pV, cV) => {
        if (cV !== tabName) {
          pV[cV] = false;
        } else {
          pV[cV] = true;
        }

        return pV;
      }, updatedValues);

      props.setCheckedValues(updatedValues);
    },
    clickLangHandler: props => (lang = 'zh-TW') => {
      console.log('clickLangHandler!');
    },
  }),
  lifecycle({
    componentDidMount() {
      console.log('componentDidMount', this.props);
    },
  }),
  withRouter,
  translate('default'),
);

export default hoc(Menu);
