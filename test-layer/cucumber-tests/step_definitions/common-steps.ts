import { defineSupportCode } from 'cucumber';
import { browser, element, by } from 'protractor';


defineSupportCode(function({Given, When, Then}) {

  When(/^I wait for '(\d+)'$/, async function(milliseconds) {
    await this.helper.sleep(milliseconds);
  });

  When(/^I fail the test$/, async function() {
    this.expect(false).to.equal(true);
  });

  When(/^I write in console '(.+)'$/, async function(text) {
    console.log(text);
  });

  When(/^I navigate back to previous page$/, async function() {
    await browser.navigate().back();
    await this.basePage.waitLoading();
  });

  When(/^I refresh current page$/, async function() {
    await browser.refresh();
    await this.basePage.waitLoading();
  });

  When(/^I resize window with:$/, async function(table) {
    const height = table.rowsHash().height * 1;
    const width = table.rowsHash().width * 1;
    await browser.driver.manage().window().setSize(width, height);
  });
});
