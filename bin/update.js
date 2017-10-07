#!/usr/bin/env node
require('babel-register')({ presets: ['node8', 'react'] });

const fs = require('fs');
const { all, map } = require('../src/lib/utils');
const config = require('../config');
const toFetch = config.fetch;

const fetchPath = name => `../src/components/${name}/fetch.js`;

async function main() {
  const results = await map(toFetch, name =>
    require(fetchPath(name)).default(config[name])
  );
  const state = {};
  results.forEach((data, idx) => (state[toFetch[idx]] = data));
  fs.writeFileSync(
    __dirname + '/../data.json',
    JSON.stringify(state, null, ' ')
  );
}

main();
