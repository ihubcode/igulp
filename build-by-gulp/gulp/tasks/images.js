/**
 * [gulp 图片资源]
 * @type {[type]}
 */
var gulp = require('gulp');
var rename = require('gulp-rename');
var config = require('../config').images;
var handleErrors = require('../util/handleErrors');

gulp.task('images', function() {
    return gulp.src(config.src)
        .on('error', handleErrors)
        .pipe(rename(function(path) { //重设以改变输出结构
            // path.dirname = path.dirname.replace('images', '');
        }))
        .pipe(gulp.dest(config.dest));
});
