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
    When(/^I click on '(.+)' in the '(.+)'(?:st|th|nd|rd|)( market| market on browse tab| position| found market| order|)$/, function (point, marketNameOrNumber, itemType) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current')) return [3 /*break*/, 1];
                        marketNameOrNumber = this.memory.marketName;
                        return [3 /*break*/, 7];
                    case 1:
                        if (!parseInt(marketNameOrNumber)) return [3 /*break*/, 6];
                        marketNameOrNumber = marketNameOrNumber - 1;
                        if (!itemType.includes('found')) return [3 /*break*/, 3];
                        _a = this.memory;
                        return [4 /*yield*/, this.basePage.searchModal.getMarket(marketNameOrNumber).getName()];
                    case 2:
                        _a.marketName = _c.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        _b = this.memory;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getName()];
                    case 4:
                        _b.marketName = _c.sent();
                        _c.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        if (marketNameOrNumber.toLowerCase() === 'closed' || marketNameOrNumber.toLowerCase() === 'phone only') {
                            marketNameOrNumber = this.memory[marketNameOrNumber];
                        }
                        else {
                            this.memory.marketName = marketNameOrNumber;
                        }
                        _c.label = 7;
                    case 7:
                        if (point === 'sell' || point === 'buy') {
                            this.memory.direction = point;
                        }
                        if (!itemType.includes('found')) return [3 /*break*/, 11];
                        if (!process.env.npm_config_browser.includes('firefox')) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.basePage.searchModal.getMarket(marketNameOrNumber).scrollTo()];
                    case 8:
                        _c.sent();
                        _c.label = 9;
                    case 9: return [4 /*yield*/, this.basePage.searchModal.getMarket(marketNameOrNumber).click(point)];
                    case 10:
                        _c.sent();
                        return [3 /*break*/, 19];
                    case 11:
                        if (!itemType.includes('market on browse tab')) return [3 /*break*/, 15];
                        if (!process.env.npm_config_browser.includes('firefox')) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.marketTable.getMarket(marketNameOrNumber).scrollTo()];
                    case 12:
                        _c.sent();
                        _c.label = 13;
                    case 13: return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.marketTable.getMarket(marketNameOrNumber).click(point)];
                    case 14:
                        _c.sent();
                        return [3 /*break*/, 19];
                    case 15:
                        if (!process.env.npm_config_browser.includes('firefox')) return [3 /*break*/, 17];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).scrollTo()];
                    case 16:
                        _c.sent();
                        _c.label = 17;
                    case 17: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).click(point)];
                    case 18:
                        _c.sent();
                        _c.label = 19;
                    case 19: return [2 /*return*/];
                }
            });
        });
    });
    When(/^I hover '(.+)'(?:st|th|nd|rd|) (?:market|position|order)$/, function (marketNameOrNumber) {
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
                    case 4: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).hover()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I remove '(.+)'(?:st|th|nd|rd|) (?:market|position|order)$/, function (marketNameOrNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, listName, closeAllSubMarkets, isMulti, isExpanded;
            var _this = this;
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
                    case 4:
                        listName = this.basePage.currentBoard.tabBody.currentPanel.currentList.getListName();
                        closeAllSubMarkets = function () {
                            return Promise.resolve()
                                .then(function () { return _this.basePage.currentBoard.tabBody.currentPanel.getList(listName).getMarket(marketNameOrNumber).getSubMarket(0).click('delete'); })
                                .then(function () { return _this.basePage.currentBoard.tabBody.getPanel('Deal Ticket').submit(); })
                                .then(function () { return _this.basePage.currentBoard.tabBody.getPanel('positions and orders').getList(listName).doesMarketExist(_this.memory.marketName); })
                                .then(function (is) {
                                if (is) {
                                    return closeAllSubMarkets();
                                }
                            });
                        };
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).isMulti()];
                    case 5:
                        isMulti = _b.sent();
                        if (!!isMulti) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).click('delete')];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel('Deal Ticket').submit()];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel('positions and orders')];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 14];
                    case 9: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).isExpanded()];
                    case 10:
                        isExpanded = _b.sent();
                        if (!!isExpanded) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).expand()];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12: return [4 /*yield*/, closeAllSubMarkets()];
                    case 13:
                        _b.sent();
                        _b.label = 14;
                    case 14: return [2 /*return*/];
                }
            });
        });
    });
    When(/^I select '(.+)' in dropdown menu in '(.+)'(?:st|th|nd|rd|) (?:market|position|order)$/, function (optionNameOrNumber, marketNameOrNumber) {
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
                    case 4:
                        if (parseInt(optionNameOrNumber)) {
                            optionNameOrNumber = optionNameOrNumber - 1;
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).selectDropdownOption(optionNameOrNumber)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I complete '(.+)'(?:st|th|nd|rd|) (market|position|order|found market) dropdown with value '(.+)'$/, function (marketNameOrNumber, itemType, optionNameOrNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current')) return [3 /*break*/, 1];
                        marketNameOrNumber = this.memory.marketName;
                        return [3 /*break*/, 7];
                    case 1:
                        if (!parseInt(marketNameOrNumber)) return [3 /*break*/, 6];
                        marketNameOrNumber = marketNameOrNumber - 1;
                        if (!itemType.includes('found')) return [3 /*break*/, 3];
                        _a = this.memory;
                        return [4 /*yield*/, this.basePage.searchModal.getMarket(marketNameOrNumber).getName()];
                    case 2:
                        _a.marketName = _c.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        _b = this.memory;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getName()];
                    case 4:
                        _b.marketName = _c.sent();
                        _c.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        this.memory.marketName = marketNameOrNumber;
                        _c.label = 7;
                    case 7:
                        if (parseInt(optionNameOrNumber)) {
                            optionNameOrNumber = optionNameOrNumber - 1;
                        }
                        if (!itemType.includes('found')) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.basePage.searchModal.getMarket(marketNameOrNumber).completeDropdownWithOption(optionNameOrNumber)];
                    case 8:
                        _c.sent();
                        return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).completeDropdownWithOption(optionNameOrNumber)];
                    case 10:
                        _c.sent();
                        _c.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        });
    });
    When(/^I add new '(.+)' watchlist( from menu panel|)$/, function (watchlistName, location) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.searchModal.getMarket(this.memory.marketName).actionsMenu.addNewWatchlist(watchlistName, location)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I click on '(.+)' watchlist$/, function (watchlistName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.searchModal.getMarket(this.memory.marketName).actionsMenu.addMarketToWatchlist(watchlistName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I hover mouse on (Sell|Buy) price in the '(.+)'(?:st|th|nd|rd) market( on browse tab|)$/, function (typePrice, marketNameOrNumber, location) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof parseInt(marketNameOrNumber) === 'number') {
                            marketNameOrNumber = marketNameOrNumber - 1;
                        }
                        if (!(location === ' on browse tab')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.marketTable.getMarket(marketNameOrNumber).hoverElement(typePrice + " on browse")];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).hoverElement(typePrice)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)'(?:st|th|nd|rd|) (?:market|position|order) should be (present|not present) on the list$/, function (marketNameOrNumber, isPresent) {
        return __awaiter(this, void 0, void 0, function () {
            var actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
                            marketNameOrNumber = this.memory.marketName;
                        }
                        else if (parseInt(marketNameOrNumber)) {
                            marketNameOrNumber = marketNameOrNumber - 1;
                        }
                        if (!(isPresent === 'present')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.doesMarketExist(marketNameOrNumber)];
                    case 1:
                        actualState = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.doesMarketAbsent(marketNameOrNumber)];
                    case 3:
                        actualState = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(actualState === false)) return [3 /*break*/, 10];
                        console.log('refresh');
                        return [4 /*yield*/, protractor_1.browser.refresh()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.basePage.waitLoading()];
                    case 6:
                        _a.sent();
                        if (!(isPresent === 'present')) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.doesMarketExist(marketNameOrNumber)];
                    case 7:
                        actualState = _a.sent();
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.doesMarketAbsent(marketNameOrNumber)];
                    case 9:
                        actualState = _a.sent();
                        _a.label = 10;
                    case 10:
                        this.expect(actualState).to.equal(true);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)'(?:st|th|nd|rd|) (?:market|position|order) should be colored correctly$/, function (marketNameOrNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var listName, positionColor, text;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
                            marketNameOrNumber = this.memory.marketName;
                        }
                        else if (parseInt(marketNameOrNumber)) {
                            marketNameOrNumber = marketNameOrNumber - 1;
                        }
                        listName = this.basePage.currentBoard.tabBody.currentPanel.currentList.getListName();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getPositionColor()];
                    case 1:
                        positionColor = _a.sent();
                        if (!(listName === 'positions')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText('position')];
                    case 2:
                        text = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText('quantity')];
                    case 4:
                        text = _a.sent();
                        _a.label = 5;
                    case 5:
                        if (text.toLowerCase().includes('sell')) {
                            this.expect(positionColor).to.include('222, 69, 89');
                        }
                        else {
                            this.expect(positionColor).to.include('44, 124, 179');
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)'(?:st|th|nd|rd|) (?:market|position|order) '(.+)' should be (visible|not visible)$/, function (marketNameOrNumber, elementName, visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedCondition, actualCondition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
                            marketNameOrNumber = this.memory.marketName;
                        }
                        else if (parseInt(marketNameOrNumber)) {
                            marketNameOrNumber = marketNameOrNumber - 1;
                        }
                        expectedCondition = visibility === 'visible';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).isElementVisible(elementName)];
                    case 1:
                        actualCondition = _a.sent();
                        this.expect(actualCondition).to.equal(expectedCondition);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)'(?:st|th|nd|rd|) (?:market|position|order) dropdown options should be:$/, function (marketNameOrNumber, table) {
        return __awaiter(this, void 0, void 0, function () {
            var actualArray, expectedArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
                            marketNameOrNumber = this.memory.marketName;
                        }
                        else if (parseInt(marketNameOrNumber)) {
                            marketNameOrNumber = marketNameOrNumber - 1;
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getDropdownOptions()];
                    case 1:
                        actualArray = _a.sent();
                        expectedArray = table.raw().map(function (el) {
                            return el[0];
                        });
                        this.expect(actualArray).to.deep.equal(expectedArray);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)'(?:st|th|nd|rd|) (?:market|position|order) unrealised cell should be visible and colored correctly$/, function (marketNameOrNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var textColor, data, num;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
                            marketNameOrNumber = this.memory.marketName;
                        }
                        else if (parseInt(marketNameOrNumber)) {
                            marketNameOrNumber = marketNameOrNumber - 1;
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getUnrealisedColor()];
                    case 1:
                        textColor = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText('unrealised')];
                    case 2:
                        data = _a.sent();
                        num = data.split(/[\n ]/)[0] * 1;
                        if (num < 0) {
                            this.expect(textColor).to.include('222, 69, 89');
                        }
                        else {
                            this.expect(textColor).to.include('44, 124, 179');
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)'(?:st|th|nd|rd|)(?: market's | )(market|[Pp]osition|[Oo]rder|sub-market \d) '(.+)' cell should contain '(.*)' (?:data|word)$/, function (marketNameOrNumber, type, cellName, data) {
        return __awaiter(this, void 0, void 0, function () {
            var actualText, marketNumber_1, marketNumber;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = data.replace(' ', '').toLowerCase();
                        cellName = cellName.toLowerCase();
                        if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
                            marketNameOrNumber = this.memory.marketName;
                            if ((cellName === 'position' && data === 'correct') || (cellName === 'quantity' && data === 'correct')) {
                                data = this.memory.direction.toLowerCase() + this.memory.quantity;
                            }
                            else if ((cellName === 'position' || cellName === 'quantity') && data === 'updated') {
                                data = this.memory.direction + this.memory.leftQuantity;
                                data = data.toLowerCase();
                            }
                            else if (cellName === 'opening price' && data === 'correct') {
                                data = this.memory.prices[this.memory.direction.toLowerCase()].replace(/\n| |,/g, '');
                            }
                            else if (parseFloat(this.memory[cellName]) && data === 'correct') {
                                data = parseFloat(this.memory[cellName]);
                            }
                        }
                        else if (parseInt(marketNameOrNumber)) {
                            marketNameOrNumber = marketNameOrNumber - 1;
                        }
                        if (!(cellName === 'unrealised')) return [3 /*break*/, 5];
                        if (!type.includes('sub-market')) return [3 /*break*/, 2];
                        marketNumber_1 = parseInt(type.split(' ')[1]) - 1;
                        return [4 /*yield*/, protractor_1.browser.wait(function () {
                                return _this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getSubMarket(marketNumber_1).getText(cellName)
                                    .then(function (text) {
                                    actualText = text;
                                    return _this.helper.sleepIfFalse(actualText.toLowerCase().includes(data), 1000);
                                });
                            }, 20000)
                                .then(function () { return null; }, function () { return null; })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, protractor_1.browser.wait(function () {
                            return _this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText(cellName)
                                .then(function (text) {
                                actualText = text;
                                return _this.helper.sleepIfFalse(actualText.toLowerCase().includes(data), 1000);
                            });
                        }, 20000)
                            .then(function () { return null; }, function () { return null; })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        actualText = actualText.replace(/\n| |,/g, '').toLowerCase();
                        return [3 /*break*/, 10];
                    case 5:
                        if (!type.includes('sub-market')) return [3 /*break*/, 7];
                        marketNumber = parseInt(type.split(' ')[1]) - 1;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getSubMarket(marketNumber).getText(cellName)];
                    case 6:
                        actualText = _a.sent();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText(cellName)];
                    case 8:
                        actualText = _a.sent();
                        _a.label = 9;
                    case 9:
                        actualText = actualText.replace(/\n| |,/g, '').toLowerCase();
                        _a.label = 10;
                    case 10:
                        this.expect(actualText).to.include(data);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)'(?:st|th|nd|rd|) (?:market|position|order) current price cell should change with time$/, function (marketNameOrNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var data, state;
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
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText('current price')];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, protractor_1.browser.wait(function () {
                                return _this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText('current price')
                                    .then(function (text) { return _this.helper.sleepIfFalse(text !== data, 1000); });
                            }, 20000)
                                .then(function () { return true; }, function () { return false; })];
                    case 2:
                        state = _a.sent();
                        this.expect(state).to.equal(true);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)'(?:st|th|nd|rd|) (?:market|position|order)( on browse tab|) should be '(black|white)' when it is '(hovered|not hovered)'$/, function (marketNameOrNumber, location, color, isHovered) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedColor, actualColor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
                            marketNameOrNumber = this.memory.marketName;
                        }
                        else if (parseInt(marketNameOrNumber)) {
                            marketNameOrNumber = marketNameOrNumber - 1;
                        }
                        expectedColor = color === 'black' ? '26, 26, 26' : '255, 255, 255';
                        if (!(isHovered === 'hovered')) return [3 /*break*/, 4];
                        if (!(location === ' on browse tab')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.marketTable.getMarket(marketNameOrNumber).hover()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).hover()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(location === ' on browse tab')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.marketTable.getMarket(marketNameOrNumber).getRowColor()];
                    case 5:
                        actualColor = _a.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getRowColor()];
                    case 7:
                        actualColor = _a.sent();
                        _a.label = 8;
                    case 8:
                        if (!(isHovered === 'hovered')) return [3 /*break*/, 10];
                        return [4 /*yield*/, protractor_1.browser.actions().mouseMove({ x: 0, y: 500 }).perform()
                                .then(function () { return null; }, function () { return console.log('actions error'); })];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        this.expect(actualColor).to.include(expectedColor);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)' market on browse tab should not be hightlighted$/, function (marketNameOrNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedColor, actualColor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedColor = '0, 0, 0';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.marketTable.getMarket(marketNameOrNumber).getRowColor()];
                    case 1:
                        actualColor = _a.sent();
                        this.expect(actualColor).to.include(expectedColor);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)'(?:st|th|nd|rd|)(?: market's | )(market|position|order|sub-markets) columns should be visible:$/, function (marketNameOrNumber, type, table) {
        return __awaiter(this, void 0, void 0, function () {
            var promises;
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
                        promises = [];
                        table.raw().forEach(function (el) {
                            if (type === 'sub-markets') {
                                promises.push(_this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getSubMarket(0).isElementVisible(el[0])
                                    .then(function (actualState) {
                                    _this.expect(actualState).to.equal(true);
                                }));
                            }
                            else {
                                promises.push(_this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).isElementVisible(el[0])
                                    .then(function (actualState) {
                                    _this.expect(actualState).to.equal(true);
                                }));
                            }
                        });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)'(?:st|th|nd|rd|) (?:market|position|order) should be displayed as '(multi|single)'$/, function (marketNameOrNumber, isMulti) {
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
                        expectedState = isMulti === 'multi';
                        return [4 /*yield*/, protractor_1.browser.wait(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).isMulti()];
                                        case 1:
                                            actualState = _a.sent();
                                            return [2 /*return*/, this.helper.sleepIfFalse(actualState === expectedState, 500)];
                                    }
                                });
                            }); }, 5000)
                                .then(function () { return null; }, function () {
                                console.log('refresh');
                                return protractor_1.browser.refresh()
                                    .then(function () { return _this.basePage.waitLoading(); })
                                    .then(function () { return _this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).isMulti(); })
                                    .then(function (state) { return actualState = state; });
                            })];
                    case 1:
                        _a.sent();
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)'(?:st|th|nd|rd|)(?: market's | )(market|position|order|sub-market) '(.+)' should be correct$/, function (marketNameOrNumber, type, cellName) {
        return __awaiter(this, void 0, void 0, function () {
            var params, _a, actualData, dataArray, expectedData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cellName = cellName.toLowerCase();
                        params = {
                            'opening price': 'Price',
                        };
                        if (!(marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current')) return [3 /*break*/, 1];
                        marketNameOrNumber = this.memory.marketName;
                        return [3 /*break*/, 3];
                    case 1:
                        if (!parseInt(marketNameOrNumber)) return [3 /*break*/, 3];
                        marketNameOrNumber = marketNameOrNumber - 1;
                        _a = this.memory;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getName()];
                    case 2:
                        _a.marketName = _b.sent();
                        _b.label = 3;
                    case 3:
                        if (!(type === 'sub-market')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getSubMarket(0).getText(cellName)];
                    case 4:
                        actualData = _b.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText(cellName)];
                    case 6:
                        actualData = _b.sent();
                        _b.label = 7;
                    case 7:
                        actualData = actualData.replace(/\n| |,/g, '').toLowerCase();
                        return [4 /*yield*/, this.backendHelper.getBackendMultiDataByName(this.memory.marketName, params[cellName], true)];
                    case 8:
                        dataArray = _b.sent();
                        expectedData = dataArray[0];
                        if (parseFloat(actualData)) {
                            actualData = parseFloat(actualData);
                        }
                        this.expect(actualData).to.equal(expectedData);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)'(?:st|th|nd|rd|)(?: market's | )(market|position|order|sub-market) '([Ss]top price|[Ll]imit price)' should contain correct data$/, function (marketNameOrNumber, type, cellName) {
        return __awaiter(this, void 0, void 0, function () {
            var params, _a, actualData, listName, isPosition, dataObj, expectedData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cellName = cellName.toLowerCase();
                        params = {
                            'stop price': 'Stop',
                            'limit price': 'Limit',
                        };
                        if (!(marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current')) return [3 /*break*/, 1];
                        marketNameOrNumber = this.memory.marketName;
                        return [3 /*break*/, 3];
                    case 1:
                        if (!parseInt(marketNameOrNumber)) return [3 /*break*/, 3];
                        marketNameOrNumber = marketNameOrNumber - 1;
                        _a = this.memory;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getName()];
                    case 2:
                        _a.marketName = _b.sent();
                        _b.label = 3;
                    case 3:
                        if (!(type === 'sub-market')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getSubMarket(0).getText(cellName)];
                    case 4:
                        actualData = _b.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText(cellName)];
                    case 6:
                        actualData = _b.sent();
                        _b.label = 7;
                    case 7:
                        listName = this.basePage.currentBoard.tabBody.currentPanel.currentList.getListName();
                        isPosition = listName === 'positions';
                        actualData = actualData.replace(/\n| |,/g, '').toLowerCase();
                        return [4 /*yield*/, this.backendHelper.getBackendMultiDataByName(this.memory.marketName, 'IfDone', isPosition)];
                    case 8:
                        dataObj = _b.sent();
                        expectedData = dataObj[0][0][params[cellName]].TriggerPrice;
                        actualData = parseFloat(actualData);
                        this.expect(actualData).to.equal(expectedData);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)'(?:st|th|nd|rd|) (market|position|order|found market) '(.+)' should contain '(number|word)'$/, function (marketNameOrNumber, containerType, cellName, regexpType) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedRegexp, actualValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
                            marketNameOrNumber = this.memory.marketName;
                        }
                        else if (parseInt(marketNameOrNumber)) {
                            marketNameOrNumber = marketNameOrNumber - 1;
                        }
                        switch (regexpType) {
                            case 'number':
                                expectedRegexp = /\d+\.?\d*/;
                                break;
                            case 'word':
                                expectedRegexp = /\D+/;
                                break;
                        }
                        if (!containerType.includes('found')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.basePage.searchModal.getMarket(marketNameOrNumber).getText(cellName)];
                    case 1:
                        actualValue = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText(cellName)];
                    case 3:
                        actualValue = _a.sent();
                        _a.label = 4;
                    case 4:
                        this.expect(actualValue).to.match(expectedRegexp);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)'(?:st|th|nd|rd|) (market|position|order|found market) change cell should be correct$/, function (marketNameOrNumber, containerType) {
        return __awaiter(this, void 0, void 0, function () {
            var actualBid, actualAsk, actualChange, actualBidNum, actualAskNum, expectedChangeNum, actualChangeNum;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (marketNameOrNumber.toLowerCase() === 'previously added' || marketNameOrNumber.toLowerCase() === 'current') {
                            marketNameOrNumber = this.memory.marketName;
                        }
                        else if (parseInt(marketNameOrNumber)) {
                            marketNameOrNumber = marketNameOrNumber - 1;
                        }
                        if (!containerType.includes('found')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.basePage.searchModal.getMarket(marketNameOrNumber).getText('bid price')];
                    case 1:
                        actualBid = _a.sent();
                        return [4 /*yield*/, this.basePage.searchModal.getMarket(marketNameOrNumber).getText('ask price')];
                    case 2:
                        actualAsk = _a.sent();
                        return [4 /*yield*/, this.basePage.searchModal.getMarket(marketNameOrNumber).getText('change')];
                    case 3:
                        actualChange = _a.sent();
                        return [3 /*break*/, 8];
                    case 4: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText('bid price')];
                    case 5:
                        actualBid = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText('ask price')];
                    case 6:
                        actualAsk = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).getText('change')];
                    case 7:
                        actualChange = _a.sent();
                        _a.label = 8;
                    case 8:
                        actualBidNum = parseFloat(parseFloat(actualBid.replace(',', '')).toPrecision(6));
                        actualAskNum = parseFloat(parseFloat(actualAsk.replace(',', '')).toPrecision(6));
                        expectedChangeNum = actualBidNum - actualAskNum;
                        actualChangeNum = parseFloat(parseFloat(actualChange.replace(',', '')).toPrecision(6));
                        this.expect(actualChangeNum).to.equal(expectedChangeNum);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^action menu is (visible|not visible)$/, function (visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedState, actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedState = visibility === 'visible';
                        return [4 /*yield*/, this.basePage.searchModal.getMarket(this.memory.marketName).actionsMenu.isVisible()];
                    case 1:
                        actualState = _a.sent();
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' watchlist is (present|not present) in menu$/, function (watchlistName, visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedState, actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedState = visibility === 'present';
                        return [4 /*yield*/, this.basePage.searchModal.getMarket(this.memory.marketName).actionsMenu.isWatchListPresent(watchlistName)];
                    case 1:
                        actualState = _a.sent();
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^new watchlist button is (present|not present) in menu$/, function (visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedState, actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedState = visibility === 'present';
                        return [4 /*yield*/, this.basePage.searchModal.getMarket(this.memory.marketName).actionsMenu.isNewWatchlistVisible()];
                    case 1:
                        actualState = _a.sent();
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^confirmation icon is (visible|not visible) in '(.+)' watchlist$/, function (visibility, watchlistName) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedState, actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedState = visibility === 'visible';
                        return [4 /*yield*/, this.basePage.searchModal.getMarket(this.memory.marketName).actionsMenu.isConfirmationIconVisible(watchlistName)];
                    case 1:
                        actualState = _a.sent();
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the (Sell|Buy) price should be (white|black) in the '(.+)'(?:st|th|nd|rd) market( on browse tab|)$/, function (typePrice, color, numberOrNameMarket, location) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedColor, actualColor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof parseInt(numberOrNameMarket) === 'number') {
                            numberOrNameMarket = numberOrNameMarket - 1;
                        }
                        if (color === 'white') {
                            expectedColor = '255, 255, 255';
                        }
                        else {
                            expectedColor = '26, 26, 26';
                        }
                        if (!(location === ' on browse tab')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.browse.marketTable.getMarket(numberOrNameMarket).getElementColor(typePrice + " on browse")];
                    case 1:
                        actualColor = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList
                            .getMarket(numberOrNameMarket).getElementColor(typePrice)];
                    case 3:
                        actualColor = _a.sent();
                        _a.label = 4;
                    case 4:
                        this.expect(actualColor).to.include(expectedColor);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(\d+)' '(.+)' (?:market|order)s? should be on the list$/, function (expectedNumber, marketName) {
        return __awaiter(this, void 0, void 0, function () {
            var actualNumber, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (marketName.toLowerCase() === 'previously added' || marketName.toLowerCase() === 'current') {
                            marketName = this.memory.marketName;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 7]);
                        return [4 /*yield*/, protractor_1.browser.wait(function () {
                                return _this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarketsCount(marketName)
                                    .then(function (num) {
                                    actualNumber = num;
                                    return _this.helper.sleepIfFalse(actualNumber === expectedNumber, 500);
                                });
                            }, 5000)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        err_1 = _a.sent();
                        console.log('refresh');
                        return [4 /*yield*/, protractor_1.browser.refresh()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.basePage.waitLoading()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.wait(function () {
                                return _this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarketsCount(marketName)
                                    .then(function (num) {
                                    actualNumber = num;
                                    return _this.helper.sleepIfFalse(actualNumber === expectedNumber, 500);
                                });
                            }, 5000)
                                .then(function () { return null; }, function () { return null; })];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 7:
                        this.expect(actualNumber).to.equal(expectedNumber);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' in dropdown menu in '(.+)'(?:st|th|nd|rd|) (?:market|position|order) should be (enabled|disabled)$/, function (optionNameOrNumber, marketNameOrNumber, expectedState) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, actualState;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        expectedState = expectedState === 'enabled';
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
                    case 4:
                        if (parseInt(optionNameOrNumber)) {
                            optionNameOrNumber = optionNameOrNumber - 1;
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(marketNameOrNumber).isOptionEnabled(optionNameOrNumber)];
                    case 5:
                        actualState = _b.sent();
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=market-steps.js.map