/*eslint-env node*/
const browserSync = require('browser-sync').create();
const { watch, src, dest } = require('gulp');
const { folders, sass: sassCong } = require('../config');
const { isProductionMode } = require('../helpers');
const task = require('./tasks');
const inject = require('gulp-inject');

function browserSyncReload(done) {
  browserSync.reload();
  done();
}

// Live reloading
function serve(done) {
  if (isProductionMode) return done();

  browserSync.init({
    server: {
      baseDir: folders.output
    }
  });
  watch(`${folders.source}/*.html`, task.html);
  watch(`${folders.source}${sassCong.source}`, task.sass);
  watch(`${folders.output}/*.html`).on('change', browserSyncReload)
}

// Inject files to target - Styles injected
function cssInjection() {
  const target = src(`${folders.output}/index.html`);
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  const sources = src(`${folders.output}/**/*.css`, {
    read: false
  });
  return target
    .pipe(
      inject(sources, {
        ignorePath: `${folders.output}`,
        addRootSlash: false
      })
    )
    .pipe(dest(folders.output));
}

module.exports = {
  browserSync,
  serve,
  cssInjection
}
