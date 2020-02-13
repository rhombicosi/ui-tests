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
var cucumber_1 = require("cucumber");
var protractor_1 = require("protractor");
cucumber_1.defineSupportCode(function (_a) {
    var Given = _a.Given, When = _a.When, Then = _a.Then;
    Then(/^the chart( on browse tab | )should be loaded$/, function (location) {
        return __awaiter(this, void 0, void 0, function () {
            var isChartVisible, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        location = location.trim();
                        if (!(location === 'on browse tab')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel('chart').isChartVisible()];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.isChartVisible()];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        isChartVisible = _a;
                        this.expect(isChartVisible).to.equal(true);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the chart( on browse tab | on search modal | )is( | not) present$/, function (location, visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var isChartVisible, expectedState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        location = location.trim();
                        if (!(location === 'on browse tab' || location === 'on search modal')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel('chart').isElementPresent('chart')];
                    case 1:
                        isChartVisible = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.isChartVisible()];
                    case 3:
                        isChartVisible = _a.sent();
                        _a.label = 4;
                    case 4:
                        expectedState = !(visibility === ' not');
                        this.expect(isChartVisible).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I switch market to '(.+)'$/, function (marketName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.switchMarket(marketName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' market should be opened on the chart$/, function (marketName) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultChartKey, accountInformation, marketId, marketNameLabel;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        defaultChartKey = 'defaultCharts';
                        return [4 /*yield*/, this.backendHelper.getClientAndTradingAccount()];
                    case 1:
                        accountInformation = _a.sent();
                        return [4 /*yield*/, this.backendHelper.getClientApplicationMessageTranslationWithInterestingItems(0, // INFO: as in AP app
                            accountInformation.CultureId, accountInformation.AccountOperatorId, [defaultChartKey])];
                    case 2:
                        marketId = (_a.sent())[0].Value.split(',')[0];
                        if (!(marketName === 'default')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.backendHelper.getMarketInformation(marketId)];
                    case 3:
                        marketName = (_a.sent()).Name;
                        return [3 /*break*/, 5];
                    case 4:
                        if (marketName === 'current') {
                            marketName = this.memory.marketName;
                        }
                        _a.label = 5;
                    case 5: return [4 /*yield*/, protractor_1.browser.wait(function () {
                            return _this.basePage.currentBoard.tabBody.currentPanel.getMarketNameLabelText()
                                .then(function (text) {
                                marketNameLabel = text;
                                return _this.helper.sleepIfFalse(text.includes(marketName), 300);
                            });
                        }, 5000)
                            .then(function () { return null; }, function () { return null; })];
                    case 6:
                        _a.sent();
                        this.expect(marketNameLabel).to.include(marketName);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' market should be in panel header$/, function (marketName) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultChartKey, accountInformation, marketId, panelName;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        defaultChartKey = 'defaultCharts';
                        return [4 /*yield*/, this.backendHelper.getClientAndTradingAccount()];
                    case 1:
                        accountInformation = _a.sent();
                        return [4 /*yield*/, this.backendHelper.getClientApplicationMessageTranslationWithInterestingItems(0, // INFO: as in AP app
                            accountInformation.CultureId, accountInformation.AccountOperatorId, [defaultChartKey])];
                    case 2:
                        marketId = (_a.sent())[0].Value.split(',')[0];
                        if (!(marketName === 'default')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.backendHelper.getMarketInformation(marketId)];
                    case 3:
                        marketName = (_a.sent()).Name;
                        _a.label = 4;
                    case 4: return [4 /*yield*/, protractor_1.browser.wait(function () {
                            return _this.basePage.currentBoard.tabBody.currentPanel.getPanelHeaderName()
                                .then(function (text) {
                                panelName = text;
                                return _this.helper.sleepIfFalse(text.includes(marketName));
                            });
                        }, 100000)
                            .then(function () { return null; }, function () { return null; })];
                    case 5:
                        _a.sent();
                        this.expect(panelName).to.include(marketName);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the( add icon | price axis )is (invisible|visible) after mouse hovering$/, function (chartElement, visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedResult, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = visibility.toLowerCase() === 'visible';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel('chart').isChartElementVisibleOnMouseHover(chartElement)];
                    case 1:
                        result = _a.sent();
                        this.expect(result).to.equal(expectedResult);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^(sell button |buy button | )element should be (enabled|disabled) inside chart$/, function (name, status) {
        return __awaiter(this, void 0, void 0, function () {
            var actualState, expectedState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel('chart').isElementEnable(name)];
                    case 1:
                        actualState = _a.sent();
                        expectedState = status === 'enabled';
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^(sell button |buy button | )element should be colored in '(red|blue)'$/, function (name, color) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedColorPart, actualColor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedColorPart = color === 'red' ? '222, 69, 89' : '21, 125, 177';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel('chart').getButtonBackground(name)];
                    case 1:
                        actualColor = _a.sent();
                        this.expect(actualColor).to.include(expectedColorPart);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^(sell button |buy button | )element should be located inside chart$/, function (chartElement) {
        return __awaiter(this, void 0, void 0, function () {
            var actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel('chart').isElementInsideChart(chartElement)];
                    case 1:
                        actualState = _a.sent();
                        this.expect(actualState).to.equal(true);
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I move sell\/buy button inside chart$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel('chart').moveSellBuyButtons()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I click on( sell| buy) button within Chart$/, function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel('chart').clickOnChartPrice(name)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I wait for chart loading$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel('chart').waitForChartLoading()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I click on (close chart|add to workspace|add to watchlist|market 360|price alert) within menu above Chart/, function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel('chart').clickOnElement(name)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I wait '(.+)' disappear$/, function (elementsName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel('chart').waitForElementsDisappeared(elementsName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^(workspaces|watchlists) displayed in alphabetical order within dropdown$/, function (elementsName) {
        return __awaiter(this, void 0, void 0, function () {
            var actualList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel('chart').getDropdownOptions(elementsName)];
                    case 1:
                        actualList = _a.sent();
                        this.expect(actualList).to.deep.equal(actualList.sort());
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' is (invisible|visible)$/, function (elementName, visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedResult, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = visibility.toLowerCase() === 'visible';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel('chart').isElementVisible(elementName)];
                    case 1:
                        result = _a.sent();
                        this.expect(result).to.equal(expectedResult);
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I add current chart to '(.+)' from dropdown$/, function (elementNameForAdding) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel('chart').addChartTo(elementNameForAdding)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=chart-steps.js.map