const gulp = require('gulp');
const newer = require('gulp-newer');
const html2jade = require('gulp-html2jade');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');

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

// Requires server to be running and src/css to be served instead of public/css
gulp.task('postcss', () =>
  gulp.src('../src/css/global.css')
    .pipe(newer('../public/css'))
    .pipe(postcss())
    .pipe(rename((path) => {
      path.extname = '.min.css';
    }))
    .pipe(gulp.dest('../public/css'))
);

gulp.task('default', () =>
  gulp.src('../src/js/*.js')
    .pipe(newer('../'))
    .pipe(babel())
    .pipe(gulp.dest('../'))
);

gulp.task('watch', () => {
  gulp.watch('../src/js/*.js', ['default']);
});
