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
var panel_1 = require("./panel");
var protractor_1 = require("protractor");
var helper_1 = require("../../utils/helper");
var NewsPanel = /** @class */ (function (_super) {
    __extends(NewsPanel, _super);
    function NewsPanel(panelRoot) {
        var _this = _super.call(this, panelRoot) || this;
        _this.data = {
            listArticles: {
                body: {
                    root: protractor_1.by.tagName('app-news-list'),
                    empty: protractor_1.by.css('.news-list__empty-headlines'),
                    loadingSpinner: protractor_1.by.tagName('app-loading-spinner'),
                    rows: {
                        root: protractor_1.by.css('.news-headline'),
                        timestamp: protractor_1.by.css('.relative-time'),
                        title: protractor_1.by.css('.headline')
                    }
                }
            },
            search: {
                input: protractor_1.by.css('.news-search__input input'),
                'X button': protractor_1.by.css('.news-search__input .icon-close'),
            },
            newsList: protractor_1.by.css('.news-list__view'),
            newDetail: {
                root: protractor_1.by.tagName('app-news-detail'),
                title: protractor_1.by.css('.news-detail__headline'),
                body: protractor_1.by.css('.news-detail__details'),
                backButton: protractor_1.by.css('.news-detail__back-button'),
                timestamp: protractor_1.by.css('.news-detail__date'),
            }
        };
        _this.name = 'News feed';
        return _this;
    }
    NewsPanel.prototype.waitArticlesLoaded = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.listArticles.body.loadingSpinner).waitReady(1000)
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
    NewsPanel.prototype.isListArticlesVisible = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitReady(2000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.waitArticlesLoaded()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.listArticles.body.root).waitReady(3000)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, this.container.element(this.data.listArticles.body.root).all(this.data.listArticles.body.rows.timestamp).get(0).waitReady(3000)
                                .then(function () { return true; }, function () { return false; })];
                }
            });
        });
    };
    NewsPanel.prototype.scrollElementIntoView = function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            var elem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitReady(2000)];
                    case 1:
                        _a.sent();
                        elem = {
                            'first article': this.container.all(this.data.listArticles.body.rows.root).get(0),
                            'last article': this.container.all(this.data.listArticles.body.rows.root).last(),
                            'article title': this.container.element(this.data.newDetail.title),
                        };
                        return [4 /*yield*/, elem[elementName].scrollIntoView()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NewsPanel.prototype.getTimestampOfArticles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var textArr, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitReady(2000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.waitArticlesLoaded()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 8]);
                        return [4 /*yield*/, this.container.element(this.data.listArticles.body.root)
                                .all(this.data.listArticles.body.rows.timestamp).getText()];
                    case 4:
                        textArr = _a.sent();
                        return [3 /*break*/, 8];
                    case 5:
                        err_1 = _a.sent();
                        return [4 /*yield*/, helper_1.helper.sleep(1000)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.listArticles.body.root)
                                .all(this.data.listArticles.body.rows.timestamp).getText()];
                    case 7:
                        textArr = _a.sent();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/, textArr.map(function (t) { return t.trim(); })];
                }
            });
        });
    };
    NewsPanel.prototype.getTitleOfArticles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var textArr, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitReady(2000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.waitArticlesLoaded()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 8]);
                        return [4 /*yield*/, this.container.element(this.data.listArticles.body.root)
                                .all(this.data.listArticles.body.rows.title).getText()];
                    case 4:
                        textArr = _a.sent();
                        return [3 /*break*/, 8];
                    case 5:
                        err_2 = _a.sent();
                        return [4 /*yield*/, helper_1.helper.sleep(1000)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.listArticles.body.root)
                                .all(this.data.listArticles.body.rows.title).getText()];
                    case 7:
                        textArr = _a.sent();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/, textArr.map(function (t) { return t.trim(); })];
                }
            });
        });
    };
    NewsPanel.prototype.getArticlesCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitReady(2000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.waitArticlesLoaded()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.listArticles.body.root).waitReady(3000)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, this.container.element(this.data.listArticles.body.root).all(this.data.listArticles.body.rows.root).count()];
                }
            });
        });
    };
    NewsPanel.prototype.isVisibleElementDetailNews = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var elements;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = name.toLowerCase();
                        elements = {
                            article: this.container.element(this.data.newDetail.root),
                            'first article': this.container.all(this.data.listArticles.body.rows.root).get(0),
                            'last article': this.container.all(this.data.listArticles.body.rows.root).last(),
                            'article title': this.container.element(this.data.newDetail.title),
                            'article text': this.container.element(this.data.newDetail.body),
                            'button back': this.container.element(this.data.newDetail.backButton),
                            timestamp: this.container.element(this.data.newDetail.timestamp),
                        };
                        return [4 /*yield*/, this.container.waitReady(2000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, elements[name].waitReady(2000)
                                .then(function () { return true; }, function () { return false; })];
                }
            });
        });
    };
    NewsPanel.prototype.expandNews = function (numberNews) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitReady(2000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.all(this.data.listArticles.body.rows.root).get(numberNews).click()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NewsPanel.prototype.clickButtonBack = function () {
        return __awaiter(this, void 0, void 0, function () {
            var button;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitReady(2000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.newDetail.backButton).waitReady(2000)];
                    case 2:
                        button = _a.sent();
                        return [4 /*yield*/, button.click()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NewsPanel.prototype.clickSearchItems = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var itemEl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitReady(2000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.search[item]).waitReady(2000)];
                    case 2:
                        itemEl = _a.sent();
                        return [4 /*yield*/, itemEl.click()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NewsPanel.prototype.getSearchInputPlaceholder = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitReady(2000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.search.input).getAttribute('placeholder')];
                    case 2: return [2 /*return*/, (_a.sent()).trim()];
                }
            });
        });
    };
    NewsPanel.prototype.getElementLocation = function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            var locators;
            return __generator(this, function (_a) {
                elementName = elementName.toLowerCase();
                locators = {
                    'news list': this.data.newsList,
                    'search field': this.data.search.input
                };
                return [2 /*return*/, protractor_1.element(locators[elementName]).getLocation()];
            });
        });
    };
    NewsPanel.prototype.getEmptyText = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.container.waitReady(2000)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.waitArticlesLoaded()];
                    case 2:
                        _b.sent();
                        results = {
                            is: false,
                            text: null
                        };
                        return [4 /*yield*/, this.container.element(this.data.listArticles.body.empty).waitReady(2000)
                                .then(function () { return results.is = true; }, function () { return results.is = false; })];
                    case 3:
                        _b.sent();
                        if (!results.is) return [3 /*break*/, 5];
                        _a = results;
                        return [4 /*yield*/, this.container.element(this.data.listArticles.body.empty).getText()];
                    case 4:
                        _a.text = (_b.sent()).trim();
                        _b.label = 5;
                    case 5: return [2 /*return*/, results];
                }
            });
        });
    };
    NewsPanel.prototype.fillSearchInputWithValue = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.waitReady(2000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.search.input).sendKeys(value)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return NewsPanel;
}(panel_1.Panel));
exports.NewsPanel = NewsPanel;
//# sourceMappingURL=news-panel.js.map