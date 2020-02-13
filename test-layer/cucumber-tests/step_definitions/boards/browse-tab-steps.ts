/* tslint:disable:max-line-length */
import * as _ from 'lodash';
import { defineSupportCode } from 'cucumber';
import { browser } from 'protractor';


defineSupportCode(function({ Given, When, Then }) {
  When(/^I select '(.+)' market category$/, async function(categoryName) {
    this.memory.category = categoryName;
    await this.basePage.currentBoard.tabBody.browse.tags.selectMarketCategoryByName(categoryName);
  });

  When(/^I select '(.+)' filter tab$/, async function(filterName) {
    await this.basePage.currentBoard.tabBody.browse.filterTabs.selectTabByName(filterName);
  });

  When(/^'(.+)' markets category (has|has no) children$/, async function(category, status) {
    const categories = await this.backendHelper.getTagLookup();
    const children = this.basePage.currentBoard.tabBody.browse.filterTabs.getMarketSubtags(categories, category);

    status === 'has'
      ? this.expect(children.length).to.be.at.least(1)
      : this.expect(children.length).to.equal(0);
  });

  When(/^I wait for browse page markets loading$/, async function() {
    await this.basePage.currentBoard.tabBody.browse.marketTable.waitForLoading();
  });

  When(/^I fill browse page search text field with value '(.+)'$/, async function(value) {
    await this.basePage.currentBoard.tabBody.browse.marketTable.fillInputWithValue(value);
  });

  When(/^I click '(.+)' in (browse page search|markets filter tab|more dropdown|product types dropdown)$/, async function(elementName, elementLocation) {
    elementLocation === 'browse page search' ? await this.basePage.currentBoard.tabBody.browse.marketTable.clickSearchElement(elementName) :
      await this.basePage.currentBoard.tabBody.browse.clickElement(elementName);
  });

  When(/^I select '(.+)' (?:market filter|subtag) from more dropdown$/, async function(filterName) {
    this.memory.selectedFilter = filterName;
    const visibleFilters = await this.basePage.currentBoard.tabBody.browse.getDisplayedFilters();
    this.memory.lastVisibleFilter = visibleFilters[visibleFilters.length - 1];
    if (await this.basePage.currentBoard.tabBody.browse.filterTabs.isMoreDropdownHidden()) {
      await this.basePage.currentBoard.tabBody.browse.filterTabs.expandFiltersDropdown();
    }
    // this.memory.moreExpanded ? await console.log('more dropdown already expanded')
    //   : await this.basePage.currentBoard.tabBody.browse.filterTabs.expandFiltersDropdown();
    await this.basePage.currentBoard.tabBody.browse.filterTabs.selectFilterFromMoreDropdown(filterName);
  });

  When(/^I clear browse search text$/, async function() {
    await this.basePage.currentBoard.tabBody.browse.marketTable.clearSearchInput();
  });

  When(/^I (?:expand|collapse) product type dropdown$/, async function() {
    await this.basePage.currentBoard.tabBody.browse.productType.expandCollapseDropdown();
  });

  When(/^I select '(.+)' from product type dropdown$/, async function(type) {
    await this.basePage.currentBoard.tabBody.browse.productType.selectType(type);
  });

  Then(/^all markets categories are displayed and ordered by weighting$/, async function() {
    const currentCategories = await this.basePage.currentBoard.tabBody.browse.tags.getCategories();
    const categories = await this.backendHelper.getTagLookup();
    const expectedCategories = await this.basePage.currentBoard.tabBody.browse.sortByWeighting(categories);

    this.expect(currentCategories).to.deep.equal(expectedCategories);
  });

  Then(/^'(.+)' (?:are|is) (hidden|displayed)$/, async function(elementName, status) {
    const actualStatus = await this.basePage.currentBoard.tabBody.browse.isElementPresent(elementName);
    this.memory.allMarketFilters = await this.basePage.currentBoard.tabBody.browse.getDisplayedFilters();

    const state = status === 'displayed';
    this.expect(actualStatus).to.equal(state);
  });

  Then(/^'(.+)' (is|is not) present$/, async function(elementName, status) {
    const actualStatus = await this.basePage.currentBoard.tabBody.browse.isElementPresent(elementName);
    const state = status === 'is';
    if (elementName === 'markets filter dropdown' && state) {
      this.memory.partialMarketFilters = await this.basePage.currentBoard.tabBody.browse.getDisplayedFilters();
    }
    this.expect(actualStatus).to.equal(state);
  });


  Then(/^(not | )all markets filter items are displayed in markets filter tabs$/, async function(status) {
    const actualStatus = _.isEqual(this.memory.allMarketFilters, this.memory.partialMarketFilters);
    const state = !status.includes('not');
    this.expect(actualStatus).to.equal(state);
  });

  Then(/^not displayed markets in markets filter tab are present in expanded more dropdown$/, async function() {
    const difMarketFilters = this.memory.allMarketFilters.slice(this.memory.partialMarketFilters.length);
    this.memory.moreDropdownMarketFilters = difMarketFilters;
    const marketFiltersMoreDropdown = await this.basePage.currentBoard.tabBody.browse.getDisplayedFilters('more dropdown');
    const actualStatus = _.isEqual(difMarketFilters, marketFiltersMoreDropdown);
    this.expect(actualStatus).to.equal(true);
  });

  Then(/^'(.+)' (filters panel|more dropdown) contains correct tabs ordered by weighting$/, async function(category, tagsSet) {
    const categories = await this.backendHelper.getTagLookup();
    let expectedTabs = await this.basePage.currentBoard.tabBody.browse.filterTabs.getMarketSubtags(categories, category);
    expectedTabs = await this.basePage.currentBoard.tabBody.browse.sortByWeighting(expectedTabs);

    let actualTabs = await this.basePage.currentBoard.tabBody.browse.filterTabs.getMarketTabs();

    let links;

    const present = await this.basePage.currentBoard.tabBody.browse.filterTabs.isMoreDropdownPresent();
    if ( present ) {
      if (await this.basePage.currentBoard.tabBody.browse.filterTabs.isMoreDropdownHidden()) {
        await this.basePage.currentBoard.tabBody.browse.filterTabs.expandFiltersDropdown();
      }

      links = await this.basePage.currentBoard.tabBody.browse.filterTabs.getFiltersDropdownContent();
      actualTabs.splice(-1);
      actualTabs = actualTabs.filter(t => t).concat(links.map(c => c.toUpperCase()));
    }

    if (tagsSet === 'more dropdown') {
      actualTabs = links.map(c => c.toUpperCase());
      expectedTabs = expectedTabs.filter(tabs => true === links.some( b => tabs === b));
    }
    this.memory.leftmostTab = expectedTabs[0];
    this.expect(actualTabs.map(c => c.toUpperCase())).to.deep.equal(expectedTabs.map(c => c.toUpperCase()));
  });

  Then(/^'(.+)' markets (filter tab|category) should be active$/, async function(filterName, elementName) {
    if (filterName === 'leftmost') {
      filterName = this.memory.leftmostTab;
    }
    const status = await this.basePage.currentBoard.tabBody.browse.isElementActive(elementName, filterName);
    elementName === 'category' ? this.memory.category = filterName : this.memory.subcategory = filterName;
    this.expect(status).to.equal(true);
  });

  Then(/^'(.+)' (filter tab|category) search list contains correct markets ordered by weighting$/, async function(filterName, elementName) {
    if (filterName === 'leftmost') {
      filterName = this.memory.leftmostTab;
    }

    const categories = await this.backendHelper.getTagLookup();
    let tagId;
    let expectedMarketsList;
    let actualMarketsList;

    if (elementName === 'category') {
      tagId = await this.basePage.currentBoard.tabBody.browse.getMarketTagId(categories, filterName);
    } else if (elementName === 'filter tab') {
      const children = await this.basePage.currentBoard.tabBody.browse.filterTabs.getMarketSubtags(categories, this.memory.category);
      tagId = await this.basePage.currentBoard.tabBody.browse.getMarketTagId(children, filterName);
    }
    expectedMarketsList = await this.backendHelper.getMarketsInformation(tagId, 150, this.memory.includeOptions);
    const group = await this.basePage.currentBoard.tabBody.browse.groupByWeighting(expectedMarketsList);

    const keys = Object.keys(group);
    const sortedGroup = [];
    for (let i = keys.length - 1; i >= 0; i--) {
      const b = await this.basePage.currentBoard.tabBody.browse.sortByName(group[keys[i]]);
      sortedGroup.push(b);
    }

    expectedMarketsList = sortedGroup.reduce(
      (accumulator, currentValue) => {
        return accumulator.concat(currentValue);
      },
      []
    );
    expectedMarketsList = expectedMarketsList.map(a => a.trim());

    await this.basePage.currentBoard.tabBody.browse.marketTable.marketsTableWait();
    actualMarketsList = await this.basePage.currentBoard.tabBody.browse.marketTable.getSearchModal().getAllMarketsTitles();
    actualMarketsList = actualMarketsList.map(a => a.toLowerCase());
    actualMarketsList.forEach((actualMarket) => this.expect(expectedMarketsList).to.include(actualMarket));
  });

  Then(/^'(.+)' markets filter tab should be displayed on '(.+)'(?:st|th|nd|rd|) position$/, async function(filterName, positionNumber) {
    if (filterName === 'current') {
      filterName = this.memory.selectedFilter;
    }
    if (positionNumber === 'last') {
      positionNumber = (await this.basePage.currentBoard.tabBody.browse.getDisplayedFilters()).length;
    }
    const actualFilterName = await this.basePage.currentBoard.tabBody.browse.getNameFilter(parseInt(positionNumber) - 1);
    this.expect(actualFilterName).to.equal(filterName.toUpperCase());
  });

  Then(/^markets filter dropdown contains previously the last visible market filter tab$/, async function() {
    if (await this.basePage.currentBoard.tabBody.browse.filterTabs.isMoreDropdownHidden()) {
      await this.basePage.currentBoard.tabBody.browse.filterTabs.expandFiltersDropdown();
    }
    const actualDropdownFilters = await this.basePage.currentBoard.tabBody.browse.getDisplayedFilters('more dropdown');
    this.expect(actualDropdownFilters).to.include(this.memory.lastVisibleFilter);
  });

  Then(/^the browse page '(.+)' section should contain items:$/, async function(section, table) {
    const itemNames = table.hashes().map((el) => {
      return el.itemName;
    });
    let actualState;
    for (let i = 0; i < itemNames.length; i++) {
      if (section === 'markets') {
        actualState = await this.basePage.currentBoard.tabBody.browse.tags.isElementVisible(itemNames[i]);
      } else if (section === 'filter tabs') {
        actualState = await this.basePage.currentBoard.tabBody.browse.filterTabs.isElementVisible(itemNames[i]);
      } else if (section === 'product type dropdown') {
        actualState = await this.basePage.currentBoard.tabBody.browse.productType.isElementVisible(itemNames[i]);
      } else {
        actualState = await this.basePage.currentBoard.tabBody.browse.marketTable.isElementVisible(itemNames[i]);
      }

      this.expect(actualState).to.equal(true);
    }
  });

  Then(/^browse page search text input '(placeholder|value)' should be '(.+)'$/, async function(textType, expectedText) {
    const actualText = await this.basePage.currentBoard.tabBody.browse.marketTable.getSearchText(textType);
    this.expect(actualText).to.equal(expectedText.trim());
  });

  Then(/^'(.+)' (filter tab|category) '(.+)' query returns correct markets ordered by weighting$/,
    async function(filterName, elementName, query) {
    const categories = await this.backendHelper.getTagLookup();
    let actualMarketsList;
    let tagId;
    let expectedMarketsList;

    if (elementName === 'category') {
      tagId = await this.basePage.currentBoard.tabBody.browse.getMarketTagId(categories, filterName);
    } else if (elementName === 'filter tab') {
      const children = await this.basePage.currentBoard.tabBody.browse.filterTabs.getMarketSubtags(categories, this.memory.category);
      tagId = await this.basePage.currentBoard.tabBody.browse.getMarketTagId(children, filterName);
    }
    expectedMarketsList = await this.backendHelper.getMarketsNamesByQuery(tagId, 150, query, true, true, false);
    const group = await this.basePage.currentBoard.tabBody.browse.groupByWeighting(expectedMarketsList);
    const keys = Object.keys(group);
    const sortedGroup = [];
    for (let i = keys.length - 1; i >= 0; i--) {
      const b = await this.basePage.currentBoard.tabBody.browse.sortByName(group[keys[i]]);
      sortedGroup.push(b);
    }

    expectedMarketsList = sortedGroup.reduce(
      (accumulator, currentValue) => {
        return accumulator.concat(currentValue);
      },
      []
    );

    await this.basePage.currentBoard.tabBody.browse.marketTable.marketsTableWait();
    actualMarketsList = await this.basePage.currentBoard.tabBody.browse.marketTable.getSearchModal().getAllMarketsTitles();
    actualMarketsList = actualMarketsList.map(a => a.toLowerCase());

    actualMarketsList.forEach((actualMarket) => this.expect(expectedMarketsList).to.include(actualMarket));
  });

  Then(/^browse page '(.+)' market '(.+)' should update according to market status$/, async function(marketName, type) {
    this.lightstreamer.subscribe(this.idMatcher.market[marketName]);
    const status = await this.lightstreamer.addListener('StatusSummary');

    const timeWait = status === '4' ? 20000 : 40000;

    await this.basePage.currentBoard.tabBody.browse.marketTable.getMarket(marketName).scrollTo();

    const market = await this.basePage.currentBoard.tabBody.browse.marketTable.getMarket(marketName);
    const data = await market.getPrice(type);

    const actualState = await browser.wait(() => {
      return market.getPrice(type)
        .then((text) => this.helper.sleepIfFalse(text !== data, 1000));
    }, timeWait)
      .then(() => true, () => false);

    const expectedState = status === '0';
    this.expect(actualState).to.equal(expectedState);
  });

  //
  // TODO: product types filter
  //

  Then(/^'(.+)' product type filter is selected$/, async function(productType) {
    const actualType = await this.basePage.currentBoard.tabBody.browse.productType.getProductType();
    this.expect(actualType.toLowerCase()).to.equal(productType.toLowerCase());
  });

  Then(/^product type filters dropdown contains correct items$/, async function() {
    const actualItems = await this.basePage.currentBoard.tabBody.browse.productType.getDropdownContent();

    this.expect(actualItems.map(i => i.toLowerCase())).to.deep.equal(['All', 'Spreads', 'CFDs'].map(i => i.toLowerCase()));
  });

  Then(/^'(.+)' product type filter for '(.+)' (filter tab|category) returns correct markets ordered by weighting$/,
    async function(type, filterName, elementName) {
    const categories = await this.backendHelper.getTagLookup();
    let actualMarketsList;
    let tagId;
    let expectedMarketsList;

    if (elementName === 'category') {
      tagId = await this.basePage.currentBoard.tabBody.browse.getMarketTagId(categories, filterName);
    } else if (elementName === 'filter tab') {
      const children = await this.basePage.currentBoard.tabBody.browse.filterTabs.getMarketSubtags(categories, this.memory.category);
      tagId = await this.basePage.currentBoard.tabBody.browse.getMarketTagId(children, filterName);
    }
    if (!this.memory.includeOptions) {
      this.memory.includeOptions = false;
    }

    const spreads = type === 'Spreads' || type === 'All';
    const cfds = type === 'CFDs' || type === 'All';

    expectedMarketsList = await this.backendHelper.getMarketsNamesByQuery(tagId, 150, '', spreads, cfds, this.memory.includeOptions);
    const group = await this.basePage.currentBoard.tabBody.browse.groupByWeighting(expectedMarketsList);
    const keys = Object.keys(group);
    const sortedGroup = [];
    for (let i = keys.length - 1; i >= 0; i--) {
      const b = await this.basePage.currentBoard.tabBody.browse.sortByName(group[keys[i]]);
      sortedGroup.push(b);
    }

    expectedMarketsList = sortedGroup.reduce(
      (accumulator, currentValue) => {
        return accumulator.concat(currentValue);
      },
      []
    );

    await this.basePage.currentBoard.tabBody.browse.marketTable.marketsTableWait();
    actualMarketsList = await this.basePage.currentBoard.tabBody.browse.marketTable.getSearchModal().getAllMarketsTitles();
    actualMarketsList = actualMarketsList.map(a => a.toLowerCase());

    actualMarketsList.forEach((actualMarket) => this.expect(expectedMarketsList).to.include(actualMarket));
  });

  Then(/^options included toggle is (on|off)$/, async function(state) {
    const actualState = await this.basePage.currentBoard.tabBody.browse.productType.isOptionsIncluded();
    const expectedState = state === 'on';
    this.memory.includeOptions = state === 'on' ? true : false;
    this.expect(actualState).to.equal(expectedState);
  });

});
