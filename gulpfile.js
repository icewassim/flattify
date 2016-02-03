'use strict';

var gulp = require('gulp'),
	nodemon = require('gulp-nodemon');



gulp.task('default',function () {
	console.log('launching task');
	nodemon({
		script:'./app.js',
		ext:'js',
		ignore:'node_modules/**'
	})
})