/**
 * [gulp swf文件]
 * @type {[type]}
 */
var gulp = require('gulp');
var config = require('../config').swf;

gulp.task('swf', function() {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
});
