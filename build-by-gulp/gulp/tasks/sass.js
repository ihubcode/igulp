/**
 * [gulp 编译sass资源]
 * @type {[type]}
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('../config').sass;
var handleErrors = require('../util/handleErrors');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var minify = require('gulp-minify-css');
var rev = require('gulp-rev');
var filter = require('gulp-filter');

// nested 继承,compact 紧凑,expanded 展开,compressed 压缩
// 开发环境
gulp.task('sass-dev', function() {
    return gulp.src(config.src) //sass源文件
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' })) //执行编译
        .on('error', handleErrors) //交给notify处理错误
        .pipe(sourcemaps.write())
        .pipe(rename(function(path) { //重设以改变输出结构
            path.extname = '.min.css';
            path.dirname = path.dirname.replace('scss', 'css');
        }))
        // .pipe(rev())
        .pipe(gulp.dest(config.dest)) //输出目录
        .pipe(rename(function(path) { //重设以改变输出结构
            // 把rev的路径替换掉
            path.dirname = './css/';
        }));
    // .pipe(rev.manifest()) //set hash key json
    // .pipe(gulp.dest(config.rev)); //dest hash key json
});

// 生产环境
gulp.task('sass-deploy', function() {
    var cssFilter = filter(['**', '!**/common.min.css'], {restore: true});

    return gulp.src(config.src) //sass源文件
        .pipe(sass({ outputStyle: 'compressed' })) //执行编译
        .on('error', handleErrors) //交给notify处理错误
        .pipe(minify())
        .pipe(rename(function(path) { //重设以改变输出结构
            path.extname = '.min.css';
            path.dirname = path.dirname.replace('scss', 'css');
        }))
        .pipe(cssFilter)
        .pipe(rev())
        .pipe(cssFilter.restore)
        .pipe(gulp.dest(config.dest)) //输出目录
        .pipe(rename(function(path) { //重设以改变输出结构
            // 把rev的路径替换掉
            // path.dirname = './css/';
            path.dirname = '/public/' + path.dirname;
        }))
        .pipe(rev.manifest()) //set hash key json
        .pipe(gulp.dest(config.rev)); //dest hash key json
});
