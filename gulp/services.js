/*eslint-env node*/
const browserSync = require('browser-sync').create();
const { watch } = require('gulp');
const { folders, sass: sassCong, js } = require('../config');
const { isProductionMode } = require('../helpers');
const task = require('./tasks');

function browserSyncReload(done) {
  browserSync.reload();
  done();
}

// Live reloading
function serve(done) {
  const port = process.env.PORT || 8080;

  if (isProductionMode) return done();

  browserSync.init({
    server: {
      baseDir: folders.output
    },
    port
  });
  watch(`${folders.source}/**/*.html`, task.html);
  watch(`${folders.source}${sassCong.source}${sassCong.main}`, task.sass);
  watch(`${folders.source}${js.source}${js.sw}`, task.sw);
  watch(`${folders.output}/**/*.html`).on('change', browserSyncReload)
  watch(`${folders.output}${js.source}${js.main}`).on('change', browserSyncReload)
}

module.exports = {
  browserSync,
  serve
}
