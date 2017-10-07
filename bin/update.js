#!/usr/bin/env node
const fs = require('fs');

// HACK: re-use .babelrc, except enable module handling
const babelrc = JSON.parse(fs.readFileSync(__dirname + '/../.babelrc'));
delete babelrc.presets[0][1].modules;
require('babel-register')(babelrc);
require("regenerator-runtime/runtime");

const config = require('../config');
const toFetch = config.global.fetch;

function main() {
  Promise.all(
    toFetch.map(name =>
      require(`../src/components/${name}/fetch.js`).default(config[name])
    )
  ).then(results => {
    const state = {
      Bio: { }
    };
    results.forEach((data, idx) => (state[toFetch[idx]] = data));
    fs.writeFileSync(
      __dirname + '/../data.json',
      JSON.stringify(state, null, ' ')
    );
  });
}

main();
