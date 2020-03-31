// rollup.config.js
const json = require('@rollup/plugin-json');
const { terser } = require('rollup-plugin-terser');
const del = require('rollup-plugin-delete');
const babel = require('rollup-plugin-babel');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

module.exports = {
  input: 'src/js/index.js',
  output: [
    {
      dir: 'bundlers/bundle',
      format: 'esm',
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: [
    json(),
    resolve(),
    commonjs(),
    babel({ runtimeHelpers: true }),
    del({ targets: 'bundlers/bundle/*' })
  ],
  watch: {
    include: 'src/js/**',
    exclude: 'node_modules/**'
  }
};
