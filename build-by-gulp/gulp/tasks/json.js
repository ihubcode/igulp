/**
 * [gulp json文件]
 * @type {[type]}
 */
var gulp = require('gulp');
var config = require('../config').json;

gulp.task('json', function() {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
});
