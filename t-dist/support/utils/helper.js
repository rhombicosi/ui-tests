"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var fs_1 = require("fs");
var results_1 = require("../../test-layer/results");
var moment = require("moment");
exports.helper = {
    browserClearing: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.browser.executeScript('window.sessionStorage.clear();')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.executeScript('window.localStorage.clear();')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.manage().deleteAllCookies()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    createScreenshot: function (name) {
        var fullName = name + "-" + Math.round(Math.random() * 899 + 100) + ".png";
        console.log(fullName);
        return protractor_1.browser.takeScreenshot().then(function (png) {
            var stream = fs_1.createWriteStream("ui-tests/t-dist/reports/" + fullName);
            stream.write(new Buffer(png, 'base64'));
            stream.end();
        });
    },
    specsBuilder: function () {
        var specs = [];
        if (process.env.npm_config_rerun) {
            var text = fs_1.readFileSync(process.cwd() + "/ui-tests/@rerun.txt", "utf8");
            var arrOfPathes = text.split('\n');
            specs = arrOfPathes.filter(function (path) {
                if (path) {
                    return path;
                }
            }).map(function (path) {
                if (process.env.npm_config_browser === 'safari') {
                    return process.cwd() + "/" + path;
                }
                else {
                    return process.cwd() + "\\" + path;
                }
            });
            console.log('Rerun specs:', specs);
        }
        else {
            specs = [
                process.cwd() + "/ui-tests/test-layer/cucumber-tests/features/*.feature",
                process.cwd() + "/ui-tests/test-layer/cucumber-tests/features/**/*.feature",
                process.cwd() + "/ui-tests/test-layer/cucumber-tests/features/**/**/*.feature"
            ];
        }
        return specs;
    },
    reportBuilder: function () {
        try {
            var rerunJson = fs_1.readFileSync(process.cwd() + "/ui-tests/results-rerun.json", 'utf8');
            var rerunArr = JSON.parse(rerunJson);
            var reportJson = fs_1.readFileSync(process.cwd() + "/ui-tests/results.json", 'utf8');
            var reportArr_1 = JSON.parse(reportJson);
            rerunArr.forEach(function (featureRerun) {
                featureRerun.elements.forEach(function (scenarioRerun) {
                    scenarioRerun.name = scenarioRerun.name + " (RERUN)";
                });
            });
            rerunArr.forEach(function (featureRerun) {
                featureRerun.elements.forEach(function (scenarioRerun) {
                    reportArr_1.forEach(function (feature, i) {
                        feature.elements.forEach(function (scenario, j) {
                            if (scenarioRerun.id === scenario.id && scenarioRerun.line === scenario.line) {
                                reportArr_1[i].elements[j] = scenarioRerun;
                            }
                        });
                    });
                });
            });
            fs_1.writeFileSync(process.cwd() + "/ui-tests/results.json", JSON.stringify(reportArr_1, null, 2));
        }
        catch (err) { }
    },
    smallResultsBuilder: function () {
        var fileName = process.env.npm_config_rerun ? 'small-results-data-rerun.json' : 'small-results-data.json';
        var path = process.cwd() + "/ui-tests/" + fileName;
        try {
            fs_1.writeFileSync(path, JSON.stringify(results_1.results, null, 2));
        }
        catch (err) { }
    },
    getSmallResults: function (type) {
        try {
            var fileName = type === 'rerun' ? 'small-results-data-rerun.json' : 'small-results-data.json';
            var smallResults = fs_1.readFileSync(process.cwd() + "/ui-tests/" + fileName, 'utf8');
            return JSON.parse(smallResults);
        }
        catch (err) {
            return {
                passed: 0,
                failed: 0,
                start: moment(),
                duration: 0,
                time: ''
            };
        }
    },
    sleep: function (timeout) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
            }, timeout);
        });
    },
    sleepIfFalse: function (is, time) {
        if (time === void 0) { time = 200; }
        if (!is) {
            return this.sleep(time)
                .then(function () { return is; });
        }
        else {
            return is;
        }
    },
    /**
     * Generate random 10 char string
     */
    getRandomString: function () {
        var str = '';
        while (str.length !== 10) {
            str = Math.random().toString(32).slice(2);
        }
        return str;
    },
    alertsReset: function () {
        return protractor_1.browser.executeScript("window.alert = function(){};\n        Window.prototype.alert = function(){};");
    }
};
//# sourceMappingURL=helper.js.map