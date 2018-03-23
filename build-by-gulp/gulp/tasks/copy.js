/**
 * [gulp 复制资源文件]
 * @type {[type]}
 */
var gulp = require('gulp');
var config = require('../config').copy;

/**
 * 拷贝入口文件 src/app_pc/ 到 build/
 */
gulp.task('copy', ['iconfont', 'swf', 'json', 'images', 'libs'], function() {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
});
