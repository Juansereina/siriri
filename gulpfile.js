/*eslint-env node*/
const { series, parallel } = require('gulp');
const task = require('./gulp/tasks');
const { cssInjection } = require('./gulp/helpers');

exports.serve = series(
  task.clean,
  parallel(task.html, task.sass),
  cssInjection
);
