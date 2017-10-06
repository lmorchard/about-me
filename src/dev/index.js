import React from 'react';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import '../index.scss';
import App from '../containers/App';

let state = require('../../data.json');

const rootEl = document.getElementById('root');
const render = (Component, state) =>
  hydrate(
    <AppContainer>
      <Component {...state} />
    </AppContainer>,
    rootEl
  );
render(App, state);
if (module.hot) {
  module.hot.accept('../containers/App', () => render(App, state));
  module.hot.accept('../../data.json', () => {
    state = require('../../data.json');
    render(App, state);
  });
}
