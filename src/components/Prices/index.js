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

type Props = {
  // isLabel: boolean,
  // labelJob: boolean => Promise<*>,
};

type PropsFromHOC = {
  t: TFunction,
};

const Prices = ({
  t,
}: Props | PropsFromHOC) => {
  console.log('Prices render');

  return (
    <div>
      Prices here
      {t('prices')}
    </div>
  );
};

const hoc = compose(
  withRouter,
  translate('default'),
  lifecycle({
    componentDidMount() {
      console.log('Prices componentDidMount', this.props);
    },
  }),
);

export default hoc(Prices);
