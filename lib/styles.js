import path from 'path';
import { globby } from 'globby';
import { fs } from './files.js';
import * as sass from 'sass';
import config from '../config.js';

async function buildStyles() {
  const scssData = [
    './styles/index.scss',
    ...(await globby('./content/**/index.scss')),
    ...(await globby('./templates/**/index.scss')),
    ...(await globby('./cards/**/index.scss')),
  ]
    .map((file) => `@import "${file}";`)
    .join('\n');
  const scssResult = sass.compileString(scssData, {
    loadPaths: [process.cwd()],
  });
  const cssPath = path.join(config.buildPath, 'index.css');
  await fs.writeFile(cssPath, scssResult.css);
}

export { buildStyles };
