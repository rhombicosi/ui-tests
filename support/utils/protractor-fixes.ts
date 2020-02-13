import { Runner } from 'protractor/built/runner';
import { Plugins } from 'protractor/built/plugins';
import * as q from 'q';
import * as util from 'util';
import * as helper from 'protractor/built/util';
import { Logger } from 'protractor/built/logger';
const logger = new Logger('runner');


export function emptySpecsFix() {
  const seleniumWebdriver = require('selenium-webdriver');

  Runner.prototype.run = function() {
    let testPassed;
    const plugins = this.plugins_ = new Plugins(this.config_);
    let pluginPostTestPromises;
    let browser;
    let results;
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
      .then(() => {
        return this.driverprovider_.setupEnv();
      })
      .then(() => {
        browser = this.createBrowser(plugins);
        this.setupGlobals_(browser);

        return browser.ready.then(browser.getSession)
          .then((session) => {
            logger.debug(`WebDriver session successfully started with capabilities ${util.inspect(session.getCapabilities())}`);
          }, (err) => {
            logger.error('Unable to start a WebDriver session.');
            throw err;
          });
      })
      .then(() => {
        return plugins.setup();
      })
      .then(() => {
        let frameworkPath = '';
        if (this.config_.framework === 'jasmine' || this.config_.framework === 'jasmine2') {
          frameworkPath = './frameworks/jasmine.js';
        } else if (this.config_.framework === 'mocha') {
          frameworkPath = './frameworks/mocha.js';
        } else if (this.config_.framework === 'debugprint') {
          frameworkPath = './frameworks/debugprint.js';
        } else if (this.config_.framework === 'explorer') {
          frameworkPath = './frameworks/explorer.js';
        } else if (this.config_.framework === 'custom') {
          if (!this.config_.frameworkPath) {
            throw new Error('When config.framework is custom, ' +
              'config.frameworkPath is required.');
          }
          frameworkPath = this.config_.frameworkPath;
        } else {
          throw new Error(`config.framework ${this.config_.framework} is not a valid framework.`);
        }
        if (this.config_.restartBrowserBetweenTests) {
          const restartDriver = () => {
            if (!this.frameworkUsesAfterEach) {
              this.restartPromise = q(browser.restart());
            }
          };
          this.on('testPass', restartDriver);
          this.on('testFail', restartDriver);
        }
        pluginPostTestPromises = [];
        this.on('testPass', (testInfo) => {
          pluginPostTestPromises.push(plugins.postTest(true, testInfo));
        });
        this.on('testFail', (testInfo) => {
          pluginPostTestPromises.push(plugins.postTest(false, testInfo));
        });
        logger.debug(`Running with spec files ${this.config_.specs}`);

        return require(frameworkPath).run(this, this.config_.specs);
      })
      .then((testResults) => {
        results = testResults;

        return q.all(pluginPostTestPromises);
      })
      .then(() => {
        return plugins.teardown();
      })
      .then(() => {
        results = helper.joinTestLogs(results, plugins.getResults());
        this.emit('testsDone', results);
        testPassed = results.failedCount === 0;
        if (this.driverprovider_.updateJob) {
          return this.driverprovider_.updateJob({ passed: testPassed }).then(() => {
            return this.driverprovider_.teardownEnv();
          });
        } else {
          return this.driverprovider_.teardownEnv();
        }
      })
      .then(() => {
        return plugins.postResults();
      })
      .then(() => {
        const exitCode = testPassed ? 0 : 1;

        return this.exit_(exitCode);
      })
      .fin(() => {
        return this.shutdown_();
      });
  };
}
