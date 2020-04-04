/*eslint-env node*/
const { src, dest } = require('gulp');
const gsass = require('gulp-sass');
const gclean = require('gulp-clean');
const { browserSync } = require('./helpers')
const { folders, sass: sassCong } = require('../config');

// Clean files
 function clean() {
  return src(`${folders.output}`, { read: false, allowEmpty: true }).pipe(gclean());
}

// Copy HTML files
function html() {
  return src(`${folders.source}/*.html`)
    .pipe(dest(folders.output))
    .pipe(browserSync.stream());
}

// Copy Sass files
function sass() {
  const source = `${folders.source}${sassCong.source}`;
  const output = `${folders.output}${sassCong.output}`;
  return src(source)
    .pipe(gsass().on('error', gsass.logError))
    .pipe(dest(output))
    .pipe(browserSync.stream());
}

module.exports = {
  clean,
  html,
  sass
}
