const gulp = require('gulp');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');

gulp.task('babel', () =>
  gulp.src('../src/js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('../'))
);

gulp.task('postcss', () =>
  gulp.src('../src/css/global.css')
    .pipe(postcss())
    .pipe(gulp.dest('../public/css'))
);

gulp.task('default', ['babel', 'postcss']);
