// @flow
import * as React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import App from '../components/app';
import Prices from '../containers/Prices';
import Wallet from '../components/Wallet';
import Account from '../components/Account';

const AppRoute: () => React.Node = () => (
  <App>
    <Switch>
      <Route exact path="/:lng/wallet" component={Wallet} />
      <Route exact path="/:lng/account" component={Account} />
      <Route path="/:lng/prices" component={Prices} />
    </Switch>
  </App>
);

export default AppRoute;
