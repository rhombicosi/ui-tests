/* tslint:disable:max-line-length */
import { defineSupportCode } from 'cucumber';
import { browser, element, by } from 'protractor';


defineSupportCode(function({ Given, When, Then }) {

  When(/^I click on '(.+)' in the '(.+)'(?:st|th|nd|rd|)( market| market on browse tab| position| found market| order|)$/, async function(point, marketNameOrNumber, itemType) {
    if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
      marketNameOrNumber = this.memory.marketName;
    } else if (parseInt(marketNameOrNumber)) {
      marketNameOrNumber = marketNameOrNumber - 1;
      if (itemType.includes('found')) {
        this.memory.marketName = await this.basePage.searchModal.getMarket(marketNameOrNumber).getName();
      } else {
        this.memory.marketName = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getName();
      }
    } else if (marketNameOrNumber.toLowerCase() === 'closed' || marketNameOrNumber.toLowerCase() === 'phone only') {
      marketNameOrNumber = this.memory[marketNameOrNumber];
    } else {
      this.memory.marketName = marketNameOrNumber;
    }
    if (point === 'sell' || point === 'buy') {
      this.memory.direction = point;
    }
    if (itemType.includes('found')) {
      if (process.env.npm_config_browser.includes('firefox')) {
        await this.basePage.searchModal.getMarket(marketNameOrNumber).scrollTo();
      }
      await this.basePage.searchModal.getMarket(marketNameOrNumber).click(point);
    } else if (itemType.includes('market on browse tab')) {
      if (process.env.npm_config_browser.includes('firefox')) {
        await this.basePage.currentBoard.tabBody.browse.marketTable.getMarket(marketNameOrNumber).scrollTo();
      }
      await this.basePage.currentBoard.tabBody.browse.marketTable.getMarket(marketNameOrNumber).click(point);
    } else {
      if (process.env.npm_config_browser.includes('firefox')) {
        await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).scrollTo();
      }
      await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).click(point);
    }
  });

  When(/^I hover '(.+)'(?:st|th|nd|rd|) (?:market|position|order)$/, async function(marketNameOrNumber) {
    if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
      marketNameOrNumber = this.memory.marketName;
    } else if (parseInt(marketNameOrNumber)) {
      marketNameOrNumber = marketNameOrNumber - 1;
      this.memory.marketName = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getName();
    } else {
      this.memory.marketName = marketNameOrNumber;
    }
    await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).hover();
  });

  When(/^I remove '(.+)'(?:st|th|nd|rd|) (?:market|position|order)$/, async function(marketNameOrNumber) {
    if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
      marketNameOrNumber = this.memory.marketName;
    } else if (parseInt(marketNameOrNumber)) {
      marketNameOrNumber = marketNameOrNumber - 1;
      this.memory.marketName = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getName();
    } else {
      this.memory.marketName = marketNameOrNumber;
    }
    const listName = this.basePage.currentBoard.tabBody.currentPanel.currentList.getListName();
    const closeAllSubMarkets = () => {
      return Promise.resolve()
        .then(() => this.basePage.currentBoard.tabBody.currentPanel.getList(listName).getMarket(marketNameOrNumber).getSubMarket(0).click('delete'))
        .then(() => this.basePage.currentBoard.tabBody.getPanel('Deal Ticket').submit())
        .then(() => this.basePage.currentBoard.tabBody.getPanel('positions and orders').getList(listName).doesMarketExist(this.memory.marketName))
        .then((is) => {
          if (is) {
            return closeAllSubMarkets();
          }
        });
    };
    const isMulti = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).isMulti();
    if (!isMulti) {
      await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).click('delete');
      await this.basePage.currentBoard.tabBody.getPanel('Deal Ticket').submit();
      await this.basePage.currentBoard.tabBody.getPanel('positions and orders');
    } else {
      const isExpanded = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).isExpanded();
      if (!isExpanded) {
        await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).expand();
      }
      await closeAllSubMarkets();
    }
  });

  When(/^I select '(.+)' in dropdown menu in '(.+)'(?:st|th|nd|rd|) (?:market|position|order)$/, async function(optionNameOrNumber, marketNameOrNumber) {
    if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
      marketNameOrNumber = this.memory.marketName;
    } else if (parseInt(marketNameOrNumber)) {
      marketNameOrNumber = marketNameOrNumber - 1;
      this.memory.marketName = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getName();
    } else {
      this.memory.marketName = marketNameOrNumber;
    }
    if (parseInt(optionNameOrNumber)) {
      optionNameOrNumber = optionNameOrNumber - 1;
    }
    await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).selectDropdownOption(optionNameOrNumber);
  });

  When(/^I complete '(.+)'(?:st|th|nd|rd|) (market|position|order|found market) dropdown with value '(.+)'$/, async function(marketNameOrNumber, itemType, optionNameOrNumber) {
    if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
      marketNameOrNumber = this.memory.marketName;
    } else if (parseInt(marketNameOrNumber)) {
      marketNameOrNumber = marketNameOrNumber - 1;
      if (itemType.includes('found')) {
        this.memory.marketName = await this.basePage.searchModal.getMarket(marketNameOrNumber).getName();
      } else {
        this.memory.marketName = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getName();
      }
    } else {
      this.memory.marketName = marketNameOrNumber;
    }
    if (parseInt(optionNameOrNumber)) {
      optionNameOrNumber = optionNameOrNumber - 1;
    }
    if (itemType.includes('found')) {
      await this.basePage.searchModal.getMarket(marketNameOrNumber).completeDropdownWithOption(optionNameOrNumber);
    } else {
      await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).completeDropdownWithOption(optionNameOrNumber);
    }
  });

  When(/^I add new '(.+)' watchlist( from menu panel|)$/, async function(watchlistName, location) {
    await this.basePage.searchModal.getMarket(this.memory.marketName).actionsMenu.addNewWatchlist(watchlistName, location);
  });

  When(/^I click on '(.+)' watchlist$/, async function(watchlistName) {
    await this.basePage.searchModal.getMarket(this.memory.marketName).actionsMenu.addMarketToWatchlist(watchlistName);
  });

  When(/^I hover mouse on (Sell|Buy) price in the '(.+)'(?:st|th|nd|rd) market( on browse tab|)$/, async function(typePrice, marketNameOrNumber, location) {
    if (typeof parseInt(marketNameOrNumber) === 'number') {
      marketNameOrNumber = marketNameOrNumber - 1;
    }

    if (location === ' on browse tab') {
      await this.basePage.currentBoard.tabBody.browse.marketTable.getMarket(marketNameOrNumber).hoverElement(`${typePrice} on browse`);
    } else {
      await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).hoverElement(typePrice);
    }
  });

  Then(/^the '(.+)'(?:st|th|nd|rd|) (?:market|position|order) should be (present|not present) on the list$/, async function(marketNameOrNumber, isPresent) {
    if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
      marketNameOrNumber = this.memory.marketName;
    } else if (parseInt(marketNameOrNumber)) {
      marketNameOrNumber = marketNameOrNumber - 1;
    }
    let actualState: boolean;
    if (isPresent === 'present') {
      actualState = await this.basePage.currentBoard.tabBody.currentPanel.currentList.doesMarketExist(marketNameOrNumber);
    } else {
      actualState = await this.basePage.currentBoard.tabBody.currentPanel.currentList.doesMarketAbsent(marketNameOrNumber);
    }
    if (actualState === false) {
      console.log('refresh');
      await browser.refresh();
      await this.basePage.waitLoading();
      if (isPresent === 'present') {
        actualState = await this.basePage.currentBoard.tabBody.currentPanel.currentList.doesMarketExist(marketNameOrNumber);
      } else {
        actualState = await this.basePage.currentBoard.tabBody.currentPanel.currentList.doesMarketAbsent(marketNameOrNumber);
      }
    }
    this.expect(actualState).to.equal(true);
  });

  Then(/^the '(.+)'(?:st|th|nd|rd|) (?:market|position|order) should be colored correctly$/, async function(marketNameOrNumber) {
    if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
      marketNameOrNumber = this.memory.marketName;
    } else if (parseInt(marketNameOrNumber)) {
      marketNameOrNumber = marketNameOrNumber - 1;
    }
    const listName = this.basePage.currentBoard.tabBody.currentPanel.currentList.getListName();
    const positionColor = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getPositionColor();
    let text;
    if (listName === 'positions') {
      text = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText('position');
    } else {
      text = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText('quantity');
    }
    if (text.toLowerCase().includes('sell')) {
      this.expect(positionColor).to.include('222, 69, 89');
    } else {
      this.expect(positionColor).to.include('44, 124, 179');
    }
  });

  Then(/^the '(.+)'(?:st|th|nd|rd|) (?:market|position|order) '(.+)' should be (visible|not visible)$/, async function(marketNameOrNumber, elementName, visibility) {
    if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
      marketNameOrNumber = this.memory.marketName;
    } else if (parseInt(marketNameOrNumber)) {
      marketNameOrNumber = marketNameOrNumber - 1;
    }
    const expectedCondition = visibility === 'visible';
    const actualCondition = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).isElementVisible(elementName);
    this.expect(actualCondition).to.equal(expectedCondition);
  });

  Then(/^the '(.+)'(?:st|th|nd|rd|) (?:market|position|order) dropdown options should be:$/, async function(marketNameOrNumber, table) {
    if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
      marketNameOrNumber = this.memory.marketName;
    } else if (parseInt(marketNameOrNumber)) {
      marketNameOrNumber = marketNameOrNumber - 1;
    }
    const actualArray = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getDropdownOptions();
    const expectedArray = table.raw().map((el) => {
      return el[0];
    });
    this.expect(actualArray).to.deep.equal(expectedArray);
  });

  Then(/^the '(.+)'(?:st|th|nd|rd|) (?:market|position|order) unrealised cell should be visible and colored correctly$/, async function(marketNameOrNumber) {
    if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
      marketNameOrNumber = this.memory.marketName;
    } else if (parseInt(marketNameOrNumber)) {
      marketNameOrNumber = marketNameOrNumber - 1;
    }
    const textColor = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getUnrealisedColor();
    const data = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText('unrealised');
    const num = data.split(/[\n ]/)[0] * 1;
    if (num < 0) {
      this.expect(textColor).to.include('222, 69, 89');
    } else {
      this.expect(textColor).to.include('44, 124, 179');
    }
  });

  Then(/^the '(.+)'(?:st|th|nd|rd|)(?: market's | )(market|[Pp]osition|[Oo]rder|sub-market \d) '(.+)' cell should contain '(.*)' (?:data|word)$/, async function(marketNameOrNumber, type, cellName, data) {
    data = data.replace(' ', '').toLowerCase();
    cellName = cellName.toLowerCase();
    if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
      marketNameOrNumber = this.memory.marketName;
      if ((cellName === 'position' && data === 'correct') || (cellName === 'quantity' && data === 'correct')) {
        data = this.memory.direction.toLowerCase() + this.memory.quantity;
      } else if ((cellName === 'position' || cellName === 'quantity') && data === 'updated') {
        data = this.memory.direction + this.memory.leftQuantity;
        data = data.toLowerCase();
      } else if (cellName === 'opening price' && data === 'correct') {
        data = this.memory.prices[this.memory.direction.toLowerCase()].replace(/\n| |,/g, '');
      } else if (parseFloat(this.memory[cellName]) && data === 'correct') {
        data = parseFloat(this.memory[cellName]);
      }
    } else if (parseInt(marketNameOrNumber)) {
      marketNameOrNumber = marketNameOrNumber - 1;
    }
    let actualText: string;
    // temp solution for unrealised p/l
    if (cellName === 'unrealised') {
      if (type.includes('sub-market')) {
        const marketNumber = parseInt(type.split(' ')[1]) - 1;
        await browser.wait(() => {
          return this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getSubMarket(marketNumber).getText(cellName)
            .then((text) => {
              actualText = text;

              return this.helper.sleepIfFalse(actualText.toLowerCase().includes(data), 1000);
            });
        }, 20000)
          .then(() => null, () => null);
      } else {
        await browser.wait(() => {
          return this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText(cellName)
            .then((text) => {
              actualText = text;

              return this.helper.sleepIfFalse(actualText.toLowerCase().includes(data), 1000);
            });
        }, 20000)
          .then(() => null, () => null);
      }
      actualText = actualText.replace(/\n| |,/g, '').toLowerCase();
    } else {
      if (type.includes('sub-market')) {
        const marketNumber = parseInt(type.split(' ')[1]) - 1;
        actualText = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getSubMarket(marketNumber).getText(cellName);
      } else {
        actualText = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText(cellName);
      }
      actualText = actualText.replace(/\n| |,/g, '').toLowerCase();
    }

    this.expect(actualText).to.include(data);
  });

  Then(/^the '(.+)'(?:st|th|nd|rd|) (?:market|position|order) current price cell should change with time$/, async function(marketNameOrNumber) {
    if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
      marketNameOrNumber = this.memory.marketName;
    } else if (parseInt(marketNameOrNumber)) {
      marketNameOrNumber = marketNameOrNumber - 1;
    }
    const data = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText('current price');
    const state = await browser.wait(() => {
      return this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText('current price')
        .then((text) => this.helper.sleepIfFalse(text !== data, 1000));
    }, 20000)
      .then(() => true, () => false);
    this.expect(state).to.equal(true);
  });

  Then(/^the '(.+)'(?:st|th|nd|rd|) (?:market|position|order)( on browse tab|) should be '(black|white)' when it is '(hovered|not hovered)'$/, async function(marketNameOrNumber, location, color, isHovered) {
    if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
      marketNameOrNumber = this.memory.marketName;
    } else if (parseInt(marketNameOrNumber)) {
      marketNameOrNumber = marketNameOrNumber - 1;
    }
    const expectedColor = color === 'black' ? '26, 26, 26' : '255, 255, 255';
    if (isHovered === 'hovered') {
      if (location === ' on browse tab') {
        await this.basePage.currentBoard.tabBody.browse.marketTable.getMarket(marketNameOrNumber).hover();
      } else {
        await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).hover();
      }
    }

    let actualColor;
    if (location === ' on browse tab') {
      actualColor = await this.basePage.currentBoard.tabBody.browse.marketTable.getMarket(marketNameOrNumber).getRowColor();
    } else {
      actualColor = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getRowColor();
    }
    if (isHovered === 'hovered') {
      await browser.actions().mouseMove({ x: 0, y: 500 }).perform()
        .then(() => null, () => console.log('actions error'));
    }
    this.expect(actualColor).to.include(expectedColor);
  });

  Then(/^the '(.+)' market on browse tab should not be hightlighted$/, async function(marketNameOrNumber) {
    const expectedColor = '0, 0, 0';
    const actualColor = await this.basePage.currentBoard.tabBody.browse.marketTable.getMarket(marketNameOrNumber).getRowColor();
    this.expect(actualColor).to.include(expectedColor);
  });

  Then(/^the '(.+)'(?:st|th|nd|rd|)(?: market's | )(market|position|order|sub-markets) columns should be visible:$/, async function(marketNameOrNumber, type, table) {
    if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
      marketNameOrNumber = this.memory.marketName;
    } else if (parseInt(marketNameOrNumber)) {
      marketNameOrNumber = marketNameOrNumber - 1;
    }
    const promises = [];
    table.raw().forEach((el) => {
      if (type === 'sub-markets') {
        promises.push(this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getSubMarket(0).isElementVisible(el[0])
          .then((actualState) => {
            this.expect(actualState).to.equal(true);
          }));
      } else {
        promises.push(this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).isElementVisible(el[0])
          .then((actualState) => {
            this.expect(actualState).to.equal(true);
          }));
      }
    });
    await Promise.all(promises);
  });

  Then(/^the '(.+)'(?:st|th|nd|rd|) (?:market|position|order) should be displayed as '(multi|single)'$/, async function(marketNameOrNumber, isMulti) {
    if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
      marketNameOrNumber = this.memory.marketName;
    } else if (parseInt(marketNameOrNumber)) {
      marketNameOrNumber = marketNameOrNumber - 1;
    }
    const expectedState = isMulti === 'multi';
    let actualState: boolean;
    await browser.wait(async() => {
      actualState = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).isMulti();

      return this.helper.sleepIfFalse(actualState === expectedState, 500);
    }, 5000)
      .then(() => null, () => {
        console.log('refresh');

        return browser.refresh()
          .then(() => this.basePage.waitLoading())
          .then(() => this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).isMulti())
          .then((state) => actualState = state);
      });
    this.expect(actualState).to.equal(expectedState);
  });

  Then(/^the '(.+)'(?:st|th|nd|rd|)(?: market's | )(market|position|order|sub-market) '(.+)' should be correct$/, async function(marketNameOrNumber, type, cellName) {
    cellName = cellName.toLowerCase();
    const params = {
      'opening price': 'Price',
    };
    if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
      marketNameOrNumber = this.memory.marketName;
    } else if (parseInt(marketNameOrNumber)) {
      marketNameOrNumber = marketNameOrNumber - 1;
      this.memory.marketName = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getName();
    }
    let actualData;
    if (type === 'sub-market') {
      actualData = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getSubMarket(0).getText(cellName);
    } else {
      actualData = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText(cellName);
     }
    actualData = actualData.replace(/\n| |,/g, '').toLowerCase();
    const dataArray = await this.backendHelper.getBackendMultiDataByName(this.memory.marketName, params[cellName], true);
    const expectedData = dataArray[0];
    if (parseFloat(actualData)) {
      actualData = parseFloat(actualData);
    }
    this.expect(actualData).to.equal(expectedData);
  });

  Then(/^the '(.+)'(?:st|th|nd|rd|)(?: market's | )(market|position|order|sub-market) '([Ss]top price|[Ll]imit price)' should contain correct data$/, async function(marketNameOrNumber, type, cellName) {
    cellName = cellName.toLowerCase();
    const params = {
      'stop price': 'Stop',
      'limit price': 'Limit',
    };
    if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
      marketNameOrNumber = this.memory.marketName;
    } else if (parseInt(marketNameOrNumber)) {
      marketNameOrNumber = marketNameOrNumber - 1;
      this.memory.marketName = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getName();
    }
    let actualData;
    if (type === 'sub-market') {
      actualData = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getSubMarket(0).getText(cellName);
    } else {
      actualData = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText(cellName);
    }
    const listName = this.basePage.currentBoard.tabBody.currentPanel.currentList.getListName();
    const isPosition = listName === 'positions';
    actualData = actualData.replace(/\n| |,/g, '').toLowerCase();
    const dataObj = await this.backendHelper.getBackendMultiDataByName(this.memory.marketName, 'IfDone', isPosition);
    const expectedData = dataObj[0][0][params[cellName]].TriggerPrice;
    actualData = parseFloat(actualData);
    this.expect(actualData).to.equal(expectedData);
  });

  Then(/^the '(.+)'(?:st|th|nd|rd|) (market|position|order|found market) '(.+)' should contain '(number|word)'$/, async function(marketNameOrNumber, containerType, cellName, regexpType) {
    if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
      marketNameOrNumber = this.memory.marketName;
    } else if (parseInt(marketNameOrNumber)) {
      marketNameOrNumber = marketNameOrNumber - 1;
    }
    let expectedRegexp;
    switch (regexpType) {
      case 'number':
        expectedRegexp = /\d+\.?\d*/;
        break;
      case 'word':
        expectedRegexp = /\D+/;
        break;
    }
    let actualValue: string;
    if (containerType.includes('found')) {
      actualValue = await this.basePage.searchModal.getMarket(marketNameOrNumber).getText(cellName);
    } else {
      actualValue = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText(cellName);
    }
    this.expect(actualValue).to.match(expectedRegexp);
  });

  Then(/^the '(.+)'(?:st|th|nd|rd|) (market|position|order|found market) change cell should be correct$/, async function(marketNameOrNumber, containerType) {
    if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
      marketNameOrNumber = this.memory.marketName;
    } else if (parseInt(marketNameOrNumber)) {
      marketNameOrNumber = marketNameOrNumber - 1;
    }
    let actualBid: string;
    let actualAsk: string;
    let actualChange: string;
    if (containerType.includes('found')) {
      actualBid = await this.basePage.searchModal.getMarket(marketNameOrNumber).getText('bid price');
      actualAsk = await this.basePage.searchModal.getMarket(marketNameOrNumber).getText('ask price');
      actualChange = await this.basePage.searchModal.getMarket(marketNameOrNumber).getText('change');
    } else {
      actualBid = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText('bid price');
      actualAsk = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText('ask price');
      actualChange = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText('change');
    }
    const actualBidNum = parseFloat(parseFloat(actualBid.replace(',', '')).toPrecision(6));
    const actualAskNum = parseFloat(parseFloat(actualAsk.replace(',', '')).toPrecision(6));
    const expectedChangeNum = actualBidNum - actualAskNum;
    const actualChangeNum = parseFloat(parseFloat(actualChange.replace(',', '')).toPrecision(6));
    this.expect(actualChangeNum).to.equal(expectedChangeNum);
  });

  Then(/^action menu is (visible|not visible)$/, async function(visibility) {
    const expectedState = visibility === 'visible';
    const actualState = await this.basePage.searchModal.getMarket(this.memory.marketName).actionsMenu.isVisible();
    this.expect(actualState).to.equal(expectedState);
  });

  Then(/^'(.+)' watchlist is (present|not present) in menu$/, async function(watchlistName, visibility) {
    const expectedState = visibility === 'present';
    const actualState = await this.basePage.searchModal.getMarket(this.memory.marketName).actionsMenu.isWatchListPresent(watchlistName);
    this.expect(actualState).to.equal(expectedState);
  });

  Then(/^new watchlist button is (present|not present) in menu$/, async function(visibility) {
    const expectedState = visibility === 'present';
    const actualState = await this.basePage.searchModal.getMarket(this.memory.marketName).actionsMenu.isNewWatchlistVisible();
    this.expect(actualState).to.equal(expectedState);
  });

  Then(/^confirmation icon is (visible|not visible) in '(.+)' watchlist$/, async function(visibility, watchlistName) {
    const expectedState = visibility === 'visible';
    const actualState = await this.basePage.searchModal.getMarket(this.memory.marketName).actionsMenu.isConfirmationIconVisible(watchlistName);
    this.expect(actualState).to.equal(expectedState);
  });

  Then(/^the (Sell|Buy) price should be (white|black) in the '(.+)'(?:st|th|nd|rd) market( on browse tab|)$/, async function(typePrice, color, numberOrNameMarket, location) {
    if (typeof parseInt(numberOrNameMarket) === 'number') {
      numberOrNameMarket = numberOrNameMarket - 1;
    }
    let expectedColor;

    if (color === 'white') {
      expectedColor = '255, 255, 255';
    } else {
      expectedColor = '26, 26, 26';
    }

    let actualColor;
    if (location === ' on browse tab') {
      actualColor = await this.basePage.currentBoard.tabBody.browse.marketTable.getMarket(numberOrNameMarket).getElementColor(`${typePrice} on browse`);
    } else {
      actualColor = await this.basePage.currentBoard.tabBody.currentPanel.currentList
        .getMarket(numberOrNameMarket).getElementColor(typePrice);
    }
    this.expect(actualColor).to.include(expectedColor);
  });

  Then(/^'(\d+)' '(.+)' (?:market|order)s? should be on the list$/, async function(expectedNumber, marketName) {
    if (marketName.toLowerCase() === 'previously added' || marketName.toLowerCase() === 'current') {
      marketName = this.memory.marketName;
    }

    let actualNumber: number;
    try {
      await browser.wait(() => {
        return this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarketsCount(marketName)
          .then((num) => {
            actualNumber = num;

            return this.helper.sleepIfFalse(actualNumber === expectedNumber, 500);
          });
      }, 5000);
    } catch (err) {
      console.log('refresh');
      await browser.refresh();
      await this.basePage.waitLoading();
      await browser.wait(() => {
        return this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarketsCount(marketName)
          .then((num) => {
            actualNumber = num;

            return this.helper.sleepIfFalse(actualNumber === expectedNumber, 500);
          });
      }, 5000)
        .then(() => null, () => null);
    }

    this.expect(actualNumber).to.equal(expectedNumber);
  });

  Then(/^'(.+)' in dropdown menu in '(.+)'(?:st|th|nd|rd|) (?:market|position|order) should be (enabled|disabled)$/, async function(optionNameOrNumber, marketNameOrNumber, expectedState) {
    expectedState = expectedState === 'enabled';
    if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
      marketNameOrNumber = this.memory.marketName;
    } else if (parseInt(marketNameOrNumber)) {
      marketNameOrNumber = marketNameOrNumber - 1;
      this.memory.marketName = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getName();
    } else {
      this.memory.marketName = marketNameOrNumber;
    }
    if (parseInt(optionNameOrNumber)) {
      optionNameOrNumber = optionNameOrNumber - 1;
    }
    const actualState = await this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).isOptionEnabled(optionNameOrNumber);
    this.expect(actualState).to.equal(expectedState);
  });

});
