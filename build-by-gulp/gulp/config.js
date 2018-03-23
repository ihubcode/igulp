/* gulp命令会由gulpfile.js运行，所以src和build文件夹路径如下（根目录下） */
var gulp = require('gulp');
var path = require('path');
var argv = require('yargs').argv;
// 项目的名称
var projectName = argv.project;
var deploy = argv.deploy;

var appRoot = '';
var build = '';
var index = ''; //首页的模块

// 判断项目，默认为app_pc, gulp --project app_pc_member
if (projectName && projectName !== true) {
    appRoot = '/' + projectName;
    basePath = './src' + appRoot + '/';
} else {
    appRoot = '/app_pc';
    basePath = './src' + appRoot + '/';
}

if(projectName === undefined){
    index = '/index';
}else if(projectName === 'app_pc_member'){
    index = '/user';
}

// 判断项目，是否为部署, gulp --deploy true
if (deploy === 'true') {
    build = 'build-deploy';
} else {
    build = 'build';
}

var src = path.resolve(__dirname, '../src/') + appRoot;

var srcIco = path.resolve(__dirname, '../src/') + appRoot + '/common/fonts/';
var dest = path.resolve(__dirname, '../' + build + '/') + appRoot;
var destPublic = dest + '/public';
var temp = path.resolve(__dirname, '../build-temp/') + appRoot;

module.exports = {
    copy: {
        src: [
            dest + index + '/index.html',//首页
            src + '/.htaccess',
            src + '/favicon.ico',
            src + '/robots.txt',
        ],
        dest: dest
    },
    libs: {
        src: src + '/common/libs/**/*',
        dest: destPublic + '/common/libs/'
    },
    images: {
        src: src + '/**/images/**/*',
        dest: destPublic + '/'
    },
    sass: {
        src: [src + '/**/scss/*.scss',src + '/**/fonts/*.scss'],
        dest: destPublic + '/', //输出目录
        rev: destPublic + '/rev/css'
    },
    html: {
        src: [src + '/**/view/*.html'],
        dest: dest,
        basePath: basePath,
    },
    js: {
        src: [temp + '/**/js/*.js', src + '/common/libs/*.js'],
        dest: destPublic + '/',
        rev: destPublic + '/rev/js'
    },
    clean: {
        temp: temp,
        dest: dest
    },
    browserify: {
        watch: src + '/**/*.js',
        watchSass: src + '/**/scss/*.scss',
        src: src + '/**/app.js',
        dest: dest,
        rev: temp + '/rev/js'
    },
    iconFont: {
        src: [srcIco + 'iconfont.eot', srcIco + 'iconfont.ttf', srcIco + 'iconfont.svg', srcIco + 'iconfont.woff'],
        dest: destPublic + '/common/fonts/'
    },
    swf: {
        src: src + '/**/*.swf',
        dest: destPublic
    },
    json: {
        src: src + '/**/js/*.json',
        dest: destPublic
    },
    revCollector: { //md5静态资源部署解决方案
        revJson: destPublic + '/rev/**/*.json',
        src: src + '/**/view/*.html', //root index.html
        tempBuild: dest + '/**/*.html',
        tempDest: dest + '/',
        dest: '' //这个输出并没有实际输出，但是还是需要执行一次，否则不会生成
    },
};
