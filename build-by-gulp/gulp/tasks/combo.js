/**
 * [gulp 合并]
 * @type {[type]}
 */
var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);

/* 默认 */
gulp.task('default', function() {
    gulp.start('help');
});

// 开发环境
gulp.task('build', gulpsync.sync(['sass-dev', 'js-dev', 'html-dev', 'copy', 'watch']));

// 部署环境
gulp.task('deploy', gulpsync.sync(['sass-deploy', 'js-deploy', 'html-deploy', 'copy', 'rev-collector']));
// gulp.task('deploy', gulpsync.sync(['clean', ['sass-deploy', 'js-deploy', 'html', 'copy', 'browserify-deploy','rev-collector-test']]));

gulp.task('watchJs', gulpsync.sync(['browserify', 'rev-collector']));
// gulp.task('watchSass', gulpsync.sync(['sass-dev', 'rev-collector']));
gulp.task('watchSass', gulpsync.sync(['sass-dev']));
gulp.task('watchHtml', gulpsync.sync(['html-dev']));

/*
    gulp任务会同步执行，rev-js任务是执行在browserify任务之后的
    browserify任务完成，会生成临时的js文件夹，rev-js将会操作这个文件夹。
    但是browserify并不是用的gulp管道，所以gulp-aync无法得知browserify是否真正完成
    这里给任务配置延迟有用，但是配置延迟之后，gulp-sync不能正确获取到它是否完成
*/
