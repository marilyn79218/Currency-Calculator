// @flow
import * as React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import App from '../components/app';
import Prices from '../components/Prices';

const AppRoute: () => React.Node = () => (
  <App>
    <Switch>
      <Route exact path="/:ling/wallet" component={() => <div>Wallet</div>} />
      <Route exact path="/:ling/account" component={() => <div>Account</div>} />
      <Route path="/:ling/prices" component={Prices} />
    </Switch>
  </App>
);

export default AppRoute;
