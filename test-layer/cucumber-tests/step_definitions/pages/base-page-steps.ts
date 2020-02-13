/* tslint:disable:max-line-length */
import { defineSupportCode } from 'cucumber';
import { browser, element, by, ExpectedConditions } from 'protractor';
import { BalanceEnum } from '../../../../support/emuns/balance.enum';
import { userCreator } from '../../../../support/utils/user-creator';

defineSupportCode(function({Given, When, Then}) {

  When(/^I click on Search input$/, async function() {
    await this.basePage.header.clickSearch();
  });

  When(/^I click on '(.+)' (header|userMenu|feedbackModal) element$/, async function(elementName, componentName) {
    await this.basePage[componentName].click(elementName);
  });

  When(/^I go to my account (?:page|tab)$/, async function() {
    await this.basePage.userMenu.click('myAccLink');
  });

  When(/^I redirect to '(.+)'$/, async function(to) {
    await this.basePage.feedbackModal.redirect(to);
  });

  When(/^I close current browser tab$/, async function() {
    await browser.close();
  });

  When(/^I switch to '(.+)' browser tab$/, async function(tabNumber) {
    tabNumber = parseInt(tabNumber) - 1;
    await browser.getAllWindowHandles().then((handles) => {
      browser.switchTo().window(handles[tabNumber]);
      browser.waitForAngularEnabled(false);
    });
  });

  When(/^I dismiss alert$/, async function() {
    await browser.switchTo().alert().then(
      (alert) => alert.accept()
    );
  });

  When(/^I close [Ss]earch input$/, async function() {
    await this.basePage.header.clickLogo();
  });

  When(/^I select '([Ww]orkspace|[Bb]rowse)' board$/, async function(boardName) {
    await this.basePage.header.selectBoard(boardName);
  });

  When(/^I fill search field with value '(.+)'$/, async function(value) {
    await this.basePage.header.addSearchValue(value);
  });

  When(/^I clear search input field$/, async function() {
    await this.basePage.header.clearSearchInput();
  });

  When(/^I fill feedback text field with value '(.+)'/, async function(value) {
    await this.basePage.feedbackModal.fillInputWithValue(value);
  });

  When(/^I obtain '(.+)' url from kvp/, async function(itemKey) {
    const accountInformation = await this.backendHelper.getClientAndTradingAccount();
    const expectedUrl = itemKey === 'contact us' ?  browser.params.logOutRedirectUrl
     : (await this.backendHelper.getClientApplicationMessageTranslationWithInterestingItems(
      0, // INFO: as in AP app
      accountInformation.CultureId,
      accountInformation.AccountOperatorId,
      [itemKey]
    ))[0].Value.split(',')[0];

    this.memory[itemKey] = expectedUrl;
  });

  When(/^I relogin to the application( as '(CFD|Spread|CFD & Spread|)' account|)$/, async function(accountType?: string) {
    const url = await browser.getCurrentUrl();
    await this.basePage.logOut();
    this.lightstreamer.disconnectLS();
    await browser.wait(() => {
      return browser.getCurrentUrl()
        .then((changedUrl) => this.helper.sleepIfFalse(url !== changedUrl, 500));
    }, 10000);
    await browser.get(browser.baseUrl);

    if (!accountType) {
      accountType = 'CFD & Spread';
    }
    const accounts = {
      CFD: {
        login: '11420806',
        password: 'password'
      },
      Spread: {
        login: 'DM188265',
        password: 'password'
      },
      'CFD & Spread': {
        login: browser.params.login,
        password: browser.params.password
      }
    };

    await this.loginPage.signIn(accounts[accountType].login, accounts[accountType].password);
    await this.basePage.waitLoading();
    await browser.waitForAngularEnabled(false);
    await this.backendHelper.setSession();
    await this.backendHelper.setAccount();
    await this.lightstreamer.connectLS();
    if (accountType) {
      await this.backendHelper.resetClientPreferences();
    }
    await this.basePage.waitLoading();
  });

  Then(/^balance bar displays items in the correct order:$/, async function(table) {
    const itemNames = table.raw().map((el) => {
      return el[0];
    });

    let actualItem = await this.basePage.balanceBar.getElementText('root');
    actualItem = actualItem.replace(/[0-9]|[,]|[.]|[-]|[>]|[%]|\ss+/g, '').split('\n').map(t => t.trim()).filter(t => t);

    for (let i = 0; i < itemNames.length; i++) {
      this.expect(actualItem[i]).to.contain(itemNames[i]);
    }
  });

  Then(/^'(.+)' is displayed on balance bar with correct text and value$/, async function(itemName) {
    const self = this;
    let expectedValue;
    let actualValue;

    await browser.wait(() => {
      const promiseArr = [];
      promiseArr.push(self.backendHelper.getMarginInfo()
        .then((balanceInformation) => {
          const expectedNumber = balanceInformation[BalanceEnum[itemName]];
          expectedValue = `${expectedNumber.toLocaleString(undefined, {minimumFractionDigits: 2})} ${itemName}`;
          if (itemName.toLowerCase() === 'cash' || itemName.toLowerCase() === 'unrealised p&l') {
            const expectedCurrency = balanceInformation.CurrencyIsoCode;
            expectedValue = `${expectedValue} (${expectedCurrency})`;
          } else if (itemName.toLowerCase() === 'margin indicator') {
            expectedValue = expectedNumber === -1 ? `> 200% ${itemName}` : `${Math.round(expectedNumber).toLocaleString()}% ${itemName}`;
          }
      }));
      promiseArr.push(self.basePage.balanceBar.getElementText(itemName.toLowerCase())
        .then((av) =>  {
          actualValue = av.replace(/\n/g, ' ');
        }));

      return Promise.all(promiseArr)
        .then(() => this.helper.sleepIfFalse(actualValue === expectedValue, 300));
    }, 100000)
      .then(() => null, () => null);

    this.expect(actualValue).to.deep.equal(expectedValue);
  });

  Then(/^'([Ww]orkspace|[Bb]rowse)' board should be (active|not active)$/, async function(boardName, activeState) {
    const expectedState = activeState === 'active';
    const actualState = await this.basePage.header.isBoardActive(boardName);
    this.expect(actualState).to.equal(expectedState);
  });

  Then(/^link redirects to the correct '(.+)' url$/, async function(redirectUrl) {
    let expectedUrl = this.memory[redirectUrl];
    let actualUrl: string;
    if (redirectUrl === 'AP_Online_Chat_URL') {
      await browser.get(expectedUrl);
      const checkUrl = await browser.getCurrentUrl();
      expectedUrl = checkUrl.slice(0, 156);
    }
    await browser.wait(() => {
      return browser.getCurrentUrl()
        .then((url) => {
          actualUrl = url;

          return this.helper.sleepIfFalse(url.includes(expectedUrl));
        });
    }, 10000)
      .then(() => null, () => null);

    this.expect(actualUrl).to.include(expectedUrl);
  });

  Then(/^[Aa]ccount board should be (active|not active)$/, async function(activeState) {
    this.memory.clientInfo = await this.backendHelper.getClientAndTradingAccount();
    const expectedState = activeState === 'active';
    await this.basePage.waitLoading();
    const actualState = await this.basePage.userMenu.isAccountActive();
    this.expect(actualState).to.equal(expectedState);
  });

  Then(/^the '(header|userMenu|feedbackModal)' should contain items:$/, async function(componentName, table) {
    const itemNames = table.hashes().map((el) => {
      return el.itemName;
    });

    for (let i = 0; i < itemNames.length; i++) {
      const actualState = await this.basePage[componentName].isElementPresent(itemNames[i]);
      this.expect(actualState).to.equal(true);
    }
  });

  Then(/^the submit button should be (enabled|disabled)$/, async function(isDisabled) {
    const expectedCondition = isDisabled === 'disabled';
    const actualCondition = await this.basePage.feedbackModal.isSubmitActive();
    this.expect(actualCondition).to.equal(expectedCondition);
  });

  Then(/^the search text input '(placeholder|value)' should be '(.+)'$/, async function(textType, expectedText) {
    const actualText = await this.basePage.header.getSearchText(textType);

    this.expect(actualText).to.equal(expectedText);
  });

  Then(/^'(.+)' tab should be (below|to the right of|to the left of) '(.+)'( tab|)$/, async function(tabElement, location, elemToCompare, isTab) {
    const tab = await this.basePage.currentBoard.header.getTab(tabElement).getLocation();
    const elementToCompare = isTab
      ? await this.basePage.currentBoard.header.getTab(elemToCompare).getLocation()
      : await this.basePage.header.getElementLocation(elemToCompare);

    if (location === 'below') {
      this.expect(tab.y).to.be.above(elementToCompare.y);
    } else if (location === 'to the right of') {
      this.expect(tab.x).to.be.above(elementToCompare.x);
    } else {
      this.expect(tab.x).to.be.below(elementToCompare.x);
    }
  });

  Then(/^'(.+)'( tab| section|) default (width|height) should be '(.+)' px$/, async function(elementName, elementType, size, expectedValue) {
    size = size.trim().toLowerCase();
    let actualValue;
    if (elementType.includes('tab')) {
      actualValue = await this.basePage.currentBoard.header.getTab(elementName).getSize();
    } else if (elementType.includes('section')) {
      actualValue = await this.basePage.currentBoard.tabBody.currentPanel.getSize();
    } else if (elementName.includes('search input')) {
      actualValue = await this.basePage.header.getSize('searchDiv');
    }
    this.expect(actualValue[size]).to.equal(parseInt(expectedValue));
  });

  Then(/^'(.+)' feedback link should lead us to '(.+)'$/, async function(linkName, expectedLink) {
    const actualLink = await this.basePage.feedbackModal.getElementHref(linkName);
    this.expect(actualLink).to.equal(expectedLink);
  });

  Then(/^'(.+)' element in feedback modal dialogue should contain text '(.+)'$/, async function(elementName, expectedText) {
    const actualText = await this.basePage.feedbackModal.getElementText(elementName);
    this.expect(actualText).to.equal(expectedText);
  });

  Then(/^'(.+)' element in feedback modal dialogue should be (visible|invisible)$/, async function(elementName, visibility) {
    const expectedState = visibility === 'visible';
    const actualState = await this.basePage.feedbackModal.isElementPresent(elementName);
    this.expect(actualState).to.equal(expectedState);
  });
});
