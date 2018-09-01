import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {
  compose,
  withProps,
} from 'recompose';

import EarchIconSVG from '../../shared/assets/icon/label/earth.svg';
import ArrowDownPNG from '../../shared/assets/icon-small-arrow-down.png';
import DropdownList from './DropdownList';

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
      !isDesktop ? (
        curTabName === HOME_PAGE ? (
          <div
            className={styles['mobile-align']}
          >
            <img
              style={{
                height: '24px',
                position: 'relative',
                left: '21px',
                zIndex: 1,
              }}
              src={EarchIconSVG}
              alt="pic"
            />
            <DropdownList
              isDesktop={isDesktop}
              value={value}
              options={options}
              onChange={clickLangHandler}
            />
            <img
              className={styles['mobile-arrow-down']}
              src={ArrowDownPNG}
              alt="pic"
            />
          </div>
        ) : null
      ) : (
        <Fragment>
          <DropdownList
            isDesktop={isDesktop}
            value={value}
            options={options}
            onChange={clickLangHandler}
          />
          <img
            className={styles['arrow-down']}
            src={ArrowDownPNG}
            alt="pic"
          />
        </Fragment>
      )
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
