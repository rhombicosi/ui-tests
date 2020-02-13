/* tslint:disable:max-line-length */
import { defineSupportCode } from 'cucumber';
import { browser } from 'protractor';
import { CurrencySign } from './../../../../support/emuns/currency-sign.enum';
import { CurrencyDecimalDigitsEnum } from './../../../../support/emuns/currency-decimal-digits.enum';
import * as _ from 'lodash';

defineSupportCode(function({Given, When, Then}) {

  When(/^I fill( main | oco | )'(.+)' with value '(.+)'$/, async function(ticketType, field, value) {
    field = field.toLowerCase();
    if (value.match(/sell\*\d+?\.?\d*/)) {
      const direction = value.split(/\*/)[0];
      const multiplier = value.split(/\*/)[1];
      value = this.memory.prices[direction] * multiplier;
    }
    this.memory[field] = value;
    ticketType = ticketType.trim();
    await this.basePage.currentBoard.tabBody.currentPanel.fillInputWithValue(field, value, ticketType);
  });

  When(/^I fill the '(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) linked order '(.+)' with computed value '(.+)' in the '(.+)'$/, async function(orderNumber, field, value, marketName) {
    if (marketName === 'current market') {
      marketName = this.memory.marketName;
    }
    const marketInformation = await this.backendHelper.getMarketInformation(this.idMatcher.market[marketName]);
    orderNumber = parseInt(orderNumber) - 1;
    const marketId = this.idMatcher.market[marketName];
    this.lightstreamer.subscribe(marketId);
    const decimals = marketInformation.PriceDecimalPlaces;
    const buyPrice = await this.lightstreamer.addListener('Offer');
    const sellPrice = await this.lightstreamer.addListener('Bid');

    if (value.match(/sell|buy\*\d+?\.?\d*/)) {
      const direction = value.split(/\*/)[0];
      const multiplier = value.split(/\*/)[1];
      if (this.memory['order price']) {
        const lessThanOrderPrice = (this.memory['order price'] * 0.99).toFixed(decimals);
        const moreThanOrderPrice = (this.memory['order price'] * 1.01).toFixed(decimals);

        value = direction === 'buy'
          ? orderNumber === 0 ? lessThanOrderPrice : moreThanOrderPrice
          : orderNumber === 0 ? moreThanOrderPrice : lessThanOrderPrice;

        if (orderNumber === 0) {
          this.memory['stop price'] = value;
        } else {
          this.memory['limit price'] = value;
        }

        await this.basePage.currentBoard.tabBody.currentPanel.getLinkedOrder(orderNumber).fillInputWithValue(field, value);
      } else {
        value = direction === 'buy'
          ? orderNumber === 0 ? sellPrice : buyPrice
          : orderNumber === 0 ? buyPrice : sellPrice;
        await this.basePage.currentBoard.tabBody.currentPanel.getLinkedOrder(orderNumber).fillInputWithValue(field, value * multiplier);
      }
    }
  });

  When(/^I fill '(.+)'( main | oco | )price with value between current prices$/, async function(marketName, ticketType) {
    const marketInformation = await this.backendHelper.getMarketInformation(this.idMatcher.market[marketName]);
    ticketType = ticketType.trim();
    this.lightstreamer.subscribe(this.idMatcher.market[marketName]);
    const sellPrice = await this.lightstreamer.addListener('Bid');
    const buyPrice = await this.lightstreamer.addListener('Offer');
    const decimals = marketInformation.PriceDecimalPlaces;
    const between: any = ((sellPrice * 1 + buyPrice * 1) / 2).toFixed(decimals);

    await this.basePage.currentBoard.tabBody.currentPanel.fillInputWithValue('order price', between, ticketType);
  });

  When(/^I fill '(.+)'( main | oco | )price with value not between current prices on '(.+)'$/, async function(marketName, ticketType, direction) {
    const marketInformation = await this.backendHelper.getMarketInformation(this.idMatcher.market[marketName]);
    ticketType = ticketType.trim();
    this.lightstreamer.subscribe(this.idMatcher.market[marketName]);
    const sellPrice = await this.lightstreamer.addListener('Bid');
    const buyPrice = await this.lightstreamer.addListener('Offer');
    const decimals = marketInformation.PriceDecimalPlaces;
    const notBetween = direction === 'buy'
      ? (sellPrice * 0.99).toFixed(decimals)
      : (buyPrice * 1.01).toFixed(decimals);
    this.memory.marketName = marketName;
    this.memory['order price'] = notBetween;
    await this.basePage.currentBoard.tabBody.currentPanel.fillInputWithValue('order price', notBetween, ticketType);
  });

  When(/^I clear '(.+)' field$/, async function(field) {
    field = field.toLowerCase();
    await this.basePage.currentBoard.tabBody.currentPanel.clearField(field);
  });

  When(/^I fill the( main | oco | )'(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) linked order '(.+)' with value '(.+)'$/, async function(ticketType, orderNumber, field, value) {
    field = field.toLowerCase();
    orderNumber = parseInt(orderNumber) - 1;
    if (value.match(/sell\*\d+?\.?\d*/)) {
      const direction = value.split(/\*/)[0];
      const multiplier = value.split(/\*/)[1];
      value = this.memory.prices[direction] * multiplier;
    }
    // workaround for bug with different time representation
    if (process.env.npm_config_browser.includes('firefox')) {
      if (value.includes('pm')) {
        value = parseInt(value.replace('pm', '')) + 1200;
      } else if (value.includes('am')) {
        value = value.replace('am', '');
      }
    }

    if (orderNumber === 0 && field === 'price') {
      this.memory['stop price'] = value;
    } else if (orderNumber === 1 && field === 'price') {
      this.memory['limit price'] = value;
    } else if (field === 'quantity') {
      this.memory[`${orderNumber} quantity`] = value;
    } else {
      this.memory[field] = value;
    }

    ticketType = ticketType.trim();
    await this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).fillInputWithValue(field, value);
  });

  When(/^I clear the( main | oco | )'(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) linked order '(.+)' input field$/, async function(ticketType, orderNumber, field) {
    orderNumber = parseInt(orderNumber) - 1;
    ticketType = ticketType.trim();
    await this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).clearField(field);
  });

  When(/^I submit the form$/, async function() {
    this.memory.prices = await this.basePage.currentBoard.tabBody.currentPanel.submit();
  });

  When(/^I (?:check|uncheck)( main | oco | )'([Ss]top|[Ll]imit)' checkbox$/, async function(ticketType, name) {
    name = name.toLowerCase();
    const orderNumber = name === 'stop' ? 0 : 1;
    ticketType = ticketType.trim();
    await this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).checkCheckbox();
  });

  When(/^I click on( main | oco | )'(.+)' (button|label|link|element)$/, async function(ticketType, name, element) {
    const method = element.charAt(0).toUpperCase() + element.slice(1);
    await this.basePage.currentBoard.tabBody.currentPanel[`clickOn${method}`](name, ticketType.trim());
  });

  When(/^I expand( main | oco | )add stop limit dropdown$/, async function(ticketType) {
    await this.basePage.currentBoard.tabBody.currentPanel.clickAddStopLimit(ticketType.trim());
  });

  When(/^I switch to '([Tt]rade|[Oo]rder)' tab$/, async function(itemType) {
    await this.basePage.currentBoard.tabBody.currentPanel.selectItemType(itemType);
  });

  When(/^I select '(.+)' in [Aa]dd stop or limit dropdown$/, async function(optionNameOrNumber) {
    if (parseInt(optionNameOrNumber)) {
      optionNameOrNumber = optionNameOrNumber - 1;
    }
    await this.basePage.currentBoard.tabBody.currentPanel.selectStopLimitDropdownOption(optionNameOrNumber);
  });

  When(/^I remove '(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) order$/, async function(orderNumber) {
    orderNumber = parseInt(orderNumber) - 1;
    await this.basePage.currentBoard.tabBody.currentPanel.getLinkedOrder(orderNumber).removeLinkedOrder();
  });

  When(/^I expand( main | oco | )'(.+)'(?:st|th|nd|rd|) (applicability|linked order types) dropdown$/, async function(orderType, orderNumber, dropdownName) {
    orderNumber = parseInt(orderNumber) - 1;
    orderType = orderType.trim();
    await this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(orderType, orderNumber).expandDropdown(dropdownName);
  });

  When(/^I expand (?:applicability|[Gg][Tt][Cc]) dropdown$/, async function() {
    await this.basePage.currentBoard.tabBody.currentPanel.expandApplicabilityDropdown();
  });

  When(/^I select( main | oco | )'(.+)'(?:st|th|nd|rd|) linked order '(.+)' stop type$/, async function(orderType, orderNumber, stopType) {
    orderNumber = parseInt(orderNumber) - 1;
    orderType = orderType.trim();
    await this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(orderType, orderNumber).selectStopType(stopType);
  });

  When(/^I reload page$/, async function() {
    await browser.get(browser.baseUrl);
  });

  When(/^I select '(.+)'(?:st|th|nd|rd|) option from '(.+)'(?:st|th|nd|rd|) (?:applicability|[Gg][Tt][Cc]) dropdown$/, async function(nameOrNumber, orderNumber) {
    if (parseInt(nameOrNumber)) {
      nameOrNumber = nameOrNumber - 1;
    }
    orderNumber = parseInt(orderNumber) - 1;
    await this.basePage.currentBoard.tabBody.currentPanel.getLinkedOrder(orderNumber).selectApplicability(nameOrNumber);
  });

  When(/^I select '(.+)'(?:st|th|nd|rd|) option from (?:applicability|[Gg][Tt][Cc]) dropdown$/, async function(nameOrNumber) {
    if (parseInt(nameOrNumber)) {
      nameOrNumber = nameOrNumber - 1;
    }
    await this.basePage.currentBoard.tabBody.currentPanel.selectApplicability(nameOrNumber);
  });

  When(/^I enter current date in '(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) linked order$/, async function(orderNumber) {
    orderNumber = parseInt(orderNumber) - 1;
    await this.basePage.currentBoard.tabBody.currentPanel.getLinkedOrder(orderNumber).selectCurrentDate();
  });

  When(/^I find market with '(.+)' status$/, async function(status) {
    const marketsPool = this.idMatcher[status];
    const statusNum = {
      closed: '4',
      'phone only': '2'
    };

    for (const name in marketsPool) {
      if (marketsPool.hasOwnProperty(name)) {
        this.lightstreamer.subscribe(marketsPool[name]);
        const marketStatus = await this.lightstreamer.addListener('StatusSummary');
        if (marketStatus === statusNum[status]) {
          this.memory[status] = name;
          break;
        }
      }
    }
  });

  When(/^I hover (main|oco) order '(.+)' element$/, async function(orderType, elementName) {
    await this.basePage.currentBoard.tabBody.currentPanel.hover(elementName, orderType);
  });

  When(/^I wait confirmation message is displayed within panel$/, async function() {
    await this.basePage.currentBoard.tabBody.currentPanel.waitForConfirmationMessage(60000);
  });

  When(/^I wait for '(.+)' price has trailing zeros$/, async function(type) {
    const state = await browser.wait(() => {
      return this.basePage.currentBoard.tabBody.currentPanel.getPrice(type)
        .then((text) => {
          this.memory.priceWithZeros = text;

          return text.match(/0+$/);
        });
    }, 60000)
      .then(() => true, () => false);
    this.expect(state).to.equal(true);
  });

  Then(/^'(.+)' radiobutton should be '(selected|not selected)'$/, async function(name, isSelected) {
    const expectedCondition = isSelected === 'selected';
    const actualCondition = await this.basePage.currentBoard.tabBody.currentPanel.isRadiobuttonSelected(name);
    this.expect(actualCondition).to.equal(expectedCondition);
  });

  Then(/^the( main | oco | )'([Ss]top|[Ll]imit)' checkbox is (checked|unchecked)$/, async function(ticketType, name, state) {
    name = name.toLowerCase();
    const orderNumber = name === 'stop' ? 0 : 1;
    ticketType = ticketType.trim();
    const currentState = await this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).isChecked();

    state === 'checked' ? this.expect(currentState).to.equal(true) : this.expect(currentState).to.equal(false);
  });

  Then(/^'(.+)' ticket type should be '(selected|not selected)'$/, async function(name, isSelected) {
    const expectedCondition = isSelected === 'selected';
    const actualCondition = await this.basePage.currentBoard.tabBody.currentPanel.isTypeSelected(name);
    this.expect(actualCondition).to.equal(expectedCondition);
  });

  Then(/^'(.+)' input should be predefined with '(.*)'$/, async function(name, expectedValue) {
    const actualValue = await this.basePage.currentBoard.tabBody.currentPanel.getInputValue(name);
    this.expect(actualValue).to.equal(expectedValue);
  });

  // TODO can be deleted when all features are updated with new steps
  Then(/^'(.+)' input should be autopopulated$/, async function(fieldName) {
    const actualValue = await this.basePage.currentBoard.tabBody.currentPanel.getInputValue(fieldName);
    const expectedValue = new RegExp('\\d+?\\.?\\d*');
    this.expect(actualValue).to.match(expectedValue);
  });

  Then(/^the( main | oco | )'(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) linked order '(.+)' input should be (autopopulated|blank)$/, async function(ticketType, orderNumber, name, value) {
    orderNumber = parseInt(orderNumber) - 1;
    ticketType = ticketType.trim();
    const actualValue = await this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue(name);
    const expectedValue = value === 'autopopulated' ? new RegExp('\\d+?\\.?\\d*') : new RegExp('^\s*$');
    this.expect(actualValue).to.match(expectedValue);
  });

  // INFO: CurrencyDecimalDigitsEnum
  Then(/^the (sell|buy) '(.+)'( main | oco | )'(.+)'(?:st|th|nd|rd|) (stop|guaranteed stop|trailing stop|limit) linked order '(.+)' input should be calculated from '(.+)'$/,
  async function(direction, marketName, ticketType, orderNumber, orderType, name, from) {
    orderNumber = parseInt(orderNumber) - 1;
    ticketType = ticketType.trim();
    const marketInformation = await this.backendHelper.getMarketInformation(this.idMatcher.market[marketName]);
    const pfd = marketInformation.PointFactorDivisor;
    const qcf = marketInformation.QuantityConversionFactor;
    const betPer = marketInformation.BetPer;
    const trailingStopConversionFactor = marketInformation.TrailingStopConversionFactor || 1;
    const decimals = marketInformation.PriceDecimalPlaces;
    const plDecimals = +CurrencyDecimalDigitsEnum[marketInformation.MarketSizesCurrencyCode];
    const qty = this.memory.quantity;
    const price = this.memory['order price'];

    let currentPrice;
    const lightDir = direction === 'sell' ? 'Bid' : 'Offer';
    let promiseArr = [];
    let actualValue;
    let expectedValue;

    if (ticketType === '') {
      this.lightstreamer.subscribe(this.idMatcher.market[marketName]);
    }

    await browser.wait(() => {
      promiseArr = [];
      if (ticketType === '' && (name !== 'points' || from !== 'p/l')) {
        promiseArr.push(this.lightstreamer.addListener(lightDir)
        .then((cp) => currentPrice = cp));
      } else {
        currentPrice = price;
      }

      if (name === 'price' && (from === 'points' || from === 'p/l')) {
        promiseArr.push(this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue('points')
          .then((points) => expectedValue = this.formulas.calculatePriceFromPoints(currentPrice, pfd, points, betPer, trailingStopConversionFactor, orderType, direction).toFixed(decimals))
        );
      } else if (name === 'p/l' && (from === 'points' || from === 'price')) {
        promiseArr.push(this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue('price')
          .then((orderPrice) => expectedValue = this.formulas.calculatePLFromPrice(orderPrice, currentPrice, pfd, betPer, qty, qcf, trailingStopConversionFactor, direction, orderType).toFixed(plDecimals))
        );
      } else if (name === 'points' && from === 'price') {
        promiseArr.push(this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue('price')
          .then((orderPrice) => expectedValue = this.formulas.calculatePointsFromPrice(orderPrice, currentPrice, pfd, betPer, trailingStopConversionFactor, direction, orderType).toFixed(decimals))
        );
      } else if (name === 'points' && from === 'p/l') {
        promiseArr.push(this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue('p/l')
          .then((pl) => expectedValue = _.round(this.formulas.calculatePointsFromPL(pl, qty, qcf, trailingStopConversionFactor, orderType, direction), decimals))
        );
      }

      promiseArr.push(this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue(name)
          .then((av) => actualValue = av));

        return Promise.all(promiseArr)
          .then(() => actualValue === expectedValue);

    }, 90000)
      .then(() => null, () => null);

    if (name === 'p/l') {
      expectedValue =  _.round(expectedValue, plDecimals);
    }

    this.expect(`${actualValue}`).to.equal(`${expectedValue}`);
  });

  Then(/^the( main | oco | )'(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) linked order '(.+)' input should be '(.*)'/, async function(ticketType, orderNumber, name, expectedValue) {
    orderNumber = parseInt(orderNumber) - 1;
    ticketType = ticketType.trim();
    const actualValue = await this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue(name);
    this.expect(actualValue).to.equal(expectedValue);
  });

  Then(/^'(.+)' element text should (contain|be) '(.+)'$/, async function(name, comparisonType, expectedText) {
    if (expectedText.includes('current market')) {
      expectedText = this.memory.marketName;
    }
    expectedText = expectedText.toLowerCase();
    let text: string;
    let actualText: string;
    await browser.wait(async() => {
      text = await this.basePage.currentBoard.tabBody.currentPanel.getElementText(name);
      actualText = text.replace(/ *\n */g, ' ').toLowerCase();
      if (comparisonType === 'contain') {
        return this.helper.sleepIfFalse(actualText.includes(expectedText));
      } else {
        return this.helper.sleepIfFalse(actualText === expectedText);
      }
    }, 2000)
      .then(() => null, () => null);
    if (comparisonType === 'contain') {
      this.expect(actualText).to.include(expectedText);
    } else {
      this.expect(actualText).to.equal(expectedText);
    }
  });

  Then(/^(?:|partially )close info message should be correct$/, async function() {
    const text = await this.basePage.currentBoard.tabBody.currentPanel.getElementText('close info');
    const closeQuantity = await this.basePage.currentBoard.tabBody.currentPanel.getInputValue('close quantity');
    const actualText = text.replace(/\s+/g, ' ');
    const leftQuantity = this.memory.quantity - closeQuantity;
    this.memory.leftQuantity = leftQuantity;
    const expectedPattern = new RegExp(`Close ${closeQuantity} of ${this.memory.quantity} at \\d+?\\.?\\d* Leaving a position of ${leftQuantity}`);
    this.expect(actualText).to.match(expectedPattern);
  });

  Then(/^amalgamated position close info message should be correct$/, async function() {
    const text = await this.basePage.currentBoard.tabBody.currentPanel.getElementText('close info');
    const closeQuantity = await this.basePage.currentBoard.tabBody.currentPanel.getInputValue('close quantity');
    const actualText = text.replace(/\s+/g, ' ');
    const leftAmalgamatedQty = this.memory.amalgamatedQty - closeQuantity;
    this.memory.leftAmalgamatedQty = leftAmalgamatedQty;
    const expectedPattern = new RegExp(`Close ${closeQuantity} of ${this.memory.amalgamatedQty} at \\d+?\\.?\\d* Leaving a position of ${leftAmalgamatedQty}`);
    this.expect(actualText).to.match(expectedPattern);
  });

  Then(/^current (simple|amalgamated) position information should be correct$/, async function(positionType) {
    const text = await this.basePage.currentBoard.tabBody.currentPanel.getElementText('position info');
    const actualText = text.replace(/\s+/g, ' ').toLowerCase();

    const expectedPattern = positionType === 'simple' ? new RegExp(`position ${this.memory.direction.toLowerCase()} ${this.memory.quantity} at \\d+?\\.?\\d* -?\\d+?\\.?\\d* gbp`)
                                                : new RegExp(`position ${this.memory.direction.toLowerCase()} ${this.memory.amalgamatedQty} at \\d+?\\.?\\d* -?\\d+?\\.?\\d* gbp`);
    this.expect(actualText).to.match(expectedPattern);
  });

  Then(/^(?:'(trade|order|oco order)' |)confirmation message should be correct$/, async function(ticketType) {
    const text = await this.basePage.currentBoard.tabBody.currentPanel.getElementText('confirmation message');
    const actualText = text.replace(/\s+/g, ' ');
    let expectedPattern;
    if (!ticketType || ticketType === 'trade') {
      expectedPattern = new RegExp(`Closed: (Buy|Sell) `
        + `${this.memory.quantity} at \\d+\\.?\\d*`
        + ` You (lost|made) \\d+\\.?\\d* GBP on this trade`);
    } else if (ticketType === 'oco order') {
      expectedPattern = new RegExp(`Order added to (Buy|Sell) \\d+\\.?\\d* at \\d+\\.?\\d* ?`
        + `(Attached stop order added to (Buy|Sell) \\d+\\.?\\d* at \\d+\\.?\\d* \\(-?\\d+\\.?\\d* [A-Z]{3}\\)|) ?`
        + `(Attached limit order added to (Buy|Sell) \\d+\\.?\\d* at \\d+\\.?\\d* \\(-?\\d+\\.?\\d* [A-Z]{3}\\)|) ?`
        + `OCO Order added to (Buy|Sell) \\d+\\.?\\d* at \\d+\\.?\\d* ?`
        + `(Attached stop order added to (Buy|Sell) \\d+\\.?\\d* at \\d+\\.?\\d* \\(-?\\d+\\.?\\d* [A-Z]{3}\\)|) ?`
        + `(Attached limit order added to (Buy|Sell) \\d+\\.?\\d* at \\d+\\.?\\d* \\(-?\\d+\\.?\\d* [A-Z]{3}\\)|)`);
    }

    this.expect(actualText).to.match(expectedPattern);
  });

  Then(/^'(.+)' confirmation messages about close amalgamated positions should be displayed$/, async function(positions) {
    positions = parseInt(positions);
    const closeQuantity = await this.basePage.currentBoard.tabBody.currentPanel.getInputValue('close quantity');
    let dif = closeQuantity;
    let closed = 0;
    for (let n = 0; n < positions; n++) {
      const text = await this.basePage.currentBoard.tabBody.currentPanel.getElementText(`confirmation message ${n + 1}`);
      const actualText = text.replace(/\s+/g, ' ');
      const qty = dif - this.memory.qtyArray[n] > 0 ? this.memory.qtyArray[n] : dif;

      if (dif - this.memory.qtyArray[n] > 0) {
        closed++;
      } else {
        this.memory.qtyArray[n] = this.memory.qtyArray[n] - dif;
      }

      dif = dif - this.memory.qtyArray[n];

      const expectedPattern = new RegExp(`Closed: (Buy|Sell) `
        + `${qty} at \\d+?\\.?\\d*`
        + ` You (lost|made) \\d+?\\.?\\d* GBP on this trade`);
      let actualCondition = false;
      if (actualText.match(expectedPattern)) {
          actualCondition = true;
      }
      this.memory.amalgamatedQty = this.memory.amalgamatedQty - closeQuantity;

      this.expect(actualCondition).to.equal(true);
    }

    if (closed !== 0) {
      this.memory.qtyArray = this.memory.qtyArray.splice(0, closed);
    }
  });

  Then(/^correct confirmation message about adding '(.+)' linked orders should be displayed$/, async function(orders) {
    orders = parseInt(orders);
    const text = await this.basePage.currentBoard.tabBody.currentPanel.getElementText('confirmation message');
    const actualText = text.replace(/\s+/g, ' ');
    const pattern = 'Your order has been updated.';
    let expectedMessage = '';
    const message = ' You have successfully added an order. Your order is confirmed with Order ID \\d{9}.';
    for (let n = 0; n < orders; n++) {
      expectedMessage = expectedMessage + message;
    }

    const expectedPattern = new RegExp(`^${pattern}${expectedMessage}$`);
    let actualCondition = false;
      if (actualText.match(expectedPattern)) {
          actualCondition = true;
      }

    this.expect(actualCondition).to.equal(true);
  });

  Then(/^correct confirmation message about removing '(.+)' linked orders should be displayed$/, async function(orders) {
    orders = parseInt(orders);
    const text = await this.basePage.currentBoard.tabBody.currentPanel.getElementText('confirmation message');
    const actualText = text.replace(/\s+/g, ' ');
    const pattern = 'Your order has been updated.';
    let expectedMessage = '';
    const message = ' Your attached (Stop|Limit) has been deleted.';
    for (let n = 0; n < orders; n++) {
      expectedMessage = expectedMessage + message;
    }

    const expectedPattern = new RegExp(`^${pattern}${expectedMessage}$`);
    let actualCondition = false;
      if (actualText.match(expectedPattern)) {
          actualCondition = true;
      }

    this.expect(actualCondition).to.equal(true);
  });

  Then(/^partially close confirmation message should be correct$/, async function() {
    const text = await this.basePage.currentBoard.tabBody.currentPanel.getElementText('confirmation message');
    const actualText = text.replace(/\s+/g, ' ');
    const expectedPattern = new RegExp(`Closed: (Buy|Sell) `
      + `${this.memory.leftQuantity} at \\d+?\\.?\\d*`
      + ` You (lost|made) \\d+?\\.?\\d* GBP on this trade`);
    this.expect(actualText).to.match(expectedPattern);
  });

  Then(/^open ([Bb]uy|[Ss]ell) '(.+)' (trade|order) confirmation message should be correct$/, async function(direction, marketName, tradeOrOrder) {
    const text = await this.basePage.currentBoard.tabBody.currentPanel.getElementText('confirmation message');
    const actualText = text.replace(/\s+/g, ' ');

    const point = direction.match(/[Bb]uy/) ? 'Sell' : 'Buy';
    const stopPrice = await this.basePage.currentBoard.tabBody.currentPanel.getLinkedOrder(0).getInputValue('price');
    const stopProfitLoss = await this.basePage.currentBoard.tabBody.currentPanel.getLinkedOrder(0).getInputValue('p/l');
    const limitPrice = await this.basePage.currentBoard.tabBody.currentPanel.getLinkedOrder(1).getInputValue('price');
    const limitProfitLoss = await this.basePage.currentBoard.tabBody.currentPanel.getLinkedOrder(1).getInputValue('p/l');
    const marketInfo = await this.backendHelper.getMarketInformation(this.idMatcher.market[marketName]);
    const ccy = marketInfo.MarketSizesCurrencyCode;
    const stringStartFrom = tradeOrOrder === 'trade' ? 'Opened:' : 'Order added to';

    const expectedPattern = new RegExp(`${stringStartFrom} ${direction.charAt(0).toUpperCase() + direction.slice(1)} `
      + `${this.memory.quantity} at \\d+?\\.?\\d* `
      + `Attached stop order added to ${point} `
      + `${this.memory.quantity} at ${stopPrice}`
      + ` \\(${stopProfitLoss} ${ccy}\\) `
      + `Attached limit order added to ${point} `
      + `${this.memory.quantity} at ${limitPrice}`
      + ` \\(${limitProfitLoss} ${ccy}\\)`);

    this.expect(actualText).to.match(expectedPattern);
  });

  Then(/^open (?:buy|sell) confirmation message should display correct price$/, async function() {
    const actualMessage = await this.basePage.currentBoard.tabBody.currentPanel.getElementText('confirmation message');
    const expectedMessage = new RegExp(`Opened: (Buy|Sell) \\d+?\\.?\\d* at ${this.memory.priceWithZeros}`);
    this.expect(actualMessage).to.match(expectedMessage);
  });

  Then(/^open '(.+)' (buy|sell)( | main | oco )attached (stop|limit) order confirmation message should display correct p\/l$/, async function(marketName, direction, ticketType, orderType) {
    ticketType = ticketType.trim();
    const marketInformation = await this.backendHelper.getMarketInformation(this.idMatcher.market[marketName]);
    const pfd = marketInformation.PointFactorDivisor;
    const qcf = marketInformation.QuantityConversionFactor;
    const betPer = marketInformation.BetPer;
    const trailingStopConversionFactor = marketInformation.TrailingStopConversionFactor || 1;
    const decimals = marketInformation.PriceDecimalPlaces;
    const plDecimals = +CurrencyDecimalDigitsEnum[marketInformation.MarketSizesCurrencyCode];
    const qty = this.memory.quantity;
    const ccy = marketInformation.MarketSizesCurrencyCode;
    const price = this.memory['order price'];
    let orderPrice;
    const points = this.memory['points away'];
    let pl;
    let currentPrice;

    if (ticketType === '') {
      currentPrice = await this.basePage.currentBoard.tabBody.currentPanel.getPrice(direction);
      currentPrice = parseFloat(currentPrice.replace(/\,/g,''));
    } else {
      currentPrice = price;
    }
    orderPrice = this.formulas.calculatePriceFromPoints(currentPrice, pfd, points, betPer, trailingStopConversionFactor, orderType, direction).toFixed(decimals);
    pl = this.formulas.calculatePLFromPrice(orderPrice, currentPrice, pfd, betPer, qty, qcf, trailingStopConversionFactor, direction, orderType).toFixed(plDecimals);

    const actualMessage = await this.basePage.currentBoard.tabBody.currentPanel.getElementText('attached order confirmation');
    const expectedMessage = new RegExp(`Attached stop order added to (Buy|Sell) \\d+?\\.?\\d* at \\d+?\\.?\\d* \\(${_.round(pl, plDecimals)} ${ccy}\\)`);

    this.expect(actualMessage).to.match(expectedMessage);
  });

  Then(/^trade direction should be '(buy|sell)'$/, async function(expectedDirection) {
    const actualDirection = await this.basePage.currentBoard.tabBody.currentPanel.getDirection();
    this.expect(actualDirection).to.equal(expectedDirection);
  });

  Then(/^'(.+)' price should change with time$/, async function(type) {
    const data = await this.basePage.currentBoard.tabBody.currentPanel.getPrice(type);
    const state = await browser.wait(() => {
      return this.basePage.currentBoard.tabBody.currentPanel.getPrice(type)
        .then((text) => this.helper.sleepIfFalse(text !== data, 1000));
    }, 20000)
      .then(() => true, () => false);
    this.expect(state).to.equal(true);
  });

  Then(/^the (main|oco|)'(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) linked order '(.+)' value should change with time$/,
  async function(ticketType, orderNumber, field) {
    orderNumber = parseInt(orderNumber) - 1;
    const currentValue = await this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue(field);

    const state = await browser.wait(() => {
      return this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue(field)
        .then((value) => this.helper.sleepIfFalse(value !== currentValue, 1000));
    }, 20000)
      .then(() => true, () => false);
    this.expect(state).to.equal(true);
  });

  Then(/^'(.+)' element should be (disabled|enabled)$/, async function(name, status) {
    const actualState = await this.basePage.currentBoard.tabBody.currentPanel.isControlDisabled(name);
    const expectedState = status === 'disabled';
    this.expect(actualState).to.equal(expectedState);
  });

  Then(/^'(.+)' '(.+)' placeholder should be correct$/, async function(marketName, field) {
    const marketInformation = await this.backendHelper.getMarketInformation(this.idMatcher.market[marketName]);
    const size = marketInformation.WebMinSize;
    const actualPlaceholder = await this.basePage.currentBoard.tabBody.currentPanel.getPlaceholder(field);
    const expectedPlaceholder = `min. ${size}`;
    this.expect(actualPlaceholder).to.equal(expectedPlaceholder);
  });

  Then(/^the (main|oco|)'(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) linked order '(.+)' placeholder should be correct$/, async function(ticketType, orderNumber, field) {
    orderNumber = parseInt(orderNumber) - 1;
    let expectedPlaceholder;
    if (field === 'price') {
      expectedPlaceholder = `price`;
    } else if (field === 'points') {
      expectedPlaceholder = `points`;
    } else if (field === 'p/l') {
      expectedPlaceholder = `P/L`;
    }

    const actualPlaceholder = await this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getPlaceholder(field);
    this.expect(actualPlaceholder).to.equal(expectedPlaceholder);
  });

  Then(/^the( main | oco | )'(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) linked order '(.+)' element should be (enabled|disabled)$/,
  async function(ticketType, orderNumber, field, state) {
    orderNumber = parseInt(orderNumber) - 1;
    ticketType = ticketType.trim();
    const actualState = await this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).isElementEnabled(field);
    const expectedState = state === 'enabled';
    this.expect(actualState).to.equal(expectedState);
  });

  Then(/^the '(.+)'( main | oco | )'(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) linked order p\/l (currency sign|value) should be correct$/,
  async function(marketName, ticketType, orderNumber, value) {
    ticketType = ticketType.trim();
    orderNumber = parseInt(orderNumber) - 1;
    const marketInformation = await this.backendHelper.getMarketInformation(this.idMatcher.market[marketName]);
    const ccy = marketInformation.MarketSizesCurrencyCode;
    const expectedPlaceholder = CurrencySign[ccy];
    const linkedOrderPrice = await this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue('price');

    let linkedOrderQty;
    const is = await this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).isElementPresent('quantity');

    linkedOrderQty = is ? await this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue('quantity')
                        : this.memory.quantity;

    const expectedValue = this.memory.direction === 'buy' ? (linkedOrderPrice - this.memory['order price']) * linkedOrderQty / parseFloat(marketInformation.BetPer)
                                                          : -(linkedOrderPrice - this.memory['order price']) * linkedOrderQty / parseFloat(marketInformation.BetPer);

    if (value === 'currency sign') {
      const actualPlaceholder = await this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue('ccy');
      this.expect(actualPlaceholder).to.equal(expectedPlaceholder);
    } else {
      const actualValue = await this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue('p/l');
      this.expect(parseInt(actualValue)).to.equal(expectedValue);
    }
  });

  Then(/^the '(.+)' button should be '(red|blue)' when it is clicked$/, async function(labelName, color) {
    labelName = labelName.toLowerCase();
    const expectedColorPart = color === 'red' ? '222, 69, 89' : '44, 124, 179';
    await this.basePage.currentBoard.tabBody.currentPanel.clickOnLabel(labelName);
    const actualColor = await this.basePage.currentBoard.tabBody.currentPanel.getLabelColor(labelName);
    this.expect(actualColor).to.include(expectedColorPart);
  });

  Then(/^the (?:trade|order|edit) ticket (?:standard|advanced) view panel (should|should not) contain items:$/, async function(state, table) {
    const itemNames = table.hashes().map((el) => {
      return el.itemName;
    });

    for (let i = 0; i < itemNames.length; i++) {
      const actualState = state === 'should' ? await this.basePage.currentBoard.tabBody.currentPanel.isElementPresent(itemNames[i])
                                              : await this.basePage.currentBoard.tabBody.currentPanel.isElementPresent(itemNames[i], '', false);

      state === 'should' ? this.expect(actualState).to.equal(true) : this.expect(actualState).to.equal(false);
    }
  });

  Then(/^the '(.+)' order area should contain items:$/, async function(orderType, table) {
    const itemNames = table.hashes().map((el) => {
      return el.itemName;
    });

    for (let i = 0; i < itemNames.length; i++) {
      const actualState = orderType === 'main'
        ? await this.basePage.currentBoard.tabBody.currentPanel.isElementPresent(itemNames[i], 'main')
        : await this.basePage.currentBoard.tabBody.currentPanel.isElementPresent(itemNames[i], 'oco');
      this.expect(actualState).to.equal(true);
    }
  });

  Then(/^the( main | oco | )'(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) order should contain fields:$/, async function(ticketType, orderNumber, table) {
    const itemNames = table.hashes().map((el) => {
      return el.itemName;
    });
    orderNumber = parseInt(orderNumber) - 1;
    ticketType = ticketType.trim();
    for (let i = 0; i < itemNames.length; i++) {
      const actualState = await this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).isElementPresent(itemNames[i]);
      this.expect(actualState).to.equal(true);
    }
  });

  Then(/^the [Aa]dd a stop or limit dropdown options should be:$/, async function(table) {
    let actualArray = await this.basePage.currentBoard.tabBody.currentPanel.getStopLimitDropdownOptions();
    actualArray = actualArray.map((text) => {
      return text.replace(/\s+/g, ' ');
    });
    const expectedArray = table.raw().map((el) => {
      return el[0];
    });
    this.expect(actualArray).to.deep.equal(expectedArray);
  });

  Then(/^the number of linked orders should be '(.+)'$/, async function(orderNumber) {
    const actualNumber = await this.basePage.currentBoard.tabBody.currentPanel.getNumberOfLinkedOrders();
    const expectedNumber = parseInt(orderNumber);

    this.expect(actualNumber).to.deep.equal(expectedNumber);
  });

  Then(/^'(.+)'(?:st|th|nd|rd|) applicability dropdown options should be:$/, async function(orderNumber, table) {
    orderNumber = parseInt(orderNumber) - 1;
    let actualArray = await this.basePage.currentBoard.tabBody.currentPanel.getLinkedOrder(orderNumber).getApplicabilityDropdownOptions();

    actualArray = actualArray.map((text) => {
      return text.replace(/ *\n */g, ' ');
    });
    const expectedArray = table.raw().map((el) => {
      return el[0];
    });

    this.expect(actualArray).to.deep.equal(expectedArray);
  });

  Then(/^applicability dropdown options should be:$/, async function(table) {
    let actualArray = await this.basePage.currentBoard.tabBody.currentPanel.getApplicabilityDropdownOptions();

    actualArray = actualArray.map((text) => {
      return text.replace(/ *\n */g, ' ');
    });
    const expectedArray = table.raw().map((el) => {
      return el[0];
    });

    this.expect(actualArray).to.deep.equal(expectedArray);
  });

  Then(/^'(.+)'(?:st|th|nd|rd|) option should be selected in '(.+)'(?:st|th|nd|rd|) (?:applicability|[Gg][Tt][Cc]) dropdown$/, async function(nameOrNumber, orderNumber) {
    orderNumber = parseInt(orderNumber) - 1;
    const actualApplicability = await this.basePage.currentBoard.tabBody.currentPanel.getLinkedOrder(orderNumber).getInputValue('applicability');
    const expectedApplicability = nameOrNumber;

    if (typeof expectedApplicability === 'number') {
      this.expect(this.OrderApplicabilityEnum[actualApplicability].to.equal(expectedApplicability));
    }

    this.expect(actualApplicability).to.equal(expectedApplicability);
  });

  Then(/^'(.+)'(?:st|th|nd|rd|) option should be selected in (main|oco) (?:applicability|[Gg][Tt][Cc]) dropdown$/, async function(nameOrNumber, ticketType) {
    const actualApplicability = await this.basePage.currentBoard.tabBody.currentPanel.getElementText(`${ticketType} good till dropdown`);
    const expectedApplicability = nameOrNumber;

    if (typeof expectedApplicability === 'number') {
      this.expect(this.OrderApplicabilityEnum[actualApplicability].to.equal(expectedApplicability));
    }

    this.expect(actualApplicability).to.include(expectedApplicability);
  });

  Then(/^(trade|order|oco) ticket '(.+)' element is (visible|not visible)$/, async function(ticketType, element, visibility) {
    const expectedState = visibility === 'visible';
    const actualState = await this.basePage.currentBoard.tabBody.currentPanel.isElementVisible(ticketType, element);
    this.expect(actualState).to.equal(expectedState);
  });

  Then(/^'(.+)' input value is '(.+)'$/, async function(element, value) {
    let expectedValue;
    if (value === 'correct') {
      expectedValue = this.memory[element];
    }

    const actualValue = await this.basePage.currentBoard.tabBody.currentPanel.getInputValue(element);
    this.expect(actualValue).to.equal(expectedValue);
  });

  Then(/^'(.+)'( main | oco | )order '(.+)' validation should be correct$/, async function(marketName, ticketType, field) {
    const marketInformation = await this.backendHelper.getMarketInformation(this.idMatcher.market[marketName]);
    const minSize = marketInformation.WebMinSize;
    const maxSize = marketInformation.MaxLongSize;
    let expectedPattern;
    let actualMessage;
    let promiseArr = [];
    ticketType = ticketType.trim();
    this.lightstreamer.subscribe(this.idMatcher.market[marketName]);

    if (field === 'sell price') {
      await browser.wait(() => {
        promiseArr = [];
        promiseArr.push(this.lightstreamer.addListener('Offer')
          .then((dt) => expectedPattern = `Сannot be less than or equal to ${dt.replace(/0+$/, '')}`));
        promiseArr.push(this.basePage.currentBoard.tabBody.currentPanel.getValidationMessage(ticketType, 'price')
          .then((am) => actualMessage = am));

        return Promise.all(promiseArr)
          .then(() => this.helper.sleepIfFalse(actualMessage === expectedPattern, 500));
      }, 10000)
        .catch(() => null);
    } else if (field === 'buy price') {
      await browser.wait(() => {
        promiseArr = [];
        promiseArr.push(this.lightstreamer.addListener('Bid')
          .then((dt) => expectedPattern = `Сannot be more than or equal to ${dt.replace(/0+$/, '')}`));
        promiseArr.push(this.basePage.currentBoard.tabBody.currentPanel.getValidationMessage(ticketType, 'price')
          .then((am) => actualMessage = am));

        return Promise.all(promiseArr)
          .then(() => this.helper.sleepIfFalse(actualMessage === expectedPattern, 500));
      }, 10000)
        .catch(() => null);
    } else if (field === 'min quantity') {
      expectedPattern = `Too low. Minimum ${minSize}`;
      await browser.wait(() => {
        return this.basePage.currentBoard.tabBody.currentPanel.getValidationMessage(ticketType, 'quantity')
          .then((text) => this.helper.sleepIfFalse(text === expectedPattern, 300));
      }, 5000)
        .catch(() => null);
      actualMessage = await this.basePage.currentBoard.tabBody.currentPanel.getValidationMessage(ticketType, 'quantity');
    } else if (field === 'max quantity') {
      expectedPattern = `Too high. Maximum ${maxSize}`;
      await browser.wait(() => {
        return this.basePage.currentBoard.tabBody.currentPanel.getValidationMessage(ticketType, 'quantity')
          .then((text) => this.helper.sleepIfFalse(text === expectedPattern, 300));
      }, 5000)
        .catch(() => null);
      actualMessage = await this.basePage.currentBoard.tabBody.currentPanel.getValidationMessage(ticketType, 'quantity');
    } else if (field === 'between price') {
      expectedPattern = 'Price must not be between the buy and sell price';
      actualMessage = await this.basePage.currentBoard.tabBody.currentPanel.getValidationMessage(ticketType, 'price');
    }
    this.expect(actualMessage).to.equal(expectedPattern);
  });

  Then(/^'(.+)' '(.+)'( main | oco | )'(.+)'(?:st|th|nd|rd|) (stop|limit) price validation should be correct$/, async function(direction, marketName, ticketType, orderNumber, orderType) {
    const self = this;
    const marketInformation = await self.backendHelper.getMarketInformation(this.idMatcher.market[marketName]);
    let expectedPattern;
    let expectedPrice;
    let actualMessage;
    let promiseArr = [];
    const orderPrice = self.memory['order price'];

    ticketType = ticketType.trim();
    orderNumber = orderNumber === 'default' ? orderType : orderNumber;
    orderNumber = orderNumber === 'stop'
      ? 1
      : orderNumber === 'limit'
        ? 2
        : orderNumber;

    orderNumber = parseInt(orderNumber) - 1;
    const order = await self.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber);

    function getValidPricePointsUnits(dir, price, type) {
      const betPer = parseFloat(marketInformation.BetPer);
      const minDistance = parseFloat(marketInformation.MinDistance);
      const decimals = marketInformation.PriceDecimalPlaces;
      const d = dir === 'sell' ? 1 : -1;

      const validPrice = type === 'stop'
        ? (parseFloat(price) + d * betPer * minDistance).toFixed(decimals)
        : (parseFloat(price) - d * betPer * minDistance).toFixed(decimals);

      return validPrice;
    }

    function getExpectedPattern(dir, price, type) {
      const expectedPattern1 = `Too low. Minimum price ${price.toString().replace(/0+$/, '')}`;
      const expectedPattern2 = `Too high. Maximum price ${price.toString().replace(/0+$/, '')}`;

      if (dir === 'sell' && type === 'stop') {
        return expectedPattern1;
      } else if (dir === 'sell' && type === 'limit') {
        return expectedPattern2;
      } else if (dir === 'buy' && type === 'stop') {
        return expectedPattern2;
      } else if (dir === 'buy' && type === 'limit') {
        return expectedPattern1;
      }
    }

    async function compareValidationMsg(dir, tType, oType) {
      self.lightstreamer.subscribe(self.idMatcher.market[marketName]);
      const oppositeDir = dir === 'sell' ? 'Offer' : 'Bid';
      await browser.wait(() => {
        promiseArr = [];
        promiseArr.push(self.lightstreamer.addListener(oppositeDir)
          .then((dt) => {
          expectedPrice = tType === '' ? getValidPricePointsUnits(dir, dt, oType)
            : getValidPricePointsUnits(dir, orderPrice, oType);
          expectedPattern = getExpectedPattern(dir, expectedPrice, oType);
        }));
        promiseArr.push(order.getValidationMessage()
          .then((am) => actualMessage = am));

        return Promise.all(promiseArr)
          .then(() => {
            console.log(`${actualMessage} === ${expectedPattern}`);

            return this.helper.sleepIfFalse(actualMessage === expectedPattern);
          });
      }, 20000)
        .then(() => null, () => null);
    }

    await compareValidationMsg(direction, ticketType, orderType);
    this.expect(actualMessage).to.equal(expectedPattern);
  });

  Then(/^(buy|sell) '(.+)' '(.+)'(?:st|th|nd|rd|) guaranteed stop price validation should be correct$/, async function(direction, marketName, orderNumber) {
    const self = this;
    const marketInformation = await self.backendHelper.getMarketInformation(this.idMatcher.market[marketName]);
    let expectedPattern;
    let expectedPrice;
    let actualMessage;
    let promiseArr = [];

    orderNumber = parseInt(orderNumber) - 1;
    const order = await self.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder('', orderNumber);

    function getValidPricePointsUnits(dir, price) {
      const betPer = parseFloat(marketInformation.BetPer);
      const minDistance = parseFloat(marketInformation.GuaranteedOrderMinDistance);
      const units = parseInt(marketInformation.GuaranteedOrderMinDistanceUnits); // 26 - percentage, 27 - points
      const decimals = marketInformation.PriceDecimalPlaces;
      const d = dir === 'sell' ? 1 : -1;
      let validPrice;

      if (units === 26) {
        validPrice = (parseFloat(price) * (1 + d * minDistance * 0.01)).toFixed(decimals);
      } else {
        validPrice = (parseFloat(price) + d * minDistance * betPer).toFixed(decimals);
      }

      return validPrice;
    }

    function getExpectedPattern(dir, price) {
      const expectedPattern1 = `Too low. Minimum price ${price.toString().replace(/0+$/, '')}`;
      const expectedPattern2 = `Too high. Maximum price ${price.toString().replace(/0+$/, '')}`;

      if (dir === 'sell') {
        return expectedPattern1;
      } else if (dir === 'buy') {
        return expectedPattern2;
      }
    }

    async function compareValidationMsg(dir) {
      self.lightstreamer.subscribe(self.idMatcher.market[marketName]);
      const oppositeDir = dir === 'sell' ? 'Offer' : 'Bid';
      await browser.wait(() => {
        promiseArr = [];
        promiseArr.push(self.lightstreamer.addListener(oppositeDir)
          .then((dt) => {
          expectedPrice = getValidPricePointsUnits(dir, dt);
          expectedPattern = getExpectedPattern(dir, expectedPrice);
        }));
        promiseArr.push(order.getValidationMessage()
          .then((am) => actualMessage = am));

        return Promise.all(promiseArr)
          .then(() => {
            console.log(`${actualMessage} === ${expectedPattern}`);

            return this.helper.sleepIfFalse(actualMessage === expectedPattern);
          });
      }, 20000)
        .then(() => null, () => null);
    }

    await compareValidationMsg(direction);
    this.expect(actualMessage).to.equal(expectedPattern);
  });

  Then(/^the( main | oco | )'(.+)'(?:st|th|nd|rd|) (stop|limit) max quantity validation should be correct$/, async function(ticketType, orderNumber, orderType) {
    let expectedPattern;
    let actualMessage;
    const quantity = this.memory.quantity;
    orderNumber = parseInt(orderNumber) - 1;
    ticketType = ticketType.trim();

    actualMessage = await this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getValidationMessage();
    expectedPattern = `Max for all ${orderType}s can't be greater than ${quantity}`;

    this.expect(actualMessage).to.equal(expectedPattern);
  });

  Then(/^the( main | oco | )'(.+)'(?:st|th|nd|rd|) (stop|limit) max quantity validation should be correct for '(.+)'$/, async function(ticketType, orderNumber, orderType, marketName) {
    const marketInformation = await this.backendHelper.getMarketInformation(this.idMatcher.market[marketName]);
    const minSize = marketInformation.WebMinSize;
    const maxSize = marketInformation.MaxLongSize;
    let expectedPattern;
    let actualMessage;
    let quantity = this.memory.quantity;
    if (quantity > maxSize) {
      quantity = maxSize;
    }
    orderNumber = parseInt(orderNumber) - 1;
    ticketType = ticketType.trim();

    actualMessage = await this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getValidationMessage();
    expectedPattern = `Max for all ${orderType}s can't be greater than ${quantity}`;

    this.expect(actualMessage).to.equal(expectedPattern);
  });

  Then(/^margin calculator should contain (correct information|nothing)$/, async function(expectedState) {
    let actualText: string;
    const expectedPattern = expectedState === 'nothing' ? /^$/ : /^Risking (\d+.?\d*) ([A-Z]{3}) per (\d+.?\d*) point movement\nMargin required: (\d+.?\d*) GBP\nPercentage of available funds: (\d+.?\d*)%$/;
    await browser.wait(() => {
      return this.basePage.currentBoard.tabBody.currentPanel.getMarginCalcText()
        .then((text) => {
          actualText = text;

          return this.helper.sleepIfFalse(!!actualText.match(expectedPattern));
        });
    }, 2000)
      .then(() => null, () => null);
    if (expectedState !== 'nothing') {
      const quantity = parseInt(this.memory.quantity);
      const marketSimulate = await this.backendHelper.getSimulateInformation(this.idMatcher.market[this.memory.marketName], this.memory.direction, quantity);
      const marketInfoExt = await this.backendHelper.getMarketExtendedInfo(this.idMatcher.market[this.memory.marketName]);
      const marginInfo = await this.backendHelper.getMarginInfo();

      const actRisking = parseFloat(actualText.replace(expectedPattern, '$1'));
      const actCurrency = actualText.replace(expectedPattern, '$2');
      const actPer = parseFloat(actualText.replace(expectedPattern, '$3'));
      const actMarginReq = parseFloat(actualText.replace(expectedPattern, '$4'));
      const actAvailableFunds = parseFloat(actualText.replace(expectedPattern, '$5'));

      const trailingStopConvFactor = marketInfoExt.MarketInformation.TrailingStopConversionFactor ? marketInfoExt.MarketInformation.TrailingStopConversionFactor : 1;
      const quantityConversionFactor = marketInfoExt.MarketInformation.QuantityConversionFactor;
      const betPer = marketInfoExt.MarketInformation.BetPer;
      const tradableFunds = marginInfo.TradableFunds;
      const marketTypeId = marketInfoExt.MarketInformation.MarketSettingsTypeId;

      const expRisking = quantity * trailingStopConvFactor / quantityConversionFactor;
      const expCurrency = marketTypeId === 2 ? marketInfoExt.MarketInformation.MarketCurrencyCode : 'GBP';
      const expPer = trailingStopConvFactor * betPer;
      const expMarginReq = marketSimulate.SimulatedTotalMarginRequirement;
      const expAvailableFunds = parseFloat((expMarginReq / tradableFunds * 100).toFixed(1));

      this.expect(actRisking).to.equal(expRisking);
      this.expect(actCurrency).to.equal(expCurrency);
      this.expect(actPer).to.equal(expPer);
      if (marketTypeId === 2) {
        this.expect(actMarginReq).to.equal(expMarginReq);
      } else {
        this.expect(actMarginReq).to.be.closeTo(expMarginReq, expMarginReq * 0.001);
      }
      this.expect(actAvailableFunds).to.equal(expAvailableFunds);
    }
    this.expect(actualText).to.match(expectedPattern);
  });

  Then(/^(main |oco |)'(.+)' (?:element|input) should be (active|inactive)$/, async function(ticketType, field, state) {
    field = field.toLowerCase();
    ticketType = ticketType.trim();
    const expectedState = state === 'active';
    const actualState = await this.basePage.currentBoard.tabBody.currentPanel.isElementActive(field, ticketType);
    this.expect(actualState).to.equal(expectedState);
  });

  Then(/^cursor is placed in the '(.+)' field$/, async function(elementName) {
    const elementPlaceholder = await this.basePage.currentBoard.tabBody.currentPanel.getPlaceholder(elementName);
    const focusPlaceholder = await browser.switchTo().activeElement().getAttribute('placeholder');

    this.expect(elementPlaceholder).to.be.equal(focusPlaceholder);
  });

  Then(/^the number of decimal places in (sell|buy) price button is correct for '(.+)'$/, async function(direction, marketName) {
    const marketInformation = await this.backendHelper.getMarketInformation(this.idMatcher.market[marketName]);
    const decimals = marketInformation.PriceDecimalPlaces;
    const price = await this.basePage.currentBoard.tabBody.currentPanel.getPrice(direction);
    this.expect(price.split('.')[1].length).to.equal(decimals);
  });

  Then(/^the( main | oco | )'(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) order '(.+)' (?:field|element) should have (red|blue) color$/, async function(ticketType, orderNumber, fieldName, expectedColor) {
    orderNumber = parseInt(orderNumber) - 1;
    ticketType = ticketType.trim();
    let actualColor = await this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getBorderColor(fieldName);
    if (fieldName === 'p/l border') {
      actualColor = await this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getCssValue(fieldName, 'border-right-color');
    }
    const colors = {
      red: '208, 1, 27'
    };
    this.expect(actualColor).to.include(colors[expectedColor]);
  });

  Then(/^the( main | oco | )order '(.+)' field should have (red|blue|no) color$/, async function(ticketType, fieldName, expectedColor) {
    ticketType = ticketType.trim();
    let actualColor = await this.basePage.currentBoard.tabBody.currentPanel.getCssValue(fieldName, ticketType, 'border-color');
    if (expectedColor === 'no') {
      actualColor = await this.basePage.currentBoard.tabBody.currentPanel.getCssValue(fieldName, ticketType, 'border');
    }
    const colors = {
      red: '208, 1, 27',
      no: 'none'
    };
    this.expect(actualColor).to.include(colors[expectedColor]);
  });
});
