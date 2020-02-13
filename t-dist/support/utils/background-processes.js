"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var rp = require('request-promise');
var limit = 60;
var cmd = process.platform.includes('win') ? 'npm.cmd' : 'npm';
exports.ownProcess = {
    waitPort: function (n, port, callback) {
        var _this = this;
        child_process_1.exec('PowerShell -Command "&' +
            ("{&\"netstat\" -ano | Select-String \"" + port + "\" | % {$a = $_ -split ' {3,}'; ") +
            "New-Object 'PSObject' -Property @{Original=$_;Fields=$a}} | " +
            ("? {$_.Fields[1] -match '" + port + "$'}}\""), function (error, stdout, stderr) {
            if (error) {
                console.error("exec error: " + error);
                return;
            }
            if (stdout || n > limit) {
                callback();
            }
            else {
                setTimeout(function () {
                    _this.waitPort(n + 1, port, callback);
                }, 1000);
            }
        });
    },
    waitResp: function (n, url) {
        var _this = this;
        return rp(url)
            .then(function (resp) {
            return;
        })
            .catch(function (err) {
            if (n < limit) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve(_this.waitResp(n + 1, url));
                    }, 1000);
                });
            }
        });
    },
    webdriverManagerStart: function () {
        var _this = this;
        var wd = child_process_1.spawn(cmd, ['run', 'wd-start']);
        wd.stdout.on('data', function () { });
        wd.stderr.on('data', function () { });
        wd.on('exit', function () {
            console.log('WD shut down');
        });
        wd.stdin.end();
        return new Promise(function (resolve, reject) {
            _this.waitPort(0, '4444', resolve);
        });
    },
    runApp: function () {
        var _this = this;
        var appPr = child_process_1.spawn(cmd, ['run', 'start']);
        appPr.stdout.on('data', function (data) {
            console.log('Server Data: ' + data);
        });
        appPr.stderr.on('data', function () { });
        appPr.on('exit', function () {
            console.log('Server Script finished');
        });
        appPr.stdin.end();
        return new Promise(function (resolve, reject) {
            _this.waitPort(0, '4200', resolve);
        })
            .then(function () {
            return _this.waitResp(0, 'http://localhost:4200/');
        });
    },
    wdStop: function () {
        return new Promise(function (resolve, reject) {
            child_process_1.exec('npm run wd-stop', resolve);
        });
    },
    appStop: function () {
        return new Promise(function (resolve, reject) {
            child_process_1.exec('npm run stop', resolve);
        });
    }
};
//# sourceMappingURL=background-processes.js.map