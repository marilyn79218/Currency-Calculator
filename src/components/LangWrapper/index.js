import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {
  compose,
  withState,
  withHandlers,
  lifecycle,
} from 'recompose';

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
  }),
  lifecycle({
    componentDidMount() {
      const {
        history: {
          push,
        },
        setLangValue,
      } = this.props;
      const curLangValue = i18n.language;

      setLangValue(curLangValue);
      push(`/${curLangValue}/prices`);
    },
  }),
);

export default hoc(LangWrapper);
