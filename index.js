#!/usr/bin/env node
const path = require("path");
const { mkdirp } = require("mkdirp");
const { rimraf } = require("rimraf");
const { fs } = require("./lib/files");
const { fetchAll } = require("./lib/fetch");
const { buildStyles } = require("./lib/styles");
const { buildAssets } = require("./lib/assets");
const indexTemplate = require("./templates");

const { Command } = require("commander");
const pkgJson = require("./package.json");
const config = require("./config");

const program = new Command();
program.version(pkgJson.version);

async function main() {
  await program.parseAsync(process.argv);
}

program.command("clean").description("clean existing build").action(cleanBuild);
program.command("fetch").description("fetch data sources").action(fetchAll);
program.command("build").description("build the page").action(buildAll);

async function buildAll() {
  await buildStyles();
  await buildAssets();
  await buildIndexPage();
}

async function buildIndexPage() {
  const data = JSON.parse(
    await fs.readFile(path.join(config.buildPath, "index.json"))
  );
  const html = indexTemplate({ config, data })();
  await fs.writeFile(path.join(config.buildPath, "index.html"), html);
}

async function cleanBuild() {
  await rimraf(config.buildPath);
  await mkdirp(config.buildPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
