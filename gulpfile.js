/*eslint-env node*/
const { series, parallel } = require('gulp');
const task = require('./gulp/tasks');
const { serve } = require('./gulp/services');

exports.serve = series(
  task.clean,
  parallel(task.html, task.javascript, task.sass, task.sw),
  serve
);
