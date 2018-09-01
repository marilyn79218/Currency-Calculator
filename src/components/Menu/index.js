import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  compose,
  withState,
  withHandlers,
  lifecycle,
} from 'recompose';
import classnames from 'classnames';

import { IsDesktopContext } from '../../shared/contexts';
import { TAB_NAMES } from '../../shared/constants';
import LangSwitcher from '../LangSwitcher';
import Tab from './Tab';
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
  checkedValues: {
    prices: boolean,
    wallet: boolean,
    account: boolean,
  },
};

const CHECKED_VALUES = {
  prices: true,
  wallet: false,
  account: false,
};
const ICON_SRCES = {
  prices: {
    iconSrc: PricesIconSVG,
    checkedIconSrc: PricesCheckedIconSVG,
  },
  wallet: {
    iconSrc: WalletIconSVG,
    checkedIconSrc: WalletCheckedIconSVG,
  },
  account: {
    iconSrc: AccountIconSVG,
    checkedIconSrc: AccountCheckedIconSVG,
  },
};

const Menu = ({
  checkedValues,
  clickTabHandler,
  LANG_OPTIONS,
  langValue,
  clickLangHandler,
}: Props | PropsFromHOC) => (
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
            {
              TAB_NAMES.map(tabName => (
                <Tab
                  key={tabName}
                  isDesktop={isDesktop}
                  tabName={tabName}
                  checked={checkedValues[tabName]}
                  onChange={clickTabHandler(tabName)}
                  iconSrc={ICON_SRCES[tabName].iconSrc}
                  checkedIconSrc={ICON_SRCES[tabName].checkedIconSrc}
                />
              ))
            }
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

const hoc = compose(
  withRouter,
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
    isValidTabName: () => tabName => TAB_NAMES.includes(tabName),
  }),
  withHandlers({
    updateCheckedValues: props => () => {
      const {
        location: {
          pathname,
        },
        isValidTabName,
        setCheckedValues,
      } = props;

      const curTabName = pathname.split('/')[2];
      if (isValidTabName(curTabName)) {
        const updatedValues = TAB_NAMES.reduce((pV, cV) => {
          if (cV !== curTabName) {
            pV[cV] = false;
          } else {
            pV[cV] = true;
          }

          return pV;
        }, {});

        setCheckedValues(updatedValues);
      }
    },
  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const {
        location: {
          pathname: prevPathname,
        },
      } = this.props;
      const {
        location: {
          pathname: nextPathname,
        },
        updateCheckedValues,
      } = nextProps;

      if (prevPathname !== nextPathname) {
        updateCheckedValues();
      }
    },
    componentDidMount() {
      this.props.updateCheckedValues();
    },
  })
);

export default hoc(Menu);
