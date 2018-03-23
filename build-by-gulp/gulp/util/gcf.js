/**
 * @author xiaojue
 * @email designsor@gmail.com
 * @fileoverview ��ȡ·���±仯���ļ��б�
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
            // ����ļ�Ϊ�գ������κβ�����ת����һ������������һ�� .pipe()
            if (file.isNull()) {
                this.push(file);
                return cb();
            }

            // �����֧�ֶ� Stream ��ֱ�Ӳ������ܳ��쳣
            if (file.isStream()) {
                this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
                return cb();
            }

            // ���ļ�����ת���ַ����������� preprocess �������Ԥ����
            // Ȼ�󽫴������ַ�������ת��Buffer��ʽ
            var content = pp.preprocess(file.contents.toString(), options || {});
            file.contents = new Buffer(content);

            // ��������������Ǳ����������Բο��� through2 ��API
            this.push(file);

            cb();
        });
    }
};

module.exports = new gcf();

