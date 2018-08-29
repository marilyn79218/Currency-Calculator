// @flow
import * as React from 'react';

import Menu from '../Menu';

type Props = {
  children: React.Node,
};

const App = ({ children }: Props) => (
  <div>
    <Menu />
    {children}
  </div>
);

export default App;
