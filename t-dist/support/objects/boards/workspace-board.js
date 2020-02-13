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
var watchlist_panel_1 = require("../panels/watchlist-panel");
var positions_and_orders_panel_1 = require("../panels/positions-and-orders-panel");
var deal_ticket_panel_1 = require("../panels/deal-ticket-panel");
var details_panel_1 = require("../panels/details-panel");
var news_panel_1 = require("../panels/news-panel");
var economic_calendar_panel_1 = require("../panels/economic-calendar-panel");
var chart_panel_1 = require("../panels/chart-panel");
var watchlist_container_1 = require("../no-panels-component/watchlist-container");
var market_container_1 = require("../no-panels-component/market-container");
var market_information_1 = require("../no-panels-component/market-information");
var browse_tab_1 = require("./browse-tab");
var account_tab_1 = require("./account-tab");
var helper_1 = require("../../utils/helper");
var constructors = {
    watchlist: watchlist_panel_1.WatchlistPanel,
    'positions and orders': positions_and_orders_panel_1.PositionsAndOrdersPanel,
    'deal ticket': deal_ticket_panel_1.DealTicketPanel,
    details: details_panel_1.DetailsPanel,
    'history detail': details_panel_1.DetailsPanel,
    'news feed': news_panel_1.NewsPanel,
    'economic calendar': economic_calendar_panel_1.EconomicCalendarPanel,
    chart: chart_panel_1.ChartPanel,
    'watchlist container': watchlist_container_1.WatchlistContainer,
    'market container': market_container_1.MarketContainer,
    'market information': market_information_1.MarketInformation
};
var WorkspaceBoard = /** @class */ (function () {
    function WorkspaceBoard() {
        this.data = {
            header: {
                root: protractor_1.by.tagName('app-workspace-header'),
                tabs: {
                    root: protractor_1.by.css('.workspace__item'),
                    closeButton: protractor_1.by.css('.icon-close'),
                    name: protractor_1.by.css('.workspace-name'),
                    tabMenuBtn: protractor_1.by.css('.icon-dots-vertical'),
                    tabMenu: {
                        root: protractor_1.by.css('.dropdown__content'),
                        buttons: protractor_1.by.css('.components-list__item'),
                        count: protractor_1.by.css('.item-count'),
                        buttonTitle: protractor_1.by.css('.item-title'),
                        clearWorkspace: protractor_1.by.css('.clear-workspace'),
                        deleteWorkspace: protractor_1.by.css('.remove-workspace'),
                        showMeButton: protractor_1.by.css('.at-workspace-components-state__link'),
                        containerOpenedComponents: protractor_1.by.css('.components'),
                        openedComponent: protractor_1.by.css('.components__item'),
                        closeComponentButton: protractor_1.by.css('.icon-close'),
                        iconForRename: protractor_1.by.css('.icon-edit'),
                        inputForRename: protractor_1.by.css('.workspace-info > input'),
                    }
                },
                iconCreateNewWorkspace: protractor_1.by.css('.create-new-workspace > .icon-plus'),
                plusBtn: protractor_1.by.css('.create-new-workspace')
            },
            tabBody: {
                root: protractor_1.by.css('.panel-container'),
                panels: protractor_1.by.tagName('app-workspace-panel'),
                noPanelComponent: {
                    news: protractor_1.by.css('.news-economic'),
                    watchlistContainer: protractor_1.by.tagName('app-product-page-watchlist'),
                    // marketsContainer: by.css('.markets-list-container'),
                    marketsContainer: protractor_1.by.tagName('app-markets-list'),
                    marketInformation: protractor_1.by.tagName('app-ci-market-information'),
                    chart: protractor_1.by.css('.chart-placeholder'),
                    economicCalendar: protractor_1.by.css('.news-economic')
                }
            },
            productPage: {
                root: protractor_1.by.tagName('app-full-screen-panel')
            },
            balance: {
                root: protractor_1.by.css('.balance-bar')
            }
        };
    }
    Object.defineProperty(WorkspaceBoard.prototype, "header", {
        get: function () {
            var self = this;
            return {
                addNewTab: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var tabsCount, el;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    tabsCount = 0;
                                    return [4 /*yield*/, protractor_1.element(self.data.header.plusBtn).waitReady(3000)];
                                case 1:
                                    el = _a.sent();
                                    return [4 /*yield*/, protractor_1.browser.wait(function () {
                                            return _this.getTabsNumber()
                                                .then(function (num) {
                                                tabsCount = num;
                                                return el.click()
                                                    .then(function () { return null; }, function () {
                                                    console.log('plusBtn is not attached to the DOM');
                                                });
                                            })
                                                .then(function () { return _this.getTabsNumber(); })
                                                .then(function (num) { return helper_1.helper.sleepIfFalse(num > tabsCount, 300); });
                                        }, 10000)];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                getTabsNumber: function () {
                    return protractor_1.element.all(self.data.header.tabs.root).count();
                },
                isCreateNewWorkspaceVisible: function () {
                    return protractor_1.element(self.data.header.iconCreateNewWorkspace).waitReady(2000)
                        .then(function () { return true; }, function () { return false; });
                },
                getTab: function (nameOrNumber) {
                    var tab;
                    if (typeof nameOrNumber === 'number') {
                        tab = protractor_1.element.all(self.data.header.tabs.root).get(nameOrNumber);
                    }
                    else {
                        tab = protractor_1.element.all(self.data.header.tabs.root).filter(function (t) {
                            return t.element(self.data.header.tabs.name).getText()
                                .then(function (text) {
                                return text.trim() === nameOrNumber;
                            });
                        }).first();
                    }
                    return {
                        getName: function () {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, tab.element(self.data.header.tabs.name).getText()
                                            .then(function (text) { return text.trim(); }, function () {
                                            return helper_1.helper.sleep(500)
                                                .then(function () {
                                                return tab.element(self.data.header.tabs.name).getText();
                                            })
                                                .then(function (text) { return text.trim(); });
                                        })];
                                });
                            });
                        },
                        getLocation: function () {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, tab.getLocation()];
                                });
                            });
                        },
                        getSize: function () {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, tab.getSize()];
                                });
                            });
                        },
                        getButtonName: function (nameOrNum) {
                            return __awaiter(this, void 0, void 0, function () {
                                var button;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (typeof nameOrNum === 'number') {
                                                button = protractor_1.element.all(self.data.header.tabs.tabMenu.buttons).get(nameOrNum);
                                            }
                                            else {
                                                button = protractor_1.element.all(self.data.header.tabs.tabMenu.buttons).filter(function (verifiableButton) {
                                                    return verifiableButton.element(self.data.header.tabs.tabMenu.buttonTitle).getText()
                                                        .then(function (text) {
                                                        return text.toLowerCase().trim().includes(nameOrNum.toLowerCase());
                                                    });
                                                }).first();
                                            }
                                            return [4 /*yield*/, button.getText()];
                                        case 1: return [2 /*return*/, (_a.sent()).trim()];
                                    }
                                });
                            });
                        },
                        clickButton: function (nameOrNum) {
                            var button;
                            if (typeof nameOrNum === 'number') {
                                button = protractor_1.element.all(self.data.header.tabs.tabMenu.buttons).get(nameOrNum);
                            }
                            else {
                                button = protractor_1.element.all(self.data.header.tabs.tabMenu.buttons).filter(function (verifiableButton) {
                                    return verifiableButton.element(self.data.header.tabs.tabMenu.buttonTitle).getText()
                                        .then(function (text) {
                                        return text.toLowerCase().trim().includes(nameOrNum.toLowerCase());
                                    });
                                }).first();
                            }
                            return button.click();
                        },
                        getChartsNumber: function () {
                            return __awaiter(this, void 0, void 0, function () {
                                var button, numStr, err_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            button = protractor_1.element.all(self.data.header.tabs.tabMenu.buttons).filter(function (verifiableButton) {
                                                return verifiableButton.element(self.data.header.tabs.tabMenu.buttonTitle).getText()
                                                    .then(function (text) {
                                                    return text.toLowerCase().trim().includes('chart');
                                                });
                                            }).first();
                                            return [4 /*yield*/, button.element(self.data.header.tabs.tabMenu.count).getText()];
                                        case 1:
                                            numStr = (_a.sent()).trim();
                                            return [2 /*return*/, parseInt(numStr)];
                                        case 2:
                                            err_1 = _a.sent();
                                            if (err_1.name === 'NoSuchElementError') {
                                                return [2 /*return*/, 0];
                                            }
                                            else {
                                                throw err_1;
                                            }
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            });
                        },
                        closeTab: function () {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.expandDropdown()];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, tab.element(self.data.header.tabs.tabMenu.deleteWorkspace).click()];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        },
                        expandDropdown: function () {
                            return __awaiter(this, void 0, void 0, function () {
                                var isMenuVisible;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, tab.element(self.data.header.tabs.tabMenuBtn).waitReady(3000)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, tab.element(self.data.header.tabs.tabMenuBtn).click()];
                                        case 2:
                                            _a.sent();
                                            return [4 /*yield*/, tab.element(self.data.header.tabs.tabMenu.root).waitReady(2000)
                                                    .then(function () { return true; }, function () { return false; })];
                                        case 3:
                                            isMenuVisible = _a.sent();
                                            if (!!isMenuVisible) return [3 /*break*/, 6];
                                            return [4 /*yield*/, tab.element(self.data.header.tabs.tabMenuBtn).click()];
                                        case 4:
                                            _a.sent();
                                            return [4 /*yield*/, tab.element(self.data.header.tabs.tabMenu.root).waitReady(2000)];
                                        case 5:
                                            _a.sent();
                                            _a.label = 6;
                                        case 6: return [2 /*return*/];
                                    }
                                });
                            });
                        },
                        clickClearButton: function () {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, tab.element(self.data.header.tabs.tabMenu.clearWorkspace).waitReady(2000)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, tab.element(self.data.header.tabs.tabMenu.clearWorkspace).click()];
                                        case 2:
                                            _a.sent();
                                            return [4 /*yield*/, protractor_1.browser.wait(function () {
                                                    return tab.element(self.data.header.tabs.tabMenu.clearWorkspace).getAttribute('disabled')
                                                        .then(function (is) { return helper_1.helper.sleepIfFalse(is); });
                                                }, 2000, 'element was not disabled after timeout')];
                                        case 3:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        },
                        clickShowMeButton: function () {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, tab.element(self.data.header.tabs.tabMenu.showMeButton).waitReady(2000)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, tab.element(self.data.header.tabs.tabMenu.showMeButton).click()];
                                        case 2:
                                            _a.sent();
                                            return [4 /*yield*/, tab.element(self.data.header.tabs.tabMenu.containerOpenedComponents).waitReady(2000)];
                                        case 3:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        },
                        clickEditIcon: function () {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, tab.element(self.data.header.tabs.tabMenu.iconForRename).waitReady(3000)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, tab.element(self.data.header.tabs.tabMenu.iconForRename).click()
                                                    .then(null, function () {
                                                    return helper_1.helper.sleep(100)
                                                        .then(function () { return tab.element(self.data.header.tabs.tabMenu.iconForRename).click(); });
                                                })];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        },
                        typeAndSaveWorkspaceName: function (name) {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, tab.element(self.data.header.tabs.tabMenu.inputForRename).clear()];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, tab.element(self.data.header.tabs.tabMenu.inputForRename).sendKeys(name)];
                                        case 2:
                                            _a.sent();
                                            return [4 /*yield*/, protractor_1.browser.actions().sendKeys(protractor_1.protractor.Key.ENTER).perform()];
                                        case 3:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        },
                        clickCloseComponentButton: function () {
                            return __awaiter(this, void 0, void 0, function () {
                                var countStoreComponents;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, tab.element(self.data.header.tabs.tabMenu.containerOpenedComponents).waitReady(2000)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, tab.all(self.data.header.tabs.tabMenu.openedComponent).count()];
                                        case 2:
                                            countStoreComponents = _a.sent();
                                            return [4 /*yield*/, tab.all(self.data.header.tabs.tabMenu.openedComponent)
                                                    .all(self.data.header.tabs.tabMenu.closeComponentButton).get(0).click()];
                                        case 3:
                                            _a.sent();
                                            return [4 /*yield*/, protractor_1.browser.wait(function () { return tab.all(self.data.header.tabs.tabMenu.openedComponent).count()
                                                    .then(function (count) { return helper_1.helper.sleepIfFalse(countStoreComponents !== count); }); }, 2000)];
                                        case 4:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        },
                        switchTo: function () {
                            return __awaiter(this, void 0, void 0, function () {
                                var cls;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, tab.element(self.data.header.tabs.name).waitReady(5000)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, tab.getAttribute('class')
                                                    .then(null, function () {
                                                    return helper_1.helper.sleep(500)
                                                        .then(function () { return tab.getAttribute('class'); });
                                                })];
                                        case 2:
                                            cls = _a.sent();
                                            if (!!cls.includes('active')) return [3 /*break*/, 4];
                                            return [4 /*yield*/, tab.element(self.data.header.tabs.name).click()
                                                    .then(function () { }, function () {
                                                    return helper_1.helper.sleep(100)
                                                        .then(function () {
                                                        return tab.element(self.data.header.tabs.name).click();
                                                    });
                                                })];
                                        case 3:
                                            _a.sent();
                                            _a.label = 4;
                                        case 4: return [4 /*yield*/, tab.element(self.data.header.tabs.tabMenuBtn).waitReady(2000)
                                                .then(null, function (err) {
                                                return tab.element(self.data.header.tabs.name).click();
                                            })];
                                        case 5:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        },
                        isActive: function () {
                            return protractor_1.browser.wait(function () {
                                return tab.getAttribute('class')
                                    .then(function (cls) {
                                    return cls.includes('active');
                                })
                                    .then(function (is) { return is; }, function () { return false; })
                                    .then(function (is) { return helper_1.helper.sleepIfFalse(is); });
                            }, 2000)
                                .then(function () { return true; }, function () { return false; });
                        },
                        addNewPan: function (nameOrNum) {
                            return __awaiter(this, void 0, void 0, function () {
                                var button;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, tab.element(self.data.header.tabs.tabMenuBtn).waitReady(5000)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, protractor_1.browser.wait(function () {
                                                    return tab.element(self.data.header.tabs.tabMenu.root).isDisplayed()
                                                        .then(function (is) {
                                                        if (!is) {
                                                            return tab.element(self.data.header.tabs.tabMenuBtn).click()
                                                                .then(function () { return tab.element(self.data.header.tabs.tabMenuBtn).waitReady(2000); })
                                                                .then(function () { return is; });
                                                        }
                                                        else {
                                                            return is;
                                                        }
                                                    });
                                                }, 10000)];
                                        case 2:
                                            _a.sent();
                                            if (typeof nameOrNum === 'number') {
                                                button = protractor_1.element.all(self.data.header.tabs.tabMenu.buttons).get(nameOrNum);
                                            }
                                            else {
                                                button = protractor_1.element.all(self.data.header.tabs.tabMenu.buttons).filter(function (verifiableButton) {
                                                    return verifiableButton.element(self.data.header.tabs.tabMenu.buttonTitle).getText()
                                                        .then(function (text) {
                                                        return text.toLowerCase().trim().includes(nameOrNum.toLowerCase());
                                                    });
                                                }).first();
                                            }
                                            return [4 /*yield*/, button.click()];
                                        case 3:
                                            _a.sent();
                                            return [4 /*yield*/, tab.element(self.data.header.tabs.tabMenuBtn).click()];
                                        case 4:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        },
                        isPanelActive: function (nameOrNum) {
                            return __awaiter(this, void 0, void 0, function () {
                                var is, button;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, tab.element(self.data.header.tabs.tabMenuBtn).waitReady(5000)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, tab.element(self.data.header.tabs.tabMenu.root).isDisplayed()];
                                        case 2:
                                            is = _a.sent();
                                            if (!!is) return [3 /*break*/, 4];
                                            return [4 /*yield*/, tab.element(self.data.header.tabs.tabMenuBtn).click()];
                                        case 3:
                                            _a.sent();
                                            _a.label = 4;
                                        case 4:
                                            if (typeof nameOrNum === 'number') {
                                                button = protractor_1.element.all(self.data.header.tabs.tabMenu.buttons).get(nameOrNum);
                                            }
                                            else {
                                                button = protractor_1.element.all(self.data.header.tabs.tabMenu.buttons).filter(function (verifiableButton) {
                                                    return verifiableButton.element(self.data.header.tabs.tabMenu.buttonTitle).getText()
                                                        .then(function (text) {
                                                        return text.toLowerCase().trim() === nameOrNum.toLowerCase();
                                                    });
                                                }).first();
                                            }
                                            return [2 /*return*/, button.getAttribute('class').then(function (cls) { return !cls.includes('all-components-used'); })];
                                    }
                                });
                            });
                        },
                        isVisible: function (elem) {
                            elem = elem.toLowerCase();
                            var tabMenu = tab.element(self.data.header.tabs.tabMenu.root);
                            var elements = {
                                'delete workspace': tabMenu.element(self.data.header.tabs.tabMenu.deleteWorkspace),
                                'list of components': tabMenu.element(self.data.header.tabs.tabMenu.buttons),
                                'grid view component': tabMenu.all(self.data.header.tabs.tabMenu.openedComponent).get(0),
                                'icon for rename': tabMenu.element(self.data.header.tabs.tabMenu.iconForRename),
                                'input icon for input': tabMenu.element(self.data.header.tabs.tabMenu.inputForRename),
                            };
                            return elements[elem].waitReady(2000)
                                .then(function () { return true; }, function () { return false; });
                        },
                    };
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkspaceBoard.prototype, "tabBody", {
        get: function () {
            var self = this;
            return {
                get browse() {
                    if (!self.browseTab) {
                        self.browseTab = new browse_tab_1.BrowseTab();
                    }
                    return self.browseTab;
                },
                get myAccount() {
                    if (!self.myAccountItem) {
                        self.myAccountItem = new account_tab_1.MyAccount();
                    }
                    return self.myAccountItem;
                },
                getCountSamePanel: function (type) {
                    type = type.toLocaleLowerCase();
                    var typeName = type;
                    if (type.includes('position')) {
                        typeName = 'position';
                    }
                    else if (type.includes('news')) {
                        typeName = 'news';
                    }
                    else if (type === 'deal ticket') {
                        typeName = '';
                    }
                    else if (type === 'chart') {
                        typeName = /chart|dft|cfd|\//;
                    }
                    if (type.includes('detail')) {
                        typeName = 'detail';
                    }
                    return protractor_1.element.all(self.data.tabBody.panels).filter(function (pan) {
                        return pan.element(protractor_1.by.css('.workspace-panel-header__title')).getText()
                            .then(function (text) {
                            if (type === 'chart') {
                                return !!text.toLowerCase().trim().match(typeName);
                            }
                            else if (typeName) {
                                return text.toLowerCase().trim().includes(typeName);
                            }
                            else {
                                return text.trim() === typeName;
                            }
                        });
                    }).count();
                },
                getPanel: function (type) {
                    type = type.toLocaleLowerCase();
                    var typeN = type;
                    if (type.includes('position')) {
                        typeN = 'position';
                    }
                    else if (type.includes('news')) {
                        typeN = 'news';
                    }
                    else if (type === 'deal ticket') {
                        typeN = '';
                    }
                    else if (type === 'chart') {
                        typeN = /chart|dft|cfd|\//;
                    }
                    if (type.includes('detail')) {
                        typeN = 'detail';
                    }
                    var rootEl = protractor_1.element.all(self.data.tabBody.panels).filter(function (pan) {
                        return pan.element(protractor_1.by.css('.workspace-panel-header__title')).getText()
                            .then(function (text) {
                            if (type === 'chart') {
                                return !!text.toLowerCase().trim().match(typeN);
                            }
                            else if (typeN) {
                                return text.toLowerCase().trim().includes(typeN);
                            }
                            else {
                                return text.trim() === typeN;
                            }
                        });
                    }).first();
                    if (self.currentPan) {
                        if (self.currentPan.name.toLowerCase() === type) {
                            return self.currentPan;
                        }
                    }
                    self.currentPan = new constructors[type](rootEl);
                    return self.currentPan;
                },
                get currentPanel() {
                    return self.currentPan;
                },
                set currentPanel(panel) {
                    self.currentPan = panel;
                },
                getNoPanelComponent: function (type) {
                    type = type.toLocaleLowerCase();
                    var componentSelector = {
                        'news feed': self.data.tabBody.noPanelComponent.news,
                        'watchlist container': self.data.tabBody.noPanelComponent.watchlistContainer,
                        'market container': self.data.tabBody.noPanelComponent.marketsContainer,
                        'market information': self.data.tabBody.noPanelComponent.marketInformation,
                        chart: self.data.tabBody.noPanelComponent.chart,
                        'economic calendar': self.data.tabBody.noPanelComponent.economicCalendar
                    };
                    var rootEl = protractor_1.element(componentSelector[type]);
                    self.currentPan = new constructors[type](rootEl);
                    return self.currentPan;
                },
                getElementLocation: function (elemToCompare) {
                    elemToCompare = elemToCompare.toLowerCase();
                    var workspaceBoardElements = {
                        'news feed': protractor_1.element(self.data.tabBody.noPanelComponent.news),
                        'watchlist container': protractor_1.element(self.data.tabBody.noPanelComponent.watchlistContainer),
                        'market container': protractor_1.element(self.data.tabBody.noPanelComponent.marketsContainer),
                        'market information': protractor_1.element(self.data.tabBody.noPanelComponent.marketInformation),
                        chart: protractor_1.element(self.data.tabBody.noPanelComponent.chart),
                        'economic calendar': protractor_1.element(self.data.tabBody.noPanelComponent.economicCalendar)
                    };
                    return workspaceBoardElements[elemToCompare].getLocation();
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    return WorkspaceBoard;
}());
exports.WorkspaceBoard = WorkspaceBoard;
//# sourceMappingURL=workspace-board.js.map