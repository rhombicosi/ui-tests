import * as _ from 'lodash';
import { protractor, browser, by, element, ElementFinder } from 'protractor';
import { Panel } from './panel';
import { helper } from '../../utils/helper';


export class ChartPanel extends Panel {
  private data = {
    iframeRoot: by.tagName('app-chart-wrapper iframe'),
    draggableButtons: by.tagName('.tv-floating-toolbar__drag.js-drag'),
    'chart table': by.tagName('.layout__area--center'),
    chartBody: by.tagName('.chart-markup-table.pane'),
    marketSearchInput: by.css('input.symbol-edit'),
    marketSearchResults: by.css('table.symbol-edit-popup'),
    marketNameLabel: by.css('span.pane-legend-line.apply-overflow-tooltip.main'),
    'price axis': by.tagName('.chart-markup-table.price-axis'),
    'add icon': by.tagName('.pane-controls.toppane'),
    menu: {
      'close chart': by.css('.menu__item.close'),
      'add to workspace': by.cssContainingText('.menu__item > div > div', 'Add to Workspace'),
      workspaceDropdownContent: by.css('.workspaces__item-name'),
      'add to watchlist': by.cssContainingText('.menu__item > div > div', 'Add to Watchlist'),
      'new watchlist': by.css('.menu .new-watchlist'),
      watchlistDropdownContent: by.css('.menu .watchlists.ng-star-inserted > .watchlist-item.ng-star-inserted'),
      'market 360': by.css('.menu__item.product-page'),
      'price alert': by.css('.menu__item.alert')
    },
    buttons: {
      sell: by.tagName('.tv-trading-toolbar__bs-button.tv-trading-toolbar__bs-button--sell.apply-common-tooltip'),
      buy: by.tagName('.tv-trading-toolbar__bs-button.tv-trading-toolbar__bs-button--buy.apply-common-tooltip'),
      price: by.tagName('.tv-trading-toolbar__value.js-value')
    }
  };

  constructor(panelRoot: ElementFinder) {
    super(panelRoot);
    this.name = 'Chart';
  }

  async isElementPresent(elementName) {
    const locators = {
      chart: this.data.iframeRoot
    };

    return element(locators[elementName]).isPresent();
  }

  async isChartVisible() {
    await element(this.data.iframeRoot).waitReady(3000);
    await browser.switchTo().frame(element(this.data.iframeRoot).getWebElement());
    await element(this.data.chartBody).waitReady(10000);
    const is = await element(this.data.chartBody).isPresent();
    await browser.switchTo().defaultContent();

    return is;
  }

  async switchMarket(marketName: string) {
    await element(this.data.iframeRoot).waitReady(5000);
    await browser.switchTo().frame(element(this.data.iframeRoot).getWebElement());
    await element(this.data.marketSearchInput).waitReady(10000);
    await element(this.data.marketSearchInput).clear();
    await element(this.data.marketSearchInput).sendKeys(marketName);
    await element(this.data.marketSearchResults).waitReady(4000);
    await element(this.data.marketSearchInput).sendKeys(protractor.Key.DOWN);
    await element(this.data.marketSearchInput).sendKeys(protractor.Key.ENTER);
    await browser.switchTo().defaultContent();
  }

  async getMarketNameLabelText(isOnIframe?: string) {
    if (isOnIframe) {
      await element(this.data.iframeRoot).waitReady(5000);
      await browser.switchTo().frame(element(this.data.iframeRoot).getWebElement());
    } else {
      await this.container.element(this.data.iframeRoot).waitReady(5000);
      await browser.switchTo().frame(this.container.element(this.data.iframeRoot).getWebElement());
    }
    await helper.sleep(2000);
    const text = (await element(this.data.marketNameLabel).getText()).trim();
    await browser.switchTo().defaultContent();

    return text;
  }

  async isChartElementVisibleOnMouseHover(chartElement: string) {
    chartElement = chartElement.trim();
    await element(this.data.iframeRoot).waitReady(6000);
    await browser.switchTo().frame(element(this.data.iframeRoot).getWebElement());
    await element(this.data.chartBody).waitReady(2000);
    await element(this.data.chartBody).hover();
    const is = await element(this.data[chartElement]).isPresent();
    await browser.switchTo().defaultContent();

    return is;
  }

  async isElementEnable(chartElement) {
    await element(this.data.iframeRoot).waitReady(6000);
    await browser.switchTo().frame(element(this.data.iframeRoot).getWebElement());
    await element(this.data.chartBody).waitReady(2000);
    chartElement = chartElement.includes('button')
      ? await element(this.data.buttons[`${chartElement.trim().split(' ')[0]}`])
      : await element(this.data[`${chartElement.trim()}`]);
    const is = await chartElement.isEnabled();
    await browser.switchTo().defaultContent();

    return is;
  }

  async getButtonBackground(buttonName) {
    buttonName = buttonName.trim().split(' ')[0];
    await element(this.data.iframeRoot).waitReady(6000);
    await browser.switchTo().frame(element(this.data.iframeRoot).getWebElement());
    await element(this.data.chartBody).waitReady(2000);
    const color = await element(this.data.buttons[buttonName]).getCssValue('background-color');
    await browser.switchTo().defaultContent();

    return color;
  }

  async isElementInsideChart(includedElement) {
    await element(this.data.iframeRoot).waitReady(6000);
    await browser.switchTo().frame(element(this.data.iframeRoot).getWebElement());
    await element(this.data.chartBody).waitReady(2000);

    includedElement = includedElement.includes('button')
      ? await element(this.data.buttons[`${includedElement.trim().split(' ')[0]}`])
      : await element(this.data[`${includedElement.trim()}`]);
    const coordinates = await this.getCoordinates(includedElement, await element(this.data['chart table']));
    await browser.switchTo().defaultContent();

    return this.isValueBetween(coordinates.x) && this.isValueBetween(coordinates.y);
  }

  private async getCoordinates(includedElement: ElementFinder, containerElement: ElementFinder) {
    const includedElementLocation = await includedElement.getLocation();
    const containerLocation = await containerElement.getLocation();
    const containerSize = await containerElement.getSize();

    return {
      x: {
        value: includedElementLocation.x,
        lowerValue: containerLocation.x,
        upperValue: containerLocation.x + containerSize.width
      },
      y: {
        value: includedElementLocation.y,
        lowerValue: containerLocation.y,
        upperValue: containerLocation.y + containerSize.height
      }
    };
  }

  private isValueBetween({value, lowerValue, upperValue}) {
    return value >= lowerValue && value <= upperValue;
  }

  async moveSellBuyButtons() {
    await element(this.data.iframeRoot).waitReady(6000);
    await browser.switchTo().frame(element(this.data.iframeRoot).getWebElement());
    await element(this.data.chartBody).waitReady(2000);
    const sellBuyButtons = await element(this.data.draggableButtons);
    sellBuyButtons.waitReady(2000);
    await this.dragAndDropBasedOnChart(sellBuyButtons, {x: 200, y: 200 });
    await browser.switchTo().defaultContent();
  }

  async dragAndDropBasedOnChart(elem: ElementFinder, location: {x, y}) {
    const chart = await element(this.data['chart table']);
    chart.waitReady(2000);

    return browser.actions().mouseMove(elem).mouseDown().mouseMove(chart, location).mouseUp().perform()
      .then(() => null, () => console.log('actions error'));
  }

  async clickOnChartPrice(direction: string) {
    await element(this.data.iframeRoot).waitReady(6000);
    await browser.switchTo().frame(element(this.data.iframeRoot).getWebElement());
    await element(this.data.chartBody).waitReady(2000);
    const chartElement = await element(this.data.buttons[`${direction.trim()}`]);
    await chartElement.element(this.data.buttons.price).waitReady(5000);
    // await chartElement.hover();
    await chartElement.click();
    await browser.switchTo().defaultContent();
  }

  async clickOnElement(elem: string) {
    await element(this.data.menu[elem]).scrollToAndClick();
  }

  async getElementFromDropdownByText(elementText: string) {
    let result;
    if (elementText.includes('Workspace')) {
      result = element.all(this.data.menu.workspaceDropdownContent).filter((elem) => {
        return elem.getText()
          .then((text) => {
            return text.trim() === elementText;
          });
      }).first();
    } else {
      result = element.all(this.data.menu.watchlistDropdownContent).filter((elem) => {
        return elem.getText()
          .then((text) => {
            return text.trim() === elementText;
          });
      }).first();
    }

    return result;
  }

  async addChartTo(elementNameForAdding) {
    const elementForAdding: ElementFinder = await this.getElementFromDropdownByText(elementNameForAdding);
    await elementForAdding.waitReady(5000);
    await elementForAdding.click();
  }

  async waitForElementsDisappeared(elementsName: string) {
    elementsName = elementsName.toLowerCase();
    const locator = elementsName.includes('workspace')
      ? this.data.menu.workspaceDropdownContent
      : this.data.menu.watchlistDropdownContent;

    await element.all(locator).waitForDisappeared();
  }

  async isElementVisible(elementName) {
    const locators = {
      'workspace dropdown': this.data.menu.workspaceDropdownContent,
      'watchlist dropdown': this.data.menu.watchlistDropdownContent
    };

    return element(locators[elementName]).isDisplayed();
  }

  async getDropdownOptions(elementsName) {
    const locator = elementsName === 'workspaces'
      ? this.data.menu.workspaceDropdownContent
      : this.data.menu.watchlistDropdownContent;

    return element.all(locator).map((elem) => elem.getText());
  }

  async waitForChartLoading() {
    await this.container.element(this.data['add icon']).waitReady(4000)
      .then((el) => el.waitMissing(2000), () => null);
    await this.container.element(this.data.buttons.sell).element(this.data.buttons.price).waitReady(4000)
      .then((el) => el.waitMissing(2000), () => null);
    await this.container.element(this.data.buttons.buy).element(this.data.buttons.price).waitReady(4000)
      .then((el) => el.waitMissing(2000), () => null);
    await helper.sleep(200);
  }
}
