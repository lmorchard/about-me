import { promisify } from 'util';
import * as fsModule from 'fs';
import { mapFn } from './utils.js';

const fs = mapFn(['stat', 'readdir', 'readFile', 'writeFile'], (name) =>
  promisify(fsModule[name])
);

export { fs };
