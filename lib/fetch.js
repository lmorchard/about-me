const path = require("path");
const { mapAll } = require("./utils");
const { fs } = require('./files');
const config = require("../config");

async function fetchAll() {
  const toFetch = config.fetch;
  const results = await mapAll(Object.entries(toFetch), fetchDataSource);
  const state = results
    .filter((r) => !!r)
    .reduce((acc, [name, result], idx) => ({ ...acc, [name]: result }), {});
  const dataPath = path.join(config.buildPath, "index.json");
  await fs.writeFile(dataPath, JSON.stringify(state, null, " "));
}

const fetchPath = (fetchConfig, name) => {
  const path = fetchConfig.component ? fetchConfig.component : name;
  return `../cards/${path}/fetch.js`;
};

async function fetchDataSource([name, fetchConfig]) {
  try {
    const startTime = Date.now();
    console.log(`${startTime} start ${name}`);
    const fetcher = require(fetchPath(fetchConfig, name));
    const result = await fetcher(fetchConfig, name);
    const endTime = Date.now();
    console.log(`${endTime} finish ${name} (${endTime - startTime}ms)`);
    return [name, result];
  } catch (err) {
    console.error(`${name} failed: ${err}`);
    process.exit(1);
    return null;
  }
}

module.exports = {
  fetchAll
};
