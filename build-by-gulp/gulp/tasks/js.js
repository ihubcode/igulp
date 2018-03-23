var gulp = require('gulp');
var config = require('../config').js;
var webpack = require('gulp-webpack');
var rename = require('gulp-rename');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify'); 
var babel = require("gulp-babel");
var handleErrors = require('../util/handleErrors');
var filter = require('gulp-filter');


gulp.task('js-dev', function() {
    return gulp.src(config.src)
        // .pipe(webpack());
        // webpack

    // .pipe(rev())
    .pipe(gulp.dest(config.dest)); //输出目录
        // .pipe(rename(function(path) { //重设以改变输出结构
        //     // 把rev的路径替换掉
        //     path.dirname = './js/';
        // }))
        // // .pipe(rev.manifest()) //set hash key json
        // .pipe(gulp.dest(config.rev)); //dest hash key json;
});

gulp.task('js-deploy', function() {
    var jsFilter = filter(['**', '!**/libs.min.js', '!**/base.min.js'], {restore: true});

    return gulp.src(config.src)
        // webpack
        .pipe(jsFilter)
        .pipe(rev())
        .pipe(jsFilter.restore)

        // .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest(config.dest)) //输出目录
        .pipe(rename(function(path) { //重设以改变输出结构
            // 把rev的路径替换掉
            // path.dirname = './js/';
            path.dirname = '/public/' + path.dirname;
            // console.log(path.dirname);
        }))
        .on('error', handleErrors)     //交给notify处理错误
        .pipe(rev.manifest()) //set hash key json
        .pipe(gulp.dest(config.rev)); //dest hash key json;
});
