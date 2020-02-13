import { defineSupportCode } from 'cucumber';
import { browser } from 'protractor';


defineSupportCode(function({ Before, After }) {

  Before('@delete-watchlist', function() {
    return this.backendHelper.deleteWatchlists()
      .then((num) => {
        if (num > 0) {
          return browser.get(browser.baseUrl);
        }
      });
  });

  Before('@statements-and-contracts', async function() {
      await browser.executeScript('window.sessionStorage.clear();');
      await this.backendHelper.deleteSession();
      await browser.get(browser.baseUrl);
      await this.loginPage.signIn('KL76429', 'password');
      await this.basePage.waitLoading();
      await this.backendHelper.setSession();
  });

  After('@default-resize-window', async function() {
    const size = {
      height: parseInt(process.env.npm_config_size.split(',')[1]),
      width: parseInt(process.env.npm_config_size.split(',')[0]),
    };

    await browser.driver.manage().window().setSize(size.width, size.height);
  });

  After('@delete-watchlist', function() {
    return this.backendHelper.deleteWatchlists()
      .catch((err) => console.log(`${err.status} error during watchlist deleting`));
  });

  After('@account-details', function() {
    console.log(this.memory['password changed']);
    console.log(this.memory['new password']);
    if (this.memory['password changed']) {
      return this.backendHelper.changePassword(this.memory['new password'], 'password');
    }
  });

  After('@statements-and-contracts', async function() {
    await browser.executeScript('window.sessionStorage.clear();');
    await this.backendHelper.deleteSession();
    await browser.get(browser.baseUrl);
    await this.loginPage.signIn(browser.params.login, browser.params.password);
    await this.basePage.waitLoading();
    await this.backendHelper.setSession();
  });
});
