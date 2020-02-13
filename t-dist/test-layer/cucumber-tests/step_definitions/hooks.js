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
var cucumber_1 = require("cucumber");
var protractor_1 = require("protractor");
var results_1 = require("../../results");
var login_page_1 = require("../../../support/objects/pages/login-page");
var user_creator_1 = require("../../../support/utils/user-creator");
var moment = require("moment");
cucumber_1.defineSupportCode(function (_a) {
    var Before = _a.Before, After = _a.After, setDefaultTimeout = _a.setDefaultTimeout;
    setDefaultTimeout(180000);
    Before(function () {
        return __awaiter(this, void 0, void 0, function () {
            var iterator, account, reset;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iterator = 0;
                        account = null;
                        reset = function (max) { return __awaiter(_this, void 0, void 0, function () {
                            var count;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, protractor_1.browser.wait(function () {
                                            return _this.basePage.currentBoard.header.getTabsNumber()
                                                .then(function (c) { return _this.helper.sleepIfFalse(c === 3, 500); });
                                        }, 10000)
                                            .then(function () { return null; }, function () { return null; })];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, this.basePage.currentBoard.header.getTabsNumber()];
                                    case 2:
                                        count = _a.sent();
                                        if (!(count !== 3 && iterator < max)) return [3 /*break*/, 7];
                                        iterator += 1;
                                        console.log("Wrong account options reset. Reset again after 10 sec. Attempt  " + iterator);
                                        return [4 /*yield*/, this.backendHelper.resetClientPreferences()];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, this.helper.sleep(10000)];
                                    case 4:
                                        _a.sent();
                                        return [4 /*yield*/, protractor_1.browser.get(protractor_1.browser.baseUrl)];
                                    case 5:
                                        _a.sent();
                                        return [4 /*yield*/, reset(max)];
                                    case 6:
                                        _a.sent();
                                        _a.label = 7;
                                    case 7: return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, protractor_1.browser.get(protractor_1.browser.baseUrl)];
                    case 1:
                        _a.sent();
                        if (!(process.env.npm_config_browser.includes('safari') && process.env.npm_config_env.includes('local'))) return [3 /*break*/, 4];
                        return [4 /*yield*/, user_creator_1.userCreator.getUserFromPool()];
                    case 2:
                        account = _a.sent();
                        return [4 /*yield*/, new login_page_1.LoginPage().signIn(account.username, account.password)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.basePage.waitLoading()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, reset(5)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.backendHelper.clearPositionsAndOrders()];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.helper.alertsReset()];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    Before(function (scenario) {
        var file = scenario.sourceLocation.uri.replace(/.+features\\(.+)/, '$1');
        console.log("\n================================================================\nfeature: \"" + file + "\"\nScenario \"" + scenario.pickle.name + "\": starts\n----------------------------------------------------------------");
    });
    After(function (scenario) {
        var duration = this.moment.duration(moment().diff(results_1.results.start));
        var hours = duration._data.hours;
        var minutes = duration._data.minutes;
        var seconds = duration._data.seconds;
        results_1.results.duration = duration;
        results_1.results.time = hours + "h " + minutes + "m " + seconds + "s";
        scenario.result.status === 'passed' ? results_1.results.passed += 1 : results_1.results.failed += 1;
        console.log("\n----------------------------------------------------------------\nScenario \"" + scenario.pickle.name + "\": " + scenario.result.status + "\nTest duration: " + (scenario.result.duration / 1000).toFixed(2) + " sec\nExecution time: " + hours + "h " + minutes + "m " + seconds + "s\nStatistic:\nPassed scenarios: " + results_1.results.passed + "\nFailed scenarios: " + results_1.results.failed + "\n================================================================\n");
    });
    After(function () {
        return this.backendHelper.clearPositionsAndOrders();
    });
    After(function () {
        return this.backendHelper.resetClientPreferences();
    });
    After(function (scenario) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (scenario.result.status !== 'passed') {
                    return [2 /*return*/, protractor_1.browser.takeScreenshot()
                            .then(function (png) {
                            return _this.attach(png, 'image/png');
                        })];
                }
                return [2 /*return*/];
            });
        });
    });
});
//# sourceMappingURL=hooks.js.map