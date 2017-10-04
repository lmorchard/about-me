import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { hydrate } from 'react-dom';
import { renderToString } from 'react-dom/server';

import './index.scss';
import App from './containers/App';

let state = require('../data.json');

if (typeof global.document !== 'undefined') {
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
    module.hot.accept('./containers/App', () => render(App, state));
    module.hot.accept('../data.json', () => {
      state = require('../data.json');
      render(App, state);
    });
  }
}

export default data => {
  const { title } = data;
  const assets = Object.keys(data.webpackStats.compilation.assets);
  return data.template({
    htmlWebpackPlugin: {
      options: {
        title,
        css: assets.filter(value => value.match(/\.css$/)),
        js: assets.filter(value => value.match(/\.js$/)),
        body: renderToString(<App {...state} />)
      }
    }
  });
};
