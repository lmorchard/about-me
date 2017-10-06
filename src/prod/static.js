import React from 'react';
import { renderToString } from 'react-dom/server';

import '../index.scss';
import App from '../containers/App';

let state = require('../../data.json');

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
