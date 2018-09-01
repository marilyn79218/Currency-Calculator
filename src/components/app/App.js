// @flow
import * as React from 'react';
import MediaQuery from 'react-responsive';

import { IsDesktopContext } from '../../shared/contexts';
import LangWrapper from '../LangWrapper';
import LangSwitcher from '../LangSwitcher';
import Menu from '../Menu';

import styles from './App.m.css';

type Props = {
  children: React.Node,
};

/* eslint-disable react/jsx-boolean-value */
const App = ({ children }: Props) => (
  <React.Fragment>
    <MediaQuery minWidth={768}>
      <IsDesktopContext.Provider
        value={true}
      >
        <LangWrapper
          renderProps={({
            LANG_OPTIONS,
            langValue,
            clickLangHandler,
          }) => (
            <div>
              <Menu
                LANG_OPTIONS={LANG_OPTIONS}
                langValue={langValue}
                clickLangHandler={clickLangHandler}
              />
              {children}
            </div>
          )}
        />
      </IsDesktopContext.Provider>
    </MediaQuery>
    <MediaQuery maxWidth={767}>
      <IsDesktopContext.Provider
        value={false}
      >
        <LangWrapper
          renderProps={({
            LANG_OPTIONS,
            langValue,
            clickLangHandler,
          }) => (
            <div
              className={styles['app-mobile-container']}
            >
              <Menu
                langValue={langValue}
              />
              {children}
              <div
                className={styles['app-mobile-langswitcher']}
              >
                <LangSwitcher
                  isDesktop={false}
                  value={langValue}
                  options={LANG_OPTIONS}
                  onChange={clickLangHandler}
                />
              </div>
            </div>
          )}
        />
      </IsDesktopContext.Provider>
    </MediaQuery>
  </React.Fragment>
);

export default App;
