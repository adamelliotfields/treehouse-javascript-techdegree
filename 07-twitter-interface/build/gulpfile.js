const gulp = require('gulp');
const newer = require('gulp-newer');
const html2jade = require('gulp-html2jade');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');

gulp.task('default', () =>
  gulp.src('../src/js/*.js')
    .pipe(newer('../'))
    .pipe(babel())
    .pipe(gulp.dest('../'))
);

gulp.task('templates', () =>
  gulp.src('../src/html/*.html')
  .pipe(newer('../dist/templates'))
  .pipe(html2jade({ noattrcomma: true, noemptypipe: true }))
  .pipe(rename((path) => {
    path.extname = '.pug';
  }))
  .pipe(gulp.dest('../dist/templates'))
);

gulp.task('includes', () =>
  gulp.src('../src/html/includes/*.html')
    .pipe(newer('../dist/templates/includes'))
    .pipe(html2jade({ bodyless: true, noattrcomma: true, noemptypipe: true }))
    .pipe(rename((path) => {
      path.extname = '.pug';
    }))
    .pipe(gulp.dest('../dist/templates/includes'))
);

gulp.task('pug', ['templates', 'includes']);

// Requires server to be running on localhost:8080
// Requires src/css to be served in app.js
gulp.task('postcss', () =>
  gulp.src('../src/css/global.css')
    .pipe(newer('../public/css'))
    .pipe(postcss())
    .pipe(gulp.dest('../public/css'))
);

// Watches src/js for changes
gulp.task('watch', () => {
  gulp.watch('../src/js/*.js', ['default']);
});
