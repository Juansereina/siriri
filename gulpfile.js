/*eslint-env node*/
const { series, parallel, src, dest, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const inject = require('gulp-inject');

/*
-- TOP LEVEL FUNCTIONS --
  gulp.task = Define tasks
  gulp.src = Point to files to use
  gulp.dest = Points to folder to output
  gulp.watch = Watch files and folders for changes
 */

// Environment Selected
const targetPath = process.env.NODE_ENV === 'production' ? 'build' : 'public';

// Clean files
function cleanFiles() {
  return src(`${targetPath}/*`, { read: false, allowEmpty: true }).pipe(clean());
}

// Copy All HTML files
function copyHtml() {
  return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('build'));
}

// Copy All HTML files Dev Env
function copyHtmlDev() {
  return src('src/*.html')
    .pipe(dest('public'))
    .pipe(browserSync.stream());
}

// Minify JS
function copyJs() {
  return src(['bundlers/bundle-min/*.js','bundlers/bundle-min/*.js.map'])
    .pipe(dest('build/js'));
}

// Minify JS Dev Env
function copyJsDev() {
  return src(['bundlers/bundle/*.js','bundlers/bundle/*.js.map'])
    .pipe(dest('public/js'))
    .pipe(browserSync.stream());
}

// Compile SASS
function sassCompile() {
  return src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(dest('build/css'));
}

// Compile SASS Dev Env
function sassCompileDev() {
  return src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('public/css'))
    .pipe(browserSync.stream());
}

// Live reloading
function serve() {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  });
  watch('src/*.html', copyHtmlDev);
  watch('src/sass/**/*.scss', sassCompileDev);
  watch('bundlers/bundle/**/*.js', copyJsDev);
}

// Inject files to target - Styles injected
function indexInjection() {
  const target = src(`${targetPath}/index.html`);
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  const sources = src(`${targetPath}/**/*.css`, {
    read: false
  });
  return target
    .pipe(
      inject(sources, {
        ignorePath: `${targetPath}/`,
        addRootSlash: false
      })
    )
    .pipe(dest(targetPath));
}

exports.build = series(
  cleanFiles,
  parallel(copyHtml, sassCompile, copyJs),
  indexInjection
);
exports.serve = series(
  cleanFiles,
  parallel(copyHtmlDev, sassCompileDev, copyJsDev),
  indexInjection,
  serve
);
