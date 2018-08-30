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

type Props = {};
type PropsFromHOC = {
  t: TFunction,
};

const CHECKED_VALUES = {
  prices: true,
  wallet: false,
  account: false,
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
  // location: {
  //   pathname,
  // },
  checkedValues: {
    prices: pricesChecked,
    wallet: walletChecked,
    account: accountChecked,
  },
  clickTabHandler,
  langValue,
  clickLangHandler,
}: Props | PropsFromHOC) => {
  console.log('Menu render');
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
          checked={pricesChecked}
          onChange={clickTabHandler('prices')}
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
          checked={walletChecked}
          onChange={clickTabHandler('wallet')}
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
          checked={accountChecked}
          onChange={clickTabHandler('account')}
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
          value={langValue}
          options={LANGS}
          onChange={clickLangHandler}
        />
      </div>
    </div>
  );
};

const hoc = compose(
  withRouter,
  translate('default'),
  withState('checkedValues', 'setCheckedValues', CHECKED_VALUES),
  withState('langValue', 'setLangValue', 'zh-TW'),
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
    clickLangHandler: props => langObj => {
      const {
        history: {
          push,
        },
        location: {
          pathname,
        },
        setLangValue,
      } = props;
      const { value: nextLangValue } = langObj;
      const curTab = pathname.split('/')[2];
      // console.log('clickLangHandler', props);

      setLangValue(nextLangValue);
      push(`/${nextLangValue}/${curTab}`);
      i18n.changeLanguage(nextLangValue);
    },
  }),
  lifecycle({
    componentDidMount() {
      // console.log('Menu componentDidMount', i18n.language);
      const {
        history: {
          push,
        },
        setLangValue,
      } = this.props;
      const langValue = i18n.language;

      setLangValue(langValue);
      push(`/${langValue}/prices`);
    },
  }),
);

export default hoc(Menu);
