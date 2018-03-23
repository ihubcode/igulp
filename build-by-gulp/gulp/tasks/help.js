/**
 * [gulp 帮助文档]
 * @type {[type]}
 */
var gulp = require('gulp');

gulp.task('help', function() {
    console.log('   gulp build          开发环境编译');
    console.log('   gulp deploy         开发环境编译');
    console.log('   gulp watch          文件监控打包');
    console.log('   gulp help           gulp帮助说明');
    console.log('   gulp server         测试server');
    console.log('   gulp -p             生产环境（默认生产环境）');
    console.log('   gulp -d             开发环境');
    console.log('   gulp -m <module>    部分模块打包（默认全部打包）');
});
