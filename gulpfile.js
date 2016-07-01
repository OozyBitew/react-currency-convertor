'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var notify = require('gulp-notify');

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
  return gulp.src('./src/currency-convertor/index.jsx')
  .pipe(babel({
    presets: ['es2015'],
    plugins: ['transform-react-jsx']
  }))
  .on('error', logError)
  .pipe(browserify({
    global: true,
    debug: true
  }))
  .on('error', logError)
  .pipe(gulp.dest('./demo'));
});

gulp.task('start', function(cb) {
  return runSequence('build', cb);
});
