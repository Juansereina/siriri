/*eslint-env node*/
const { src, dest } = require('gulp');
const gsass = require('gulp-sass');
const gclean = require('gulp-clean');
const ghtml = require('gulp-htmlmin');
const gif = require('gulp-if');
const { folders, sass: sassCong, js } = require('../config');
const { isProductionMode } = require('../helpers');
const { browserSync } = require('./services');

// Clean files
 function clean() {
  return src(`${folders.output}`, { read: false, allowEmpty: true }).pipe(gclean());
}

// Copy HTML files
function html() {
  return src(`${folders.source}/*.html`)
    .pipe(dest(folders.output))
    .pipe(gif(isProductionMode, ghtml({ collapseWhitespace: true })))
    .pipe(browserSync.stream());
}

// Copy Sass files
function sass() {
  const source = `${folders.source}${sassCong.source}`;
  const output = `${folders.output}${sassCong.output}`;
  return src(source)
    .pipe(gsass().on('error', gsass.logError))
    .pipe(gif(isProductionMode, gclean({ compatibility: 'ie8' })))
    .pipe(dest(output))
    .pipe(browserSync.stream());
}

function javascript() {
  return src(`${folders.output}/js/*.js`).pipe(browserSync.stream());
}

function sw() {
  return src(`${folders.source}${js.source}${js.sw}`)
  .pipe(dest(folders.output))
  .pipe(browserSync.stream());
}

module.exports = {
  clean,
  html,
  javascript,
  sass,
  sw
}
