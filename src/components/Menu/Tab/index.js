import React, { Fragment } from 'react';
import {
  type TFunction,
  translate,
} from 'react-i18next';

import styles from './Tab.m.css';

type Props = {
  isDesktop: boolean,
  tabName: string,
  checked: boolean,
  onChange: () => any,
  iconSrc: string,
  checkedIconSrc: string,
};
type PropsFromHOC = {
  t: TFunction,
};

const Tab = ({
  t,
  isDesktop,
  tabName,
  checked,
  onChange,
  iconSrc,
  checkedIconSrc,
}: Props | PropsFromHOC) => (
  <Fragment>
    <input
      id={`${tabName}-checkbox`}
      className={styles[`${tabName}-checkbox-style`]}
      type="checkbox"
      role="button"
      checked={checked}
      onChange={onChange}
    />
    <label
      className={styles['tab-label']}
      htmlFor={`${tabName}-checkbox`}
    >
      {
        isDesktop ? (
          <span>
            {t(tabName)}
          </span>
        ) : (
          <Fragment>
            <img
              className={styles['mobile-icon']}
              src={checked ? checkedIconSrc : iconSrc}
              alt="pic"
            />
            <span>
              {t(tabName)}
            </span>
          </Fragment>
        )
      }
    </label>
  </Fragment>
);

export default translate('default')(Tab);
