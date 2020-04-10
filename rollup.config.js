/*eslint-env node*/
// rollup.config.js

const { isProductionMode, isDocker } = require('./helpers');

// Loads the env vars outside of a docker container
if (!isDocker) require('dotenv').config();

const json = require('@rollup/plugin-json');
const { terser } = require('rollup-plugin-terser');
const babel = require('rollup-plugin-babel');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const alias = require('@rollup/plugin-alias');
import replace from '@rollup/plugin-replace';
const path = require('path');
const { folders, js, endpoint } = require('./config');


const serviceEndpoint = process.env.ENDPOINT || endpoint;

const output = () => {
  const basic = {
    dir: `${folders.output}${js.source}`,
    format: 'esm',
    sourcemap: !isProductionMode,
    plugins: [],
  };

  const prod = {
    ...basic,
    name: 'version',
    plugins: [terser()],
  };

  return isProductionMode ? prod : basic;
};

const plugins = [
  json(),
  resolve({ preferBuiltins: false }),
  commonjs(),
  babel({ runtimeHelpers: true }),
  alias({
    entries: [{ find: 'default', replacement: path.resolve(__dirname, 'config/env') }],
  }),
  replace({ __prodEndpoint__: serviceEndpoint }),
];

module.exports = {
  input: `${folders.source}${js.source}${js.main}`,
  output: output(),
  plugins,
};
