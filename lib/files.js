const util = require("util");
const { mapFn } = require("./utils");

const fs = mapFn(["stat", "readdir", "readFile", "writeFile"], (name) =>
  util.promisify(require("fs")[name])
);

module.exports = {
  fs
};
