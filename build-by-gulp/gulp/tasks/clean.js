/**
 * [gulp 清除]
 * @type {[type]}
 */
var gulp = require('gulp');
var clean = require('gulp-clean');
var config = require('../config').clean;

// 清理build
gulp.task('clean', function() {
    return gulp.src(config.dest, { read: false })
        .pipe(clean({ force: true }))
        .pipe(gulp.src(config.temp))
        .pipe(clean({ force: true }));
});

// 清理buildTemp
gulp.task('cleanBuildTemp', function() {
    return gulp.src(config.dest, { read: false })
        .pipe(clean({ force: true }))
        .pipe(gulp.src(config.temp))
        .pipe(clean({ force: true }));
});
