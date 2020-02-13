import { defineSupportCode } from 'cucumber';
import { browser, element } from 'protractor';


defineSupportCode(function({ Given, When, Then }) {
  Then(/^the chart( on browse tab | )should be loaded$/, async function(location) {
    location = location.trim();
    const isChartVisible = location === 'on browse tab'
      ? await this.basePage.currentBoard.tabBody.getPanel('chart').isChartVisible()
      : await this.basePage.currentBoard.tabBody.currentPanel.isChartVisible();
    this.expect(isChartVisible).to.equal(true);
  });

  Then(/^the chart( on browse tab | on search modal | )is( | not) present$/, async function(location, visibility) {
    location = location.trim();
    let isChartVisible;
    if (location === 'on browse tab' || location === 'on search modal') {
      isChartVisible = await this.basePage.currentBoard.tabBody.getPanel('chart').isElementPresent('chart');
    } else {
      isChartVisible = await this.basePage.currentBoard.tabBody.currentPanel.isChartVisible();
    }
    const expectedState = !(visibility === ' not');
    this.expect(isChartVisible).to.equal(expectedState);
  });

  When(/^I switch market to '(.+)'$/, async function(marketName) {
    await this.basePage.currentBoard.tabBody.currentPanel.switchMarket(marketName);
  });

  Then(/^'(.+)' market should be opened on the chart$/, async function(marketName) {
    // INFO: only for spreadAccount && cfdAccount accounts!
    const defaultChartKey = 'defaultCharts';
    const accountInformation = await this.backendHelper.getClientAndTradingAccount();
    const marketId = (await this.backendHelper.getClientApplicationMessageTranslationWithInterestingItems(
      0, // INFO: as in AP app
      accountInformation.CultureId,
      accountInformation.AccountOperatorId,
      [defaultChartKey]
    ))[0].Value.split(',')[0];

    if (marketName === 'default') {
      marketName = (await this.backendHelper.getMarketInformation(marketId)).Name;
    } else if (marketName === 'current') {
      marketName = this.memory.marketName;
    }
    let marketNameLabel: string;
    await browser.wait(() => {
      return this.basePage.currentBoard.tabBody.currentPanel.getMarketNameLabelText()
        .then((text) => {
          marketNameLabel = text;

          return this.helper.sleepIfFalse(text.includes(marketName), 300);
        });
    }, 5000)
      .then(() => null, () => null);
    this.expect(marketNameLabel).to.include(marketName);
  });

  Then(/^'(.+)' market should be in panel header$/, async function(marketName) {
    // INFO: only for spreadAccount && cfdAccount accounts!
    const defaultChartKey = 'defaultCharts';
    const accountInformation = await this.backendHelper.getClientAndTradingAccount();
    const marketId = (await this.backendHelper.getClientApplicationMessageTranslationWithInterestingItems(
      0, // INFO: as in AP app
      accountInformation.CultureId,
      accountInformation.AccountOperatorId,
      [defaultChartKey]
    ))[0].Value.split(',')[0];

    if (marketName === 'default') {
      marketName = (await this.backendHelper.getMarketInformation(marketId)).Name;
    }
    let panelName: string;
    await browser.wait(() => {
      return this.basePage.currentBoard.tabBody.currentPanel.getPanelHeaderName()
        .then((text) => {
          panelName = text;

          return this.helper.sleepIfFalse(text.includes(marketName));
        });
    }, 100000)
      .then(() => null, () => null);
    this.expect(panelName).to.include(marketName);
  });

  Then(/^the( add icon | price axis )is (invisible|visible) after mouse hovering$/, async function(chartElement, visibility) {
    const expectedResult = visibility.toLowerCase() === 'visible';
    const result = await this.basePage.currentBoard.tabBody.getPanel('chart').isChartElementVisibleOnMouseHover(chartElement);
    this.expect(result).to.equal(expectedResult);
  });

  Then(/^(sell button |buy button | )element should be (enabled|disabled) inside chart$/, async function(name, status) {
    const actualState = await this.basePage.currentBoard.tabBody.getPanel('chart').isElementEnable(name);
    const expectedState = status === 'enabled';
    this.expect(actualState).to.equal(expectedState);
  });

  Then(/^(sell button |buy button | )element should be colored in '(red|blue)'$/, async function(name, color) {
    const expectedColorPart = color === 'red' ? '222, 69, 89' : '21, 125, 177';
    const actualColor = await this.basePage.currentBoard.tabBody.getPanel('chart').getButtonBackground(name);
    this.expect(actualColor).to.include(expectedColorPart);
  });

  Then(/^(sell button |buy button | )element should be located inside chart$/, async function(chartElement) {
    const actualState = await this.basePage.currentBoard.tabBody.getPanel('chart').isElementInsideChart(chartElement);
    this.expect(actualState).to.equal(true);
  });

  When(/^I move sell\/buy button inside chart$/, async function() {
    await this.basePage.currentBoard.tabBody.getPanel('chart').moveSellBuyButtons();
  });

  When(/^I click on( sell| buy) button within Chart$/, async function(name) {
    await this.basePage.currentBoard.tabBody.getPanel('chart').clickOnChartPrice(name);
  });

  When(/^I wait for chart loading$/, async function() {
    await this.basePage.currentBoard.tabBody.getPanel('chart').waitForChartLoading();
  });

  When(/^I click on (close chart|add to workspace|add to watchlist|market 360|price alert) within menu above Chart/, async function(name) {
    await this.basePage.currentBoard.tabBody.getPanel('chart').clickOnElement(name);
  });


  When(/^I wait '(.+)' disappear$/, async function(elementsName) {
    await this.basePage.currentBoard.tabBody.getPanel('chart').waitForElementsDisappeared(elementsName);
  });

  Then(/^(workspaces|watchlists) displayed in alphabetical order within dropdown$/, async function(elementsName) {
    const actualList = await this.basePage.currentBoard.tabBody.getPanel('chart').getDropdownOptions(elementsName);
    this.expect(actualList).to.deep.equal(actualList.sort());
  });

  Then(/^'(.+)' is (invisible|visible)$/, async function(elementName, visibility) {
    const expectedResult = visibility.toLowerCase() === 'visible';
    const result = await this.basePage.currentBoard.tabBody.getPanel('chart').isElementVisible(elementName);
    this.expect(result).to.equal(expectedResult);
  });

  When(/^I add current chart to '(.+)' from dropdown$/, async function(elementNameForAdding) {
    await this.basePage.currentBoard.tabBody.getPanel('chart').addChartTo(elementNameForAdding);
  });

});
