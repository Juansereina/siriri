/*eslint-env node*/
// rollup.config.js
const json = require('@rollup/plugin-json');
const { terser } = require('rollup-plugin-terser');
const babel = require('rollup-plugin-babel');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { folders, js } = require('./config');
const { isProductionMode } = require('./helpers')

const output = () => {
  const basic =   {
    dir: `${folders.output}${js.source}`,
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
  input: `${folders.source}${js.source}${js.main}`,
  output: output(),
  plugins
};
