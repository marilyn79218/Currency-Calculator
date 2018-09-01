import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {
  compose,
  withState,
  withHandlers,
  lifecycle,
} from 'recompose';

import {
  TAB_NAMES,
  VALID_LANGS,
} from '../../shared/constants';
import i18n from '../../Root/i18next';

type LangObj = {
  value: string,
  label: string,
};

type Props = {
  renderProps: ({
    langValue: string,
    clickLangHandler: LangObj => any,
  }) => React.Node,
};
type PropsFromHOC = {
  langValue: string,
  clickLangHandler: LangObj => any,
};

const LANG_OPTIONS = [
  {
    label: '繁體中文',
    value: 'zh-TW',
  },
  {
    label: 'English',
    value: 'en-US',
  },
];

const LangWrapper = ({
  renderProps,
  langValue,
  clickLangHandler,
}: Props | PropsFromHOC) => (
  <Fragment>
    {
      renderProps({
        LANG_OPTIONS,
        langValue,
        clickLangHandler,
      })
    }
  </Fragment>
);

const hoc = compose(
  withRouter,
  withState('langValue', 'setLangValue', 'zh-TW'),
  withHandlers({
    clickLangHandler: props => (langObj) => {
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

      setLangValue(nextLangValue);
      push(`/${nextLangValue}/${curTab}`);
      i18n.changeLanguage(nextLangValue);
    },
    isValidTabName: () => (pathname) => {
      const pathnames = pathname.split('/');
      const curTabName = pathnames[2];
      return TAB_NAMES.includes(curTabName) && pathnames.length === 3;
    },
    isInvalidLang: () => curLangValue => !VALID_LANGS.includes(curLangValue),
  }),
  lifecycle({
    componentDidMount() {
      const {
        history: {
          push,
        },
        location: {
          pathname,
        },
        setLangValue,
        isInvalidLang,
        isValidTabName,
      } = this.props;

      let curLangValue = i18n.language || window.navigator.language;
      if (isInvalidLang(curLangValue)) {
        curLangValue = 'zh-TW';
      }
      i18n.changeLanguage(curLangValue);

      setLangValue(curLangValue);
      if (isValidTabName(pathname)) {
        const curTabName = pathname.split('/')[2];

        push(`/${curLangValue}/${curTabName}`);
      } else {
        push(`/${curLangValue}/prices`);
      }
    },
  }),
);

export default hoc(LangWrapper);
