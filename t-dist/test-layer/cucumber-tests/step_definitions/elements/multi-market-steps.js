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
var cucumber_1 = require("cucumber");
var protractor_1 = require("protractor");
cucumber_1.defineSupportCode(function (_a) {
    var Given = _a.Given, When = _a.When, Then = _a.Then;
    When(/^I (expand|collapse) '(.+)'(?:st|th|nd|rd|) multi-market$/, function (action, marketNameOrNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current')) return [3 /*break*/, 1];
                        marketNameOrNumber = this.memory.marketName;
                        return [3 /*break*/, 4];
                    case 1:
                        if (!parseInt(marketNameOrNumber)) return [3 /*break*/, 3];
                        marketNameOrNumber = marketNameOrNumber - 1;
                        _a = this.memory;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getName()];
                    case 2:
                        _a.marketName = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.memory.marketName = marketNameOrNumber;
                        _b.label = 4;
                    case 4: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber)[action]()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I hover '(.+)'(?:st|th|nd|rd|) multi-market's '(.+)'(?:st|th|nd|rd|) sub-market$/, function (market, subMarket) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = parseInt(market) - 1;
                        subMarket = parseInt(subMarket) - 1;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(market).getSubMarket(subMarket).hover()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I click on '(.+)' in the '(.+)'(?:st|th|nd|rd|) multi-market's '(.+)'(?:st|th|nd|rd|) sub-market$/, function (point, market, subMarket) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = parseInt(market) - 1;
                        subMarket = parseInt(subMarket) - 1;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(market).getSubMarket(subMarket).click(point)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I select '(.+)' in dropdown menu in the '(.+)'(?:st|th|nd|rd|) multi-market's '(.+)'(?:st|th|nd|rd|) sub-market$/, function (option, market, subMarket) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = parseInt(market) - 1;
                        subMarket = parseInt(subMarket) - 1;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(market).getSubMarket(subMarket).selectDropdownOption(option)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)'(?:st|th|nd|rd|) market's sub-markets count should be '(.+)'$/, function (marketNameOrNumber, expectedCount) {
        return __awaiter(this, void 0, void 0, function () {
            var actualCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
                            marketNameOrNumber = this.memory.marketName;
                        }
                        else if (parseInt(marketNameOrNumber)) {
                            marketNameOrNumber = marketNameOrNumber - 1;
                        }
                        expectedCount = expectedCount * 1;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getSubMarketsCount()];
                    case 1:
                        actualCount = _a.sent();
                        this.expect(actualCount).to.equal(expectedCount);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)'(?:st|th|nd|rd|) multi-market opening price should be average for opening prices of sub-markets$/, function (marketNameOrNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var price, position, submarketPrices, submarketQuantities, actualPrice, generalQuantity, totalSum, expectedPrice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
                            marketNameOrNumber = this.memory.marketName;
                        }
                        else if (parseInt(marketNameOrNumber)) {
                            marketNameOrNumber = marketNameOrNumber - 1;
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText('opening price')];
                    case 1:
                        price = _a.sent();
                        price = price.replace(',', '');
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText('position')];
                    case 2:
                        position = _a.sent();
                        return [4 /*yield*/, this.backendHelper.getBackendMultiDataByName(this.memory.marketName, 'Price', true)];
                    case 3:
                        submarketPrices = _a.sent();
                        return [4 /*yield*/, this.backendHelper.getBackendMultiDataByName(this.memory.marketName, 'Quantity', true)];
                    case 4: return [4 /*yield*/, _a.sent()];
                    case 5:
                        submarketQuantities = _a.sent();
                        actualPrice = parseFloat((price * 1).toPrecision(6));
                        generalQuantity = position.split('\n')[1].replace(',', '') * 1;
                        totalSum = submarketPrices.reduce(function (sum, el, i) {
                            return sum + el * submarketQuantities[i];
                        }, 0);
                        expectedPrice = parseFloat((totalSum / generalQuantity).toPrecision(6));
                        this.expect(actualPrice).to.be.below(expectedPrice * 1.00002);
                        this.expect(actualPrice).to.be.above(expectedPrice * 0.99998);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)'(?:st|th|nd|rd|) market's '(\d+)'(?:st|th|nd|rd|) sub-market should be black when it is hovered and other sub-markets should be white$/, function (marketNameOrNumber, subMarketNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedTargetColor, expectedOtherColor, actualTargetColor, subMarketsCount, promises, iterator;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
                            marketNameOrNumber = this.memory.marketName;
                        }
                        else if (parseInt(marketNameOrNumber)) {
                            marketNameOrNumber = marketNameOrNumber - 1;
                        }
                        expectedTargetColor = '26, 26, 26';
                        expectedOtherColor = '255, 255, 255';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getSubMarket(subMarketNumber).hover()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getSubMarket(subMarketNumber).getSubItemRowColor()];
                    case 2:
                        actualTargetColor = _a.sent();
                        this.expect(actualTargetColor).to.include(expectedTargetColor);
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getSubMarketsCount()];
                    case 3:
                        subMarketsCount = _a.sent();
                        promises = [];
                        for (iterator = 0; iterator < subMarketsCount; iterator += 1) {
                            if (iterator !== subMarketNumber) {
                                promises.push(this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getSubMarket(iterator).getSubItemRowColor()
                                    .then(function (actualOtherColor) {
                                    _this.expect(actualOtherColor).to.include(expectedOtherColor);
                                }));
                            }
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)'(?:st|th|nd|rd|) multi-market should be '(expanded|collapsed)'$/, function (marketNameOrNumber, state) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedState, actualState;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
                            marketNameOrNumber = this.memory.marketName;
                        }
                        else if (parseInt(marketNameOrNumber)) {
                            marketNameOrNumber = marketNameOrNumber - 1;
                        }
                        expectedState = state === 'expanded';
                        return [4 /*yield*/, protractor_1.browser.wait(function () {
                                return _this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).isExpanded()
                                    .then(function (is) {
                                    actualState = is;
                                    return _this.helper.sleepIfFalse(actualState === expectedState);
                                });
                            }, 3000)
                                .then(function () { return null; }, function () { return null; })];
                    case 1:
                        _a.sent();
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=multi-market-steps.js.map