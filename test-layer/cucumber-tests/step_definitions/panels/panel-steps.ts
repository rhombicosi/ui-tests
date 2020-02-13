/* tslint:disable:max-line-length */
import { defineSupportCode } from 'cucumber';
import { browser } from 'protractor';


defineSupportCode(function({ Given, When, Then }) {

  When(/^I resize panel with:$/, async function(table) {
    const height = table.rowsHash().height * 1;
    const width = table.rowsHash().width * 1;
    await this.basePage.currentBoard.tabBody.currentPanel.setSize(height, width);
  });

  When(/^I close (?:'(.+)' |)panel$/, async function(panelName) {
    if (panelName) {
      await this.basePage.currentBoard.tabBody.getPanel(panelName).close();
    } else {
      await this.basePage.currentBoard.tabBody.currentPanel.close();
    }
  });

  When(/^I get panel offset$/, async function() {
    const position = await this.basePage.currentBoard.tabBody.currentPanel.getPosition();
    const size = await this.basePage.currentBoard.tabBody.currentPanel.getSize();
  });

  When(/^I move panel to the '(top-right|top-left|bottom-right|bottom-left)' corner$/, async function(corner) {
    await this.basePage.currentBoard.tabBody.currentPanel.setPosition(corner);
  });

  When(/^I make '(.+)' panel active$/, async function(panelName) {
    await this.basePage.currentBoard.tabBody.getPanel(panelName).makeActive();
  });

  When(/^I wait for '(.+)' panel loading(?:| during '(.+)')$/, async function(panelName, timeout = '10000') {
    panelName = panelName.toLowerCase();
    if (panelName === 'deal ticket') {
      await this.basePage.currentBoard.tabBody.getPanel(panelName).waitReady(parseInt(timeout));
    }
  });

  When(/^I move '(top|bot|left|right)' border '(\d+)' pixels? '(left|right|up|down)'(?: for '(.+)' panel|)$/, async function(boarderPosition, pixels, direction, panelName) {
    if (panelName) {
      await this.basePage.currentBoard.tabBody.getPanel(panelName).moveBoarder(boarderPosition, direction, pixels);
    } else {
      await this.basePage.currentBoard.tabBody.currentPanel.moveBoarder(boarderPosition, direction, pixels);
    }
  });

  Then(/^I am on the '(.+)' component$/, async function(componentName) {
    await this.basePage.currentBoard.tabBody.getNoPanelComponent(componentName);
  });

  Then(/^the (?:'|)([\w ]+|)(?:' |)(panel|no panel component) should be (visible|invisible)$/,
    async function(componentName, componentType, visibility) {
      const expectedState = visibility === 'visible';
      let actualState: boolean;

      if (componentName.toLowerCase() === 'chart in search modal') {
        actualState = await this.basePage.currentBoard.tabBody.getPanel('chart').isChartVisible();
      } else if (componentName) {
        if (componentType === 'panel') {
          actualState = await this.basePage.currentBoard.tabBody.getPanel(componentName).isVisible();
        } else {
          actualState = await this.basePage.currentBoard.tabBody.getNoPanelComponent(componentName).isVisible();
        }
      } else {
        actualState = await this.basePage.currentBoard.tabBody.currentPanel.isVisible();
      }

    this.expect(expectedState).to.equal(actualState);
    });

  Then(/^the header of '(.+)' panel is '(.+)'$/, async function(componentName, expectedPanName) {
    let headerName;

    if (componentName.toLowerCase() === 'previously added' || componentName.toLowerCase() === 'current') {
      headerName = await this.basePage.currentBoard.tabBody.currentPanel.getPanelHeaderName();
    } else if (componentName.toLowerCase() === 'chart in search modal') {
      headerName = await this.basePage.currentBoard.tabBody.getPanel('chart').getMarketNameLabelText(true);
    } else {
      headerName = await this.basePage.currentBoard.tabBody.getPanel(componentName).getPanelHeaderName();
    }
    if (expectedPanName === 'current market') {
      expectedPanName = this.memory.marketName;
    }
    this.expect(headerName.toLowerCase()).to.include(expectedPanName.toLowerCase());
  });

  Then(/^the header no panel component of '(.+)' is '(.+)'$/, async function(componentName, expectedPanName) {
    const headerName = await this.basePage.currentBoard.tabBody.getNoPanelComponent(componentName)
      .getNoPanelComponentHeaderName(componentName);

    this.expect(expectedPanName.toLowerCase()).to.equal(headerName.toLowerCase());
  });

  Then(/^count of '(.+)' panels should be '(.+)'$/, async function(componentName, countComponents) {
    let actualCount: number;
    await browser.wait(async() => {
      actualCount = await this.basePage.currentBoard.tabBody.getCountSamePanel(componentName);

      return this.helper.sleepIfFalse(actualCount === parseInt(countComponents));
    }, 2000)
      .then(() => null, () => null);

    this.expect(parseInt(countComponents)).to.equal(actualCount);
  });

  Then(/^the count of tabs should be '(.+)'$/, async function(countTabs) {
    const actualCount = await this.basePage.currentBoard.header.getTabsNumber();

    this.expect(parseInt(countTabs)).to.equal(actualCount);
  });

  Then(/^the icon create new workspace is (visible|invisible)$/, async function(visibility) {
    const expectedResult = visibility.toLowerCase() === 'visible';

    const actualResult = await this.basePage.currentBoard.header.isCreateNewWorkspaceVisible();
    this.expect(expectedResult).to.equal(actualResult);
  });

  Then(/^close button is available$/, async function() {
    const actualState = await this.basePage.currentBoard.tabBody.currentPanel.isCloseAvailable();
    this.expect(actualState).to.equal(true);
  });
});
