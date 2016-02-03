'use strict';

var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	babel = require('gulp-babel');



gulp.task('default', function () {
	nodemon({
		script:'./app.js',
		ext:'js',
	    execMap: {
	      js: "node --harmony --use_strict"
	    },
		ignore:'node_modules/**'
	})
});

gulp.task('build.js', function() {
	return gulp.src('./src/js/flattify.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('build'));
})

