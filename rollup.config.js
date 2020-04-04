/*eslint-env node*/
// rollup.config.js
const json = require('@rollup/plugin-json');
const { terser } = require('rollup-plugin-terser');
const babel = require('rollup-plugin-babel');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { folders } = require('./config');
const { isProductionMode } = require('./helpers')

const watch = isProductionMode ? {} : {
  include: `${folders.source}/js/**/*.js`,
  exclude: 'node_modules/**'
}

const output = () => {
  const basic =   {
    dir: `${folders.output}/js/index.js`,
    format: 'esm',
    sourcemap: !isProductionMode,
    plugins: []
  }

  const prod = {
    ...basic,
    name: 'version',
    plugins: [terser()]
  };

  return isProductionMode ? prod : basic
}

const plugins = [
  json(),
  resolve(),
  commonjs(),
  babel({ runtimeHelpers: true }),
];

module.exports = {
  input: `${folders.source}/js/`,
  output: output(),
  plugins,
  watch
};
