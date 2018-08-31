import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {
  compose,
  withState,
  withHandlers,
  lifecycle,
} from 'recompose';

import { TAB_NAMES } from '../../shared/constants';
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
    isValidTabName: () => tabName => TAB_NAMES.includes(tabName),
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
        isValidTabName,
      } = this.props;
      const curLangValue = i18n.language;
      const curTabName = pathname.split('/')[2];

      setLangValue(curLangValue);
      if (isValidTabName(curTabName)) {
        push(`/${curLangValue}/${curTabName}`);
      } else {
        push(`/${curLangValue}/prices`);
      }
    },
  }),
);

export default hoc(LangWrapper);
