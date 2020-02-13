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
var market_1 = require("../elements/market");
var helper_1 = require("../../utils/helper");
var SearchModal = /** @class */ (function () {
    function SearchModal(container) {
        if (container === void 0) { container = protractor_1.element(protractor_1.by.css('.market-search-modal')); }
        this.data = {
            header: protractor_1.by.css('.market-search-modal__showing-panel'),
            markets: protractor_1.by.tagName('app-market-search-table-row'),
            'market names': protractor_1.by.tagName('app-market-search-table-row .name'),
            'browse markets': protractor_1.by.css('.market-search-modal__footer'),
            'loading spinner': protractor_1.by.css('.loader'),
            'result header': protractor_1.by.css('.search-results__column--header'),
            'product type list': protractor_1.by.css('.product-types__list span'),
            'product type filter': {
                root: protractor_1.by.tagName('app-product-type-filter'),
                label: protractor_1.by.css('.product-types__list span'),
                dropdown: protractor_1.by.css('.product-types__dropdown'),
                items: protractor_1.by.css('.product-types__dropdown-item'),
                toggle: protractor_1.by.css('.product-types__dropdown-options-toggle')
            },
            'filter items': protractor_1.by.css('.market-filters__item')
        };
        this.container = container;
    }
    SearchModal.prototype.getHeaderBackground = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.header).waitReady(3000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.container.element(this.data.header).getCssValue('background-color')];
                }
            });
        });
    };
    SearchModal.prototype.isVisible = function () {
        return this.container.waitReady(3000)
            .then(function () { return true; }, function () { return false; });
    };
    SearchModal.prototype.isElementVisible = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.container.element(this.data[name]).waitReady(3000)
                        .then(function () { return true; }, function () { return false; })];
            });
        });
    };
    SearchModal.prototype.getElementText = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data[name]).waitReady(3000)];
                    case 1:
                        el = _a.sent();
                        return [4 /*yield*/, el.getText()];
                    case 2: return [2 /*return*/, (_a.sent()).trim()];
                }
            });
        });
    };
    SearchModal.prototype.getMarket = function (nameOrNumber) {
        var marketRoot;
        if (typeof nameOrNumber === 'number') {
            marketRoot = this.container.all(this.data.markets).get(nameOrNumber);
        }
        else {
            marketRoot = protractor_1.element.all(this.data.markets).filter(function (el) {
                return el.element(protractor_1.by.css('.name')).getText()
                    .then(function (text) {
                    return text.toLowerCase().trim() === nameOrNumber.toLowerCase();
                });
            }).first();
        }
        return new market_1.MarketRow(marketRoot);
    };
    SearchModal.prototype.getMarketsCount = function () {
        return this.container.all(this.data.markets).count();
    };
    SearchModal.prototype.getAllMarketsTitles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var textArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.all(this.data['market names']).getText()];
                    case 1:
                        textArr = _a.sent();
                        return [2 /*return*/, textArr.map(function (t) { return t.trim(); })];
                }
            });
        });
    };
    SearchModal.prototype.click = function (on) {
        return __awaiter(this, void 0, void 0, function () {
            var el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        on = on.toLowerCase();
                        return [4 /*yield*/, this.container.element(this.data[on]).waitReady(3000)];
                    case 1:
                        el = _a.sent();
                        return [4 /*yield*/, el.click()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SearchModal.prototype.waitForMarketsLoading = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data['loading spinner']).waitReady(2000)
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
    };
    SearchModal.prototype.selectProductTypeFilter = function (optionName) {
        return __awaiter(this, void 0, void 0, function () {
            var el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        optionName = optionName.toLowerCase();
                        return [4 /*yield*/, this.container.element(this.data['product type filter'].label).click()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data['product type filter'].dropdown).waitReady(3000)];
                    case 2:
                        el = _a.sent();
                        return [4 /*yield*/, el.all(this.data['product type filter'].items).filter(function (option) {
                                return option.getText()
                                    .then(function (text) { return text.toLowerCase().trim() === optionName; });
                            }).first().click()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SearchModal.prototype.setIncludeOptions = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var antiState, el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        antiState = state.toLowerCase() === 'on' ? 'off' : 'on';
                        if (state !== 'on' && state !== 'off') {
                            throw new Error('Wrong state. Should be "on" or "off".');
                        }
                        return [4 /*yield*/, this.container.element(this.data['product type filter'].label).click()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data['product type filter'].dropdown).waitReady(3000)];
                    case 2:
                        el = _a.sent();
                        return [4 /*yield*/, el.element(protractor_1.by.css("." + antiState)).click()
                                .then(null, function () {
                                console.log("Include option is already in \"" + state + "\" state");
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SearchModal.prototype.selectMarketFilter = function (optionName) {
        optionName = optionName.toLowerCase();
        return this.container.all(this.data['filter items']).filter(function (item) {
            return item.getText()
                .then(function (text) { return text.toLowerCase().trim() === optionName; });
        }).first().click();
    };
    return SearchModal;
}());
exports.SearchModal = SearchModal;
//# sourceMappingURL=search-modal.js.map