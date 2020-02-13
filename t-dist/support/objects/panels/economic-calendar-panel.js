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
var EconomicCalendarPanel = /** @class */ (function (_super) {
    __extends(EconomicCalendarPanel, _super);
    function EconomicCalendarPanel(panelRoot) {
        var _this = _super.call(this, panelRoot) || this;
        _this.data = {
            iframeRoot: protractor_1.by.tagName('iframe'),
            parts: {
                header: protractor_1.by.id('fxst_filter'),
                body: protractor_1.by.id('fxst_grid'),
                bodyContent: {
                    dateRow: protractor_1.by.css('.fxst-dateRow>td'),
                    eventRow: protractor_1.by.css('.fxit-eventrow'),
                    eventDetailRow: protractor_1.by.css('.fxst-eventDetails')
                }
            },
            elementToSwitch: protractor_1.by.css('.news-economic__toggle')
        };
        _this.name = 'Economic Calendar';
        return _this;
    }
    EconomicCalendarPanel.prototype.isHeaderVisible = function () {
        return __awaiter(this, void 0, void 0, function () {
            var state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.iframeRoot).waitReady(10000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().frame(this.container.element(this.data.iframeRoot).getWebElement())];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.parts.header).waitReady(20000)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.parts.header).isPresent()];
                    case 4:
                        state = _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().defaultContent()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, state];
                }
            });
        });
    };
    EconomicCalendarPanel.prototype.isBodyVisible = function () {
        return __awaiter(this, void 0, void 0, function () {
            var state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.iframeRoot).waitReady(15000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().frame(this.container.element(this.data.iframeRoot).getWebElement())];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.parts.body).waitReady(20000)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data.parts.body).isPresent()];
                    case 4:
                        state = _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().defaultContent()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, state];
                }
            });
        });
    };
    EconomicCalendarPanel.prototype.switchToEconomicCalendar = function () {
        return protractor_1.element.all(this.data.elementToSwitch).get(1).click();
    };
    EconomicCalendarPanel.prototype.switchFilter = function (filterName) {
        return __awaiter(this, void 0, void 0, function () {
            var filterButton;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.iframeRoot).waitReady(15000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().frame(this.container.element(this.data.iframeRoot).getWebElement())];
                    case 2:
                        _a.sent();
                        filterButton = protractor_1.element(protractor_1.by.id('fxst-calendar-filter-dateshortcuts')).all(protractor_1.by.tagName('a'))
                            .filter(function (opt) {
                            return opt.getText()
                                .then(function (text) {
                                return text.toLowerCase().trim().includes(filterName.toLowerCase());
                            });
                        }).first();
                        return [4 /*yield*/, filterButton.waitReady(2000)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, filterButton.click()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().defaultContent()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EconomicCalendarPanel.prototype.getEventDates = function () {
        return __awaiter(this, void 0, void 0, function () {
            var textArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.iframeRoot).waitReady(15000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().frame(this.container.element(this.data.iframeRoot).getWebElement())];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element.all(this.data.parts.bodyContent.dateRow).getText()];
                    case 3:
                        textArr = _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().defaultContent()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, textArr.map(function (t) { return t.trim(); })];
                }
            });
        });
    };
    return EconomicCalendarPanel;
}(panel_1.Panel));
exports.EconomicCalendarPanel = EconomicCalendarPanel;
//# sourceMappingURL=economic-calendar-panel.js.map