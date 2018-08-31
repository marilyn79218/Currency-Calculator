import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {
  compose,
  withProps,
} from 'recompose';

import EarchIconSVG from '../../shared/assets/icon/label/earth.svg';
import DropdownList from '../DropdownList';

import { HOME_PAGE } from '../../shared/constants';
import styles from './LangSwitcher.m.css';


type LangObj = {
  value: string,
  label: string,
};

type Props = {
  isDesktop: boolean,
  options: Array<LangObj>,
  value: string,
  onChange: LangObj => any,
};
type PropsFromHOC = {
  curTabName: string,
};

/* eslint-disable */
const LangSwitcher = ({
  isDesktop,
  curTabName,
  value,
  options,
  onChange: clickLangHandler,
}: Props | PropsFromHOC) => (
  <Fragment>
    {
      curTabName === HOME_PAGE ? (
        <div
          className={styles['mobile-align']}
        >
          {
            !isDesktop ? (
              <img
                style={{
                  height: '24px',
                  position: 'relative',
                  left: '21px',
                  zIndex: 1,
                }}
                src={EarchIconSVG}
                pic="pic"
              />
            ) : null
          }
          <DropdownList
            isDesktop={isDesktop}
            value={value}
            options={options}
            onChange={clickLangHandler}
          />
        </div>
      ) : null
    }
  </Fragment>
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
