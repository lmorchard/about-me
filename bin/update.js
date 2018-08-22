#!/usr/bin/env node
require('babel-register')({ presets: ['node8', 'react'] });

const fs = require('fs');
const { all, map } = require('../src/lib/utils');
const config = require('../config');
const toFetch = config.fetch;

const fetchPath = (config, name) => {
  const path = config.component ? config.component : name;
  return `../src/components/${path}/fetch.js`;
};

async function main() {
  const results = await map(toFetch, name => {
    console.log(`${Date.now()} start fetching ${name}`);
    const result = require(fetchPath(config[name], name)).default(config[name], name)
    console.log(`${Date.now()} finish fetching ${name}`);
    return result;
  });
  const state = {};
  results.forEach((data, idx) => (state[toFetch[idx]] = data));
  fs.writeFileSync(
    __dirname + '/../data.json',
    JSON.stringify(state, null, ' ')
  );
}

main();
