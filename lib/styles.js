import path from 'path';
import { globby } from 'globby';
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

  const cssPath = path.join(config.buildPath, 'index.css');
  await fs.writeFile(cssPath, combinedCSS);
}

export { buildStyles };
