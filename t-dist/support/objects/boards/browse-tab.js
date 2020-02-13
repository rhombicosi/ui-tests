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
var protractor_1 = require("protractor");
var deal_ticket_panel_1 = require("../panels/deal-ticket-panel");
var chart_panel_1 = require("../panels/chart-panel");
var search_modal_1 = require("../modal-dialogues/search-modal");
var market_1 = require("../elements/market");
var helper_1 = require("../../utils/helper");
var _ = require("lodash");
var constructors = {
    'deal ticket': deal_ticket_panel_1.DealTicketPanel,
    chart: chart_panel_1.ChartPanel
};
var BrowseTab = /** @class */ (function () {
    function BrowseTab() {
        this.data = {
            tags: {
                title: protractor_1.by.css('.markets-tags__title'),
                'tags list': protractor_1.by.css('.markets-tags__list'),
                tagsItem: protractor_1.by.css('.markets-tags__item')
            },
            content: {
                'tag name': protractor_1.by.css('.market-tag-information__name'),
                typesDropdown: protractor_1.by.css('.'),
                types: protractor_1.by.css('.market-tag-information__product-types'),
                filters: protractor_1.by.css('.markets-filter'),
                filterTab: protractor_1.by.css('.markets-filter__tab'),
                allFilters: protractor_1.by.css('.markets-filter__tab.ng-star-inserted:not(.markets-filter__tab--hidden)'),
                moreDropdown: protractor_1.by.css('.markets-filter__tab-dropdown'),
                moreDropdownContent: protractor_1.by.css('.markets-filter .dropdown__content'),
                moreDropdownFilters: protractor_1.by.css('.dropdown__link.ng-star-inserted'),
                moreDropdownLink: protractor_1.by.css('.dropdown__link'),
                'product type filter': protractor_1.by.tagName('app-product-type-filter'),
                'no results': protractor_1.by.css('.browse-page__no-results')
            },
            'product type filter': {
                root: protractor_1.by.tagName('app-product-type-filter'),
                expander: protractor_1.by.css('.product-types__list'),
                'dropdown icon': protractor_1.by.css('.icon-triangle-down'),
                'selected type': protractor_1.by.css('.product-types__list'),
                dropdown: protractor_1.by.css('.product-types__dropdown'),
                items: protractor_1.by.css('.product-types__dropdown-item'),
                'include options toggle': protractor_1.by.css('.product-types__dropdown-options-toggle'),
                'toggle status': protractor_1.by.css('.product-types__dropdown-options-toggle .slide-toggle--status')
            },
            table: {
                'markets table': protractor_1.by.css('.browse-page__table'),
                'table scroll': protractor_1.by.css('.scroll'),
                'search input': protractor_1.by.css('.table-markets__search-box'),
                'search icon': protractor_1.by.css('.table-markets__search-box-head-cell>.icon-search'),
                'close icon': protractor_1.by.css('.icon-close'),
                'no results': protractor_1.by.css('.browse-page__no-results'),
                'vertical scroll': protractor_1.by.tagName('virtual-scroll'),
                market: {
                    root: protractor_1.by.tagName('app-market-search-table-row'),
                    price: protractor_1.by.css('.price'),
                    name: protractor_1.by.tagName('app-market-search-table-row .name'),
                },
                'market names': protractor_1.by.tagName('app-market-search-table-row .name'),
                'loading spinner': protractor_1.by.tagName('app-loading-spinner'),
            }
        };
    }
    Object.defineProperty(BrowseTab.prototype, "tags", {
        get: function () {
            var self = this;
            return {
                getCategories: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var tags, text;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.tags['tags list']).waitReady(15000)];
                                case 1:
                                    tags = _a.sent();
                                    return [4 /*yield*/, tags.getText()];
                                case 2:
                                    text = _a.sent();
                                    return [2 /*return*/, text.split('\n').map(function (t) { return t.trim(); }).filter(function (t) { return t; })];
                            }
                        });
                    });
                },
                selectMarketCategoryByName: function (name) {
                    return protractor_1.element(protractor_1.by.cssContainingText('.markets-tags__item', name)).click();
                },
                isElementVisible: function (elementName) {
                    return __awaiter(this, void 0, void 0, function () {
                        var tagElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.tags[elementName]).waitReady(3000)];
                                case 1:
                                    tagElement = _a.sent();
                                    return [2 /*return*/, tagElement.isDisplayed()];
                            }
                        });
                    });
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowseTab.prototype, "filterTabs", {
        get: function () {
            var self = this;
            return {
                getMarketSubtags: function (tags, categoryName) {
                    return tags.filter(function (a) { return a.Name === categoryName; }).map(function (a) { return a.Children; })[0];
                },
                selectTabByName: function (name) {
                    return __awaiter(this, void 0, void 0, function () {
                        var el;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(protractor_1.by.cssContainingText('.markets-filter__tab', name)).waitReady(5000)];
                                case 1:
                                    el = _a.sent();
                                    return [4 /*yield*/, el.click()];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                getMarketTabs: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var textArr;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element.all(self.data.content.filterTab).getText()];
                                case 1:
                                    textArr = _a.sent();
                                    return [2 /*return*/, textArr.map(function (t) { return t.trim(); })];
                            }
                        });
                    });
                },
                isMoreDropdownPresent: function () {
                    return protractor_1.element(self.data.content.moreDropdown).isPresent();
                },
                isMoreDropdownHidden: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var is;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.content.moreDropdownContent).getAttribute('class')];
                                case 1:
                                    is = _a.sent();
                                    return [2 /*return*/, is.includes('hide')];
                            }
                        });
                    });
                },
                expandFiltersDropdown: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var dropdown;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.content.moreDropdown).waitReady(5000)];
                                case 1:
                                    dropdown = _a.sent();
                                    return [2 /*return*/, dropdown.click()];
                            }
                        });
                    });
                },
                getFiltersDropdownContent: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var textArr;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element.all(self.data.content.moreDropdownLink).getText()];
                                case 1:
                                    textArr = _a.sent();
                                    return [2 /*return*/, textArr.map(function (t) { return t.trim(); })];
                            }
                        });
                    });
                },
                isElementVisible: function (elementName) {
                    return __awaiter(this, void 0, void 0, function () {
                        var filterElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.content[elementName]).waitReady(5000)];
                                case 1:
                                    filterElement = _a.sent();
                                    return [2 /*return*/, filterElement.isDisplayed()];
                            }
                        });
                    });
                },
                selectFilterFromMoreDropdown: function (subtagName) {
                    return __awaiter(this, void 0, void 0, function () {
                        var subtag;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element.all(self.data.content.moreDropdownLink).filter(function (subtags) {
                                        return subtags.getText()
                                            .then(function (text) {
                                            return text.trim().toLowerCase() === subtagName.toLowerCase();
                                        });
                                    }).first()];
                                case 1:
                                    subtag = _a.sent();
                                    return [2 /*return*/, subtag.click()];
                            }
                        });
                    });
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowseTab.prototype, "marketTable", {
        get: function () {
            var self = this;
            return {
                getSearchModal: function () {
                    var root = protractor_1.element(self.data.table['markets table']);
                    return new search_modal_1.SearchModal(root);
                },
                getSearchText: function (textType) {
                    return __awaiter(this, void 0, void 0, function () {
                        var input;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.table['search input']).waitReady(5000)];
                                case 1:
                                    input = _a.sent();
                                    return [2 /*return*/, input.getAttribute(textType)];
                            }
                        });
                    });
                },
                fillInputWithValue: function (value) {
                    return __awaiter(this, void 0, void 0, function () {
                        var val;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.table['search input']).waitReady(5000)];
                                case 1:
                                    val = _a.sent();
                                    return [4 /*yield*/, val.clear()];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/, val.sendKeys(value)];
                            }
                        });
                    });
                },
                clearSearchInput: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var searchInput;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.table['search input']).waitReady(5000)];
                                case 1:
                                    searchInput = _a.sent();
                                    return [4 /*yield*/, searchInput.sendKeys(protractor_1.protractor.Key.chord(protractor_1.protractor.Key.CONTROL, 'a'))];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, searchInput.sendKeys(protractor_1.protractor.Key.DELETE)];
                                case 3:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                clickSearchElement: function (name) {
                    return __awaiter(this, void 0, void 0, function () {
                        var searchElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.table[name]).waitReady(3000)];
                                case 1:
                                    searchElement = _a.sent();
                                    return [4 /*yield*/, protractor_1.browser.actions().mouseMove(searchElement).mouseDown().mouseUp().perform()
                                            .then(function () { return null; }, function () { return console.log('actions error'); })];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                isElementVisible: function (elementName) {
                    return __awaiter(this, void 0, void 0, function () {
                        var tableElement;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.table[elementName]).waitReady(10000)];
                                case 1:
                                    tableElement = _a.sent();
                                    return [2 /*return*/, tableElement.isDisplayed()];
                            }
                        });
                    });
                },
                marketsTableWait: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.table['table scroll']).waitReady(60000)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                waitForLoading: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.table['loading spinner']).waitReady(1000)
                                        .then(function (el) { return el.waitMissing(20000); }, function () { return null; })];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, helper_1.helper.sleep(200)];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                getMarket: function (nameOrNumber) {
                    var marketRoot;
                    if (typeof nameOrNumber === 'number') {
                        marketRoot = protractor_1.element.all(self.data.table.market.root).get(nameOrNumber);
                    }
                    else {
                        marketRoot = protractor_1.element.all(self.data.table.market.root).filter(function (el) {
                            return el.element(self.data.table.market.name).getText()
                                .then(function (text) {
                                return text.toLowerCase().trim() === nameOrNumber.toLowerCase();
                            });
                        }).first();
                    }
                    return new market_1.MarketRow(marketRoot);
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowseTab.prototype, "productType", {
        get: function () {
            var self = this;
            return {
                getProductType: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, protractor_1.element(self.data['product type filter']['selected type']).getText()];
                        });
                    });
                },
                isElementVisible: function (elementName) {
                    return __awaiter(this, void 0, void 0, function () {
                        var el;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    el = protractor_1.element(self.data['product type filter'][elementName]);
                                    return [4 /*yield*/, el.waitReady(2000)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/, el.isDisplayed()];
                            }
                        });
                    });
                },
                expandCollapseDropdown: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, protractor_1.element(self.data['product type filter']['dropdown icon']).click()];
                        });
                    });
                },
                getDropdownContent: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, protractor_1.element.all(self.data['product type filter'].items).getText()];
                        });
                    });
                },
                selectType: function (typeName) {
                    return __awaiter(this, void 0, void 0, function () {
                        var subtag;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element.all(self.data['product type filter'].items).filter(function (types) {
                                        return types.getText()
                                            .then(function (text) {
                                            return text.trim().toLowerCase() === typeName.toLowerCase();
                                        });
                                    }).first()];
                                case 1:
                                    subtag = _a.sent();
                                    return [2 /*return*/, subtag.click()];
                            }
                        });
                    });
                },
                isOptionsIncluded: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var elementClass;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data['product type filter']['toggle status']).waitPresent(2000)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, protractor_1.element(self.data['product type filter']['toggle status']).getAttribute('class')];
                                case 2:
                                    elementClass = _a.sent();
                                    return [2 /*return*/, elementClass.includes('on')];
                            }
                        });
                    });
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    BrowseTab.prototype.sortByWeighting = function (tags) {
        return tags.sort(function (a, b) { return b.Weighting - a.Weighting; }).map(function (a) { return a.Name; });
    };
    BrowseTab.prototype.groupByWeighting = function (tags) {
        var grouped = _.mapValues(_.groupBy(tags, 'Weighting'), function (clist) { return clist.map(function (t) { return _.omit(t, 'Weighting'); }); });
        return grouped;
    };
    BrowseTab.prototype.sortByName = function (group) {
        return group.map(function (a) { return a.Name.toLowerCase(); }).sort();
    };
    BrowseTab.prototype.getMarketTagId = function (tags, filterName) {
        return tags.filter(function (a) { return a.Name === filterName; }).map(function (a) { return a.MarketTagId; })[0];
    };
    BrowseTab.prototype.isElementDisplayed = function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            var elements, elementClass;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elements = {
                            'markets filter tabs': protractor_1.element(this.data.content.filters),
                            'product type dropdown': protractor_1.element(this.data['product type filter'].dropdown)
                        };
                        return [4 /*yield*/, elements[elementName].waitPresent(3000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, elements[elementName].getAttribute('class')];
                    case 2:
                        elementClass = _a.sent();
                        return [2 /*return*/, !elementClass.includes('hide')];
                }
            });
        });
    };
    BrowseTab.prototype.isElementPresent = function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            var elements;
            return __generator(this, function (_a) {
                elements = {
                    'markets filter dropdown': protractor_1.element(this.data.content.moreDropdown),
                    'drop down content': protractor_1.element(this.data.content.moreDropdownContent),
                    'product type filter': protractor_1.element(this.data.content['product type filter']),
                    'markets filter tabs': protractor_1.element(this.data.content.filters),
                    'product type dropdown': protractor_1.element(this.data['product type filter'].dropdown),
                    'no results': protractor_1.element(this.data.content['no results'])
                };
                if (elementName === 'markets filter dropdown') {
                    protractor_1.element(this.data.content.types).scrollIntoView();
                }
                return [2 /*return*/, elements[elementName].waitPresent(10000).then(function () { return true; }, function () { return false; })];
            });
        });
    };
    BrowseTab.prototype.isElementActive = function (elementName, filterName) {
        return __awaiter(this, void 0, void 0, function () {
            var elements, elementClass;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elements = {
                            'filter tab': protractor_1.element(protractor_1.by.cssContainingText('.markets-filter__tab', filterName)),
                            category: protractor_1.element(protractor_1.by.cssContainingText('.markets-tags__item', filterName))
                        };
                        return [4 /*yield*/, elements[elementName].getAttribute('class')];
                    case 1:
                        elementClass = _a.sent();
                        return [2 /*return*/, elementClass.includes('active')];
                }
            });
        });
    };
    BrowseTab.prototype.getDisplayedFilters = function (filtersLocation) {
        return __awaiter(this, void 0, void 0, function () {
            var locator, filters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        locator = filtersLocation === 'more dropdown'
                            ? this.data.content.moreDropdownFilters
                            : this.data.content.allFilters;
                        return [4 /*yield*/, protractor_1.element.all(locator).map(function (elem) { return elem.getText(); })];
                    case 1:
                        filters = _a.sent();
                        return [2 /*return*/, filters.map(function (value) { return value.toLowerCase(); })];
                }
            });
        });
    };
    BrowseTab.prototype.getNameFilter = function (positionNumber, filterLocation) {
        return __awaiter(this, void 0, void 0, function () {
            var locator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        locator = filterLocation === 'more dropdown'
                            ? this.data.content.moreDropdownFilters
                            : this.data.content.allFilters;
                        return [4 /*yield*/, protractor_1.element.all(locator).get(positionNumber).getText()];
                    case 1: return [2 /*return*/, (_a.sent()).trim()];
                }
            });
        });
    };
    BrowseTab.prototype.clickElement = function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            var elements;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elements = {
                            'markets filter dropdown': protractor_1.element(this.data.content.moreDropdown),
                            'some market filter': protractor_1.element.all(this.data.content.moreDropdownFilters).get(0),
                            'include options toggle': protractor_1.element(this.data['product type filter']['include options toggle'])
                        };
                        return [4 /*yield*/, protractor_1.browser.actions().mouseMove(elements[elementName]).perform()
                                .then(function () { return null; }, function () { return console.log('actions error'); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, elements[elementName].waitReady(2000)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, elements[elementName].click()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return BrowseTab;
}());
exports.BrowseTab = BrowseTab;
//# sourceMappingURL=browse-tab.js.map