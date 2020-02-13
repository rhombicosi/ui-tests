import { browser, element, by, ElementFinder, protractor } from 'protractor';
import { DealTicketPanel } from '../panels/deal-ticket-panel';
import { ChartPanel } from '../panels/chart-panel';
import { SearchModal } from '../modal-dialogues/search-modal';
import { MarketRow } from '../elements/market';
import { helper } from '../../utils/helper';

import * as _ from 'lodash';

const constructors = {
  'deal ticket': DealTicketPanel,
  chart: ChartPanel
};

export class BrowseTab {
  private data = {
    tags: {
      title: by.css('.markets-tags__title'),
      'tags list': by.css('.markets-tags__list'),
      tagsItem: by.css('.markets-tags__item')
    },
    content: {
      'tag name': by.css('.market-tag-information__name'),
      typesDropdown: by.css('.'),
      types: by.css('.market-tag-information__product-types'),
      filters: by.css('.markets-filter'),
      filterTab: by.css('.markets-filter__tab'),
      allFilters: by.css('.markets-filter__tab.ng-star-inserted:not(.markets-filter__tab--hidden)'),
      moreDropdown: by.css('.markets-filter__tab-dropdown'),
      moreDropdownContent: by.css('.markets-filter .dropdown__content'),
      moreDropdownFilters: by.css('.dropdown__link.ng-star-inserted'),
      moreDropdownLink: by.css('.dropdown__link'),
      'product type filter': by.tagName('app-product-type-filter'),
      'no results': by.css('.browse-page__no-results')
    },
    'product type filter': {
      root: by.tagName('app-product-type-filter'),
      expander: by.css('.product-types__list'),
      'dropdown icon': by.css('.icon-triangle-down'),
      'selected type': by.css('.product-types__list'),
      dropdown: by.css('.product-types__dropdown'),
      items: by.css('.product-types__dropdown-item'),
      'include options toggle': by.css('.product-types__dropdown-options-toggle'),
      'toggle status': by.css('.product-types__dropdown-options-toggle .slide-toggle--status')
    },
    table: {
      'markets table': by.css('.browse-page__table'),
      'table scroll': by.css('.scroll'),
      'search input': by.css('.table-markets__search-box'),
      'search icon': by.css('.table-markets__search-box-head-cell>.icon-search'),
      'close icon': by.css('.icon-close'),
      'no results': by.css('.browse-page__no-results'),
      'vertical scroll': by.tagName('virtual-scroll'),
      market: {
        root: by.tagName('app-market-search-table-row'),
        price: by.css('.price'),
        name: by.tagName('app-market-search-table-row .name'),
      },
      'market names': by.tagName('app-market-search-table-row .name'),
      'loading spinner': by.tagName('app-loading-spinner'),
    }
  };

  get tags() {
    const self = this;

    return {
      async getCategories() {
        const tags = await element(self.data.tags['tags list']).waitReady(15000);
        const text = await tags.getText();

        return text.split('\n').map((t) => t.trim()).filter(t => t);
      },

      selectMarketCategoryByName(name) {
        return element(by.cssContainingText('.markets-tags__item', name)).click();
      },

      async isElementVisible(elementName) {
        const tagElement = await element(self.data.tags[elementName]).waitReady(3000);

        return tagElement.isDisplayed();
      }
    };
  }

  get filterTabs() {
    const self = this;

    return {
      getMarketSubtags(tags, categoryName) {
        return tags.filter(a => a.Name === categoryName).map(a => a.Children)[0];
      },

      async selectTabByName(name) {
        const el = await element(by.cssContainingText('.markets-filter__tab', name)).waitReady(5000);
        await el.click();
      },

      async getMarketTabs() {
        const textArr: any = await element.all(self.data.content.filterTab).getText();

        return textArr.map(t => t.trim());
      },

      isMoreDropdownPresent() {
        return element(self.data.content.moreDropdown).isPresent();
      },

      async isMoreDropdownHidden() {
        const is = await element(self.data.content.moreDropdownContent).getAttribute('class');

        return is.includes('hide');
      },

      async expandFiltersDropdown() {
        const dropdown = await element(self.data.content.moreDropdown).waitReady(5000);

        return dropdown.click();
      },

      async getFiltersDropdownContent() {
        const textArr: any = await element.all(self.data.content.moreDropdownLink).getText();

        return textArr.map(t => t.trim());
      },

      async isElementVisible(elementName) {
        const filterElement = await element(self.data.content[elementName]).waitReady(5000);

        return filterElement.isDisplayed();
      },

      async selectFilterFromMoreDropdown(subtagName) {
        const subtag = await element.all(self.data.content.moreDropdownLink).filter((subtags) => {
          return subtags.getText()
            .then((text) => {
              return text.trim().toLowerCase() === subtagName.toLowerCase();
            });
        }).first();

        return subtag.click();
      }
    };
  }

  get marketTable() {
    const self = this;

    return {
      getSearchModal() {
        const root = element(self.data.table['markets table']);

        return new SearchModal(root);
      },

      async getSearchText(textType: string) {
        const input = await element(self.data.table['search input']).waitReady(5000);

        return input.getAttribute(textType);
      },

      async fillInputWithValue(value) {
        const val = await element(self.data.table['search input']).waitReady(5000);
        await val.clear();

        return val.sendKeys(value);
      },

      async clearSearchInput() {
        const searchInput = await element(self.data.table['search input']).waitReady(5000);
        await searchInput.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'));
        await searchInput.sendKeys(protractor.Key.DELETE);
      },

      async clickSearchElement(name) {
        const searchElement = await element(self.data.table[name]).waitReady(3000);
        await browser.actions().mouseMove(searchElement).mouseDown().mouseUp().perform()
          .then(() => null, () => console.log('actions error'));
      },

      async isElementVisible(elementName) {
        const tableElement = await element(self.data.table[elementName]).waitReady(10000);

        return tableElement.isDisplayed();
      },

      async marketsTableWait() {
        await element(self.data.table['table scroll']).waitReady(60000);
      },

      async waitForLoading() {
        await element(self.data.table['loading spinner']).waitReady(1000)
          .then((el) => el.waitMissing(20000), () => null);
        await helper.sleep(200);
      },

      getMarket(nameOrNumber) {

        let marketRoot: ElementFinder;

        if (typeof nameOrNumber === 'number') {
          marketRoot = element.all(self.data.table.market.root).get(nameOrNumber);
        } else {
          marketRoot = element.all(self.data.table.market.root).filter((el) => {
            return el.element(self.data.table.market.name).getText()
              .then((text) => {
                return text.toLowerCase().trim() === nameOrNumber.toLowerCase();
              });
          }).first();
        }

        return new MarketRow(marketRoot);
      }
    };

  }

  get productType() {
    const self = this;

    return {
      async getProductType() {
        return element(self.data['product type filter']['selected type']).getText();
      },

      async isElementVisible(elementName) {
        const el = element(self.data['product type filter'][elementName]);
        await el.waitReady(2000);

        return el.isDisplayed();
      },

      async expandCollapseDropdown() {
        return element(self.data['product type filter']['dropdown icon']).click();
      },

      async getDropdownContent() {
        return element.all(self.data['product type filter'].items).getText();
      },

      async selectType(typeName) {
        const subtag = await element.all(self.data['product type filter'].items).filter((types) => {
          return types.getText()
            .then((text) => {
              return text.trim().toLowerCase() === typeName.toLowerCase();
            });
        }).first();

        return subtag.click();
      },

      async isOptionsIncluded() {
        await element(self.data['product type filter']['toggle status']).waitPresent(2000);
        const elementClass = await element(self.data['product type filter']['toggle status']).getAttribute('class');

        return elementClass.includes('on');
      }
    };
  }

  sortByWeighting(tags) {
    return tags.sort((a, b) => b.Weighting - a.Weighting).map(a => a.Name);
  }

  groupByWeighting(tags) {
    const grouped = _.mapValues(_.groupBy(tags, 'Weighting'),
    clist => clist.map(t => _.omit(t, 'Weighting')));

    return grouped;
  }

  sortByName(group) {
    return group.map(a => a.Name.toLowerCase()).sort();
  }

  getMarketTagId(tags, filterName) {
    return tags.filter(a => a.Name === filterName).map(a => a.MarketTagId)[0];
  }

  async isElementDisplayed(elementName) {
    const elements = {
      'markets filter tabs': element(this.data.content.filters),
      'product type dropdown': element(this.data['product type filter'].dropdown)
    };

    await elements[elementName].waitPresent(3000);
    const elementClass = await elements[elementName].getAttribute('class');

    return !elementClass.includes('hide');
  }

  async isElementPresent(elementName) {
    const elements = {
      'markets filter dropdown': element(this.data.content.moreDropdown),
      'drop down content': element(this.data.content.moreDropdownContent),
      'product type filter': element(this.data.content['product type filter']),
      'markets filter tabs': element(this.data.content.filters),
      'product type dropdown': element(this.data['product type filter'].dropdown),
      'no results': element(this.data.content['no results'])
    };
    if (elementName === 'markets filter dropdown') {
      element(this.data.content.types).scrollIntoView();
    }

    return elements[elementName].waitPresent(10000).then(() => true, () => false);
  }

  async isElementActive(elementName, filterName) {
    const elements = {
      'filter tab': element(by.cssContainingText('.markets-filter__tab', filterName)),
      category: element(by.cssContainingText('.markets-tags__item', filterName))
    };
    const elementClass = await elements[elementName].getAttribute('class');

    return elementClass.includes('active');
  }

  async getDisplayedFilters(filtersLocation) {
    const locator = filtersLocation === 'more dropdown'
      ? this.data.content.moreDropdownFilters
      : this.data.content.allFilters;
    const filters = await element.all(locator).map((elem) => elem.getText());

    return filters.map((value: string) => value.toLowerCase());
  }

  async getNameFilter(positionNumber: number, filterLocation?: string) {
    const locator = filterLocation === 'more dropdown'
      ? this.data.content.moreDropdownFilters
      : this.data.content.allFilters;

    return (await element.all(locator).get(positionNumber).getText()).trim();
  }

  async clickElement(elementName) {
    const elements = {
      'markets filter dropdown': element(this.data.content.moreDropdown),
      'some market filter' : element.all(this.data.content.moreDropdownFilters).get(0),
      'include options toggle': element(this.data['product type filter']['include options toggle'])
    };
    await browser.actions().mouseMove(elements[elementName]).perform()
      .then(() => null, () => console.log('actions error'));
    await elements[elementName].waitReady(2000);
    await elements[elementName].click();
  }

}
