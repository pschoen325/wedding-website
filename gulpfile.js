'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var ttf2woff2 = require('gulp-ttf2woff2');

// compile scss to css
gulp.task('sass', function () {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({basename: 'styles.min'}))
        .pipe(gulp.dest('./css'));
});

// convert ttf to woff2
gulp.task('ttf2woff2', function(){
    return gulp.src(['fonts/*.ttf'])
      .pipe(ttf2woff2())
      .pipe(gulp.dest('fonts/'));
  });
  

// watch changes in scss files and run sass task
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

// minify js
gulp.task('minify-js', function () {
    return gulp.src('./js/scripts.js')
        .pipe(uglify())
        .pipe(rename({basename: 'scripts.min'}))
        .pipe(gulp.dest('./js'));
});

// default task
gulp.task('default', gulp.series('sass', 'minify-js', 'ttf2woff2'));