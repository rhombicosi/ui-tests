"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var panel_1 = require("./panel");
var market_1 = require("../elements/market");
var helper_1 = require("../../utils/helper");
var WatchlistPanel = /** @class */ (function (_super) {
    __extends(WatchlistPanel, _super);
    function WatchlistPanel(panelRoot) {
        var _this = _super.call(this, panelRoot) || this;
        _this.data = {
            addWatchlistButton: protractor_1.by.css('.add-watchlist'),
            tabHeader: {
                root: protractor_1.by.css('.watchlists-header'),
                columns: protractor_1.by.css('.watchlists-header__column-header:not(.market-information)')
            },
            popularMarkets: protractor_1.by.css('.watchlists-body-curated'),
            allLists: protractor_1.by.tagName('app-watchlist'),
            listsTitle: protractor_1.by.css('app-watchlist div[title]'),
            customLists: protractor_1.by.css('.watchlists-body__custom app-watchlist'),
            addWatchlist: {
                link: protractor_1.by.css('.add-watchlist'),
                input: protractor_1.by.css('.rename-watchlist>input'),
                clear: protractor_1.by.css('.clear-search')
            }
        };
        _this.name = 'Watchlist';
        return _this;
    }
    Object.defineProperty(WatchlistPanel.prototype, "currentList", {
        get: function () {
            return this.curList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WatchlistPanel.prototype, "tabHeader", {
        get: function () {
            var self = this;
            return {
                getColumnsNames: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var textArr;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element.all(self.data.tabHeader.columns).getText()];
                                case 1:
                                    textArr = _a.sent();
                                    return [2 /*return*/, textArr.map(function (t) { return t.trim(); })];
                            }
                        });
                    });
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    WatchlistPanel.prototype.createNewWatchlist = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.element(this.data.addWatchlistButton).click()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WatchlistPanel.prototype.getElementText = function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            var items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        items = {
                            'create watchlist button': this.container.element(this.data.addWatchlistButton)
                        };
                        return [4 /*yield*/, items[elementName].getText()];
                    case 1: return [2 /*return*/, (_a.sent()).trim()];
                }
            });
        });
    };
    WatchlistPanel.prototype.getList = function (nameOrNumber) {
        var rootEl;
        if (typeof nameOrNumber === 'number') {
            rootEl = protractor_1.element.all(this.data.allLists).get(nameOrNumber);
        }
        else {
            rootEl = protractor_1.element.all(this.data.allLists).filter(function (el) {
                return el.element(protractor_1.by.css('.watchlist-header__title')).getText()
                    .then(function (text) {
                    return text.toLowerCase().trim().includes(nameOrNumber.toLowerCase());
                });
            }).first();
        }
        this.curList = new List(rootEl);
        return this.curList;
    };
    WatchlistPanel.prototype.getWatchlistsNames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var textArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.all(this.data.listsTitle).getText()];
                    case 1:
                        textArr = _a.sent();
                        return [2 /*return*/, textArr.map(function (t) {
                                if (t.includes('Popular Markets')) {
                                    t = 'Popular Markets';
                                }
                                return t.trim();
                            })];
                }
            });
        });
    };
    WatchlistPanel.prototype.getWatchlistCount = function () {
        return this.container.all(this.data.allLists).count();
    };
    return WatchlistPanel;
}(panel_1.Panel));
exports.WatchlistPanel = WatchlistPanel;
var List = /** @class */ (function () {
    function List(container) {
        this.data = {
            header: protractor_1.by.css('.watchlist-header__title'),
            head: {
                root: protractor_1.by.css('.watchlist-header'),
                editIcon: protractor_1.by.css('.icon-edit'),
                trash: protractor_1.by.css('.icon-trash-can'),
                renameInput: protractor_1.by.css('.rename-watchlist > input'),
                undo: protractor_1.by.css('.icon-undo')
            },
            chevron: protractor_1.by.css('[class*="icon-chevron"]:not(.chevron-wrapper)'),
            marketsTab: {
                root: protractor_1.by.css('.watchlist-markets-container'),
                markets: {
                    root: protractor_1.by.tagName('app-watchlist-market'),
                    rows: protractor_1.by.css('.watchlist-market-row'),
                    name: protractor_1.by.css('.market-name')
                },
                emptyContainer: protractor_1.by.css('.watchlist__empty-result-container')
            },
            addMarket: {
                input: protractor_1.by.css('.add-market>input'),
                searchResults: {
                    root: protractor_1.by.css('.add-market__search-results'),
                    rows: protractor_1.by.css('.add-market__search-result-item')
                },
                undoContainer: protractor_1.by.css('.watchlist-undo-container')
            }
        };
        this.container = container;
    }
    List.prototype.getListElement = function () {
        return this.container;
    };
    List.prototype.getHead = function () {
        return this.container.element(this.data.head.root);
    };
    List.prototype.getEmptyContainer = function () {
        return this.container.element(protractor_1.by.css('.watchlist-markets-container--list'));
    };
    List.prototype.waitReady = function () {
        return this.container.waitReady(5000);
    };
    List.prototype.hover = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.waitReady()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.header).hover()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    List.prototype.startEditingName = function () {
        return this.container.element(this.data.head.editIcon).click();
    };
    List.prototype.endEditingName = function () {
        return this.container.element(this.data.head.renameInput).sendKeys(protractor_1.protractor.Key.ENTER);
    };
    List.prototype.undoDeleting = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.head.undo).click()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, protractor_1.browser.actions().mouseMove(protractor_1.element(protractor_1.by.css('body')), { x: 0, y: 0 }).click().perform()
                                .then(function () { return null; }, function () { return console.log('actions error'); })];
                }
            });
        });
    };
    List.prototype.putName = function (name, actionToCompleteEdit) {
        return __awaiter(this, void 0, void 0, function () {
            var input;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(name !== 'default')) return [3 /*break*/, 4];
                        return [4 /*yield*/, protractor_1.element(this.data.head.renameInput).waitReady(3000)];
                    case 1:
                        input = _a.sent();
                        return [4 /*yield*/, input.clear()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, input.sendKeys(name)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, helper_1.helper.sleep(500)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (actionToCompleteEdit === 'key enter') {
                            return [2 /*return*/, protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform()];
                        }
                        return [2 /*return*/, protractor_1.browser.actions().mouseMove(protractor_1.element(protractor_1.by.css('body')), { x: 0, y: 0 }).click().perform()
                                .then(function () { return null; }, function () { return console.log('actions error'); })];
                }
            });
        });
    };
    List.prototype.editName = function (newName, actionToCompleteEdit) {
        return __awaiter(this, void 0, void 0, function () {
            var icon, input;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.hover()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.head.editIcon).waitReady(2000)];
                    case 2:
                        icon = _a.sent();
                        return [4 /*yield*/, icon.click()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.head.renameInput).waitReady(2000)];
                    case 4:
                        input = _a.sent();
                        return [4 /*yield*/, input.clear()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, input.sendKeys(newName)];
                    case 6:
                        _a.sent();
                        if (actionToCompleteEdit === 'key enter') {
                            return [2 /*return*/, protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform()];
                        }
                        return [2 /*return*/, protractor_1.browser.actions().mouseMove(protractor_1.element(protractor_1.by.css('body')), { x: 0, y: 0 }).click().perform()
                                .then(function () { return null; }, function () { return console.log('actions error'); })];
                }
            });
        });
    };
    List.prototype.isVisible = function (elem) {
        var input = {
            'edit button': this.data.head.editIcon,
            'add to watch list text field': this.data.addMarket.input,
            'trash icon': this.data.head.trash,
            'edit input': this.data.head.renameInput,
            'undo icon': this.data.head.undo,
            'market from dropdown': this.data.addMarket.searchResults.rows
        };
        if (elem) {
            elem = elem.toLowerCase();
            return this.container.element(input[elem]).waitReady(2000)
                .then(function () { return true; }, function () { return false; });
        }
        return this.container.waitReady(2000)
            .then(function () { return true; }, function () { return false; });
    };
    List.prototype.isListMarketsVisible = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitReady(3000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.container.element(this.data.marketsTab.markets.root).isPresent()];
                }
            });
        });
    };
    List.prototype.getName = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitReady(3000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.header).getText()];
                    case 2: return [2 /*return*/, (_a.sent()).trim()];
                }
            });
        });
    };
    List.prototype.addMarketFromDropdown = function (num) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.addMarket.searchResults.rows).waitReady(5000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.all(this.data.addMarket.searchResults.rows).get(num).click()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    List.prototype.getMarketFromDropdown = function (num) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.addMarket.searchResults.rows).waitReady(5000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.all(this.data.addMarket.searchResults.rows).get(num).getText()];
                    case 2: return [2 /*return*/, (_a.sent()).trim()];
                }
            });
        });
    };
    List.prototype.isDeleteAvailable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitReady(3000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.hover()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.container.all(this.data.head.trash).count()];
                    case 3:
                        count = _a.sent();
                        return [2 /*return*/, count > 0];
                }
            });
        });
    };
    List.prototype.expand = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cls;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitReady(3000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.chevron).getAttribute('class')];
                    case 2:
                        cls = _a.sent();
                        if (!cls.includes('right')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.container.element(this.data.chevron).click()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        console.log('watchlist was already expanded');
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.container.element(this.data.marketsTab.root).waitPresent(3000)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    List.prototype.collapse = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cls;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.chevron).getAttribute('class')];
                    case 1:
                        cls = _a.sent();
                        if (!cls.includes('down')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.container.element(this.data.chevron).click()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        console.log('watchlist was already collapsed');
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.container.element(this.data.marketsTab.root).waitMissing()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    List.prototype.isExpanded = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cls;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.chevron).getAttribute('class')];
                    case 1:
                        cls = _a.sent();
                        return [2 /*return*/, cls.includes('down')];
                }
            });
        });
    };
    List.prototype.getMarketsCount = function () {
        return this.container.all(this.data.marketsTab.markets.rows).count();
    };
    List.prototype.deleteWatchlist = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitReady(3000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.hover()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.head.trash).click()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    List.prototype.getAllMarketsTitles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var textArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.all(this.data.marketsTab.markets.name).getText()];
                    case 1:
                        textArr = _a.sent();
                        return [2 /*return*/, textArr.map(function (t) { return t.trim(); })];
                }
            });
        });
    };
    List.prototype.getAllMarketsIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var idArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.all(this.data.marketsTab.markets.root).getAttribute('marketid')];
                    case 1:
                        idArr = _a.sent();
                        return [2 /*return*/, idArr.map(function (t) { return parseInt(t.trim()); })];
                }
            });
        });
    };
    List.prototype.addMarket = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitReady(3000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.hover()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.addMarket.input).waitReady(3000)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.addMarket.input).sendKeys(name)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.addMarket.searchResults.rows).waitReady(5000)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.addMarket.input).sendKeys(protractor_1.protractor.Key.DOWN)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.addMarket.input).sendKeys(protractor_1.protractor.Key.ENTER)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    List.prototype.typeNameOfMarket = function (name, wait) {
        if (wait === void 0) { wait = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitReady(3000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.hover()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.addMarket.input).waitReady(3000)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.addMarket.input).click()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.addMarket.input).clear()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.addMarket.input).sendKeys(name)];
                    case 6:
                        _a.sent();
                        if (!wait) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.container.element(this.data.addMarket.searchResults.rows).waitReady(5000)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, helper_1.helper.sleep(1000)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    List.prototype.getMarket = function (nameOrNumber) {
        var _this = this;
        var marketRoot;
        if (typeof nameOrNumber === 'number') {
            marketRoot = this.container.all(this.data.marketsTab.markets.root).get(nameOrNumber);
        }
        else {
            marketRoot = this.container.all(this.data.marketsTab.markets.root).filter(function (el) {
                return el.element(_this.data.marketsTab.markets.name).getText()
                    .then(function (text) {
                    return text.toLowerCase().trim() === nameOrNumber.toLowerCase();
                });
            }).first();
        }
        return new market_1.MarketRow(marketRoot);
    };
    List.prototype.getMarketPosition = function (marketName, num) {
        return __awaiter(this, void 0, void 0, function () {
            var positions;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.all(this.data.marketsTab.markets.root).reduce(function (arr, el, i) { return __awaiter(_this, void 0, void 0, function () {
                            var text;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, el.element(this.data.marketsTab.markets.name).getText()];
                                    case 1:
                                        text = _a.sent();
                                        if (text.toLowerCase().trim() === marketName.toLowerCase()) {
                                            arr.push(i);
                                        }
                                        return [2 /*return*/, arr];
                                }
                            });
                        }); }, [])];
                    case 1:
                        positions = _a.sent();
                        return [2 /*return*/, positions[num] + 1];
                }
            });
        });
    };
    List.prototype.isMarketPresent = function (marketName) {
        var _this = this;
        return protractor_1.browser.wait(function () {
            return _this.container.all(_this.data.marketsTab.markets.root).filter(function (el) {
                return el.element(_this.data.marketsTab.markets.name).getText()
                    .then(function (text) {
                    return text.toLowerCase().trim() === marketName.toLowerCase();
                });
            }).count()
                .then(function (count) { return helper_1.helper.sleepIfFalse(count > 0); });
        }, 4000)
            .then(function () { return true; }, function () { return false; });
    };
    List.prototype.getEmptyText = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.marketsTab.emptyContainer).getText()];
                    case 1: return [2 /*return*/, (_a.sent()).trim()];
                }
            });
        });
    };
    return List;
}());
//# sourceMappingURL=watchlist-panel.js.map