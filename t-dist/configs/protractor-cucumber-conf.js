"use strict";
/*process.env.https_proxy = 'http://127.0.0.1:8888';
process.env.http_proxy = 'http://127.0.0.1:8888';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';*/
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
var reporter = require("cucumber-html-reporter");
var environment_1 = require("./data/environment");
var capabilities_1 = require("./data/capabilities");
var selenium_servers_1 = require("./data/selenium-servers");
var background_processes_1 = require("../support/utils/background-processes");
var login_page_1 = require("../support/objects/pages/login-page");
var base_page_1 = require("../support/objects/pages/base-page");
var backend_helper_1 = require("../support/utils/backend-helper");
var lightstreamer = require("../support/utils/lightstreamer-helper");
var user_creator_1 = require("../support/utils/user-creator");
var helper_1 = require("../support/utils/helper");
var protractor_fixes_1 = require("../support/utils/protractor-fixes");
protractor_fixes_1.emptySpecsFix();
var envFullName = {
    local: 'LOCAL',
    ppe: 'PRE PRODUCTION',
    stg: 'STAGING',
    qat: 'QAT',
    live: 'LIVE',
    dev: 'DEVELOPMENT'
};
process.env.npm_config_selenium = process.env.npm_config_selenium ? process.env.npm_config_selenium : 'local';
process.env.npm_config_env = process.env.npm_config_env ? process.env.npm_config_env : 'local';
process.env.npm_config_browser = process.env.npm_config_browser ? process.env.npm_config_browser : 'chrome';
var size = {
    height: parseInt(process.env.npm_config_size.split(',')[1]),
    width: parseInt(process.env.npm_config_size.split(',')[0]),
};
var tags = process.env.npm_config_tags ? process.env.npm_config_tags.split(',') : [];
tags.push('~@ignore');
if (process.env.npm_config_env !== 'ppe') {
    tags.push('~@ppe');
}
var metadata = {
    'App Version': null,
    'Test Environment': envFullName[process.env.npm_config_env],
    Browser: null,
    Platform: null,
    'User Name': null,
    'Execution time': null,
    'Rerun execution time': null
};
var brows;
var isItRun = false;
exports.config = {
    plugins: [
        { path: '../support/utils/protractor-extensions' }
    ],
    specs: helper_1.helper.specsBuilder(),
    seleniumAddress: selenium_servers_1.seleniumServers[process.env.npm_config_selenium],
    capabilities: capabilities_1.capabilities[process.env.npm_config_browser],
    baseUrl: environment_1.environment[process.env.npm_config_env].baseUrl,
    params: environment_1.environment[process.env.npm_config_env],
    beforeLaunch: function () {
        var arr = [];
        if (process.env.npm_config_wd) {
            arr.push(background_processes_1.ownProcess.webdriverManagerStart());
        }
        if (process.env.npm_config_app) {
            arr.push(background_processes_1.ownProcess.runApp());
        }
        return Promise.all(arr);
    },
    onPrepare: function () {
        return __awaiter(this, void 0, void 0, function () {
            var basePage, account, caps, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        basePage = new base_page_1.BasePage();
                        protractor_1.browser.waitForAngularEnabled(false);
                        isItRun = true;
                        account = null;
                        if (!!process.env.npm_config_browser.includes('chrome')) return [3 /*break*/, 2];
                        return [4 /*yield*/, protractor_1.browser.manage().window().setSize(size.width, size.height)];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        if (!process.env.npm_config_newacc) return [3 /*break*/, 9];
                        if (process.env.npm_config_env === 'ppe' && process.env.npm_config_env === 'qat') {
                            throw new Error("Can't create new acc for '" + process.env.npm_config_env + "' env");
                        }
                        return [4 /*yield*/, user_creator_1.userCreator.getSessionInforForAccountCreation()];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, protractor_1.browser.get(protractor_1.browser.baseUrl)];
                    case 4:
                        _c.sent();
                        if (!(process.env.npm_config_browser === 'ie11')) return [3 /*break*/, 7];
                        return [4 /*yield*/, protractor_1.browser.executeScript('window.localStorage.clear();')];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, protractor_1.browser.get(protractor_1.browser.baseUrl)];
                    case 6:
                        _c.sent();
                        _c.label = 7;
                    case 7: return [4 /*yield*/, user_creator_1.userCreator.createUser()
                            .catch(function (err) {
                            throw new Error("Can't create new user:\n " + err);
                        })];
                    case 8:
                        account = _c.sent();
                        return [3 /*break*/, 15];
                    case 9: return [4 /*yield*/, protractor_1.browser.get(protractor_1.browser.baseUrl)];
                    case 10:
                        _c.sent();
                        if (!(process.env.npm_config_browser === 'ie11')) return [3 /*break*/, 13];
                        return [4 /*yield*/, protractor_1.browser.executeScript('window.localStorage.clear();')];
                    case 11:
                        _c.sent();
                        return [4 /*yield*/, protractor_1.browser.get(protractor_1.browser.baseUrl)];
                    case 12:
                        _c.sent();
                        _c.label = 13;
                    case 13: return [4 /*yield*/, user_creator_1.userCreator.getUserFromPool()];
                    case 14:
                        account = _c.sent();
                        _c.label = 15;
                    case 15:
                        protractor_1.browser.params.login = account.username;
                        protractor_1.browser.params.password = account.password;
                        metadata['User Name'] = account.username;
                        console.log("Log in into " + account.state + " account with login:'" + account.username + "' and password:'" + account.password + "'");
                        return [4 /*yield*/, new login_page_1.LoginPage().signIn(account.username, account.password)];
                    case 16:
                        _c.sent();
                        return [4 /*yield*/, basePage.waitLoading()];
                    case 17:
                        _c.sent();
                        return [4 /*yield*/, lightstreamer.connectLS()];
                    case 18:
                        _c.sent();
                        return [4 /*yield*/, protractor_1.browser.getCapabilities()];
                    case 19:
                        caps = _c.sent();
                        brows = caps.get('browserName');
                        switch (process.env.npm_config_browser) {
                            case 'chrome':
                                metadata.Browser = caps.get('browserName') + " " + caps.get('version');
                                metadata.Platform = caps.get('platform');
                                break;
                            case 'chromeHeadless':
                                metadata.Browser = caps.get('browserName') + " " + caps.get('version');
                                metadata.Platform = caps.get('platform');
                                break;
                            case 'firefox':
                                metadata.Browser = caps.get('browserName') + " " + caps.get('browserVersion');
                                metadata.Platform = caps.get('platformName') + " " + caps.get('platformVersion');
                                break;
                            case 'firefoxHeadless':
                                metadata.Browser = caps.get('browserName') + " " + caps.get('browserVersion');
                                metadata.Platform = caps.get('platformName') + " " + caps.get('platformVersion');
                                break;
                            default:
                                metadata.Browser = caps.get('browserName') + " " + caps.get('version');
                                metadata.Platform = caps.get('platform');
                        }
                        _a = metadata;
                        _b = 'App Version';
                        return [4 /*yield*/, basePage.getVersion()];
                    case 20:
                        _a[_b] = _c.sent();
                        return [4 /*yield*/, backend_helper_1.backendHelper.clearPositionsAndOrders()];
                    case 21:
                        _c.sent();
                        return [4 /*yield*/, backend_helper_1.backendHelper.resetClientPreferences()];
                    case 22:
                        _c.sent();
                        return [4 /*yield*/, backend_helper_1.backendHelper.setClientPreferenece('MERCURY_TUTORIAL_COMPLETED', true)];
                    case 23:
                        _c.sent();
                        return [4 /*yield*/, backend_helper_1.backendHelper.setClientPreferenece('HEDGE_PREFERENCE', 'inactive')];
                    case 24:
                        _c.sent();
                        return [4 /*yield*/, backend_helper_1.backendHelper.setClientPreferenece('USER_INACTIVITY', '24')];
                    case 25:
                        _c.sent();
                        return [4 /*yield*/, backend_helper_1.backendHelper.setClientPreferenece('TIME_ZONE', 'GMT Standard Time')];
                    case 26:
                        _c.sent();
                        return [4 /*yield*/, backend_helper_1.backendHelper.setClientPreferenece('MERCURY_DATE_FORMAT', 'DD/MM/YYYY')];
                    case 27:
                        _c.sent();
                        return [4 /*yield*/, backend_helper_1.backendHelper.changeUserAccountEmail('MercuryAutomation.UserZero@gaincapital.com')];
                    case 28:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    afterLaunch: function () {
        return __awaiter(this, void 0, void 0, function () {
            var options, arr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lightstreamer.disconnectLS();
                        helper_1.helper.smallResultsBuilder();
                        metadata['Execution time'] = helper_1.helper.getSmallResults('run').time;
                        if (process.env.npm_config_rerun) {
                            metadata['Rerun execution time'] = helper_1.helper.getSmallResults('rerun').time;
                        }
                        options = {
                            theme: 'bootstrap',
                            jsonFile: 'ui-tests/results.json',
                            output: 'ui-tests/reports/cucumber-alternative/cucumber_report.html',
                            reportSuiteAsScenarios: true,
                            storeScreenshots: true,
                            ignoreBadJsonFile: true,
                            name: "Advantage Plus: " + envFullName[process.env.npm_config_env] + " - " + brows,
                            metadata: metadata
                        };
                        arr = [];
                        if (process.env.npm_config_wd) {
                            arr.push(background_processes_1.ownProcess.wdStop());
                        }
                        if (process.env.npm_config_app) {
                            arr.push(background_processes_1.ownProcess.appStop());
                        }
                        return [4 /*yield*/, Promise.all(arr)];
                    case 1:
                        _a.sent();
                        if (!process.env.npm_config_rerun) return [3 /*break*/, 3];
                        return [4 /*yield*/, helper_1.helper.reportBuilder()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!isItRun) return [3 /*break*/, 5];
                        return [4 /*yield*/, reporter.generate(this.options)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    ignoreUncaughtExceptions: true,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        require: [
            '../test-layer/cucumber-tests/world.js',
            '../test-layer/cucumber-tests/step_definitions/**/*.js',
            '../test-layer/cucumber-tests/step_definitions/*.js'
        ],
        'dry-run': !!process.env.npm_config_dryrun,
        format: process.env.npm_config_rerun ?
            ['rerun:ui-tests/@rerun.txt', 'json:ui-tests/results-rerun.json'] :
            ['rerun:ui-tests/@rerun.txt', 'json:ui-tests/results.json'],
        tags: tags
    },
    allScriptsTimeout: 120000
};
//# sourceMappingURL=protractor-cucumber-conf.js.map