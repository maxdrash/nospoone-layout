'use strict';

const path = require('path');
const gulp = require('gulp');
const util = require('gulp-util');
const less = require('gulp-less');
const pug = require('gulp-pug');
const cleanCSS = require('gulp-clean-css');
const pump = require('pump');

gulp.task('pug', callback => {
	pump([
		gulp.src([
			path.resolve('./dashboard/source/', '*.pug'),
			path.resolve('./graphics/source/', '*.pug'),
			'!' + path.resolve('./dashboard/source/includes/', '*.pug'),
			'!' + path.resolve('./graphics/source/includes/', '*.pug')
		]),
		pug(),
		gulp.dest(file => {
			return path.join(path.dirname(file.path), '../');
		})
	], callback);
});

gulp.task('less', callback => {

	pump([
		gulp.src([
			'./dashboard/assets/css/source/*.less',
			'!./dashboard/assets/css/source/includes/*.less',
			'./graphics/assets/css/source/*.less',
			'!./graphics/assets/css/source/includes/*.less'
		]),
		less(),
		cleanCSS(),
		gulp.dest(file => {
			return path.join(path.dirname(file.path), '../');
		})
	], callback);
});

gulp.task('compile', ['pug', 'less']);

gulp.task('watch', ['compile'], () => {
	gulp.watch('**/*.pug', ['pug']);
	gulp.watch('**/*.less', ['less']);
});
