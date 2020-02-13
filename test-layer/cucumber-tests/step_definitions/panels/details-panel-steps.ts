/* tslint:disable:max-line-length */
import { defineSupportCode } from 'cucumber';


defineSupportCode(function({ Given, When, Then }) {
  When(/^I click on the value of '(.+)'(?:st|th|nd|rd|) row$/, async function(rowNameOrNumber) {
    if (parseInt(rowNameOrNumber)) {
      rowNameOrNumber = rowNameOrNumber - 1;
    }

    await this.basePage.currentBoard.tabBody.currentPanel.getRow(rowNameOrNumber).clickOnValue();
  });

  Then(/^market name should be '(.+)'$/, async function(expectedName) {
    if (expectedName === 'correct') {
      expectedName = this.memory.marketName;
    }

    const actualName = await this.basePage.currentBoard.tabBody.currentPanel.getMarketName();

    this.expect(actualName).to.equal(expectedName);
  });

  Then(/^'(.+)'(?:st|th|nd|rd|) (row|history row) should contain '(.*)' (?:word|data)$/, async function(rowNameOrNumber, rowType, expectedValue) {
    if (parseInt(rowNameOrNumber)) {
      rowNameOrNumber = rowNameOrNumber - 1;
    }
    if (expectedValue === 'correct') {
      if (rowNameOrNumber === 'Margin Requirement') {
        const marketSimulate = await this.backendHelper.getSimulateInformation(this.idMatcher.market[this.memory.marketName], this.memory.direction, this.memory.quantity);
        expectedValue = marketSimulate.ActualTotalMarginRequirement !== 0 ? marketSimulate.ActualTotalMarginRequirement.toString() : '';
      }
    }
    let actualValue: string;
    if (rowType === 'history row') {
      actualValue = await this.basePage.currentBoard.tabBody.currentPanel.getRow(rowNameOrNumber).getHistoryValue();
    } else {
      actualValue = await this.basePage.currentBoard.tabBody.currentPanel.getRow(rowNameOrNumber).getValue();
    }

    this.expect(actualValue).to.equal(expectedValue);
  });

  Then(/^'(Date changed|Date opened)' row should contain correct date$/, async function(dateType) {
    const isPosition = dateType === 'Date opened';
    const actualDate = await this.basePage.currentBoard.tabBody.currentPanel.getRow(dateType).getValue();
    const dateFromBackend = await this.backendHelper.getBackendMultiDataByName(this.memory.marketName, 'LastChangedDateTimeUTC', isPosition);
    const expectedDate = this.moment(dateFromBackend[0]).utc().format('DD/MM/YYYY hh:mm:ss A (UTC)');

    this.expect(actualDate).to.equal(expectedDate);
  });

  Then(/^'Order ID' row should contain correct ID(?: for (trade|stop\/limit)|)$/, async function(orderType) {
    const isPosition = orderType === 'trade';
    let actualID = await this.basePage.currentBoard.tabBody.currentPanel.getRow('Order ID').getValue();
    actualID = parseInt(actualID);
    const idFromBackend = await this.backendHelper.getBackendMultiDataByName(this.memory.marketName, 'OrderId', isPosition);
    const expectedID = idFromBackend[0];

    this.expect(actualID).to.equal(expectedID);
  });

  Then(/^'(.+)' row should contain correct '(.+)' data form history$/, async function(rowName, dataType) {
    let actualValue = await this.basePage.currentBoard.tabBody.currentPanel.getRow(rowName).getHistoryValue();

    let expectedValue = this.memory.history[dataType];
    if (dataType === 'ExecutedDateTimeUtc') {
      expectedValue = this.moment(expectedValue).utc().format('DD/MM/YYYY hh:mm:ss A (UTC)');
    }
    if (dataType === 'OrderId' || dataType === 'TriggerPrice') {
      actualValue = parseInt(actualValue);
    }

    this.expect(actualValue).to.equal(expectedValue);
  });
});
