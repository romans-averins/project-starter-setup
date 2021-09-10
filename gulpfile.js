'use strict';

var nodeSass = require('node-sass');
var gulp = require('gulp');
var sass = require('gulp-sass')(nodeSass);
var browserSync = require('browser-sync').create();

gulp.task('sass', gulp.series(function () {
  return gulp.src('./assets/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
}));

gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./assets/scss/**/*.scss', gulp.parallel('sass'));
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./js/**/*.js').on('change', browserSync.reload);

});

gulp.task('default', gulp.series('watch'));