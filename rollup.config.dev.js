// rollup.config.js
const json = require('@rollup/plugin-json');
const del = require('rollup-plugin-delete');

module.exports = {
  input: 'src/js/index.js',
  output: [
    {
      dir: 'bundlers/bundle',
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    json(),
    del({ targets: 'bundlers/bundle/*' })
  ],
  watch: {
    include: 'src/js/**',
    exclude: 'node_modules/**'
  }
};
