/**
 * @author xiaojue
 * @email designsor@gmail.com
 * @fileoverview 获取路径下变化的文件列表
 */
var lithe = require('lithe');
var fs = require('fs');
var crypto = require('crypto');
var path = require('path');
var through = require('through2');
var pp = require('preprocess');
var hfs = lithe.hfs;


function getMd5(p) {
    var str = fs.readFileSync(p, 'utf-8');
    var md5um = crypto.createHash('md5');
    md5um.update(str);
    return md5um.digest('hex');
}

function gcf() {
    this.database = path.join(process.cwd(), './.gcf');

    if (!fs.existsSync(this.database)) {
        hfs.writeFileSync(this.database, '{}', 'utf-8');
    }
}

gcf.prototype = {
    constructor: gcf,
    get: function(p, filter) {
        var self = this,
            base = fs.readFileSync(this.database),
            changedList = [],
            files;
        base = JSON.parse(base);
        hfs.walk(p, function(lists, a) {
            files = lists;
            files.forEach(function(filepath) {
                var md5str = getMd5(filepath);
                if (!base[filepath] || (base[filepath] && base[filepath] !== md5str)) changedList.push(filepath);
                base[filepath] = md5str;
            });
            hfs.writeFileSync(self.database, JSON.stringify(base), 'utf-8');
        }, {
            filter: filter
        });
        return changedList;
    },
    test: function(options) {
        return through.obj(function(file, enc, cb) {
            // 如果文件为空，不做任何操作，转入下一个操作，即下一个 .pipe()
            if (file.isNull()) {
                this.push(file);
                return cb();
            }

            // 插件不支持对 Stream 对直接操作，跑出异常
            if (file.isStream()) {
                this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
                return cb();
            }

            // 将文件内容转成字符串，并调用 preprocess 组件进行预处理
            // 然后将处理后的字符串，再转成Buffer形式
            var content = pp.preprocess(file.contents.toString(), options || {});
            file.contents = new Buffer(content);

            // 下面这两句基本是标配啦，可以参考下 through2 的API
            this.push(file);

            cb();
        });
    }
};

module.exports = new gcf();

