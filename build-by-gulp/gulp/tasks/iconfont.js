/**
 * [gulp 字体文件]
 * @type {[type]}
 */
var gulp = require('gulp');
var config = require('../config').iconFont;

gulp.task('iconfont', function() {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
});
