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
    When(/^I (expand|collapse) '(.+)' watchlist$/, function (action, watchlist) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (parseInt(watchlist)) {
                            watchlist = watchlist - 1;
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(watchlist)[action]()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I remember '(.+)' market position$/, function (marketName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.memory.marketPosition) {
                            this.memory.marketPosition = {};
                        }
                        _a = this.memory.marketPosition;
                        _b = marketName;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarketPosition(marketName, 0)];
                    case 1:
                        _a[_b] = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I remember markets in '(.+)' watchlist$/, function (watchlistName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.memory.currentWatchlist = watchlistName;
                        _a = this.memory;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(watchlistName).getAllMarketsTitles()];
                    case 1:
                        _a.allMarketsInCurrentWatchlist = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I remember all existed watchlists$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.memory;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getWatchlistsNames()];
                    case 1:
                        _a.allWatchlists = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I create '(.+)' watchlist$/, function (watchlistName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.createNewWatchlist()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(0).putName(watchlistName, 'key enter')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I add '(.+)' market in '(.+)' watchlist$/, function (marketName, watchlistName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(watchlistName).addMarket(marketName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I delete '(.+)' watchlist$/, function (watchlistName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(watchlistName).deleteWatchlist()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^the '(.+)' watchlist is dragged and dropped on the '(.+)' watchlist$/, function (dragAndDropWatchlist, destinationWatchlist) {
        return __awaiter(this, void 0, void 0, function () {
            var elem, target;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(dragAndDropWatchlist).getHead()];
                    case 1:
                        elem = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(destinationWatchlist).getHead()];
                    case 2:
                        target = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.dragAndDrop(elem, target)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I hover mouse on '(.+)'(?:st|th|nd|rd|) watchlist$/, function (nameOrNum) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (parseInt(nameOrNum)) {
                            nameOrNum = nameOrNum - 1;
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(nameOrNum).hover()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I change the name of '(.+)'(?:st|th|nd|rd|) watchlist to '(.*)' through '(.+)'$/, function (nameOrNum, newName, actionToCompleteEdit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (parseInt(nameOrNum)) {
                            nameOrNum = nameOrNum - 1;
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(nameOrNum).editName(newName, actionToCompleteEdit)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I start to edit '(.+)'(?:st|th|nd|rd) watchlist$/, function (watchlistNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(parseInt(watchlistNumber) - 1).startEditingName()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I end to edit '(.+)' watchlist$/, function (watchlistNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(parseInt(watchlistNumber) - 1).endEditingName()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I undo '(.+)'(?:st|th|nd|rd) watchlist removal$/, function (watchlistNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(parseInt(watchlistNumber) - 1).undoDeleting()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I type '(.+)' name of market(?: in '(.+)'(?:st|th|nd|rd|) watchlist|)$/, function (searchText, watchlistNameOrNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var isWait;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (searchText === 'closed' || searchText === 'phone only') {
                            searchText = this.memory[searchText];
                        }
                        isWait = searchText.length > 2;
                        if (!watchlistNameOrNumber) return [3 /*break*/, 2];
                        if (parseInt(watchlistNameOrNumber)) {
                            watchlistNameOrNumber = watchlistNameOrNumber - 1;
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(watchlistNameOrNumber).typeNameOfMarket(searchText, isWait)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.typeNameOfMarket(searchText, isWait)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    When(/^I add '(.+)'(?:st|th|nd|rd) market from market dropdown$/, function (marketNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.memory;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarketFromDropdown(parseInt(marketNumber) - 1)];
                    case 1:
                        _a.marketName = _b.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.addMarketFromDropdown(parseInt(marketNumber) - 1)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I drag and drop '(.+)'(?:st|th|nd|rd|) market from '(.+)' watchlist to '(|.+)'(?:|st|th|nd|rd|) (?:market |)(?:in|of) the '(.+)' watchlist$/, function (dragAndDropMarket, watchlistNameOfDragAndDropMarket, destinationMarket, watchlistNameofDestinationMarket) {
        return __awaiter(this, void 0, void 0, function () {
            var elem, target;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (parseInt(dragAndDropMarket)) {
                            dragAndDropMarket = dragAndDropMarket - 1;
                        }
                        if (parseInt(destinationMarket)) {
                            destinationMarket = destinationMarket - 1;
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(watchlistNameOfDragAndDropMarket)
                                .getMarket(dragAndDropMarket).getMarketElement()];
                    case 1:
                        elem = _a.sent();
                        if (!(destinationMarket === 'root')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(watchlistNameofDestinationMarket).getListElement()];
                    case 2:
                        target = _a.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        if (!(destinationMarket === 'outside')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.basePage.header.logo];
                    case 4:
                        target = _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(watchlistNameofDestinationMarket).getMarket(destinationMarket).getMarketElement()];
                    case 6:
                        target = _a.sent();
                        _a.label = 7;
                    case 7: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.dragAndDrop(elem, target)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I drag '(.+)' watchlist and drop to '(.+)' watchlist$/, function (baseWatchlist, targetWatchlist) {
        return __awaiter(this, void 0, void 0, function () {
            var elem, target;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(baseWatchlist).getListElement()];
                    case 1:
                        elem = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(targetWatchlist).getListElement()];
                    case 2:
                        target = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.dragAndDrop(elem, target)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' watchlist should be (expanded|collapsed)$/, function (watchlistNameOrNumber, state) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedState, actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (parseInt(watchlistNameOrNumber)) {
                            watchlistNameOrNumber = watchlistNameOrNumber - 1;
                        }
                        expectedState = state === 'expanded';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(watchlistNameOrNumber).isExpanded()];
                    case 1:
                        actualState = _a.sent();
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^watchlist panel table header should contain:$/, function (table) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedArray, columnNamesFromUi, actualArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedArray = table.hashes().map(function (el) {
                            return el.columnName.toLowerCase();
                        });
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.tabHeader.getColumnsNames()];
                    case 1:
                        columnNamesFromUi = _a.sent();
                        actualArray = columnNamesFromUi.map(function (el) {
                            return el.toLowerCase();
                        });
                        this.expect(actualArray).to.deep.equal(expectedArray);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)' watchlist should be on(?: the | )'(\d+|top|last)'(?:st|th|nd|rd|) position$/, function (watchlistName, position) {
        return __awaiter(this, void 0, void 0, function () {
            var p, count, name;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!parseInt(position)) return [3 /*break*/, 1];
                        p = position - 1;
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(position === 'top')) return [3 /*break*/, 2];
                        p = 0;
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(position === 'last')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getWatchlistCount()];
                    case 3:
                        count = _a.sent();
                        p = count - 1;
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(watchlistName).waitReady(2000)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(p).getName()];
                    case 6:
                        name = _a.sent();
                        this.expect(name).to.include(watchlistName);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)' watchlist (could|couldn't) be deleted$/, function (watchlist, ability) {
        return __awaiter(this, void 0, void 0, function () {
            var condition, is;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        condition = ability === 'could';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(watchlist).isDeleteAvailable()];
                    case 1:
                        is = _a.sent();
                        this.expect(condition).to.equal(is);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)' watchlist should return the same markets as backend request$/, function (watchlist) {
        return __awaiter(this, void 0, void 0, function () {
            var tags, marketsFromBackend, marketsFromUi, marketsNum;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tags = {
                            'Popular Markets': 152
                        };
                        return [4 /*yield*/, this.backendHelper.getMarketsParametersByTagId(tags[watchlist], 50)];
                    case 1:
                        marketsFromBackend = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(watchlist).getAllMarketsTitles()];
                    case 2:
                        marketsFromUi = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(watchlist).getMarketsCount()];
                    case 3:
                        marketsNum = _a.sent();
                        this.expect(marketsNum).to.be.above(0);
                        this.expect(marketsFromBackend.sort()).to.deep.equal(marketsFromUi.sort());
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the PopularMarkets watchlist's markets should be ordered by '(.+)'$/, function (orderParameter) {
        return __awaiter(this, void 0, void 0, function () {
            var marketsIdsFromUi, actualOrderParams, i, info, expectedOrderParams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList('Popular Markets').getAllMarketsIds()];
                    case 1:
                        marketsIdsFromUi = _a.sent();
                        actualOrderParams = [];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < marketsIdsFromUi.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.backendHelper.getMarketInformation(marketsIdsFromUi[i])];
                    case 3:
                        info = _a.sent();
                        actualOrderParams.push(info[orderParameter]);
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        expectedOrderParams = actualOrderParams.map(function (t) { return t; });
                        expectedOrderParams.sort(function (a, b) {
                            if (a > b)
                                return -1;
                            if (a < b)
                                return 1;
                            if (a === b)
                                return 0;
                        });
                        this.expect(actualOrderParams).to.deep.equal(expectedOrderParams);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the current watchlist should contain '(.+)' market$/, function (marketName) {
        return __awaiter(this, void 0, void 0, function () {
            var actualState, expectedState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (marketName === 'previously added') {
                            marketName = this.memory.marketName;
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.isMarketPresent(marketName)];
                    case 1:
                        actualState = _a.sent();
                        expectedState = true;
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^markets of '(.+)' watchlist should be (visible|invisible)$/, function (watchlistName, visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedResult, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = visibility.toLowerCase() === 'visible';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(watchlistName).isListMarketsVisible()];
                    case 1:
                        result = _a.sent();
                        this.expect(result).to.equal(expectedResult);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)' watchlist should be (invisible|visible)$/, function (watchlistName, visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedResult, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = visibility.toLowerCase() === 'visible';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(watchlistName).isVisible()];
                    case 1:
                        result = _a.sent();
                        this.expect(result).to.equal(expectedResult);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)' element should be (invisible|visible) on '(.+)'(?:st|th|nd|rd|) watchlist$/, function (elem, visibility, watchlistNameOrNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedResult, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (parseInt(watchlistNameOrNumber)) {
                            watchlistNameOrNumber = watchlistNameOrNumber - 1;
                        }
                        expectedResult = visibility.toLowerCase() === 'visible';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(watchlistNameOrNumber).isVisible(elem)];
                    case 1:
                        result = _a.sent();
                        this.expect(result).to.equal(expectedResult);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)' market is (invisible|visible)$/, function (marketName, visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedResult, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = visibility.toLowerCase() === 'visible';
                        if (!(marketName.toLowerCase() === 'previously added' || marketName.toLowerCase() === 'current')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.isMarketPresent(this.memory.marketName.toLowerCase())];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.isMarketPresent(marketName.toLowerCase())];
                    case 3:
                        result = _a.sent();
                        _a.label = 4;
                    case 4:
                        this.expect(result).to.equal(expectedResult);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)' market should be on(?: the | )'(\d+|top|last|same|different)'(?:st|th|nd|rd|) position in the '(.+)' watchlist$/, function (marketName, position, watchlistName) {
        return __awaiter(this, void 0, void 0, function () {
            var num, count, name;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!parseInt(position)) return [3 /*break*/, 1];
                        num = position - 1;
                        return [3 /*break*/, 5];
                    case 1:
                        if (!(position === 'top')) return [3 /*break*/, 2];
                        num = 0;
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(position === 'last')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(watchlistName).getMarketsCount()];
                    case 3:
                        count = _a.sent();
                        num = count - 1;
                        return [3 /*break*/, 5];
                    case 4:
                        if (position === 'same' || position === 'different') {
                            num = this.memory.marketPosition[marketName] - 1;
                        }
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(watchlistName).waitReady(2000)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(watchlistName).getMarket(num).getName(false)];
                    case 7:
                        name = _a.sent();
                        if (position === 'different') {
                            this.expect(name.toLowerCase()).to.not.include(marketName.toLowerCase());
                        }
                        else {
                            this.expect(name.toLowerCase()).to.include(marketName.toLowerCase());
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^watchlists count should be '(\d+)'$/, function (expectedCount) {
        return __awaiter(this, void 0, void 0, function () {
            var actualCount;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.browser.wait(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getWatchlistCount()];
                                    case 1:
                                        actualCount = _a.sent();
                                        return [2 /*return*/, this.helper.sleepIfFalse(actualCount === expectedCount, 500)];
                                }
                            });
                        }); }, 10000)
                            .then(function () { return null; }, function () { return null; })];
                    case 1:
                        _a.sent();
                        this.expect(actualCount).to.equal(expectedCount);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^text of '(.+)' in watchlist panel should be '(.+)'$/, function (elementName, expectedText) {
        return __awaiter(this, void 0, void 0, function () {
            var actualText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getElementText(elementName)];
                    case 1:
                        actualText = _a.sent();
                        this.expect(actualText).to.equal(expectedText);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)'(?:st|th|nd|rd|) watchlist should be empty and contain text '(.+)'$/, function (watchlistNameOrNumber, expectedText) {
        return __awaiter(this, void 0, void 0, function () {
            var actualNumber, actualText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (parseInt(watchlistNameOrNumber)) {
                            watchlistNameOrNumber = watchlistNameOrNumber - 1;
                        }
                        if (!(watchlistNameOrNumber === 'current')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarketsCount()];
                    case 1:
                        actualNumber = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getEmptyText()];
                    case 2:
                        actualText = _a.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(watchlistNameOrNumber).getMarketsCount()];
                    case 4:
                        actualNumber = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getList(watchlistNameOrNumber).getEmptyText()];
                    case 5:
                        actualText = _a.sent();
                        _a.label = 6;
                    case 6:
                        this.expect(actualNumber).to.equal(0);
                        this.expect(actualText).to.equal(expectedText);
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=watchlist-panel-steps.js.map