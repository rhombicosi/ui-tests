import { browser } from 'protractor';
import { readFileSync, createWriteStream, writeFileSync } from 'fs';
import { results } from '../../test-layer/results';
import * as moment from 'moment';


export let helper = {
  async browserClearing() {
    await browser.executeScript('window.sessionStorage.clear();');
    await browser.executeScript('window.localStorage.clear();');
    await browser.manage().deleteAllCookies();
  },

  createScreenshot(name) {
    const fullName = `${name}-${Math.round(Math.random() * 899 + 100)}.png`;
    console.log(fullName);

    return browser.takeScreenshot().then(function(png) {
      const stream = createWriteStream(`ui-tests/t-dist/reports/${fullName}`);
      stream.write(new Buffer(png, 'base64'));
      stream.end();
    });
  },

  specsBuilder() {
    let specs = [];
    if (process.env.npm_config_rerun) {
      const text = readFileSync(`${process.cwd()}/ui-tests/@rerun.txt`, `utf8`);
      const arrOfPathes = text.split('\n');
      specs = arrOfPathes.filter((path) => {
        if (path) {
          return path;
        }
      }).map((path) => {
        if (process.env.npm_config_browser === 'safari') {
          return `${process.cwd()}/${path}`;
        } else {
          return `${process.cwd()}\\${path}`;
        }
      });
      console.log('Rerun specs:', specs);
    } else {
      specs = [
        `${process.cwd()}/ui-tests/test-layer/cucumber-tests/features/*.feature`,
        `${process.cwd()}/ui-tests/test-layer/cucumber-tests/features/**/*.feature`,
        `${process.cwd()}/ui-tests/test-layer/cucumber-tests/features/**/**/*.feature`
      ];
    }

    return specs;
  },

  reportBuilder() {
    try {
      const rerunJson = readFileSync(`${process.cwd()}/ui-tests/results-rerun.json`, 'utf8');
      const rerunArr = JSON.parse(rerunJson);
      const reportJson = readFileSync(`${process.cwd()}/ui-tests/results.json`, 'utf8');
      const reportArr = JSON.parse(reportJson);
      rerunArr.forEach((featureRerun) => {
        featureRerun.elements.forEach((scenarioRerun) => {
          scenarioRerun.name = `${scenarioRerun.name} (RERUN)`;
        });
      });
      rerunArr.forEach((featureRerun) => {
        featureRerun.elements.forEach((scenarioRerun) => {
          reportArr.forEach((feature, i) => {
            feature.elements.forEach((scenario, j) => {
              if (scenarioRerun.id === scenario.id && scenarioRerun.line === scenario.line) {
                reportArr[i].elements[j] = scenarioRerun;
              }
            });
          });
        });
      });
      writeFileSync(`${process.cwd()}/ui-tests/results.json`, JSON.stringify(reportArr, null, 2));
    } catch (err) {}
  },

  smallResultsBuilder() {
    const fileName = process.env.npm_config_rerun ? 'small-results-data-rerun.json' : 'small-results-data.json';
    const path = `${process.cwd()}/ui-tests/${fileName}`;
    try {
      writeFileSync(path, JSON.stringify(results, null, 2));
    } catch (err) {}
  },

  getSmallResults(type) {
    try {
      const fileName = type === 'rerun' ? 'small-results-data-rerun.json' : 'small-results-data.json';
      const smallResults = readFileSync(`${process.cwd()}/ui-tests/${fileName}`, 'utf8');

      return JSON.parse(smallResults);
    } catch (err) {
      return {
        passed: 0,
        failed: 0,
        start: moment(),
        duration: 0,
        time: ''
      };
    }
  },

  sleep(timeout) {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        resolve();
      }, timeout);
    });
  },

  sleepIfFalse(is: boolean, time: number = 200) {
    if (!is) {
      return this.sleep(time)
        .then(() => is);
    } else {
      return is;
    }
  },

  /**
   * Generate random 10 char string
   */
  getRandomString(): string {
    let str = '';

    while (str.length !== 10) {
      str = Math.random().toString(32).slice(2);
    }

    return str;
  },

  alertsReset() {
    return browser.executeScript(`window.alert = function(){};
        Window.prototype.alert = function(){};`);
  }
};
