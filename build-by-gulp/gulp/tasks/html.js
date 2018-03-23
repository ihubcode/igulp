/**
 * [gulp 编译模板文件]
 * @type {[type]}
 */
var gulp = require('gulp');
var rename = require('gulp-rename');
var fileinclude = require('gulp-file-include');
var config = require('../config').html;
var handleErrors = require('../util/handleErrors');
var minifyHTML = require('gulp-minify-html');

gulp.task('html-dev', function() {
    return gulp.src(config.src)
        .on('error', handleErrors)
        .pipe(rename(function(path) { //重设以改变输出结构
            path.dirname = path.dirname.replace('view', '');
        }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: config.basePath
        }))
        .pipe(minifyHTML({
            empty: true,
            spare: true
        }))
        .pipe(gulp.dest(config.dest));
});

gulp.task('html-deploy', function() {
    return gulp.src(config.src)
        .on('error', handleErrors)
        .pipe(rename(function(path) { //重设以改变输出结构
            path.dirname = path.dirname.replace('view', '');
            // console.log(path.basename + path.extname);
        }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: config.basePath
        }))
        .pipe(minifyHTML({
            empty: true,
            spare: true
        }))
        .pipe(gulp.dest(config.dest));
});
