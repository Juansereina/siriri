/*eslint-env node*/
const { series, parallel, watch } = require('gulp');
const task = require('./gulp/tasks');
const { folders, js, sass: sassCong } = require('./config');
const { isProductionMode } = require('./helpers');
const { browserSync } = require('./gulp/services');

function browserSyncReload() {
  browserSync.reload();
}

// Live reloading
function serve() {
  const port = process.env.PORT || 8080;

  if (isProductionMode) return;

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

exports.serve = series(
  task.clean,
  parallel(task.html, task.javascript, task.sass, task.sw),
  serve
);
