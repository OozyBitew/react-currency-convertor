'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var less = require('gulp-less');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');

function logError(error) {
  var errorString = error.toString();
  notify.onError({
    title: 'Build Error',
    message: errorString
  })(error);
  console.log(errorString);
  this.emit('end');
}

gulp.task('build', function() {
  return gulp.src('./src/*.js*')
  .pipe(babel({
    presets: ['es2015', 'react']
  }))
  .on('error', logError)
  .pipe(browserify({
    global: true,
    debug: true,
    extensions: ['.jsx']
  }))
  .on('error', logError)
  .pipe(uglify())
  .pipe(gulp.dest('./demo'));
});

gulp.task('less', function() {
  return gulp.src('./src/demo.less')
  .pipe(less())
  .on('error', logError)
  .pipe(gulp.dest('./demo'));
});
