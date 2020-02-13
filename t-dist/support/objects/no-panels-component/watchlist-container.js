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
var WatchlistContainer = /** @class */ (function () {
    function WatchlistContainer(container) {
        this.data = {
            'watchlist name': protractor_1.by.css('.watchlist-selector'),
            'dropdown arrow': protractor_1.by.css('.icon-triangle-down'),
            'dropdown body': protractor_1.by.css('.watchlist-selector__options'),
            watchlists: protractor_1.by.css('.watchlist-selector__watchlist:not(.watchlist-selector__watchlist--hide), .watchlist-selector__name'),
            dropdown: protractor_1.by.css('.watchlist-selector'),
            marketsName: protractor_1.by.css('.market-name')
        };
        this.container = container;
        this.name = 'Watchlist container';
    }
    WatchlistContainer.prototype.isVisible = function () {
        return this.container.waitReady(2000)
            .then(function () { return true; }, function () { return false; });
    };
    WatchlistContainer.prototype.isElementPresent = function (elementName) {
        return this.container.element(this.data[elementName]).waitReady(2000)
            .then(function () { return true; }, function () { return false; });
    };
    WatchlistContainer.prototype.getNameMarket = function (positionNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.all(this.data.marketsName).get(positionNumber).waitReady(3000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.all(this.data.marketsName).get(positionNumber).getText()];
                    case 2: return [2 /*return*/, (_a.sent()).trim()];
                }
            });
        });
    };
    WatchlistContainer.prototype.clickOnElement = function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            var el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data[elementName]).waitReady(2000)];
                    case 1:
                        el = _a.sent();
                        return [4 /*yield*/, el.click()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WatchlistContainer.prototype.getWatchlistDropdownOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.container.all(this.data.watchlists).getText()];
            });
        });
    };
    WatchlistContainer.prototype.switchToWatchlist = function (watchlistName) {
        return __awaiter(this, void 0, void 0, function () {
            var watchlist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        watchlist = this.container.all(this.data.watchlists).filter(function (elem) {
                            return elem.getText()
                                .then(function (text) {
                                return text.trim() === watchlistName;
                            });
                        }).first();
                        watchlist.waitReady(2000);
                        return [4 /*yield*/, watchlist.click()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return WatchlistContainer;
}());
exports.WatchlistContainer = WatchlistContainer;
//# sourceMappingURL=watchlist-container.js.map