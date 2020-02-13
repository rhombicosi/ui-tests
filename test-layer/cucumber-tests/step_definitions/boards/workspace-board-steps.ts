import { defineSupportCode } from 'cucumber';
import { browser } from 'protractor';


defineSupportCode(function({ Given, When, Then }) {

  When(/^I add new tab$/, async function() {
    await this.basePage.currentBoard.header.addNewTab();
  });

  When(/^I add new '(.+)' panel in '(.+)'(?:st|th|nd|rd|) tab$/, async function(pan, tab) {
    if (tab !== 'current') {
      if (parseInt(tab)) {
        tab = tab * 1 - 1;
      }
      this.memory.currentTab = tab;
      await this.basePage.currentBoard.header.getTab(tab).switchTo();
    }
    if (parseInt(pan)) {
      pan = pan - 1;
    }
    await this.basePage.waitLoading();
    await this.basePage.currentBoard.header.getTab(this.memory.currentTab).addNewPan(pan);
    if (!parseInt(pan)) {
      await this.basePage.currentBoard.tabBody.getPanel(pan);
    }
  });

  When(/^I add '(.+)' Chart panels$/, async function(panelsNumber) {
    for (let i = 0; i < panelsNumber; i++) {
      const count = await this.basePage.currentBoard.header.getTab(this.memory.currentTab).getChartsNumber();
      await this.basePage.currentBoard.header.getTab(this.memory.currentTab).clickButton('Chart');
      await browser.wait(async() => {
        const newCount = await this.basePage.currentBoard.header.getTab(this.memory.currentTab).getChartsNumber();

        return this.helper.sleepIfFalse(newCount > count, 300);
      }, 5000);
    }
  });

  When(/^I switch to '(.+)'(?:st|th|nd|rd|) workspace tab$/, async function(tabNameOrNumber) {
    if (tabNameOrNumber === 'current market product') {
      tabNameOrNumber = this.memory.marketName;
    }
    if (parseInt(tabNameOrNumber)) {
      tabNameOrNumber = tabNameOrNumber * 1 - 1;
    }
    await this.basePage.waitLoading();
    await this.basePage.currentBoard.header.getTab(tabNameOrNumber).switchTo();
    await this.basePage.waitLoading();
  });

  When(/^I type '(.+)' name workspace and save$/, async function(name) {
    await this.basePage.currentBoard.header.getTab(this.memory.currentTab).typeAndSaveWorkspaceName(name);
  });


  When(/^I expand dropdown in '(.+)'(?:st|th|nd|rd|) tab$/, async function(tab) {
    if (tab !== 'current') {
      if (parseInt(tab)) {
        tab = tab * 1 - 1;
      }
      this.memory.currentTab = tab;
      await this.basePage.currentBoard.header.getTab(this.memory.currentTab).switchTo();
    }

    await this.basePage.currentBoard.header.getTab(this.memory.currentTab).expandDropdown();
  });

  When(/^I click '(.+)' button in '(.+)'(?:st|th|nd|rd|) tab$/, async function(element, tab) {
    if (tab !== 'current') {
      if (parseInt(tab)) {
        tab = tab * 1 - 1;
      }
      this.memory.currentTab = tab;
      await this.basePage.currentBoard.header.getTab(tab).switchTo();
    }
    element = element.toLowerCase();

    switch (element) {
      case 'clear workspace': {
        await this.basePage.currentBoard.header.getTab(this.memory.currentTab).clickClearButton();
        break;
      }
      case 'show me': {
        await this.basePage.currentBoard.header.getTab(this.memory.currentTab).clickShowMeButton();
        break;
      }
      case 'grid view component': {
        await this.basePage.currentBoard.header.getTab(this.memory.currentTab).clickCloseComponentButton();
        break;
      }
      case 'edit icon': {
        await this.basePage.currentBoard.header.getTab(this.memory.currentTab).clickEditIcon();
        break;
      }
      default: {
        break;
      }
    }
  });

  When(/^I close '(.+)'(?:st|th|nd|rd|) tab$/, async function(tab) {
    if (tab !== 'current') {
      if (parseInt(tab)) {
        tab = tab * 1 - 1;
      }
      this.memory.currentTab = tab;
      await this.basePage.currentBoard.header.getTab(tab).switchTo();
    }
    await this.basePage.currentBoard.header.getTab(tab).closeTab();
  });

  Then(/^'(.+)' (?:panel|button) is (active|disabled) in '(.+)'(?:st|th|nd|rd|) tab$/, async function(pan, activity, tab) {
    if (tab !== 'current') {
      if (parseInt(tab)) {
        tab = tab * 1 - 1;
      }
      this.memory.currentTab = tab;
      await this.basePage.currentBoard.header.getTab(tab).switchTo();
    }

    const expectedResult = activity.toLowerCase() === 'active';

    if (parseInt(pan)) {
      pan = pan - 1;
    }
    const actualResult = await this.basePage.currentBoard.header.getTab(this.memory.currentTab).isPanelActive(pan);

    this.expect(expectedResult).to.equal(actualResult);
  });

  Then(/^tabs count should be '(\d+)'$/, async function(expectedCount) {
    expectedCount = expectedCount * 1;
    const actualCount = await this.basePage.currentBoard.header.getTabsNumber();
    this.expect(actualCount).to.equal(expectedCount);
  });

  Then(/^'(.+)'(?:st|th|nd|rd|) tab should be (active|not active)$/, async function(tabNameOrNumber, isActive) {
    if (tabNameOrNumber === 'previously added' || tabNameOrNumber === 'current' || tabNameOrNumber === 'current market product') {
      tabNameOrNumber = this.memory.marketName;
    } else if (parseInt(tabNameOrNumber)) {
      tabNameOrNumber = tabNameOrNumber - 1;
    }
    const expectedState = isActive === 'active';
    await this.basePage.waitLoading();
    const actualState = await this.basePage.currentBoard.header.getTab(tabNameOrNumber).isActive();
    this.expect(actualState).to.equal(expectedState);
  });

  Then(/^'(\d+)'(?:st|th|nd|rd|) tab name should be '(.+)'$/, async function(tabNameOrNumber, expectedMarketName) {
    tabNameOrNumber = tabNameOrNumber - 1;
    if (expectedMarketName === 'from parent market' || expectedMarketName === 'previously added market') {
      expectedMarketName = this.memory.marketName;
    }
    const actualMarketName = await this.basePage.currentBoard.header.getTab(tabNameOrNumber).getName();
    this.expect(actualMarketName).to.equal(expectedMarketName);
  });

  Then(/^the '(.+)' element is (visible|invisible) in '(.+)'(?:st|th|nd|rd|) tab$/, async function(element, visibility, tab) {
    const expectedResult = visibility.toLowerCase() === 'visible';

    if (tab !== 'current') {
      if (parseInt(tab)) {
        tab = tab * 1 - 1;
      }
      this.memory.currentTab = tab;
      await this.basePage.currentBoard.header.getTab(tab).switchTo();
    }
    const result = await this.basePage.currentBoard.header.getTab(this.memory.currentTab).isVisible(element);

    this.expect(result).to.equal(expectedResult);
  });

  Then(/^Charts number should be '(\d+|empty)'$/, async function(chartsNumber) {
    const actualFullName = await this.basePage.currentBoard.header.getTab(this.memory.currentTab).getButtonName('Chart');
    if (parseInt(chartsNumber)) {
      this.expect(actualFullName).to.include(chartsNumber);
    } else {
      this.expect(actualFullName).to.equal('Chart');
    }
  });
});
