#!/usr/bin/env node
const fs = require('fs');

// HACK: re-use .babelrc, except enable module handling
const babelrc = JSON.parse(fs.readFileSync(__dirname + '/../.babelrc'));
delete babelrc.presets[0][1].modules;
require('babel-register')(babelrc);

const config = require('../config');
const components = config.global.components;

function main() {
  Promise.all(
    components.map(name =>
      require(`../src/components/${name}/fetch.js`).default(config[name])
    )
  ).then(results => {
    const state = {
      Bio: { }
    };
    results.forEach((data, idx) => (state[components[idx]] = data));
    fs.writeFileSync(
      __dirname + '/../data.json',
      JSON.stringify(state, null, ' ')
    );
  });
}

main();
