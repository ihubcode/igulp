/**
 * [gulp 监听]
 * @type {[type]}
 */
var gulp = require('gulp');
var watch = require('gulp-watch');
var config = require('../config');

gulp.task('watch', function() {
    watch(config.sass.src, function() { //监听所有sass
        gulp.start('watchSass'); //出现修改、立马执行sass任务
    });
    watch(config.copy.src, function() { //监听所有copy
        gulp.start('copy');
    });
    watch(config.images.src, function() { //监听所有image
        gulp.start('images');
    });
    watch(config.html.src, function() { //监听所有html
        gulp.start('watchHtml');
    });
    watch(config.js.src, function() { //监听所有js
        gulp.start('js-dev');
    });
    /*watch(config.browserify.watch, function(){  //监听所有js
    	gulp.start('watchJs'); 			
    });*/
});