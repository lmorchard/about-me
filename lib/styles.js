import path from 'path';
import { globby } from 'globby';
import { mkdirp } from 'mkdirp';
import { fs } from './files.js';
import config from '../config.js';

async function buildStyles() {
  // Gather all CSS files in the correct order
  const cssFiles = [
    './styles/index.css',
    ...(await globby('./content/**/index.css')),
    ...(await globby('./templates/**/index.css')),
    ...(await globby('./cards/**/index.css')),
  ];

  // Simple concatenation - read all CSS files and combine them
  let combinedCSS = '';
  for (const file of cssFiles) {
    const content = await fs.readFile(file, 'utf-8');
    combinedCSS += `/* ${file} */\n${content}\n\n`;
  }

  // buildStyles runs first, before the recursive copies that would otherwise
  // create this directory, and fs.writeFile does not create parents.
  const cssPath = path.join(config.buildPath, config.assetSubPath, 'index.css');
  await mkdirp(path.dirname(cssPath));
  await fs.writeFile(cssPath, combinedCSS);
}

export { buildStyles };
