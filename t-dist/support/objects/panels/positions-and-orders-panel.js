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
var PositionsAndOrdersPanel = /** @class */ (function (_super) {
    __extends(PositionsAndOrdersPanel, _super);
    function PositionsAndOrdersPanel(panelRoot) {
        var _this = _super.call(this, panelRoot) || this;
        _this.data = {
            header: {
                root: protractor_1.by.css('.workspace-panel-header'),
                items: {
                    root: protractor_1.by.tagName('app-positions-and-orders-header'),
                    contents: protractor_1.by.tagName('div'),
                    icon: protractor_1.by.css('.icon')
                },
            },
            positions: protractor_1.by.tagName('app-open-position-list'),
            orders: protractor_1.by.tagName('app-active-order-list'),
            'order history': protractor_1.by.tagName('app-order-history'),
            'position history': protractor_1.by.tagName('app-trade-history'),
            'price alerts': protractor_1.by.tagName('app-price-alert-list')
        };
        _this.curList = _this.getList('Positions');
        _this.name = 'Positions And Orders';
        return _this;
    }
    Object.defineProperty(PositionsAndOrdersPanel.prototype, "currentList", {
        get: function () {
            return this.curList;
        },
        enumerable: true,
        configurable: true
    });
    PositionsAndOrdersPanel.prototype.getHeaderItemNames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var textArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.element(this.data.header.items.root).all(this.data.header.items.contents).getText()];
                    case 1:
                        textArr = _a.sent();
                        return [2 /*return*/, textArr.map(function (t) { return t.trim().replace(/ *\n */g, ' '); })];
                }
            });
        });
    };
    PositionsAndOrdersPanel.prototype.getList = function (listName) {
        listName = listName.toLowerCase();
        var root = this.container.element(this.data[listName]);
        this.curList = new List(listName, root);
        return this.curList;
    };
    PositionsAndOrdersPanel.prototype.isItemActive = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var root, listBtn, cls;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        root = protractor_1.element(this.data.header.items.root);
                        listBtn = root.all(this.data.header.items.contents).filter(function (ls) {
                            return ls.getText()
                                .then(function (text) {
                                return text.toLowerCase().trim().replace(/ ?\n ?| /g, '')
                                    .includes(item.toLowerCase().replace(' ', ''));
                            });
                        }).first();
                        return [4 /*yield*/, listBtn.getAttribute('class')];
                    case 1:
                        cls = _a.sent();
                        return [2 /*return*/, cls.includes('main-mode__header--active')];
                }
            });
        });
    };
    PositionsAndOrdersPanel.prototype.isListVisible = function (listName) {
        listName = listName.toLowerCase();
        return this.container.element(this.data[listName]).waitReady(3000)
            .then(function () { return true; }, function () { return false; });
    };
    PositionsAndOrdersPanel.prototype.selectList = function (listName) {
        return __awaiter(this, void 0, void 0, function () {
            var root, listBtn, cls, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        listName = listName.toLowerCase();
                        root = protractor_1.element(this.data.header.items.root);
                        listBtn = root.all(this.data.header.items.contents).filter(function (ls) {
                            return ls.getText()
                                .then(function (text) {
                                return text.toLowerCase().trim().replace(/ ?\n ?| /g, '')
                                    .includes(listName.replace(' ', ''));
                            });
                        }).first();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 12]);
                        return [4 /*yield*/, listBtn.getAttribute('class')];
                    case 2:
                        cls = (_a.sent()).trim();
                        if (!!cls.includes('main-mode__header--active')) return [3 /*break*/, 4];
                        return [4 /*yield*/, listBtn.click()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        console.log(' List was already selected');
                        _a.label = 5;
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        err_1 = _a.sent();
                        return [4 /*yield*/, helper_1.helper.sleep(500)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, listBtn.getAttribute('class')];
                    case 8:
                        cls = (_a.sent()).trim();
                        if (!!cls.includes('main-mode__header--active')) return [3 /*break*/, 10];
                        return [4 /*yield*/, listBtn.click()];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        console.log(' List was already selected');
                        _a.label = 11;
                    case 11: return [3 /*break*/, 12];
                    case 12: return [2 /*return*/, this.getList(listName)];
                }
            });
        });
    };
    PositionsAndOrdersPanel.prototype.selectView = function (view) {
        return __awaiter(this, void 0, void 0, function () {
            var root, cls;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        view = view.toLowerCase();
                        root = protractor_1.element(this.data.header.items.root);
                        return [4 /*yield*/, root.element(this.data.header.items.icon).getAttribute('class')];
                    case 1:
                        cls = (_a.sent()).trim();
                        if (!(view === 'history')) return [3 /*break*/, 5];
                        if (!cls.includes('icon-clock-white')) return [3 /*break*/, 3];
                        return [4 /*yield*/, root.element(this.data.header.items.icon).click()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        console.log(' History view is already opened');
                        _a.label = 4;
                    case 4: return [3 /*break*/, 8];
                    case 5:
                        if (!cls.includes('icon-clock-black')) return [3 /*break*/, 7];
                        return [4 /*yield*/, root.element(this.data.header.items.icon).click()];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        console.log(' Current view is already opened');
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return PositionsAndOrdersPanel;
}(panel_1.Panel));
exports.PositionsAndOrdersPanel = PositionsAndOrdersPanel;
var List = /** @class */ (function () {
    function List(name, container) {
        this.data = {
            tabHeader: {
                root: protractor_1.by.xpath('.//*[contains(@class,"list__header") or contains(@class,"history-header")]'),
                columns: protractor_1.by.css('div:not(.market-information):not(.delete)')
            },
            items: {
                root: protractor_1.by.xpath('.//*[contains(@class,"list__body") or contains(@class,"history-body")]'),
                firstHistoryItem: protractor_1.by.css('li:first-of-type div'),
            },
            markets: {
                root: null,
                name: protractor_1.by.css('.market-name')
            }
        };
        this.name = name;
        this.container = container;
        switch (this.name) {
            case 'positions':
                this.data.markets.root = protractor_1.by.tagName('app-open-position-market');
                break;
            case 'orders':
                this.data.markets.root = protractor_1.by.tagName('app-active-order-market');
                break;
            case 'order history':
                this.data.markets.root = protractor_1.by.css('.at-market-row');
                break;
            case 'position history':
                this.data.markets.root = protractor_1.by.css('.at-market-row');
                break;
            default:
                this.data.markets.root = protractor_1.by.tagName('app-open-position-market');
        }
    }
    List.prototype.getColumnsName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var textArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.tabHeader.root).all(this.data.tabHeader.columns).getText()];
                    case 1:
                        textArray = _a.sent();
                        return [2 /*return*/, textArray.map(function (t) { return t.trim(); })];
                }
            });
        });
    };
    List.prototype.getFirstRowData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var textArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.items.root).all(this.data.items.firstHistoryItem).getText()];
                    case 1:
                        textArray = _a.sent();
                        return [2 /*return*/, textArray.map(function (t) { return t.trim(); })];
                }
            });
        });
    };
    List.prototype.getClassName = function () {
        return this.container.getAttribute('class');
    };
    List.prototype.getMarket = function (nameOrNumber) {
        var _this = this;
        var marketRoot;
        if (typeof nameOrNumber === 'number') {
            marketRoot = this.container.all(this.data.markets.root).get(nameOrNumber);
        }
        else {
            marketRoot = protractor_1.element.all(this.data.markets.root).filter(function (el) {
                return el.all(_this.data.markets.name).get(0).getText()
                    .then(function (text) {
                    return text.toLowerCase().trim().includes(nameOrNumber.toLowerCase());
                }, function () { return __awaiter(_this, void 0, void 0, function () {
                    var text;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, helper_1.helper.sleep(1000)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, el.all(this.data.markets.name).get(0).getText()];
                            case 2:
                                text = _a.sent();
                                return [2 /*return*/, text.toLowerCase().trim().includes(nameOrNumber.toLowerCase())];
                        }
                    });
                }); });
            }).first();
        }
        return new market_1.MarketRow(marketRoot);
    };
    List.prototype.getListName = function () {
        return this.name;
    };
    List.prototype.getMarketsCount = function (name) {
        var _this = this;
        name = name.toLowerCase();
        return this.container.all(this.data.markets.root).filter(function (el) {
            return el.element(_this.data.markets.name).getText()
                .then(function (text) {
                return text.toLowerCase().trim().includes(name);
            });
        }).count();
    };
    List.prototype.doesMarketExist = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = name.toLowerCase();
                        return [4 /*yield*/, this.container.waitReady(3000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, protractor_1.browser.wait(function () {
                                return _this.container.all(_this.data.markets.root).filter(function (el) {
                                    return el.element(_this.data.markets.name).getText()
                                        .then(function (text) {
                                        return text.toLowerCase().trim().includes(name);
                                    });
                                }).count()
                                    .then(function (count) { return helper_1.helper.sleepIfFalse(count > 0); }, 500);
                            }, 10000)
                                .then(function () { return true; }, function () { return false; })];
                }
            });
        });
    };
    List.prototype.doesMarketAbsent = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = name.toLowerCase();
                        return [4 /*yield*/, this.container.waitReady(3000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, protractor_1.browser.wait(function () {
                                return _this.container.all(_this.data.markets.root).filter(function (el) {
                                    return el.element(_this.data.markets.name).getText()
                                        .then(function (text) {
                                        return text.toLowerCase().trim().includes(name);
                                    }, function () {
                                        return false;
                                    });
                                }).count()
                                    .then(function (count) { return helper_1.helper.sleepIfFalse(count === 0, 500); });
                            }, 10000)
                                .then(function () { return true; }, function () { return false; })];
                }
            });
        });
    };
    return List;
}());
//# sourceMappingURL=positions-and-orders-panel.js.map