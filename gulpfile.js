'use strict';

var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  nodemon = require('gulp-nodemon'),
  babelify = require('babelify'),
  source = require('vinyl-source-stream'),
  fs = require('fs'),
  runSequence = require('run-sequence'),
  del = require('del'),
  browserify = require('browserify');

gulp.task('default', function() {
  return nodemon({
    script: './src/app.js',
    ext: 'js',
    execMap: {
      js: "node --harmony --use_strict"
    },
    ignore: ['node_modules/**', '.git', 'build/*'],
  })
});

gulp.task('clean', function() {
  return del(['build/**/*']);
});

gulp.task('js:lint', function() {
  return gulp.src('./src/**/*.js')
    .pipe(jshint({
      esnext: true
    }))
    .pipe(jshint.reporter('default'));
});

gulp.task('build', function() {
  runSequence('clean', 'js:compile');
});

gulp.task('js:compile', ['js:lint'], function() {
  return browserify()
    .transform("babelify", {
      presets: ["es2015"]
    })
    .require('./src/js/flattify.js', {
      entry: true
    })
    .bundle()
    .pipe(source('flattify.js'))
    .pipe(gulp.dest('./build/'));
});
