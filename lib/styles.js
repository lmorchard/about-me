const util = require("util");
const path = require("path");
const globby = require("globby");
const { fs } = require("./files");
const sassRender = util.promisify(require("node-sass").render);

const config = require("../config");

async function buildStyles() {
  const scssData = [
    "./styles/index.scss",
    ...(await globby("./content/**/index.scss")),
    ...(await globby("./templates/**/index.scss")),
    ...(await globby("./cards/**/index.scss")),
  ]
    .map((file) => `@import "${file}";`)
    .join("\n");
  const scssResult = await sassRender({ data: scssData });
  const cssPath = path.join(config.buildPath, "index.css");
  await fs.writeFile(cssPath, scssResult.css);
}

module.exports = {
  buildStyles
};
