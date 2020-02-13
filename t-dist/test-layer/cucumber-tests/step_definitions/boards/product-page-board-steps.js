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
    When(/^I am on the '(.+)'$/, function (noPanelComponent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.getNoPanelComponent(noPanelComponent)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I switch to '(.+)'$/, function (noPanelComponent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        noPanelComponent = noPanelComponent.toLowerCase();
                        if (!(noPanelComponent === 'economic calendar')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.getNoPanelComponent(noPanelComponent).switchToEconomicCalendar()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    });
    When(/^I click on (dropdown arrow|more icon|) in product page$/, function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.clickOnElement(elementName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I switch on the market on the '(.+)'(?:st|th|nd|rd) position$/, function (positionNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getMarket(parseInt(positionNumber) - 1).click('name')];
                    case 1:
                        _b.sent();
                        _a = this.memory;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getNameMarket(parseInt(positionNumber) - 1)];
                    case 2:
                        _a.marketName = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I switch on '(.+)'(?:st|th|nd|rd) market from markets dropdown in product page$/, function (positionNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.memory;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel
                                .getNameMarket(parseInt(positionNumber) - 1, 'within markets dropdown')];
                    case 1:
                        _a.marketName = _b.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.selectMarketFromDropdown(parseInt(positionNumber) - 1)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I switch to '(.+)' watchlist within dropdown list in product page$/, function (watchlistName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.memory.currentWatchlist = watchlistName;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.switchToWatchlist(watchlistName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)'(?:st|th|nd|rd|) market inside market container should (be|be not) hightlighted$/, function (marketNameOrNumber, isHightlighted) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedColor, actualColor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (marketNameOrNumber === 'selected') {
                            marketNameOrNumber = this.memory.marketName;
                        }
                        else if (parseInt(marketNameOrNumber)) {
                            marketNameOrNumber = marketNameOrNumber - 1;
                        }
                        expectedColor = isHightlighted.includes('not')
                            ? '0, 0, 0'
                            : '72, 72, 72';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getMarket(marketNameOrNumber).getSubItemRowColor()];
                    case 1:
                        actualColor = _a.sent();
                        this.expect(actualColor).to.include(expectedColor);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)' should be (visible|invisible) in product page$/, function (element, visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedResult, actualResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = visibility.toLowerCase() === 'visible';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.isElementPresent(element)];
                    case 1:
                        actualResult = _a.sent();
                        this.expect(expectedResult).to.equal(actualResult);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the correct market display to the right '(.+)'(?:st|th|nd|rd|) position$/, function (positionNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var actualMarketName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(positionNumber === 'last')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAllMarketsNames()];
                    case 1:
                        positionNumber = (_a.sent()).length;
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getNameMarket(parseInt(positionNumber) - 1)];
                    case 3:
                        actualMarketName = _a.sent();
                        this.expect(this.memory.marketName).to.equal(actualMarketName);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the correct market display in market information$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            var actualMarketName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getMarketName()];
                    case 1:
                        actualMarketName = _a.sent();
                        this.expect(this.memory.marketName).to.equal(actualMarketName);
                        return [4 /*yield*/, protractor_1.browser.switchTo().defaultContent()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^existed watchlists displayed in correct order within watchlist (dropdown body|) in product page$/, function (elementsName) {
        return __awaiter(this, void 0, void 0, function () {
            var actualList, sortedWatchlists, expectedList;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getWatchlistDropdownOptions()];
                    case 1:
                        actualList = _a.sent();
                        sortedWatchlists = this.memory.allWatchlists.filter(function (item) { return item !== _this.memory.currentWatchlist; }).sort();
                        expectedList = [this.memory.currentWatchlist].concat(sortedWatchlists);
                        this.expect(actualList).to.deep.equal(expectedList);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^all markets from selected watchlist are displayed in market container$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            var actualList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAllMarketsNames()];
                    case 1:
                        actualList = _a.sent();
                        this.expect(actualList).to.deep.equal(this.memory.allMarketsInCurrentWatchlist);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^part of markets from '(.+)' watchlist is displayed in market container$/, function (watchlistName) {
        return __awaiter(this, void 0, void 0, function () {
            var allWatchlistMarkets, group, keys, sortedGroup, i, b, actualList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(watchlistName === 'Popular Markets')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.backendHelper.getMarketsNamesByQuery(152, 50, '', true, true, true)];
                    case 1:
                        allWatchlistMarkets = _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.groupByWeighting(allWatchlistMarkets)];
                    case 3:
                        group = _a.sent();
                        keys = Object.keys(group);
                        sortedGroup = [];
                        i = keys.length - 1;
                        _a.label = 4;
                    case 4:
                        if (!(i >= 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.sortByName(group[keys[i]])];
                    case 5:
                        b = _a.sent();
                        sortedGroup.push(b);
                        _a.label = 6;
                    case 6:
                        i--;
                        return [3 /*break*/, 4];
                    case 7:
                        allWatchlistMarkets = sortedGroup.reduce(function (accumulator, currentValue) {
                            return accumulator.concat(currentValue);
                        }, []);
                        this.memory.popularMarkets = allWatchlistMarkets;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAllMarketsNames()];
                    case 8:
                        actualList = _a.sent();
                        actualList = actualList.map(function (value) { return value.toLowerCase(); });
                        this.memory.hiddenPopularMarkets = allWatchlistMarkets.slice(actualList.length);
                        this.memory.lastVisibleMarket = actualList[actualList.length - 1];
                        this.expect(allWatchlistMarkets.some(function (value) { return actualList.includes(value); })).to.equal(true);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the markets dropdown contains all the markets from selected watchlist that don't fit product page$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            var actualList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAllMarketsNames('within markets dropdown')];
                    case 1:
                        actualList = _a.sent();
                        actualList = actualList.map(function (value) { return value.toLowerCase(); });
                        this.expect(actualList).to.deep.equal(this.memory.hiddenPopularMarkets);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^markets dropdown contains previous market from the last position of Market container$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            var actualList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAllMarketsNames('within markets dropdown')];
                    case 1:
                        actualList = _a.sent();
                        actualList = actualList.map(function (value) { return value.toLowerCase(); });
                        this.expect(actualList.includes(this.memory.lastVisibleMarket)).to.equal(true);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' section should be (at the left side of|to the left of|to the right of) '(.+)'( section| page)$/, function (sectionName, location, elemToCompareName, elemToCompareType) {
        return __awaiter(this, void 0, void 0, function () {
            var sectionElement, elementToCompare;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.getElementLocation(sectionName)];
                    case 1:
                        sectionElement = _a.sent();
                        if (!elemToCompareType.includes('section')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.getElementLocation(elemToCompareName)];
                    case 2:
                        elementToCompare = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        elementToCompare = { x: 0, y: 0 };
                        _a.label = 4;
                    case 4:
                        if (location === 'at the left side') {
                            this.expect(sectionElement.x).to.equal(0);
                        }
                        else if (location === 'to the left of') {
                            this.expect(sectionElement.x).to.be.above(elementToCompare.x);
                        }
                        else {
                            this.expect(sectionElement.x).to.be.below(elementToCompare.x);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=product-page-board-steps.js.map