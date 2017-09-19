const gulp = require('gulp');
const del = require('del');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const shell = require('gulp-shell');

gulp.task('clean', () => {
  del(['dist/**/*']);
});

gulp.task('scripts', ['clean'], () =>
  gulp.src('src/js/*.js')
    .pipe(eslint({ configFile: './.eslintrc.json', fix: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(concat('all.min.js'))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/scripts'))
);

gulp.task('babel', ['scripts'], () =>
  gulp.src('src/jsx/*.jsx')
    .pipe(babel({ presets: ['react'] }))
    .pipe(gulp.dest('dist/views'))
);

gulp.task('styles', ['babel'], () =>
  gulp.src('src/sass/global.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename('all.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles'))
);

gulp.task('images', ['styles'], () =>
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/content'))
);

gulp.task('copy', ['images'], () => {
  gulp.src('src/icons/**/*')
    .pipe(gulp.dest('dist/icons'));
  gulp.src('src/lib/*')
    .pipe(gulp.dest('dist/lib'));
});

gulp.task('build', ['copy']);

gulp.task('watch', ['build'], () =>
  gulp.watch('src/sass/**/*')
    .on('change', (event) => {
      console.log(event.path, event.type);
      gulp.src('src/sass/global.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(rename('all.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/styles'));
    })
);

gulp.task('serve', ['watch'], () =>
  gulp.src(__filename)
    .pipe(shell('node server.js'))
);

gulp.task('default', ['serve']);
