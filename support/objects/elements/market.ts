import { browser, element, by, ElementFinder, protractor } from 'protractor';
import { helper } from '../../utils/helper';


export class MarketRow {
  protected container: ElementFinder;
  protected data = {
    name: by.css('.market-name,.name'),
    position: by.css('.position'),
    unrealised: by.css('.unrealised'),
    'bid price': by.xpath('.//td[contains(@class,"price")][1]'),
    'ask price': by.xpath('.//td[contains(@class,"price")][2]'),
    date: by.css('.date'),
    price: by.css('.price'),
    type: by.css('.type'),
    status: by.css('.status'),
    'realised profit/loss': by.css('.realised'),
    'last-edit': by.css('.last-edit'),
    'opening price': by.css('.opening-price'),
    'current price': by.css('.current-price'),
    'order price': by.css('.trigger-price'),
    'stop price': by.css('.stop'),
    'limit price': by.css('.limit'),
    delete: by.css('.delete'),
    close: by.css('.close-market'),
    'delete confirm': by.css('.delete .close-single-confirm'),
    'delete cancel': by.css('.delete .close-market-cancel'),
    'sell hover container': by.css('.sell>.hover-container'),
    'buy hover container': by.css('.buy>.hover-container'),
    sell: by.css('.sell'),
    'sell on browse': by.css('.price--sell.clickable-price'),
    buy: by.css('.buy'),
    'buy on browse': by.css('.price--buy.clickable-price'),
    change: by.css('.change'),
    high: by.css('.high'),
    low: by.css('.low'),
    spread: by.css('.spread'),
    quantity: by.css('.quantity'),
    'dropdown arrow': by.css('.icon-triangle-down'),
    'squares icon': by.css('.icon-productpage'),
    'dropdown menu': by.tagName('ul'),
    row: by.css('.watchlist-market-row'),
    actions: by.css('.actions'),
    'edit icon': by.css('app-active-order-market .icon-edit'),
    multi: {
      'plus icon': by.css('.expand'),
      'close icon': by.css('.collapse'),
      submarkets: by.css('.open-position-market__sub-item-row,.active-order-market__sub-item-row')
    }
  };

  constructor(container: ElementFinder) {
    this.container = container;
  }

  async getId() {
    return (await this.container.getAttribute('marketid')).trim();
  }

  async click(on: string) {
    on = on.toLocaleLowerCase();
    try {
      await this.container.scrollIntoView();
      await this.container.hover();
      await this.container.all(this.data[on]).get(0).click();
    } catch (err) {
      await helper.sleep(500);
      await this.container.scrollIntoView();
      await this.container.hover();
      await this.container.all(this.data[on]).get(0).click();
    }
  }

  async getMarketElement() {
    await this.container.waitPresent(5000);

    return this.container.element(this.data.row);
  }

  async getName(scroll = true) {
    await this.container.waitPresent(5000);
    if (scroll) {
      await this.container.scrollIntoView();
    }

    return (await this.container.all(this.data.name).get(0).getText()).trim();
  }

  async getText(on) {
    await this.container.waitPresent(5000);
    await this.container.scrollIntoView();
    await browser.wait(() => {
      return this.container.all(this.data[on]).get(0).getText()
        .then((text) => text.trim() !== '—', () => false)
        .then((is) => helper.sleepIfFalse(is, 1000));
    }, 20000);

    return (await this.container.all(this.data[on]).get(0).getText()).trim();
  }

  async getPrice(type) {
    await this.container.waitPresent(5000);
    await browser.wait(() => {
      return this.container.all(this.data[type]).get(0).getText()
        .then((text) => text.trim() !== '—', () => false)
        .then((is) => helper.sleepIfFalse(is, 1000));
    }, 20000);

    return (await this.container.all(this.data[type]).get(0).getText()).trim();
  }

  async getUnrealisedColor() {
    await this.container.all(this.data.unrealised).get(0).element(by.css('.open-position-market__currency')).waitReady(15000);

    return this.container.all(this.data.unrealised).get(0).element(by.css('.open-position-market__currency')).getCssValue('color');
  }

  async getPositionColor() {
    await this.container.element(by.css('.rectangle')).waitReady(3000);

    return this.container.element(by.css('.rectangle')).getCssValue('background-color');
  }

  async hover() {
    await this.container.waitPresent(5000);
    await this.container.scrollIntoView();
    await this.container.hover();
  }

  async scrollTo() {
    await this.container.waitPresent(15000);
    await this.container.scrollIntoView();
  }

  hoverElement(type) {
    type = type.toLowerCase();

    return this.container.element(this.data[type]).hover();
  }

  async getRowColor() {
    const cls = (await this.container.getAttribute('class')).trim();
    const tagName = (await this.container.getTagName()).trim();
    if (cls.includes('history-body__item')) {
      return this.container.getCssValue('background-color');
    } else if (tagName === 'app-market-search-table-row') {
      return this.container.element(by.css('.table__row-body')).getCssValue('background-color');
    } else {
      return this.container.element(by.css('.at-market-row,.watchlist-market-row')).getCssValue('background-color');
    }
  }

  getSubItemRowColor() {
    return this.container.getCssValue('background-color');
  }

  getElementColor(type: string) {
    type = type.toLowerCase();

    const input = {
      sell: this.data['sell hover container'],
      'sell on browse': this.data['sell on browse'],
      buy: this.data['buy hover container'],
      'buy on browse': this.data['buy on browse'],
    };

    return this.container.element(input[type]).getCssValue('background-color');
  }

  isElementVisible(name) {
    return this.container.all(this.data[name]).get(0).isDisplayed();
  }

  async getDropdownOptions() {
    const textArr: any = await this.container.all(this.data['dropdown menu']).get(0).all(by.tagName('li')).getText();

    return textArr.map(t => t.trim().replace(/\s+/g, ' '));
  }

  selectDropdownOption(nameOrNumber) {
    let option;
    if (typeof nameOrNumber === 'number') {
      option = this.container.all(this.data['dropdown menu']).get(0).all(by.tagName('li')).get(nameOrNumber);
    } else {
      option = this.container.all(this.data['dropdown menu']).get(0).all(by.tagName('li')).filter((opt) => {
        return opt.getText()
          .then((text) => {
            return text.toLowerCase().trim().replace(/ *\n */g, ' ') === nameOrNumber.toLowerCase();
          });
      }).first();
    }

    return option.click();
  }

  async isOptionEnabled(nameOrNumber) {
    let option;
    if (typeof nameOrNumber === 'number') {
      option = this.container.all(this.data['dropdown menu']).get(0).all(by.tagName('li')).get(nameOrNumber);
    } else {
      option = this.container.all(this.data['dropdown menu']).get(0).all(by.tagName('li')).filter((opt) => {
        return opt.getText()
          .then((text) => {
            return text.toLowerCase().trim().replace(/ *\n */g, ' ') === nameOrNumber.toLowerCase();
          });
      }).first();
    }
    const cls = await option.getAttribute('class');

    return !cls.includes('link--disabled');
  }

  async completeDropdownWithOption(nameOrNumber) {
    let option;
    if (typeof nameOrNumber === 'number') {
      option = this.container.all(this.data['dropdown menu']).get(0).all(by.tagName('li')).get(nameOrNumber);
    } else {
      option = this.container.all(this.data['dropdown menu']).get(0).all(by.tagName('li')).filter((opt) => {
        return opt.getText()
          .then((text) => {
            return text.toLowerCase().trim().replace(/ *\n */g, ' ') === nameOrNumber.toLowerCase();
          });
      }).first();
    }

    if (process.env.npm_config_browser.includes('safari')) {
      await browser.actions().mouseMove(this.container.element(by.css('.market-name'))).perform();
    }
    await this.hover(); // TODO: sometimes hover is not working
    try {
      await this.container.element(this.data['dropdown arrow']).click();
      await option.waitReady(2000);
    } catch (err) {
      await helper.sleep(500);
      await this.container.element(this.data['dropdown arrow']).click();
      await option.waitReady(2000);
    }
    await option.click().then(null, () => {
      return helper.sleep(1000)
        .then(() => option.click());
    });
  }

  async isMulti() {
    let isMult = false;
    const plusIcon = await this.container.element(this.data.multi['plus icon']).isPresent();
    const closeIcon = await this.container.element(this.data.multi['close icon']).isPresent();
    const submarketsCount = await this.container.all(this.data.multi.submarkets).count();
    if (plusIcon || closeIcon || submarketsCount > 0) {
      isMult = true;
    }

    return isMult;
  }

  async expand() {
    await this.container.element(this.data.multi['plus icon']).click()
      .then(null, (err) => {
        console.log('Market is not amalgamated or has been already expanded');
      });
  }

  async collapse() {
    await this.container.element(this.data.multi['close icon']).click()
      .then(null, (err) => {
        console.log('Market is not amalgamated or has been already collapsed');
      });
  }

  async isExpanded() {
    const isMulti = await this.isMulti();
    if (isMulti) {
      return this.container.element(this.data.multi['close icon']).isPresent();
    }
  }

  getSubMarket(num) {
    const marketRoot = this.container.all(this.data.multi.submarkets).get(num);

    return new MarketRow(marketRoot);
  }

  getSubMarketsCount() {
    return this.container.all(this.data.multi.submarkets).count();
  }

  async getSubMarketsText(on) {
    const textArr: any = await this.container.all(this.data.multi.submarkets).all(this.data[on]).getText();

    return textArr.map(t => t.trim());
  }

  get actionsMenu() {
    const data = {
      root: by.tagName('app-add-to-watchlist'),
      'new watchlist': by.css('.new-watchlist'),
      'new watchlist input': by.css('.adding-new-block input'),
      watchlist: by.css('.watchlist-item'),
      'confirmation icon': by.css('.icon-confirmation')
    };
    let root = this.container.element(data.root);

    return {
      isVisible() {
        return browser.wait(() => root.isDisplayed(), 1000);
      },

      isNewWatchlistVisible() {
        return element(data['new watchlist']).isDisplayed();
      },

      isWatchListPresent(watchlistName) {
        watchlistName = watchlistName.toLowerCase();
        const watchlist = root.all(data.watchlist).filter((list) => {
          return list.getText()
            .then((text) => text.toLowerCase().trim() === watchlistName);
        }).first();

        return watchlist.isDisplayed()
          .then((is) => is, async() => {
            await helper.sleep(1000);

            return watchlist.isDisplayed();
          });
      },
      isConfirmationIconVisible(watchlistName) {
        watchlistName = watchlistName.toLowerCase();

        return root.all(data.watchlist).filter((list) => {
          return list.getText()
            .then((text) => text.toLowerCase().trim() === watchlistName);
        }).first().element(data['confirmation icon']).waitReady(2000)
          .then(() => true, () => false);
      },
      async addNewWatchlist(watchlistName, location?: string) {
        watchlistName = watchlistName.toLowerCase();
        if (location.includes('menu')) {
          root = await element(by.css('.menu app-add-to-watchlist'));
        }
        let watchlistCount: number;
        await root.waitReady(5000);
        watchlistCount = await root.all(data.watchlist).count();
        await root.element(data['new watchlist']).click();
        await root.element(data['new watchlist input']).clear();
        await root.element(data['new watchlist input']).sendKeys(watchlistName);
        await root.element(data['new watchlist input']).sendKeys(protractor.Key.ENTER);
        await browser.wait(() => {
          return root.all(data.watchlist).count()
            .then((count) => helper.sleepIfFalse(count === watchlistCount + 1));
        }, 3000);
      },
      addMarketToWatchlist(watchlistName) {
        watchlistName = watchlistName.toLowerCase();

        return root.all(data.watchlist).filter((list) => {
          return list.getText()
            .then((text) => text.toLowerCase().trim() === watchlistName);
        }).first().click();
      }
    };
  }

}

