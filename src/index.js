import React from 'react';
import { hydrate } from 'react-dom';

import { AppContainer } from 'react-hot-loader';

const render = () => {
  const App = require('./components/App').default;
  hydrate(
    <AppContainer><App /></AppContainer>,
    document.getElementById('root')
  );
}

render();

if (module.hot) {
  module.hot.accept('./components/App', render);
}
