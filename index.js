#!/usr/bin/env node
import path from 'path';
import { mkdirp } from 'mkdirp';
import { rimraf } from 'rimraf';
import { fs } from './lib/files.js';
import { fetchAll } from './lib/fetch.js';
import { buildStyles } from './lib/styles.js';
import { buildAssets } from './lib/assets.js';
import { buildContent } from './lib/content.js';
import indexTemplate from './templates/index.js';
import { Command } from 'commander';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import config from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgJson = JSON.parse(
  readFileSync(path.join(__dirname, 'package.json'), 'utf-8')
);

const program = new Command();
program.version(pkgJson.version);

async function main() {
  await program.parseAsync(process.argv);
}

program.command('clean').description('clean existing build').action(cleanBuild);
program.command('fetch').description('fetch data sources').action(fetchAll);
program.command('build').description('build the page').action(buildAll);

async function buildAll() {
  await buildStyles();
  await buildAssets();
  await buildContent();
  await buildIndexPage();
}

async function buildIndexPage() {
  const data = JSON.parse(
    await fs.readFile(path.join(config.buildPath, 'index.json'))
  );
  const html = indexTemplate({ config, data })();
  await fs.writeFile(path.join(config.buildPath, 'index.html'), html);
}

async function cleanBuild() {
  await rimraf(config.buildPath);
  await mkdirp(config.buildPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
