const path = require('path');
const copy = require('recursive-copy');

const config = require('../config');

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

module.exports = {
  buildAssets,
};
