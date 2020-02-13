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
var protractor_1 = require("protractor");
var panel_1 = require("./panel");
var helper_1 = require("../../utils/helper");
var ChartPanel = /** @class */ (function (_super) {
    __extends(ChartPanel, _super);
    function ChartPanel(panelRoot) {
        var _this = _super.call(this, panelRoot) || this;
        _this.data = {
            iframeRoot: protractor_1.by.tagName('app-chart-wrapper iframe'),
            draggableButtons: protractor_1.by.tagName('.tv-floating-toolbar__drag.js-drag'),
            'chart table': protractor_1.by.tagName('.layout__area--center'),
            chartBody: protractor_1.by.tagName('.chart-markup-table.pane'),
            marketSearchInput: protractor_1.by.css('input.symbol-edit'),
            marketSearchResults: protractor_1.by.css('table.symbol-edit-popup'),
            marketNameLabel: protractor_1.by.css('span.pane-legend-line.apply-overflow-tooltip.main'),
            'price axis': protractor_1.by.tagName('.chart-markup-table.price-axis'),
            'add icon': protractor_1.by.tagName('.pane-controls.toppane'),
            menu: {
                'close chart': protractor_1.by.css('.menu__item.close'),
                'add to workspace': protractor_1.by.cssContainingText('.menu__item > div > div', 'Add to Workspace'),
                workspaceDropdownContent: protractor_1.by.css('.workspaces__item-name'),
                'add to watchlist': protractor_1.by.cssContainingText('.menu__item > div > div', 'Add to Watchlist'),
                'new watchlist': protractor_1.by.css('.menu .new-watchlist'),
                watchlistDropdownContent: protractor_1.by.css('.menu .watchlists.ng-star-inserted > .watchlist-item.ng-star-inserted'),
                'market 360': protractor_1.by.css('.menu__item.product-page'),
                'price alert': protractor_1.by.css('.menu__item.alert')
            },
            buttons: {
                sell: protractor_1.by.tagName('.tv-trading-toolbar__bs-button.tv-trading-toolbar__bs-button--sell.apply-common-tooltip'),
                buy: protractor_1.by.tagName('.tv-trading-toolbar__bs-button.tv-trading-toolbar__bs-button--buy.apply-common-tooltip'),
                price: protractor_1.by.tagName('.tv-trading-toolbar__value.js-value')
            }
        };
        _this.name = 'Chart';
        return _this;
    }
    ChartPanel.prototype.isElementPresent = function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            var locators;
            return __generator(this, function (_a) {
                locators = {
                    chart: this.data.iframeRoot
                };
                return [2 /*return*/, protractor_1.element(locators[elementName]).isPresent()];
            });
        });
    };
    ChartPanel.prototype.isChartVisible = function () {
        return __awaiter(this, void 0, void 0, function () {
            var is;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.element(this.data.iframeRoot).waitReady(3000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().frame(protractor_1.element(this.data.iframeRoot).getWebElement())];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.chartBody).waitReady(10000)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.chartBody).isPresent()];
                    case 4:
                        is = _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().defaultContent()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, is];
                }
            });
        });
    };
    ChartPanel.prototype.switchMarket = function (marketName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.element(this.data.iframeRoot).waitReady(5000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().frame(protractor_1.element(this.data.iframeRoot).getWebElement())];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.marketSearchInput).waitReady(10000)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.marketSearchInput).clear()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.marketSearchInput).sendKeys(marketName)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.marketSearchResults).waitReady(4000)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.marketSearchInput).sendKeys(protractor_1.protractor.Key.DOWN)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.marketSearchInput).sendKeys(protractor_1.protractor.Key.ENTER)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().defaultContent()];
                    case 9:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChartPanel.prototype.getMarketNameLabelText = function (isOnIframe) {
        return __awaiter(this, void 0, void 0, function () {
            var text;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isOnIframe) return [3 /*break*/, 3];
                        return [4 /*yield*/, protractor_1.element(this.data.iframeRoot).waitReady(5000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().frame(protractor_1.element(this.data.iframeRoot).getWebElement())];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.container.element(this.data.iframeRoot).waitReady(5000)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().frame(this.container.element(this.data.iframeRoot).getWebElement())];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [4 /*yield*/, helper_1.helper.sleep(2000)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.marketNameLabel).getText()];
                    case 8:
                        text = (_a.sent()).trim();
                        return [4 /*yield*/, protractor_1.browser.switchTo().defaultContent()];
                    case 9:
                        _a.sent();
                        return [2 /*return*/, text];
                }
            });
        });
    };
    ChartPanel.prototype.isChartElementVisibleOnMouseHover = function (chartElement) {
        return __awaiter(this, void 0, void 0, function () {
            var is;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chartElement = chartElement.trim();
                        return [4 /*yield*/, protractor_1.element(this.data.iframeRoot).waitReady(6000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().frame(protractor_1.element(this.data.iframeRoot).getWebElement())];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.chartBody).waitReady(2000)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.chartBody).hover()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data[chartElement]).isPresent()];
                    case 5:
                        is = _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().defaultContent()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, is];
                }
            });
        });
    };
    ChartPanel.prototype.isElementEnable = function (chartElement) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, is;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, protractor_1.element(this.data.iframeRoot).waitReady(6000)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().frame(protractor_1.element(this.data.iframeRoot).getWebElement())];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.chartBody).waitReady(2000)];
                    case 3:
                        _b.sent();
                        if (!chartElement.includes('button')) return [3 /*break*/, 5];
                        return [4 /*yield*/, protractor_1.element(this.data.buttons["" + chartElement.trim().split(' ')[0]])];
                    case 4:
                        _a = _b.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, protractor_1.element(this.data["" + chartElement.trim()])];
                    case 6:
                        _a = _b.sent();
                        _b.label = 7;
                    case 7:
                        chartElement = _a;
                        return [4 /*yield*/, chartElement.isEnabled()];
                    case 8:
                        is = _b.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().defaultContent()];
                    case 9:
                        _b.sent();
                        return [2 /*return*/, is];
                }
            });
        });
    };
    ChartPanel.prototype.getButtonBackground = function (buttonName) {
        return __awaiter(this, void 0, void 0, function () {
            var color;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buttonName = buttonName.trim().split(' ')[0];
                        return [4 /*yield*/, protractor_1.element(this.data.iframeRoot).waitReady(6000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().frame(protractor_1.element(this.data.iframeRoot).getWebElement())];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.chartBody).waitReady(2000)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.buttons[buttonName]).getCssValue('background-color')];
                    case 4:
                        color = _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().defaultContent()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, color];
                }
            });
        });
    };
    ChartPanel.prototype.isElementInsideChart = function (includedElement) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, coordinates, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, protractor_1.element(this.data.iframeRoot).waitReady(6000)];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().frame(protractor_1.element(this.data.iframeRoot).getWebElement())];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.chartBody).waitReady(2000)];
                    case 3:
                        _d.sent();
                        if (!includedElement.includes('button')) return [3 /*break*/, 5];
                        return [4 /*yield*/, protractor_1.element(this.data.buttons["" + includedElement.trim().split(' ')[0]])];
                    case 4:
                        _a = _d.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, protractor_1.element(this.data["" + includedElement.trim()])];
                    case 6:
                        _a = _d.sent();
                        _d.label = 7;
                    case 7:
                        includedElement = _a;
                        _b = this.getCoordinates;
                        _c = [includedElement];
                        return [4 /*yield*/, protractor_1.element(this.data['chart table'])];
                    case 8: return [4 /*yield*/, _b.apply(this, _c.concat([_d.sent()]))];
                    case 9:
                        coordinates = _d.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().defaultContent()];
                    case 10:
                        _d.sent();
                        return [2 /*return*/, this.isValueBetween(coordinates.x) && this.isValueBetween(coordinates.y)];
                }
            });
        });
    };
    ChartPanel.prototype.getCoordinates = function (includedElement, containerElement) {
        return __awaiter(this, void 0, void 0, function () {
            var includedElementLocation, containerLocation, containerSize;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, includedElement.getLocation()];
                    case 1:
                        includedElementLocation = _a.sent();
                        return [4 /*yield*/, containerElement.getLocation()];
                    case 2:
                        containerLocation = _a.sent();
                        return [4 /*yield*/, containerElement.getSize()];
                    case 3:
                        containerSize = _a.sent();
                        return [2 /*return*/, {
                                x: {
                                    value: includedElementLocation.x,
                                    lowerValue: containerLocation.x,
                                    upperValue: containerLocation.x + containerSize.width
                                },
                                y: {
                                    value: includedElementLocation.y,
                                    lowerValue: containerLocation.y,
                                    upperValue: containerLocation.y + containerSize.height
                                }
                            }];
                }
            });
        });
    };
    ChartPanel.prototype.isValueBetween = function (_a) {
        var value = _a.value, lowerValue = _a.lowerValue, upperValue = _a.upperValue;
        return value >= lowerValue && value <= upperValue;
    };
    ChartPanel.prototype.moveSellBuyButtons = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sellBuyButtons;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.element(this.data.iframeRoot).waitReady(6000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().frame(protractor_1.element(this.data.iframeRoot).getWebElement())];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.chartBody).waitReady(2000)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.draggableButtons)];
                    case 4:
                        sellBuyButtons = _a.sent();
                        sellBuyButtons.waitReady(2000);
                        return [4 /*yield*/, this.dragAndDropBasedOnChart(sellBuyButtons, { x: 200, y: 200 })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().defaultContent()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChartPanel.prototype.dragAndDropBasedOnChart = function (elem, location) {
        return __awaiter(this, void 0, void 0, function () {
            var chart;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.element(this.data['chart table'])];
                    case 1:
                        chart = _a.sent();
                        chart.waitReady(2000);
                        return [2 /*return*/, protractor_1.browser.actions().mouseMove(elem).mouseDown().mouseMove(chart, location).mouseUp().perform()
                                .then(function () { return null; }, function () { return console.log('actions error'); })];
                }
            });
        });
    };
    ChartPanel.prototype.clickOnChartPrice = function (direction) {
        return __awaiter(this, void 0, void 0, function () {
            var chartElement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.element(this.data.iframeRoot).waitReady(6000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().frame(protractor_1.element(this.data.iframeRoot).getWebElement())];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.chartBody).waitReady(2000)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.buttons["" + direction.trim()])];
                    case 4:
                        chartElement = _a.sent();
                        return [4 /*yield*/, chartElement.element(this.data.buttons.price).waitReady(5000)];
                    case 5:
                        _a.sent();
                        // await chartElement.hover();
                        return [4 /*yield*/, chartElement.click()];
                    case 6:
                        // await chartElement.hover();
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().defaultContent()];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChartPanel.prototype.clickOnElement = function (elem) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.element(this.data.menu[elem]).scrollToAndClick()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChartPanel.prototype.getElementFromDropdownByText = function (elementText) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                if (elementText.includes('Workspace')) {
                    result = protractor_1.element.all(this.data.menu.workspaceDropdownContent).filter(function (elem) {
                        return elem.getText()
                            .then(function (text) {
                            return text.trim() === elementText;
                        });
                    }).first();
                }
                else {
                    result = protractor_1.element.all(this.data.menu.watchlistDropdownContent).filter(function (elem) {
                        return elem.getText()
                            .then(function (text) {
                            return text.trim() === elementText;
                        });
                    }).first();
                }
                return [2 /*return*/, result];
            });
        });
    };
    ChartPanel.prototype.addChartTo = function (elementNameForAdding) {
        return __awaiter(this, void 0, void 0, function () {
            var elementForAdding;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getElementFromDropdownByText(elementNameForAdding)];
                    case 1:
                        elementForAdding = _a.sent();
                        return [4 /*yield*/, elementForAdding.waitReady(5000)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, elementForAdding.click()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChartPanel.prototype.waitForElementsDisappeared = function (elementsName) {
        return __awaiter(this, void 0, void 0, function () {
            var locator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elementsName = elementsName.toLowerCase();
                        locator = elementsName.includes('workspace')
                            ? this.data.menu.workspaceDropdownContent
                            : this.data.menu.watchlistDropdownContent;
                        return [4 /*yield*/, protractor_1.element.all(locator).waitForDisappeared()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChartPanel.prototype.isElementVisible = function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            var locators;
            return __generator(this, function (_a) {
                locators = {
                    'workspace dropdown': this.data.menu.workspaceDropdownContent,
                    'watchlist dropdown': this.data.menu.watchlistDropdownContent
                };
                return [2 /*return*/, protractor_1.element(locators[elementName]).isDisplayed()];
            });
        });
    };
    ChartPanel.prototype.getDropdownOptions = function (elementsName) {
        return __awaiter(this, void 0, void 0, function () {
            var locator;
            return __generator(this, function (_a) {
                locator = elementsName === 'workspaces'
                    ? this.data.menu.workspaceDropdownContent
                    : this.data.menu.watchlistDropdownContent;
                return [2 /*return*/, protractor_1.element.all(locator).map(function (elem) { return elem.getText(); })];
            });
        });
    };
    ChartPanel.prototype.waitForChartLoading = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data['add icon']).waitReady(4000)
                            .then(function (el) { return el.waitMissing(2000); }, function () { return null; })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.buttons.sell).element(this.data.buttons.price).waitReady(4000)
                                .then(function (el) { return el.waitMissing(2000); }, function () { return null; })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.buttons.buy).element(this.data.buttons.price).waitReady(4000)
                                .then(function (el) { return el.waitMissing(2000); }, function () { return null; })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, helper_1.helper.sleep(200)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ChartPanel;
}(panel_1.Panel));
exports.ChartPanel = ChartPanel;
//# sourceMappingURL=chart-panel.js.map