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
  try {
    const startTime = Date.now();
    console.log(`${startTime} start ${name}`);
    const fetcher = require(fetchPath(fetchConfig, name)).default;
    const result = await fetcher(fetchConfig, name);
    const endTime = Date.now();
    console.log(`${endTime} finish ${name} (${endTime - startTime}ms)`);
    return [name, result];  
  } catch (err) {
    console.error(`${name} failed: ${err}`);
    return null;
  }
};

async function main() {
  const results = await map(Object.entries(toFetch), fetchDataSource);
  const state = results.filter(r => !!r).reduce(
    (acc, [name, result], idx) => ({ ...acc, [name]: result }),
    {}
  );
  fs.writeFileSync(
    __dirname + "/../data.json",
    JSON.stringify(state, null, " ")
  );
}

main();
