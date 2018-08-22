#!/usr/bin/env node
require("babel-register")({ presets: ["node8", "react"] });

const fs = require("fs");
const { all, map } = require("../src/lib/utils");
const config = require("../config");
const toFetch = Object.keys(config);

const fetchPath = (config, name) => {
  const path = config.component ? config.component : name;
  return `../src/components/${path}/fetch.js`;
};

const fetchDataSource = async name => {
  const startTime = Date.now();
  console.log(`${startTime} start ${name}`);
  const fetcher = require(fetchPath(config[name], name)).default;
  const result = await fetcher(config[name], name);
  const endTime = Date.now();
  console.log(`${endTime} finish ${name} (${endTime - startTime}ms)`);
  return result;
};

async function main() {
  const results = await map(toFetch, fetchDataSource);
  const state = results.reduce(
    (acc, data, idx) => ({ ...acc, [toFetch[idx]]: data }),
    {}
  );
  fs.writeFileSync(
    __dirname + "/../data.json",
    JSON.stringify(state, null, " ")
  );
}

main();
