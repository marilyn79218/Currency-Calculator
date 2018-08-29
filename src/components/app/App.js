// @flow
import * as React from 'react';

type Props = {
  children: React.Node,
};

const App = ({ children }: Props) => (
  <div>
    {children}
  </div>
);

export default App;
