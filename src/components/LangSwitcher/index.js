import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  compose,
  withProps,
} from 'recompose';

import DropdownList from '../DropdownList';

import { HOME_PAGE } from '../../shared/constants';
import styles from './LangSwitcher.m.css';


type LangObj = {
  value: string,
  label: string,
};

type Props = {
  options: Array<LangObj>,
  value: string,
  onChange: LangObj => any,
};
type PropsFromHOC = {
  curTabName: string,
};

const LangSwitcher = ({
  curTabName,
  value,
  options,
  onChange: clickLangHandler,
}: Props | PropsFromHOC) => (
  <div
    className={styles['mobile-lang-switcher']}
  >
    {
      curTabName === HOME_PAGE ? (
        <DropdownList
          value={value}
          options={options}
          onChange={clickLangHandler}
        />
      ) : null
    }
  </div>
);

const hoc = compose(
  withRouter,
  withProps(
    ({
      location: {
        pathname,
      },
    }) => ({
      curTabName: pathname.split('/')[2],
    }),
  ),
);

export default hoc(LangSwitcher);
