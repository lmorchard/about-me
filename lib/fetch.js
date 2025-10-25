import path from 'path';
import { mapAll } from './utils.js';
import { fs } from './files.js';
import config from '../config.js';

async function fetchAll() {
  const toFetch = config.fetch;
  const results = await mapAll(Object.entries(toFetch), fetchDataSource);
  const state = results
    .filter((r) => !!r)
    .reduce((acc, [name, result], _idx) => ({ ...acc, [name]: result }), {});
  const dataPath = path.join(config.buildPath, 'index.json');
  await fs.writeFile(dataPath, JSON.stringify(state, null, ' '));
}

const fetchPath = (fetchConfig, name) => {
  const path = fetchConfig.component ? fetchConfig.component : name;
  return `../cards/${path}/fetch.js`;
};

async function fetchDataSource([name, fetchConfig]) {
  try {
    const startTime = Date.now();
    console.log(`${startTime} start ${name}`);
    const fetcherModule = await import(fetchPath(fetchConfig, name));
    const fetcher = fetcherModule.default;
    const result = await fetcher(fetchConfig, name);
    const endTime = Date.now();
    console.log(`${endTime} finish ${name} (${endTime - startTime}ms)`);
    return [name, result];
  } catch (err) {
    const endTime = Date.now();
    console.error(`${endTime} ERROR ${name}: ${err.message}`);
    console.error(`  Stack: ${err.stack?.split('\n')[1]?.trim() || 'N/A'}`);

    // Return error object instead of exiting - allows other fetches to continue
    return [
      name,
      {
        error: true,
        message: err.message,
        timestamp: new Date().toISOString(),
      },
    ];
  }
}

export { fetchAll };
