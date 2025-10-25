import path from 'path';
import { fileURLToPath } from 'url';
import copy from 'recursive-copy';
import config from '../config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function buildAssets() {
  await copy(
    path.join(__dirname, '..', 'assets'),
    path.join(config.buildPath, 'assets'),
    {
      overwrite: true,
      debug: true,
    }
  );
}

export { buildAssets };
