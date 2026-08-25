import path from 'path';
import { fileURLToPath } from 'url';
import copy from 'recursive-copy';
import config from '../config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function buildContent() {
  // content/ holds bio.md, which templates/index.js also reads directly as the
  // source of the bio card. Published under the asset subdirectory rather than
  // at the root, since it is generated output as far as the site is concerned.
  //
  // llms.txt and resume.pdf used to live here too. They are plain content at
  // stable root URLs, so they moved to the lmorchard.com content repo where
  // they can be edited without a rebuild.
  await copy(
    path.join(__dirname, '..', 'content'),
    path.join(config.buildPath, config.assetSubPath),
    {
      overwrite: true,
      debug: true,
      filter: ['**/*'],
    }
  );
}

export { buildContent };
