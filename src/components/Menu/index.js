import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  type TFunction,
  translate,
} from 'react-i18next';

import {
  compose,
  // withState,
  // withProps,
  // withHandlers,
  lifecycle,
} from 'recompose';

import i18n from '../../Root/i18next';

import styles from './Menu.m.css';

type Props = {
  // isLabel: boolean,
  // labelJob: boolean => Promise<*>,
};

type PropsFromHOC = {
  t: TFunction,
};

const Menu = ({
  t,
  history: {
    push,
  },
  // location: {
  //   pathname,
  // },
}: Props | PropsFromHOC) => {
  console.log('render');

  return (
    <div
      className={styles.menu}
    >
      Menu here
      {t('woooo_ha')}

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
  );
};

const hoc = compose(
  withRouter,
  translate('default'),
  lifecycle({
    componentDidMount() {
      console.log('componentDidMount', this.props);
    },
  }),
);

export default hoc(Menu);
