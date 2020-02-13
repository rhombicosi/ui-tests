"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:max-line-length */
var _ = require("lodash");
var cucumber_1 = require("cucumber");
var protractor_1 = require("protractor");
cucumber_1.defineSupportCode(function (_a) {
    var Given = _a.Given, When = _a.When, Then = _a.Then;
    When(/^I select '(.+)' market category$/, function (categoryName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.memory.category = categoryName;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.tags.selectMarketCategoryByName(categoryName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I select '(.+)' filter tab$/, function (filterName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.filterTabs.selectTabByName(filterName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^'(.+)' markets category (has|has no) children$/, function (category, status) {
        return __awaiter(this, void 0, void 0, function () {
            var categories, children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.backendHelper.getTagLookup()];
                    case 1:
                        categories = _a.sent();
                        children = this.basePage.currentBoard.tabBody.browse.filterTabs.getMarketSubtags(categories, category);
                        status === 'has'
                            ? this.expect(children.length).to.be.at.least(1)
                            : this.expect(children.length).to.equal(0);
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I wait for browse page markets loading$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.marketTable.waitForLoading()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I fill browse page search text field with value '(.+)'$/, function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.marketTable.fillInputWithValue(value)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I click '(.+)' in (browse page search|markets filter tab|more dropdown|product types dropdown)$/, function (elementName, elementLocation) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(elementLocation === 'browse page search')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.marketTable.clickSearchElement(elementName)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.clickElement(elementName)];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        _a;
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I select '(.+)' (?:market filter|subtag) from more dropdown$/, function (filterName) {
        return __awaiter(this, void 0, void 0, function () {
            var visibleFilters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.memory.selectedFilter = filterName;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.getDisplayedFilters()];
                    case 1:
                        visibleFilters = _a.sent();
                        this.memory.lastVisibleFilter = visibleFilters[visibleFilters.length - 1];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.filterTabs.isMoreDropdownHidden()];
                    case 2:
                        if (!_a.sent()) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.filterTabs.expandFiltersDropdown()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: 
                    // this.memory.moreExpanded ? await console.log('more dropdown already expanded')
                    //   : await this.basePage.currentBoard.tabBody.browse.filterTabs.expandFiltersDropdown();
                    return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.filterTabs.selectFilterFromMoreDropdown(filterName)];
                    case 5:
                        // this.memory.moreExpanded ? await console.log('more dropdown already expanded')
                        //   : await this.basePage.currentBoard.tabBody.browse.filterTabs.expandFiltersDropdown();
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I clear browse search text$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.marketTable.clearSearchInput()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I (?:expand|collapse) product type dropdown$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.productType.expandCollapseDropdown()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I select '(.+)' from product type dropdown$/, function (type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.productType.selectType(type)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^all markets categories are displayed and ordered by weighting$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentCategories, categories, expectedCategories;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.tags.getCategories()];
                    case 1:
                        currentCategories = _a.sent();
                        return [4 /*yield*/, this.backendHelper.getTagLookup()];
                    case 2:
                        categories = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.sortByWeighting(categories)];
                    case 3:
                        expectedCategories = _a.sent();
                        this.expect(currentCategories).to.deep.equal(expectedCategories);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' (?:are|is) (hidden|displayed)$/, function (elementName, status) {
        return __awaiter(this, void 0, void 0, function () {
            var actualStatus, _a, state;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.isElementPresent(elementName)];
                    case 1:
                        actualStatus = _b.sent();
                        _a = this.memory;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.getDisplayedFilters()];
                    case 2:
                        _a.allMarketFilters = _b.sent();
                        state = status === 'displayed';
                        this.expect(actualStatus).to.equal(state);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' (is|is not) present$/, function (elementName, status) {
        return __awaiter(this, void 0, void 0, function () {
            var actualStatus, state, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.isElementPresent(elementName)];
                    case 1:
                        actualStatus = _b.sent();
                        state = status === 'is';
                        if (!(elementName === 'markets filter dropdown' && state)) return [3 /*break*/, 3];
                        _a = this.memory;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.getDisplayedFilters()];
                    case 2:
                        _a.partialMarketFilters = _b.sent();
                        _b.label = 3;
                    case 3:
                        this.expect(actualStatus).to.equal(state);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^(not | )all markets filter items are displayed in markets filter tabs$/, function (status) {
        return __awaiter(this, void 0, void 0, function () {
            var actualStatus, state;
            return __generator(this, function (_a) {
                actualStatus = _.isEqual(this.memory.allMarketFilters, this.memory.partialMarketFilters);
                state = !status.includes('not');
                this.expect(actualStatus).to.equal(state);
                return [2 /*return*/];
            });
        });
    });
    Then(/^not displayed markets in markets filter tab are present in expanded more dropdown$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            var difMarketFilters, marketFiltersMoreDropdown, actualStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        difMarketFilters = this.memory.allMarketFilters.slice(this.memory.partialMarketFilters.length);
                        this.memory.moreDropdownMarketFilters = difMarketFilters;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.getDisplayedFilters('more dropdown')];
                    case 1:
                        marketFiltersMoreDropdown = _a.sent();
                        actualStatus = _.isEqual(difMarketFilters, marketFiltersMoreDropdown);
                        this.expect(actualStatus).to.equal(true);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' (filters panel|more dropdown) contains correct tabs ordered by weighting$/, function (category, tagsSet) {
        return __awaiter(this, void 0, void 0, function () {
            var categories, expectedTabs, actualTabs, links, present;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.backendHelper.getTagLookup()];
                    case 1:
                        categories = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.filterTabs.getMarketSubtags(categories, category)];
                    case 2:
                        expectedTabs = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.sortByWeighting(expectedTabs)];
                    case 3:
                        expectedTabs = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.filterTabs.getMarketTabs()];
                    case 4:
                        actualTabs = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.filterTabs.isMoreDropdownPresent()];
                    case 5:
                        present = _a.sent();
                        if (!present) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.filterTabs.isMoreDropdownHidden()];
                    case 6:
                        if (!_a.sent()) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.filterTabs.expandFiltersDropdown()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.filterTabs.getFiltersDropdownContent()];
                    case 9:
                        links = _a.sent();
                        actualTabs.splice(-1);
                        actualTabs = actualTabs.filter(function (t) { return t; }).concat(links.map(function (c) { return c.toUpperCase(); }));
                        _a.label = 10;
                    case 10:
                        if (tagsSet === 'more dropdown') {
                            actualTabs = links.map(function (c) { return c.toUpperCase(); });
                            expectedTabs = expectedTabs.filter(function (tabs) { return true === links.some(function (b) { return tabs === b; }); });
                        }
                        this.memory.leftmostTab = expectedTabs[0];
                        this.expect(actualTabs.map(function (c) { return c.toUpperCase(); })).to.deep.equal(expectedTabs.map(function (c) { return c.toUpperCase(); }));
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' markets (filter tab|category) should be active$/, function (filterName, elementName) {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (filterName === 'leftmost') {
                            filterName = this.memory.leftmostTab;
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.isElementActive(elementName, filterName)];
                    case 1:
                        status = _a.sent();
                        elementName === 'category' ? this.memory.category = filterName : this.memory.subcategory = filterName;
                        this.expect(status).to.equal(true);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' (filter tab|category) search list contains correct markets ordered by weighting$/, function (filterName, elementName) {
        return __awaiter(this, void 0, void 0, function () {
            var categories, tagId, expectedMarketsList, actualMarketsList, children, group, keys, sortedGroup, i, b;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (filterName === 'leftmost') {
                            filterName = this.memory.leftmostTab;
                        }
                        return [4 /*yield*/, this.backendHelper.getTagLookup()];
                    case 1:
                        categories = _a.sent();
                        if (!(elementName === 'category')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.getMarketTagId(categories, filterName)];
                    case 2:
                        tagId = _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(elementName === 'filter tab')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.filterTabs.getMarketSubtags(categories, this.memory.category)];
                    case 4:
                        children = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.getMarketTagId(children, filterName)];
                    case 5:
                        tagId = _a.sent();
                        _a.label = 6;
                    case 6: return [4 /*yield*/, this.backendHelper.getMarketsInformation(tagId, 150, this.memory.includeOptions)];
                    case 7:
                        expectedMarketsList = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.groupByWeighting(expectedMarketsList)];
                    case 8:
                        group = _a.sent();
                        keys = Object.keys(group);
                        sortedGroup = [];
                        i = keys.length - 1;
                        _a.label = 9;
                    case 9:
                        if (!(i >= 0)) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.sortByName(group[keys[i]])];
                    case 10:
                        b = _a.sent();
                        sortedGroup.push(b);
                        _a.label = 11;
                    case 11:
                        i--;
                        return [3 /*break*/, 9];
                    case 12:
                        expectedMarketsList = sortedGroup.reduce(function (accumulator, currentValue) {
                            return accumulator.concat(currentValue);
                        }, []);
                        expectedMarketsList = expectedMarketsList.map(function (a) { return a.trim(); });
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.marketTable.marketsTableWait()];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.marketTable.getSearchModal().getAllMarketsTitles()];
                    case 14:
                        actualMarketsList = _a.sent();
                        actualMarketsList = actualMarketsList.map(function (a) { return a.toLowerCase(); });
                        actualMarketsList.forEach(function (actualMarket) { return _this.expect(expectedMarketsList).to.include(actualMarket); });
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' markets filter tab should be displayed on '(.+)'(?:st|th|nd|rd|) position$/, function (filterName, positionNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var actualFilterName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (filterName === 'current') {
                            filterName = this.memory.selectedFilter;
                        }
                        if (!(positionNumber === 'last')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.getDisplayedFilters()];
                    case 1:
                        positionNumber = (_a.sent()).length;
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.getNameFilter(parseInt(positionNumber) - 1)];
                    case 3:
                        actualFilterName = _a.sent();
                        this.expect(actualFilterName).to.equal(filterName.toUpperCase());
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^markets filter dropdown contains previously the last visible market filter tab$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            var actualDropdownFilters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.filterTabs.isMoreDropdownHidden()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.filterTabs.expandFiltersDropdown()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.getDisplayedFilters('more dropdown')];
                    case 4:
                        actualDropdownFilters = _a.sent();
                        this.expect(actualDropdownFilters).to.include(this.memory.lastVisibleFilter);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the browse page '(.+)' section should contain items:$/, function (section, table) {
        return __awaiter(this, void 0, void 0, function () {
            var itemNames, actualState, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemNames = table.hashes().map(function (el) {
                            return el.itemName;
                        });
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < itemNames.length)) return [3 /*break*/, 11];
                        if (!(section === 'markets')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.tags.isElementVisible(itemNames[i])];
                    case 2:
                        actualState = _a.sent();
                        return [3 /*break*/, 9];
                    case 3:
                        if (!(section === 'filter tabs')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.filterTabs.isElementVisible(itemNames[i])];
                    case 4:
                        actualState = _a.sent();
                        return [3 /*break*/, 9];
                    case 5:
                        if (!(section === 'product type dropdown')) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.productType.isElementVisible(itemNames[i])];
                    case 6:
                        actualState = _a.sent();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.marketTable.isElementVisible(itemNames[i])];
                    case 8:
                        actualState = _a.sent();
                        _a.label = 9;
                    case 9:
                        this.expect(actualState).to.equal(true);
                        _a.label = 10;
                    case 10:
                        i++;
                        return [3 /*break*/, 1];
                    case 11: return [2 /*return*/];
                }
            });
        });
    });
    Then(/^browse page search text input '(placeholder|value)' should be '(.+)'$/, function (textType, expectedText) {
        return __awaiter(this, void 0, void 0, function () {
            var actualText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.marketTable.getSearchText(textType)];
                    case 1:
                        actualText = _a.sent();
                        this.expect(actualText).to.equal(expectedText.trim());
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' (filter tab|category) '(.+)' query returns correct markets ordered by weighting$/, function (filterName, elementName, query) {
        return __awaiter(this, void 0, void 0, function () {
            var categories, actualMarketsList, tagId, expectedMarketsList, children, group, keys, sortedGroup, i, b;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.backendHelper.getTagLookup()];
                    case 1:
                        categories = _a.sent();
                        if (!(elementName === 'category')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.getMarketTagId(categories, filterName)];
                    case 2:
                        tagId = _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(elementName === 'filter tab')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.filterTabs.getMarketSubtags(categories, this.memory.category)];
                    case 4:
                        children = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.getMarketTagId(children, filterName)];
                    case 5:
                        tagId = _a.sent();
                        _a.label = 6;
                    case 6: return [4 /*yield*/, this.backendHelper.getMarketsNamesByQuery(tagId, 150, query, true, true, false)];
                    case 7:
                        expectedMarketsList = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.groupByWeighting(expectedMarketsList)];
                    case 8:
                        group = _a.sent();
                        keys = Object.keys(group);
                        sortedGroup = [];
                        i = keys.length - 1;
                        _a.label = 9;
                    case 9:
                        if (!(i >= 0)) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.sortByName(group[keys[i]])];
                    case 10:
                        b = _a.sent();
                        sortedGroup.push(b);
                        _a.label = 11;
                    case 11:
                        i--;
                        return [3 /*break*/, 9];
                    case 12:
                        expectedMarketsList = sortedGroup.reduce(function (accumulator, currentValue) {
                            return accumulator.concat(currentValue);
                        }, []);
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.marketTable.marketsTableWait()];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.marketTable.getSearchModal().getAllMarketsTitles()];
                    case 14:
                        actualMarketsList = _a.sent();
                        actualMarketsList = actualMarketsList.map(function (a) { return a.toLowerCase(); });
                        actualMarketsList.forEach(function (actualMarket) { return _this.expect(expectedMarketsList).to.include(actualMarket); });
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^browse page '(.+)' market '(.+)' should update according to market status$/, function (marketName, type) {
        return __awaiter(this, void 0, void 0, function () {
            var status, timeWait, market, data, actualState, expectedState;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lightstreamer.subscribe(this.idMatcher.market[marketName]);
                        return [4 /*yield*/, this.lightstreamer.addListener('StatusSummary')];
                    case 1:
                        status = _a.sent();
                        timeWait = status === '4' ? 20000 : 40000;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.marketTable.getMarket(marketName).scrollTo()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.marketTable.getMarket(marketName)];
                    case 3:
                        market = _a.sent();
                        return [4 /*yield*/, market.getPrice(type)];
                    case 4:
                        data = _a.sent();
                        return [4 /*yield*/, protractor_1.browser.wait(function () {
                                return market.getPrice(type)
                                    .then(function (text) { return _this.helper.sleepIfFalse(text !== data, 1000); });
                            }, timeWait)
                                .then(function () { return true; }, function () { return false; })];
                    case 5:
                        actualState = _a.sent();
                        expectedState = status === '0';
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    //
    // TODO: product types filter
    //
    Then(/^'(.+)' product type filter is selected$/, function (productType) {
        return __awaiter(this, void 0, void 0, function () {
            var actualType;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.productType.getProductType()];
                    case 1:
                        actualType = _a.sent();
                        this.expect(actualType.toLowerCase()).to.equal(productType.toLowerCase());
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^product type filters dropdown contains correct items$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            var actualItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.productType.getDropdownContent()];
                    case 1:
                        actualItems = _a.sent();
                        this.expect(actualItems.map(function (i) { return i.toLowerCase(); })).to.deep.equal(['All', 'Spreads', 'CFDs'].map(function (i) { return i.toLowerCase(); }));
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' product type filter for '(.+)' (filter tab|category) returns correct markets ordered by weighting$/, function (type, filterName, elementName) {
        return __awaiter(this, void 0, void 0, function () {
            var categories, actualMarketsList, tagId, expectedMarketsList, children, spreads, cfds, group, keys, sortedGroup, i, b;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.backendHelper.getTagLookup()];
                    case 1:
                        categories = _a.sent();
                        if (!(elementName === 'category')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.getMarketTagId(categories, filterName)];
                    case 2:
                        tagId = _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(elementName === 'filter tab')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.filterTabs.getMarketSubtags(categories, this.memory.category)];
                    case 4:
                        children = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.getMarketTagId(children, filterName)];
                    case 5:
                        tagId = _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!this.memory.includeOptions) {
                            this.memory.includeOptions = false;
                        }
                        spreads = type === 'Spreads' || type === 'All';
                        cfds = type === 'CFDs' || type === 'All';
                        return [4 /*yield*/, this.backendHelper.getMarketsNamesByQuery(tagId, 150, '', spreads, cfds, this.memory.includeOptions)];
                    case 7:
                        expectedMarketsList = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.groupByWeighting(expectedMarketsList)];
                    case 8:
                        group = _a.sent();
                        keys = Object.keys(group);
                        sortedGroup = [];
                        i = keys.length - 1;
                        _a.label = 9;
                    case 9:
                        if (!(i >= 0)) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.sortByName(group[keys[i]])];
                    case 10:
                        b = _a.sent();
                        sortedGroup.push(b);
                        _a.label = 11;
                    case 11:
                        i--;
                        return [3 /*break*/, 9];
                    case 12:
                        expectedMarketsList = sortedGroup.reduce(function (accumulator, currentValue) {
                            return accumulator.concat(currentValue);
                        }, []);
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.marketTable.marketsTableWait()];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.marketTable.getSearchModal().getAllMarketsTitles()];
                    case 14:
                        actualMarketsList = _a.sent();
                        actualMarketsList = actualMarketsList.map(function (a) { return a.toLowerCase(); });
                        actualMarketsList.forEach(function (actualMarket) { return _this.expect(expectedMarketsList).to.include(actualMarket); });
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^options included toggle is (on|off)$/, function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var actualState, expectedState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.productType.isOptionsIncluded()];
                    case 1:
                        actualState = _a.sent();
                        expectedState = state === 'on';
                        this.memory.includeOptions = state === 'on' ? true : false;
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=browse-tab-steps.js.map