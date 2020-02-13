import { defineSupportCode } from 'cucumber';
import { browser, element, by, ExpectedConditions } from 'protractor';


defineSupportCode(function({Given, When, Then}) {

  When(/^I click on '(.+)' (?:element|button|link) in search modal$/, async function(elementName) {
    await this.basePage.searchModal.click(elementName);
  });

  When(/^I wait for markets loading$/, async function() {
    await this.basePage.searchModal.waitForMarketsLoading();
  });

  When(/^I select '(Market|ProductType)' filter with value '(.+)'$/, async function(filterType, filterValue) {
    await this.basePage.searchModal[`select${filterType}Filter`](filterValue);
  });

  When(/^I switch ([Oo]n|[Oo]ff) 'Include options' toggle$/, async function(state) {
    await this.basePage.searchModal.setIncludeOptions(state);
  });

  When(/^I remember found markets number$/, async function() {
    this.memory.searchMarketsAmount = await this.basePage.searchModal.getMarketsCount();
  });

  Then(/^Search modal should be (visible|not visible)$/, async function(visibility) {
    const expectedState = visibility === 'visible';
    const actualState = await this.basePage.searchModal.isVisible();
    this.expect(actualState).to.equal(expectedState);
  });

  Then(/^[Ss]earch modal element '(.+)' should be (visible|not visible)$/, async function(elementName, visibility) {
    const expectedState = visibility === 'visible';
    const actualState = await this.basePage.searchModal.isElementVisible(elementName);
    this.expect(actualState).to.equal(expectedState);
  });

  Then(/^[Ss]earch modal element '(.+)' text should be '(.+)'$/, async function(elementName, expectedText) {
    expectedText = expectedText.toLowerCase();
    const actualElementText = (await this.basePage.searchModal.getElementText(elementName)).toLowerCase();
    this.expect(actualElementText).to.equal(expectedText);
  });

  Then(/^Default displayed markets should be first '(\d+)' from Popular Markets$/, async function(num) {
    const expectedArray = await this.backendHelper.getMarketsParametersByTagId(152, parseInt(num));
    const actualArray = await this.basePage.searchModal.getAllMarketsTitles();
    const expectedNumber = expectedArray.length;
    const actualNumber = actualArray.length;
    this.expect(actualNumber).to.equal(expectedNumber);
    this.expect(actualArray.sort()).to.deep.equal(expectedArray.sort());
  });

  Then(/^markets count should be (more|less|equal) (?:than|to) '(\d+|remembered)'$/, async function(comparator, num) {
    if (num === 'remembered') {
      num = this.memory.searchMarketsAmount;
    }
    num = parseInt(num);
    const actualNumber = await this.basePage.searchModal.getMarketsCount();
    if (comparator === 'equal') {
      this.expect(actualNumber).to.equal(num);
    } else if (comparator === 'more') {
      this.expect(actualNumber).to.be.above(num);
    } else {
      this.expect(actualNumber).to.be.below(num);
    }
  });

  Then(/^all markets should contain '(.+)'$/, async function(values) {
    // values = values.toLowerCase();
    const valuesArr = values.replace(/[ )(]/g, '').split('and');
    const titlesArray = await this.basePage.searchModal.getAllMarketsTitles();
    titlesArray.forEach((title) => {
      valuesArr.forEach((value) => {
        const strArr = value.split('or');
        const arrOfStates = strArr.map((str) => {
          if (str.match(/match\//)) {
            const strForRegexp = str.replace(/match\/(.+)\//, '$1');
            const regexp = new RegExp(strForRegexp);

            return !!title.match(regexp);
          } else {
            return title.replace(/[ )(]/g, '').toLowerCase().includes(str.toLowerCase());
          }
        });
        this.expect(arrOfStates).to.include(true);
      });
    });
  });

  Then(/^search modal dialogue header should be colored in '(black|gray)'$/, async function(color) {
    const expectedColorPart = color === 'black' ? '72, 72, 72' : '238, 238, 238';
    const actualColor = await this.basePage.searchModal.getHeaderBackground();
    this.expect(actualColor).to.include(expectedColorPart);
  });

});
