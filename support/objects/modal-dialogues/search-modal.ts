import { browser, element, by, ElementFinder, protractor } from 'protractor';
import { MarketRow } from '../elements/market';
import { helper } from '../../utils/helper';


export class SearchModal {
  protected container: ElementFinder;
  protected data = {
    header: by.css('.market-search-modal__showing-panel'),
    markets: by.tagName('app-market-search-table-row'),
    'market names': by.tagName('app-market-search-table-row .name'),
    'browse markets': by.css('.market-search-modal__footer'),
    'loading spinner': by.css('.loader'),
    'result header': by.css('.search-results__column--header'),
    'product type list': by.css('.product-types__list span'),
    'product type filter': {
      root: by.tagName('app-product-type-filter'),
      label: by.css('.product-types__list span'),
      dropdown: by.css('.product-types__dropdown'),
      items: by.css('.product-types__dropdown-item'),
      toggle: by.css('.product-types__dropdown-options-toggle')
    },
    'filter items': by.css('.market-filters__item')
  };

  constructor(container = element(by.css('.market-search-modal'))) {
    this.container = container;
  }

  async getHeaderBackground() {
    await this.container.element(this.data.header).waitReady(3000);

    return this.container.element(this.data.header).getCssValue('background-color');
  }

  isVisible() {
    return this.container.waitReady(3000)
      .then(() => true, () => false);
  }

  async isElementVisible(name) {
    return this.container.element(this.data[name]).waitReady(3000)
      .then(() => true, () => false);
  }

  async getElementText(name) {
    const el = await this.container.element(this.data[name]).waitReady(3000);

    return (await el.getText()).trim();
  }

  getMarket(nameOrNumber) {
    let marketRoot: ElementFinder;
    if (typeof nameOrNumber === 'number') {
      marketRoot = this.container.all(this.data.markets).get(nameOrNumber);
    } else {
      marketRoot = element.all(this.data.markets).filter((el) => {
        return el.element(by.css('.name')).getText()
          .then((text) => {
            return text.toLowerCase().trim() === nameOrNumber.toLowerCase();
          });
      }).first();
    }

    return new MarketRow(marketRoot);
  }

  getMarketsCount() {
    return this.container.all(this.data.markets).count();
  }

  async getAllMarketsTitles() {
    const textArr: any = await this.container.all(this.data['market names']).getText();

    return textArr.map(t => t.trim());
  }

  async click(on: string) {
    on = on.toLowerCase();
    const el = await this.container.element(this.data[on]).waitReady(3000);
    await el.click();
  }

  async waitForMarketsLoading() {
    await this.container.element(this.data['loading spinner']).waitReady(2000)
      .then((el) => el.waitMissing(20000), () => null);
    await helper.sleep(200);
  }

  async selectProductTypeFilter(optionName) {
    optionName = optionName.toLowerCase();
    await this.container.element(this.data['product type filter'].label).click();
    const el = await this.container.element(this.data['product type filter'].dropdown).waitReady(3000);
    await el.all(this.data['product type filter'].items).filter((option) => {
      return option.getText()
        .then((text) => text.toLowerCase().trim() === optionName);
    }).first().click();
  }

  async setIncludeOptions(state: string) {
    const antiState = state.toLowerCase() === 'on' ? 'off' : 'on';
    if (state !== 'on' && state !== 'off') {
      throw new Error('Wrong state. Should be "on" or "off".');
    }
    await this.container.element(this.data['product type filter'].label).click();
    const el = await this.container.element(this.data['product type filter'].dropdown).waitReady(3000);
    await el.element(by.css(`.${antiState}`)).click()
      .then(null, () => {
        console.log(`Include option is already in "${state}" state`);
      });
  }

  selectMarketFilter(optionName) {
    optionName = optionName.toLowerCase();

    return this.container.all(this.data['filter items']).filter((item) => {
      return item.getText()
        .then((text) => text.toLowerCase().trim() === optionName);
    }).first().click();
  }

}

