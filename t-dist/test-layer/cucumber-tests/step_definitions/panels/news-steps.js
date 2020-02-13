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
var moment = require("moment");
cucumber_1.defineSupportCode(function (_a) {
    var Given = _a.Given, When = _a.When, Then = _a.Then;
    When(/^I scroll to (last article|first article|article title|) in the news list$/, function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.scrollElementIntoView(elementName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^articles should be (visible|invisible)( within no panel component of New feed|)$/, function (visibility, elementType) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedState, actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedState = visibility === 'visible';
                        if (!elementType.includes('no panel')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.getNoPanelComponent('news feed').isListArticlesVisible()];
                    case 1:
                        actualState = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.isListArticlesVisible()];
                    case 3:
                        actualState = _a.sent();
                        _a.label = 4;
                    case 4:
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^each article has timestamp$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getTimestampOfArticles()];
                    case 1:
                        result = _a.sent();
                        this.expect(result.length).to.not.equal(0);
                        result.forEach(function (timestamp) {
                            _this.expect(timestamp).to.match(/(^\d{1,2}?[ A-Z]{2,}(AGO|\d{4})$)|(^A FEW SECONDS AGO$)/);
                        });
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^each article has title(?: with word '(.+)'|)$/, function (expectedWord) {
        return __awaiter(this, void 0, void 0, function () {
            var titles;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getTitleOfArticles()];
                    case 1:
                        titles = _a.sent();
                        this.expect(titles.length).to.not.equal(0);
                        titles.forEach(function (title) {
                            _this.expect(title.length).to.not.equal(0);
                            if (expectedWord) {
                                _this.expect(title.toLowerCase()).to.include(expectedWord);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^articles are shown in descending order based on timestamp$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            var results, current, next, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getTimestampOfArticles()];
                    case 1:
                        results = _a.sent();
                        this.expect(results.length).to.not.equal(0);
                        for (i = 0; i < results.length - 1; i++) {
                            if (results[i + 1]) {
                                if ((results[i].includes('MIN') && results[i + 1].includes('MIN')) ||
                                    (results[i].match(/\d{1,2}H/) && results[i + 1].match(/\d{1,2}H/))) {
                                    current = parseInt(results[i].replace(/^(\d{1,2})[ A-Z]{2,}(AGO|\d{4})$/, '$1'));
                                    next = parseInt(results[i + 1].replace(/^(\d{1,2})[ A-Z]{2,}(AGO|\d{4})$/, '$1'));
                                    this.expect(current).to.be.at.most(next);
                                }
                                else if (results[i].match(/\d{1,2}H/) && results[i + 1].includes('MIN')) {
                                    this.expect('MINS before HOURS').to.equal('MINS after HOURS');
                                }
                                else if (results[i] !== 'A FEW SECONDS AGO' && results[i + 1] === 'A FEW SECONDS AGO') {
                                    this.expect('SECONDS before OTHER').to.equal('SECONDS after OTHER');
                                }
                                else if (results[i].match(/\d{4}/) && results[i + 1].match(/\d{1,2}H/)) {
                                    this.expect('HOURS before DATES').to.equal('HOURS after DATES');
                                }
                                else if (results[i].match(/\d{4}/) && results[i + 1].match(/\d{4}/)) {
                                    current = parseInt(moment(results[i], 'D MMM YYYY').format('x'));
                                    next = parseInt(moment(results[i + 1], 'D MMM YYYY').format('x'));
                                    this.expect(current).to.be.at.least(next);
                                }
                                else {
                                    this.expect(true).to.equal(true);
                                }
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' should be (visible|invisible)$/, function (name, visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedState, actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedState = visibility === 'visible';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.isVisibleElementDetailNews(name)];
                    case 1:
                        actualState = _a.sent();
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^search input placeholder should be '(.+)'$/, function (expectedPlaceholder) {
        return __awaiter(this, void 0, void 0, function () {
            var actualPlaceholder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getSearchInputPlaceholder()];
                    case 1:
                        actualPlaceholder = _a.sent();
                        this.expect(actualPlaceholder).to.equal(expectedPlaceholder);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^news list is displayed under search field$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            var newsListLocation, searchFieldLocation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getElementLocation('news list')];
                    case 1:
                        newsListLocation = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getElementLocation('search field')];
                    case 2:
                        searchFieldLocation = _a.sent();
                        this.expect(newsListLocation.y).to.be.above(searchFieldLocation.y);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^articles count should be '(.+)'$/, function (expectedNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var actualNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedNumber = parseInt(expectedNumber);
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getArticlesCount()];
                    case 1:
                        actualNumber = _a.sent();
                        this.expect(actualNumber).to.equal(expectedNumber);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^displayed news should be related to '(.+)' market$/, function (marketName) {
        return __awaiter(this, void 0, void 0, function () {
            var marketId, expectedHeadlines, actualHeadlines;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (marketName === 'current') {
                            marketName = this.memory.marketName;
                        }
                        marketId = this.idMatcher.market[marketName];
                        return [4 /*yield*/, this.backendHelper.getMarketsNews(marketId)];
                    case 1:
                        expectedHeadlines = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getTitleOfArticles()];
                    case 2:
                        actualHeadlines = _a.sent();
                        this.expect(actualHeadlines.sort()).to.deep.equal(expectedHeadlines.sort());
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^empty message should be (visible|invisible)(?: and contain text '(.+)'|)$/, function (visibility, expectedText) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedState, actualResults;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedState = visibility === 'visible';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getEmptyText()];
                    case 1:
                        actualResults = _a.sent();
                        expectedText = expectedState ? expectedText : null;
                        this.expect(actualResults.is).to.equal(expectedState);
                        this.expect(actualResults.text).to.equal(expectedText);
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I click on '(.+)'(?:st|th|nd|rd|) article in the list$/, function (numberNews) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.expandNews(parseInt(numberNews) - 1)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I click on Button back$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.clickButtonBack()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I click search '(.+)'$/, function (item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.clickSearchItems(item)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I fill search input with value '(.+)'$/, function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.fillSearchInputWithValue(value)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    // getMarketsNews
});
//# sourceMappingURL=news-steps.js.map