#!/usr/bin/env node
require("babel-register")({ presets: ["node8", "react"] });

const fs = require("fs");
const { all, map } = require("../src/lib/utils");
const toFetch = require("../config").fetch;

const fetchPath = (fetchConfig, name) => {
  const path = fetchConfig.component ? fetchConfig.component : name;
  return `../src/components/${path}/fetch.js`;
};

const fetchDataSource = async ([name, fetchConfig]) => {
  const startTime = Date.now();
  console.log(`${startTime} start ${name}`);
  const fetcher = require(fetchPath(fetchConfig, name)).default;
  const result = await fetcher(fetchConfig, name);
  const endTime = Date.now();
  console.log(`${endTime} finish ${name} (${endTime - startTime}ms)`);
  return result;
};

async function main() {
  const results = await map(Object.entries(toFetch), fetchDataSource);
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
