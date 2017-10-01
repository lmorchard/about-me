import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { hydrate } from 'react-dom';
import { renderToString } from 'react-dom/server';

import './index.scss';
import App from './containers/App';

if (typeof global.document !== 'undefined') {
  const rootEl = document.getElementById('root');
  const render = Component =>
    hydrate(
      <AppContainer>
        <Component />
      </AppContainer>,
      rootEl
    );
  render(App);
  if (module.hot) module.hot.accept('./containers/App', () => render(App));
}

export default data => {
  const { title } = data;
  const assets = Object.keys(data.webpackStats.compilation.assets);
  return data.template({
    css: assets.filter(value => value.match(/\.css$/)),
    js: assets.filter(value => value.match(/\.js$/)),
    body: renderToString(<App />),
    ...data
  });
};
