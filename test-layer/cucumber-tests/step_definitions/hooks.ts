import { defineSupportCode } from 'cucumber';
import { browser } from 'protractor';
import { results } from '../../results';
import { LoginPage } from '../../../support/objects/pages/login-page';
import { userCreator } from '../../../support/utils/user-creator';
import * as moment from 'moment';

defineSupportCode(function({ Before, After, setDefaultTimeout }) {

  setDefaultTimeout(180000);

  Before(async function() {
    let iterator = 0;
    let account = null;
    const reset = async(max) => {
      await browser.wait(() => {
        return this.basePage.currentBoard.header.getTabsNumber()
          .then((c) => this.helper.sleepIfFalse(c === 3, 500));
      }, 10000)
        .then(() => null, () => null);
      const count = await this.basePage.currentBoard.header.getTabsNumber();
      if (count !== 3 && iterator < max) {
        iterator += 1;
        console.log(`Wrong account options reset. Reset again after 10 sec. Attempt  ${iterator}`);

        await this.backendHelper.resetClientPreferences();
        await this.helper.sleep(10000);
        await browser.get(browser.baseUrl);
        await reset(max);
      }
    };

    await browser.get(browser.baseUrl);
    if (process.env.npm_config_browser.includes('safari') && process.env.npm_config_env.includes('local')) {
      account = await userCreator.getUserFromPool();
      await new LoginPage().signIn(account.username, account.password);
    }
    await this.basePage.waitLoading();
    await reset(5);
    await this.backendHelper.clearPositionsAndOrders();
    await this.helper.alertsReset();
  });

  Before(function(scenario) {
    const file = scenario.sourceLocation.uri.replace(/.+features\\(.+)/, '$1');
    console.log(`\n================================================================
feature: "${file}"
Scenario "${scenario.pickle.name}": starts
----------------------------------------------------------------`);
  });

  After(function(scenario) {
    const duration = this.moment.duration(moment().diff(results.start));
    const hours = duration._data.hours;
    const minutes = duration._data.minutes;
    const seconds = duration._data.seconds;
    results.duration = duration;
    results.time = `${hours}h ${minutes}m ${seconds}s`;
    scenario.result.status === 'passed' ? results.passed += 1 : results.failed += 1;
    console.log(`\n----------------------------------------------------------------
Scenario "${scenario.pickle.name}": ${scenario.result.status}
Test duration: ${(scenario.result.duration / 1000).toFixed(2)} sec
Execution time: ${hours}h ${minutes}m ${seconds}s
Statistic:
Passed scenarios: ${results.passed}
Failed scenarios: ${results.failed}
================================================================\n`);
  });

  After(function() {
    return this.backendHelper.clearPositionsAndOrders();
  });

  After(function() {
    return this.backendHelper.resetClientPreferences();
  });

  After(async function(scenario) {
    if (scenario.result.status !== 'passed') {
      return browser.takeScreenshot()
        .then((png) => {
          return this.attach(png, 'image/png');
        });
    }
  });

});
