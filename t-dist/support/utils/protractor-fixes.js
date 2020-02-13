"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var runner_1 = require("protractor/built/runner");
var plugins_1 = require("protractor/built/plugins");
var q = require("q");
var util = require("util");
var helper = require("protractor/built/util");
var logger_1 = require("protractor/built/logger");
var logger = new logger_1.Logger('runner');
function emptySpecsFix() {
    var seleniumWebdriver = require('selenium-webdriver');
    runner_1.Runner.prototype.run = function () {
        var _this = this;
        var testPassed;
        var plugins = this.plugins_ = new plugins_1.Plugins(this.config_);
        var pluginPostTestPromises;
        var browser;
        var results;
        if (this.config_.framework !== 'explorer' && !this.config_.specs.length) {
            console.log('Spec patterns did not match any files.');
            return this.exit_(0);
        }
        if (this.config_.SELENIUM_PROMISE_MANAGER != null) {
            seleniumWebdriver.promise.USE_PROMISE_MANAGER = this.config_.SELENIUM_PROMISE_MANAGER;
        }
        if (this.config_.webDriverLogDir || this.config_.highlightDelay) {
            this.config_.useBlockingProxy = true;
        }
        return q(this.ready_)
            .then(function () {
            return _this.driverprovider_.setupEnv();
        })
            .then(function () {
            browser = _this.createBrowser(plugins);
            _this.setupGlobals_(browser);
            return browser.ready.then(browser.getSession)
                .then(function (session) {
                logger.debug("WebDriver session successfully started with capabilities " + util.inspect(session.getCapabilities()));
            }, function (err) {
                logger.error('Unable to start a WebDriver session.');
                throw err;
            });
        })
            .then(function () {
            return plugins.setup();
        })
            .then(function () {
            var frameworkPath = '';
            if (_this.config_.framework === 'jasmine' || _this.config_.framework === 'jasmine2') {
                frameworkPath = './frameworks/jasmine.js';
            }
            else if (_this.config_.framework === 'mocha') {
                frameworkPath = './frameworks/mocha.js';
            }
            else if (_this.config_.framework === 'debugprint') {
                frameworkPath = './frameworks/debugprint.js';
            }
            else if (_this.config_.framework === 'explorer') {
                frameworkPath = './frameworks/explorer.js';
            }
            else if (_this.config_.framework === 'custom') {
                if (!_this.config_.frameworkPath) {
                    throw new Error('When config.framework is custom, ' +
                        'config.frameworkPath is required.');
                }
                frameworkPath = _this.config_.frameworkPath;
            }
            else {
                throw new Error("config.framework " + _this.config_.framework + " is not a valid framework.");
            }
            if (_this.config_.restartBrowserBetweenTests) {
                var restartDriver = function () {
                    if (!_this.frameworkUsesAfterEach) {
                        _this.restartPromise = q(browser.restart());
                    }
                };
                _this.on('testPass', restartDriver);
                _this.on('testFail', restartDriver);
            }
            pluginPostTestPromises = [];
            _this.on('testPass', function (testInfo) {
                pluginPostTestPromises.push(plugins.postTest(true, testInfo));
            });
            _this.on('testFail', function (testInfo) {
                pluginPostTestPromises.push(plugins.postTest(false, testInfo));
            });
            logger.debug("Running with spec files " + _this.config_.specs);
            return require(frameworkPath).run(_this, _this.config_.specs);
        })
            .then(function (testResults) {
            results = testResults;
            return q.all(pluginPostTestPromises);
        })
            .then(function () {
            return plugins.teardown();
        })
            .then(function () {
            results = helper.joinTestLogs(results, plugins.getResults());
            _this.emit('testsDone', results);
            testPassed = results.failedCount === 0;
            if (_this.driverprovider_.updateJob) {
                return _this.driverprovider_.updateJob({ passed: testPassed }).then(function () {
                    return _this.driverprovider_.teardownEnv();
                });
            }
            else {
                return _this.driverprovider_.teardownEnv();
            }
        })
            .then(function () {
            return plugins.postResults();
        })
            .then(function () {
            var exitCode = testPassed ? 0 : 1;
            return _this.exit_(exitCode);
        })
            .fin(function () {
            return _this.shutdown_();
        });
    };
}
exports.emptySpecsFix = emptySpecsFix;
//# sourceMappingURL=protractor-fixes.js.map