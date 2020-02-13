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
var helper_1 = require("../../utils/helper");
var MarketRow = /** @class */ (function () {
    function MarketRow(container) {
        this.data = {
            name: protractor_1.by.css('.market-name,.name'),
            position: protractor_1.by.css('.position'),
            unrealised: protractor_1.by.css('.unrealised'),
            'bid price': protractor_1.by.xpath('.//td[contains(@class,"price")][1]'),
            'ask price': protractor_1.by.xpath('.//td[contains(@class,"price")][2]'),
            date: protractor_1.by.css('.date'),
            price: protractor_1.by.css('.price'),
            type: protractor_1.by.css('.type'),
            status: protractor_1.by.css('.status'),
            'realised profit/loss': protractor_1.by.css('.realised'),
            'last-edit': protractor_1.by.css('.last-edit'),
            'opening price': protractor_1.by.css('.opening-price'),
            'current price': protractor_1.by.css('.current-price'),
            'order price': protractor_1.by.css('.trigger-price'),
            'stop price': protractor_1.by.css('.stop'),
            'limit price': protractor_1.by.css('.limit'),
            delete: protractor_1.by.css('.delete'),
            close: protractor_1.by.css('.close-market'),
            'delete confirm': protractor_1.by.css('.delete .close-single-confirm'),
            'delete cancel': protractor_1.by.css('.delete .close-market-cancel'),
            'sell hover container': protractor_1.by.css('.sell>.hover-container'),
            'buy hover container': protractor_1.by.css('.buy>.hover-container'),
            sell: protractor_1.by.css('.sell'),
            'sell on browse': protractor_1.by.css('.price--sell.clickable-price'),
            buy: protractor_1.by.css('.buy'),
            'buy on browse': protractor_1.by.css('.price--buy.clickable-price'),
            change: protractor_1.by.css('.change'),
            high: protractor_1.by.css('.high'),
            low: protractor_1.by.css('.low'),
            spread: protractor_1.by.css('.spread'),
            quantity: protractor_1.by.css('.quantity'),
            'dropdown arrow': protractor_1.by.css('.icon-triangle-down'),
            'squares icon': protractor_1.by.css('.icon-productpage'),
            'dropdown menu': protractor_1.by.tagName('ul'),
            row: protractor_1.by.css('.watchlist-market-row'),
            actions: protractor_1.by.css('.actions'),
            'edit icon': protractor_1.by.css('app-active-order-market .icon-edit'),
            multi: {
                'plus icon': protractor_1.by.css('.expand'),
                'close icon': protractor_1.by.css('.collapse'),
                submarkets: protractor_1.by.css('.open-position-market__sub-item-row,.active-order-market__sub-item-row')
            }
        };
        this.container = container;
    }
    MarketRow.prototype.getId = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.getAttribute('marketid')];
                    case 1: return [2 /*return*/, (_a.sent()).trim()];
                }
            });
        });
    };
    MarketRow.prototype.click = function (on) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        on = on.toLocaleLowerCase();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 10]);
                        return [4 /*yield*/, this.container.scrollIntoView()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.container.hover()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.container.all(this.data[on]).get(0).click()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 5:
                        err_1 = _a.sent();
                        return [4 /*yield*/, helper_1.helper.sleep(500)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.container.scrollIntoView()];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.container.hover()];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.container.all(this.data[on]).get(0).click()];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    MarketRow.prototype.getMarketElement = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitPresent(5000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.container.element(this.data.row)];
                }
            });
        });
    };
    MarketRow.prototype.getName = function (scroll) {
        if (scroll === void 0) { scroll = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitPresent(5000)];
                    case 1:
                        _a.sent();
                        if (!scroll) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.container.scrollIntoView()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.container.all(this.data.name).get(0).getText()];
                    case 4: return [2 /*return*/, (_a.sent()).trim()];
                }
            });
        });
    };
    MarketRow.prototype.getText = function (on) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitPresent(5000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.scrollIntoView()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.wait(function () {
                                return _this.container.all(_this.data[on]).get(0).getText()
                                    .then(function (text) { return text.trim() !== '—'; }, function () { return false; })
                                    .then(function (is) { return helper_1.helper.sleepIfFalse(is, 1000); });
                            }, 20000)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.container.all(this.data[on]).get(0).getText()];
                    case 4: return [2 /*return*/, (_a.sent()).trim()];
                }
            });
        });
    };
    MarketRow.prototype.getPrice = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitPresent(5000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.wait(function () {
                                return _this.container.all(_this.data[type]).get(0).getText()
                                    .then(function (text) { return text.trim() !== '—'; }, function () { return false; })
                                    .then(function (is) { return helper_1.helper.sleepIfFalse(is, 1000); });
                            }, 20000)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.container.all(this.data[type]).get(0).getText()];
                    case 3: return [2 /*return*/, (_a.sent()).trim()];
                }
            });
        });
    };
    MarketRow.prototype.getUnrealisedColor = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.all(this.data.unrealised).get(0).element(protractor_1.by.css('.open-position-market__currency')).waitReady(15000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.container.all(this.data.unrealised).get(0).element(protractor_1.by.css('.open-position-market__currency')).getCssValue('color')];
                }
            });
        });
    };
    MarketRow.prototype.getPositionColor = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(protractor_1.by.css('.rectangle')).waitReady(3000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.container.element(protractor_1.by.css('.rectangle')).getCssValue('background-color')];
                }
            });
        });
    };
    MarketRow.prototype.hover = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitPresent(5000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.scrollIntoView()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.container.hover()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MarketRow.prototype.scrollTo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitPresent(15000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.scrollIntoView()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MarketRow.prototype.hoverElement = function (type) {
        type = type.toLowerCase();
        return this.container.element(this.data[type]).hover();
    };
    MarketRow.prototype.getRowColor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cls, tagName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.getAttribute('class')];
                    case 1:
                        cls = (_a.sent()).trim();
                        return [4 /*yield*/, this.container.getTagName()];
                    case 2:
                        tagName = (_a.sent()).trim();
                        if (cls.includes('history-body__item')) {
                            return [2 /*return*/, this.container.getCssValue('background-color')];
                        }
                        else if (tagName === 'app-market-search-table-row') {
                            return [2 /*return*/, this.container.element(protractor_1.by.css('.table__row-body')).getCssValue('background-color')];
                        }
                        else {
                            return [2 /*return*/, this.container.element(protractor_1.by.css('.at-market-row,.watchlist-market-row')).getCssValue('background-color')];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MarketRow.prototype.getSubItemRowColor = function () {
        return this.container.getCssValue('background-color');
    };
    MarketRow.prototype.getElementColor = function (type) {
        type = type.toLowerCase();
        var input = {
            sell: this.data['sell hover container'],
            'sell on browse': this.data['sell on browse'],
            buy: this.data['buy hover container'],
            'buy on browse': this.data['buy on browse'],
        };
        return this.container.element(input[type]).getCssValue('background-color');
    };
    MarketRow.prototype.isElementVisible = function (name) {
        return this.container.all(this.data[name]).get(0).isDisplayed();
    };
    MarketRow.prototype.getDropdownOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var textArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.all(this.data['dropdown menu']).get(0).all(protractor_1.by.tagName('li')).getText()];
                    case 1:
                        textArr = _a.sent();
                        return [2 /*return*/, textArr.map(function (t) { return t.trim().replace(/\s+/g, ' '); })];
                }
            });
        });
    };
    MarketRow.prototype.selectDropdownOption = function (nameOrNumber) {
        var option;
        if (typeof nameOrNumber === 'number') {
            option = this.container.all(this.data['dropdown menu']).get(0).all(protractor_1.by.tagName('li')).get(nameOrNumber);
        }
        else {
            option = this.container.all(this.data['dropdown menu']).get(0).all(protractor_1.by.tagName('li')).filter(function (opt) {
                return opt.getText()
                    .then(function (text) {
                    return text.toLowerCase().trim().replace(/ *\n */g, ' ') === nameOrNumber.toLowerCase();
                });
            }).first();
        }
        return option.click();
    };
    MarketRow.prototype.isOptionEnabled = function (nameOrNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var option, cls;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof nameOrNumber === 'number') {
                            option = this.container.all(this.data['dropdown menu']).get(0).all(protractor_1.by.tagName('li')).get(nameOrNumber);
                        }
                        else {
                            option = this.container.all(this.data['dropdown menu']).get(0).all(protractor_1.by.tagName('li')).filter(function (opt) {
                                return opt.getText()
                                    .then(function (text) {
                                    return text.toLowerCase().trim().replace(/ *\n */g, ' ') === nameOrNumber.toLowerCase();
                                });
                            }).first();
                        }
                        return [4 /*yield*/, option.getAttribute('class')];
                    case 1:
                        cls = _a.sent();
                        return [2 /*return*/, !cls.includes('link--disabled')];
                }
            });
        });
    };
    MarketRow.prototype.completeDropdownWithOption = function (nameOrNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var option, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof nameOrNumber === 'number') {
                            option = this.container.all(this.data['dropdown menu']).get(0).all(protractor_1.by.tagName('li')).get(nameOrNumber);
                        }
                        else {
                            option = this.container.all(this.data['dropdown menu']).get(0).all(protractor_1.by.tagName('li')).filter(function (opt) {
                                return opt.getText()
                                    .then(function (text) {
                                    return text.toLowerCase().trim().replace(/ *\n */g, ' ') === nameOrNumber.toLowerCase();
                                });
                            }).first();
                        }
                        if (!process.env.npm_config_browser.includes('safari')) return [3 /*break*/, 2];
                        return [4 /*yield*/, protractor_1.browser.actions().mouseMove(this.container.element(protractor_1.by.css('.market-name'))).perform()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.hover()];
                    case 3:
                        _a.sent(); // TODO: sometimes hover is not working
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 7, , 11]);
                        return [4 /*yield*/, this.container.element(this.data['dropdown arrow']).click()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, option.waitReady(2000)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 7:
                        err_2 = _a.sent();
                        return [4 /*yield*/, helper_1.helper.sleep(500)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data['dropdown arrow']).click()];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, option.waitReady(2000)];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 11: return [4 /*yield*/, option.click().then(null, function () {
                            return helper_1.helper.sleep(1000)
                                .then(function () { return option.click(); });
                        })];
                    case 12:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MarketRow.prototype.isMulti = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isMult, plusIcon, closeIcon, submarketsCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isMult = false;
                        return [4 /*yield*/, this.container.element(this.data.multi['plus icon']).isPresent()];
                    case 1:
                        plusIcon = _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.multi['close icon']).isPresent()];
                    case 2:
                        closeIcon = _a.sent();
                        return [4 /*yield*/, this.container.all(this.data.multi.submarkets).count()];
                    case 3:
                        submarketsCount = _a.sent();
                        if (plusIcon || closeIcon || submarketsCount > 0) {
                            isMult = true;
                        }
                        return [2 /*return*/, isMult];
                }
            });
        });
    };
    MarketRow.prototype.expand = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.multi['plus icon']).click()
                            .then(null, function (err) {
                            console.log('Market is not amalgamated or has been already expanded');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MarketRow.prototype.collapse = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.multi['close icon']).click()
                            .then(null, function (err) {
                            console.log('Market is not amalgamated or has been already collapsed');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MarketRow.prototype.isExpanded = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isMulti;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isMulti()];
                    case 1:
                        isMulti = _a.sent();
                        if (isMulti) {
                            return [2 /*return*/, this.container.element(this.data.multi['close icon']).isPresent()];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MarketRow.prototype.getSubMarket = function (num) {
        var marketRoot = this.container.all(this.data.multi.submarkets).get(num);
        return new MarketRow(marketRoot);
    };
    MarketRow.prototype.getSubMarketsCount = function () {
        return this.container.all(this.data.multi.submarkets).count();
    };
    MarketRow.prototype.getSubMarketsText = function (on) {
        return __awaiter(this, void 0, void 0, function () {
            var textArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.all(this.data.multi.submarkets).all(this.data[on]).getText()];
                    case 1:
                        textArr = _a.sent();
                        return [2 /*return*/, textArr.map(function (t) { return t.trim(); })];
                }
            });
        });
    };
    Object.defineProperty(MarketRow.prototype, "actionsMenu", {
        get: function () {
            var data = {
                root: protractor_1.by.tagName('app-add-to-watchlist'),
                'new watchlist': protractor_1.by.css('.new-watchlist'),
                'new watchlist input': protractor_1.by.css('.adding-new-block input'),
                watchlist: protractor_1.by.css('.watchlist-item'),
                'confirmation icon': protractor_1.by.css('.icon-confirmation')
            };
            var root = this.container.element(data.root);
            return {
                isVisible: function () {
                    return protractor_1.browser.wait(function () { return root.isDisplayed(); }, 1000);
                },
                isNewWatchlistVisible: function () {
                    return protractor_1.element(data['new watchlist']).isDisplayed();
                },
                isWatchListPresent: function (watchlistName) {
                    var _this = this;
                    watchlistName = watchlistName.toLowerCase();
                    var watchlist = root.all(data.watchlist).filter(function (list) {
                        return list.getText()
                            .then(function (text) { return text.toLowerCase().trim() === watchlistName; });
                    }).first();
                    return watchlist.isDisplayed()
                        .then(function (is) { return is; }, function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, helper_1.helper.sleep(1000)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/, watchlist.isDisplayed()];
                            }
                        });
                    }); });
                },
                isConfirmationIconVisible: function (watchlistName) {
                    watchlistName = watchlistName.toLowerCase();
                    return root.all(data.watchlist).filter(function (list) {
                        return list.getText()
                            .then(function (text) { return text.toLowerCase().trim() === watchlistName; });
                    }).first().element(data['confirmation icon']).waitReady(2000)
                        .then(function () { return true; }, function () { return false; });
                },
                addNewWatchlist: function (watchlistName, location) {
                    return __awaiter(this, void 0, void 0, function () {
                        var watchlistCount;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    watchlistName = watchlistName.toLowerCase();
                                    if (!location.includes('menu')) return [3 /*break*/, 2];
                                    return [4 /*yield*/, protractor_1.element(protractor_1.by.css('.menu app-add-to-watchlist'))];
                                case 1:
                                    root = _a.sent();
                                    _a.label = 2;
                                case 2: return [4 /*yield*/, root.waitReady(5000)];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, root.all(data.watchlist).count()];
                                case 4:
                                    watchlistCount = _a.sent();
                                    return [4 /*yield*/, root.element(data['new watchlist']).click()];
                                case 5:
                                    _a.sent();
                                    return [4 /*yield*/, root.element(data['new watchlist input']).clear()];
                                case 6:
                                    _a.sent();
                                    return [4 /*yield*/, root.element(data['new watchlist input']).sendKeys(watchlistName)];
                                case 7:
                                    _a.sent();
                                    return [4 /*yield*/, root.element(data['new watchlist input']).sendKeys(protractor_1.protractor.Key.ENTER)];
                                case 8:
                                    _a.sent();
                                    return [4 /*yield*/, protractor_1.browser.wait(function () {
                                            return root.all(data.watchlist).count()
                                                .then(function (count) { return helper_1.helper.sleepIfFalse(count === watchlistCount + 1); });
                                        }, 3000)];
                                case 9:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                addMarketToWatchlist: function (watchlistName) {
                    watchlistName = watchlistName.toLowerCase();
                    return root.all(data.watchlist).filter(function (list) {
                        return list.getText()
                            .then(function (text) { return text.toLowerCase().trim() === watchlistName; });
                    }).first().click();
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    return MarketRow;
}());
exports.MarketRow = MarketRow;
//# sourceMappingURL=market.js.map