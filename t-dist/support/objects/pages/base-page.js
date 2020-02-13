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
var workspace_board_1 = require("../boards/workspace-board");
var browse_tab_1 = require("../boards/browse-tab");
var search_modal_1 = require("../modal-dialogues/search-modal");
var account_tab_1 = require("../boards/account-tab");
var help_modal_1 = require("../modal-dialogues/help-modal");
var notification_modal_1 = require("../modal-dialogues/notification-modal");
var guide_bubble_1 = require("../elements/guide-bubble");
var constructors = {
    browse: browse_tab_1.BrowseTab,
    workspace: workspace_board_1.WorkspaceBoard,
    myaccount: account_tab_1.MyAccount
};
var BasePage = /** @class */ (function () {
    function BasePage() {
        this.curBoard = new workspace_board_1.WorkspaceBoard();
        this.searchModalItem = null;
        this.helpModalItem = null;
        this.notificationModalItem = null;
        this.guideBubbleItem = null;
        this.data = {
            version: protractor_1.by.css('.version'),
            'loading spinner': protractor_1.by.css('.loader-overlay .spinner'),
            'loading overlay': protractor_1.by.css('.loader-overlay'),
            header: {
                root: protractor_1.by.tagName('app-header'),
                logo: protractor_1.by.css('.logo-container'),
                'balance bar': protractor_1.by.css('.balance-bar'),
                'add funds button': protractor_1.by.tagName('app-add-funds'),
                searchDiv: protractor_1.by.css('.market-search__button'),
                searchInput: protractor_1.by.css('.market-search__search-input'),
                searchIcon: protractor_1.by.css('.market-search__search-icon'),
                feedbackBtn: protractor_1.by.css('.feedback'),
                'help button': protractor_1.by.css('.toggle-help'),
                userPan: protractor_1.by.tagName('app-user-menu'),
                'user account': protractor_1.by.css('.user-menu'),
                userIcon: protractor_1.by.css('.icon-user-black,.icon-user-white'),
                notifications: protractor_1.by.css('.toggle-notifications'),
                logoutLogo: protractor_1.by.css('.utility-nav__logo')
            },
            balanceBar: {
                root: protractor_1.by.css('.balance-bar'),
                balanceItem: protractor_1.by.css('.balance-bar__item'),
                'available to trade': protractor_1.by.css('.balance-bar__item--available-to-trade'),
                'net equity': protractor_1.by.css('.balance-bar__item--net-equity'),
                cash: protractor_1.by.css('.balance-bar__item--cash'),
                'unrealised p&l': protractor_1.by.css('.balance-bar__item--unrealised'),
                'total margin': protractor_1.by.css('.balance-bar__item--margin'),
                'margin indicator': protractor_1.by.css('.balance-bar__item--margin-indicator'),
                balanceNumber: protractor_1.by.css('.balance-bar__item-number'),
                balanceCurrency: protractor_1.by.css('.balance-bar__item-number--account-currency')
            },
            searchModel: protractor_1.by.css('.market-search-modal'),
            userMenu: {
                root: protractor_1.by.css('user-menu__dropdown'),
                myAccLink: protractor_1.by.css('.link--my-account'),
                logOutLink: protractor_1.by.css('.link--log-out>a')
            },
            feedback: {
                root: protractor_1.by.css('.feedback-panel'),
                feedbackLink: protractor_1.by.css('.feedback-panel__link'),
                feedbackList: protractor_1.by.css('.feedback-panel__list'),
                feedbackItem: protractor_1.by.css('.feedback-panel__item-link'),
                feedbackText: protractor_1.by.css('.feedback-panel__textarea'),
                feedbackMessage: protractor_1.by.css('.feedback-panel__message'),
                submitBtn: protractor_1.by.css('.feedback-panel__submit')
            }
        };
    }
    Object.defineProperty(BasePage.prototype, "currentBoard", {
        get: function () {
            return this.curBoard;
        },
        enumerable: true,
        configurable: true
    });
    BasePage.prototype.getVersion = function () {
        return protractor_1.browser.executeScript("return $(arguments[0]).text();", protractor_1.element(this.data.version).getWebElement());
    };
    BasePage.prototype.waitLoading = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.element(this.data['loading spinner']).waitMissing(20000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data['loading overlay']).waitMissing(5000)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.header.logo.waitReady(10000)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(BasePage.prototype, "header", {
        get: function () {
            var self = this;
            var root = protractor_1.element(self.data.header.root);
            return {
                get logo() {
                    return protractor_1.element(self.data.header.logo);
                },
                get userIcon() {
                    return protractor_1.element(self.data.header.userIcon);
                },
                selectBoard: function (board) {
                    return __awaiter(this, void 0, void 0, function () {
                        var targetBoard, strClass;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    board = board.toLowerCase();
                                    targetBoard = protractor_1.element(self.data.header[board]);
                                    return [4 /*yield*/, targetBoard.getAttribute('class')];
                                case 1:
                                    strClass = _a.sent();
                                    if (!!strClass.includes('mode-toggle-container--active')) return [3 /*break*/, 3];
                                    return [4 /*yield*/, targetBoard.click()];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    console.log('Board has been already selected');
                                    _a.label = 4;
                                case 4:
                                    self.curBoard = new constructors[board]();
                                    return [2 /*return*/, self.curBoard];
                            }
                        });
                    });
                },
                isBoardActive: function (board) {
                    board = board.toLowerCase();
                    var targetBoard = protractor_1.element(self.data.header[board]);
                    return protractor_1.browser.wait(function () {
                        return targetBoard.getAttribute('class')
                            .then(function (strClass) { return strClass.includes('mode-toggle-container--active'); });
                    }, 3000)
                        .then(function () { return true; }, function () { return false; });
                },
                clickSearch: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var el, _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.header.searchInput).waitReady(2000)];
                                case 1:
                                    el = _b.sent();
                                    if (!process.env.npm_config_browser.includes('safari')) return [3 /*break*/, 3];
                                    return [4 /*yield*/, el.click()];
                                case 2:
                                    _a = _b.sent();
                                    return [3 /*break*/, 5];
                                case 3: return [4 /*yield*/, protractor_1.browser.wait(function () {
                                        return protractor_1.browser.actions().mouseMove(el).mouseDown().mouseUp().perform()
                                            .then(function () { return null; }, function () { return console.log('actions error'); })
                                            .then(function () { return protractor_1.element(self.data.searchModel).waitReady(1000); })
                                            .then(function () { return true; }, function () { return false; });
                                    }, 3000)];
                                case 4:
                                    _a = _b.sent();
                                    _b.label = 5;
                                case 5:
                                    _a;
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                clickLogo: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var el;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.header.logo).waitReady(2000)];
                                case 1:
                                    el = _a.sent();
                                    return [4 /*yield*/, el.click()];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                addSearchValue: function (value) {
                    return __awaiter(this, void 0, void 0, function () {
                        var el;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.header.searchInput).waitReady(2000)];
                                case 1:
                                    el = _a.sent();
                                    return [4 /*yield*/, el.clear()];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, el.sendKeys(value)];
                                case 3:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                getSearchText: function (textType) {
                    return __awaiter(this, void 0, void 0, function () {
                        var el;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.header.searchInput).waitReady(2000)];
                                case 1:
                                    el = _a.sent();
                                    return [2 /*return*/, el.getAttribute(textType)];
                            }
                        });
                    });
                },
                clearSearchInput: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var el;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.header.searchInput).waitReady(2000)];
                                case 1:
                                    el = _a.sent();
                                    return [4 /*yield*/, el.clear()];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                isElementPresent: function (elementName) {
                    return __awaiter(this, void 0, void 0, function () {
                        var el;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.header[elementName]).waitReady(5000)];
                                case 1:
                                    el = _a.sent();
                                    return [2 /*return*/, el.isDisplayed()];
                            }
                        });
                    });
                },
                getSize: function (elementName) {
                    return __awaiter(this, void 0, void 0, function () {
                        var el;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.header[elementName]).waitReady(5000)];
                                case 1:
                                    el = _a.sent();
                                    return [2 /*return*/, el.getSize()];
                            }
                        });
                    });
                },
                click: function (elementName) {
                    return __awaiter(this, void 0, void 0, function () {
                        var el;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.header[elementName]).waitReady(5000)];
                                case 1:
                                    el = _a.sent();
                                    return [4 /*yield*/, el.click()];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                getElementLocation: function (elemToCompare) {
                    return __awaiter(this, void 0, void 0, function () {
                        var locators;
                        return __generator(this, function (_a) {
                            elemToCompare = elemToCompare.toLowerCase();
                            locators = {
                                header: self.data.header.root,
                                'search field': self.data.header.searchInput
                            };
                            return [2 /*return*/, protractor_1.element(locators[elemToCompare]).getLocation()];
                        });
                    });
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasePage.prototype, "balanceBar", {
        get: function () {
            var self = this;
            var root = protractor_1.element(self.data.header.root);
            return {
                getElementText: function (elementName) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, protractor_1.element(self.data.balanceBar[elementName]).getText()];
                        });
                    });
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasePage.prototype, "searchModal", {
        get: function () {
            if (!this.searchModalItem) {
                this.searchModalItem = new search_modal_1.SearchModal();
            }
            return this.searchModalItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasePage.prototype, "helpModal", {
        get: function () {
            if (!this.helpModalItem) {
                this.helpModalItem = new help_modal_1.HelpModal();
            }
            return this.helpModalItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasePage.prototype, "notificationModal", {
        get: function () {
            if (!this.notificationModalItem) {
                this.notificationModalItem = new notification_modal_1.NotificationModal();
            }
            return this.notificationModalItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasePage.prototype, "guideBubble", {
        get: function () {
            if (!this.guideBubbleItem) {
                this.guideBubbleItem = new guide_bubble_1.GuideBubble();
            }
            return this.guideBubbleItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasePage.prototype, "feedbackModal", {
        get: function () {
            var self = this;
            return {
                get feedbackLink() {
                    return protractor_1.element(self.data.feedback.feedbackLink);
                },
                redirect: function (to) {
                    return __awaiter(this, void 0, void 0, function () {
                        function windowCount(count) {
                            return function () {
                                return protractor_1.browser.getAllWindowHandles().then(function (tabs) {
                                    return tabs.length === count;
                                });
                            };
                        }
                        var elements, handles, newWindowHandle;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    elements = {
                                        'contact us': protractor_1.element(self.data.feedback.feedbackLink),
                                        'client management': protractor_1.element.all(self.data.feedback.feedbackItem).get(0),
                                        phone: protractor_1.element.all(self.data.feedback.feedbackItem).get(1),
                                        'live chat': protractor_1.element.all(self.data.feedback.feedbackItem).get(2)
                                    };
                                    return [4 /*yield*/, elements[to].click()];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, protractor_1.browser.wait(windowCount(2), 10000)];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, protractor_1.browser.getAllWindowHandles()];
                                case 3:
                                    handles = _a.sent();
                                    newWindowHandle = process.env.npm_config_browser.includes('safari') ? handles[0] : handles[1];
                                    return [4 /*yield*/, protractor_1.browser.switchTo().window(newWindowHandle)];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, protractor_1.browser.waitForAngularEnabled(false)];
                                case 5:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                isElementPresent: function (elementName) {
                    return __awaiter(this, void 0, void 0, function () {
                        var elements;
                        return __generator(this, function (_a) {
                            elements = {
                                'contact us': protractor_1.element(self.data.feedback.feedbackLink),
                                'client management': protractor_1.element.all(self.data.feedback.feedbackItem).get(0),
                                phone: protractor_1.element.all(self.data.feedback.feedbackItem).get(1),
                                'live chat': protractor_1.element.all(self.data.feedback.feedbackItem).get(2),
                                'feedback text area': protractor_1.element(self.data.feedback.feedbackText),
                                'submit button': protractor_1.element(self.data.feedback.submitBtn)
                            };
                            return [2 /*return*/, elements[elementName].waitReady(2000)
                                    .then(function () { return true; }, function () { return false; })];
                        });
                    });
                },
                getElementHref: function (elementName) {
                    return __awaiter(this, void 0, void 0, function () {
                        var elements, el;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    elements = {
                                        'contact us': protractor_1.element(self.data.feedback.feedbackLink),
                                        'client management': protractor_1.element.all(self.data.feedback.feedbackItem).get(0),
                                        phone: protractor_1.element.all(self.data.feedback.feedbackItem).get(1),
                                        'live chat': protractor_1.element.all(self.data.feedback.feedbackItem).get(2)
                                    };
                                    return [4 /*yield*/, elements[elementName].waitReady(2000)];
                                case 1:
                                    el = _a.sent();
                                    return [4 /*yield*/, el.getAttribute('href')];
                                case 2: return [2 /*return*/, (_a.sent()).trim()];
                            }
                        });
                    });
                },
                getElementText: function (elementName) {
                    return __awaiter(this, void 0, void 0, function () {
                        var elements, el;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    elements = {
                                        'contact us': protractor_1.element(self.data.feedback.feedbackLink),
                                        'client management': protractor_1.element.all(self.data.feedback.feedbackItem).get(0),
                                        phone: protractor_1.element.all(self.data.feedback.feedbackItem).get(1),
                                        'live chat': protractor_1.element.all(self.data.feedback.feedbackItem).get(2),
                                        'feedback message': protractor_1.element(self.data.feedback.feedbackMessage)
                                    };
                                    return [4 /*yield*/, elements[elementName].waitReady(2000)];
                                case 1:
                                    el = _a.sent();
                                    return [4 /*yield*/, el.getText()];
                                case 2: return [2 /*return*/, (_a.sent()).trim()];
                            }
                        });
                    });
                },
                isSubmitActive: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var el, cls;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.feedback.submitBtn).waitReady(2000)];
                                case 1:
                                    el = _a.sent();
                                    return [4 /*yield*/, el.getAttribute('class')];
                                case 2:
                                    cls = _a.sent();
                                    return [2 /*return*/, cls.includes('disabled')];
                            }
                        });
                    });
                },
                fillInputWithValue: function (value) {
                    return __awaiter(this, void 0, void 0, function () {
                        var input;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.feedback.feedbackText).waitReady(2000)];
                                case 1:
                                    input = _a.sent();
                                    return [4 /*yield*/, input.clear()];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, input.sendKeys(value)];
                                case 3:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                click: function (elementName) {
                    return __awaiter(this, void 0, void 0, function () {
                        var el;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.feedback[elementName]).waitReady(5000)];
                                case 1:
                                    el = _a.sent();
                                    return [4 /*yield*/, el.click()];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasePage.prototype, "userMenu", {
        get: function () {
            var self = this;
            return {
                get logOutLink() {
                    return protractor_1.element(self.data.userMenu.logOutLink);
                },
                get myAccLink() {
                    return protractor_1.element(self.data.userMenu.myAccLink);
                },
                isAccountActive: function () {
                    return protractor_1.browser.wait(function () {
                        return protractor_1.element(self.data.userMenu.myAccLink).getAttribute('class')
                            .then(function (strClass) { return strClass.includes('link--active'); });
                    }, 10000)
                        .then(function () { return true; }, function () { return false; });
                },
                isElementPresent: function (elementName) {
                    return protractor_1.element(self.data.userMenu[elementName]).waitReady(3000)
                        .then(function () { return true; }, function () { return false; });
                },
                click: function (elementName) {
                    return __awaiter(this, void 0, void 0, function () {
                        var el;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, protractor_1.element(self.data.userMenu[elementName]).waitReady(2000)];
                                case 1:
                                    el = _a.sent();
                                    return [4 /*yield*/, el.click()];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    BasePage.prototype.logOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.header.userIcon.click()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.userMenu.logOutLink.click()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return BasePage;
}());
exports.BasePage = BasePage;
//# sourceMappingURL=base-page.js.map