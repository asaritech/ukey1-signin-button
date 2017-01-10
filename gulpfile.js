var gulp = require('gulp');
var less = require('gulp-less');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var pkg = require('./package.json');

var banner = [
	'/*!\n',
	' * Ukey1 sign-in button (<%= pkg.repository.url %>)\n',
	' * Copyright ' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
	' * Licensed under <%= pkg.license %>\n',
	' */\n'
].join('');

gulp.task('less', function() {
	return gulp.src('less/ukey1-button.less')
		.pipe(less())
		.pipe(header(banner, { pkg: pkg }))
		.pipe(gulp.dest('css'));
});

gulp.task('minify-css', ['less'], function() {
	return gulp.src('css/ukey1-button.css')
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('css'));
});

gulp.task('default', ['less', 'minify-css']);

gulp.task('dev', ['browserSync', 'less', 'minify-css'], function() {
	gulp.watch('less/*.less', ['less']);
	gulp.watch('css/*.css', ['minify-css']);
});
