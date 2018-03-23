/**
 * [gulp webpack打包JS]
 * @type {[type]}
 */
var gulp = require('gulp');
var config = require('../config').js;
var webpack = require('gulp-webpack');

gulp.task('webpack', function() {
    return gulp.src(config.src)
        .pipe(webpack())
        .pipe(gulp.dest(config.dest)); //输出目录
});
