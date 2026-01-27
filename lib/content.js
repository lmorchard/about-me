import path from 'path';
import { fileURLToPath } from 'url';
import copy from 'recursive-copy';
import config from '../config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function buildContent() {
  // Copy all files from content/ to build root
  await copy(
    path.join(__dirname, '..', 'content'),
    config.buildPath,
    {
      overwrite: true,
      debug: true,
      filter: ['**/*'],
    }
  );
}

export { buildContent };
