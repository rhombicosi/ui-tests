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
var helper_1 = require("../../utils/helper");
var Panel = /** @class */ (function () {
    function Panel(panelRoot) {
        this.commonData = {
            header: {
                root: protractor_1.by.css('.workspace-panel-header'),
                name: protractor_1.by.css('.workspace-panel-header__title'),
                closeBtn: protractor_1.by.css('.icon-close')
            },
            boarders: protractor_1.by.css('.resize-handle')
        };
        this.container = panelRoot;
    }
    Panel.prototype.close = function () {
        return this.container.element(this.commonData.header.closeBtn).click();
    };
    Panel.prototype.isCloseAvailable = function () {
        return this.container.element(this.commonData.header.closeBtn).waitReady(2000)
            .then(function (el) {
            return el.isEnabled();
        }, function () { return false; });
    };
    Panel.prototype.getPanelName = function () {
        return this.name;
    };
    Panel.prototype.getPanelHeaderName = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.commonData.header.name).getText()];
                    case 1: return [2 /*return*/, (_a.sent()).trim()];
                }
            });
        });
    };
    Panel.prototype.getNoPanelComponentHeaderName = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var componentSelector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        type = type.toLocaleLowerCase();
                        componentSelector = {
                            'news feed': this.container.element(protractor_1.by.css('.news-economic__toggle'))
                        };
                        return [4 /*yield*/, componentSelector[type].getText()];
                    case 1: return [2 /*return*/, (_a.sent()).trim()];
                }
            });
        });
    };
    Panel.prototype.isVisible = function () {
        return this.container.waitReady(3000)
            .then(function () { return true; }, function () { return false; });
    };
    Panel.prototype.isPresent = function () {
        return this.container.isPresent();
    };
    Panel.prototype.waitReady = function (timeout) {
        if (timeout === void 0) { timeout = 3000; }
        return this.container.waitReady(timeout);
    };
    Panel.prototype.setSize = function (height, width) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!height) return [3 /*break*/, 2];
                        return [4 /*yield*/, protractor_1.browser.executeScript("$(arguments[0]).height(" + height + ");", this.container.getWebElement())];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!width) return [3 /*break*/, 4];
                        return [4 /*yield*/, protractor_1.browser.executeScript("$(arguments[0]).width(" + width + ");", this.container.getWebElement())];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Panel.prototype.getSize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var size, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        size = {
                            height: null,
                            width: null
                        };
                        _a = size;
                        return [4 /*yield*/, protractor_1.browser.executeScript("return $(arguments[0]).height();", this.container.getWebElement())];
                    case 1:
                        _a.height = _c.sent();
                        _b = size;
                        return [4 /*yield*/, protractor_1.browser.executeScript("return $(arguments[0]).width();", this.container.getWebElement())];
                    case 2:
                        _b.width = _c.sent();
                        return [2 /*return*/, size];
                }
            });
        });
    };
    Panel.prototype.getPosition = function () {
        return protractor_1.browser.executeScript("return $(arguments[0]).offset();", this.container.getWebElement());
    };
    Panel.prototype.setPosition = function (corner) {
        return __awaiter(this, void 0, void 0, function () {
            var windowSize, size, position;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        windowSize = {
                            height: parseInt(process.env.npm_config_size.split(',')[1]),
                            width: parseInt(process.env.npm_config_size.split(',')[0]),
                        };
                        return [4 /*yield*/, this.getSize()];
                    case 1:
                        size = _a.sent();
                        position = {
                            'top-right': "top:80,left:" + (windowSize.width - size.width - 25),
                            'top-left': "top:80,left:5",
                            'bottom-right': "top:" + (windowSize.height - size.height - 135) + ",left:" + (windowSize.width - size.width - 25),
                            'bottom-left': "top:" + (windowSize.height - size.height - 135) + ",left:5"
                        };
                        return [2 /*return*/, protractor_1.browser.executeScript("$(arguments[0]).offset({" + position[corner] + "});", this.container.getWebElement())];
                }
            });
        });
    };
    Panel.prototype.makeActive = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.browser.actions()
                            .mouseMove(this.container.element(this.commonData.header.closeBtn))
                            .mouseMove({ x: -20, y: 5 })
                            .click()
                            .perform()
                            .then(null, function () { return console.log('actions error'); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, helper_1.helper.sleep(500)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Panel.prototype.dragAndDrop = function (elem, target) {
        return protractor_1.browser.actions().mouseMove(elem).mouseDown().mouseMove(target).mouseMove({ x: 0, y: 3 }).mouseUp().perform()
            .then(function () { return null; }, function () { return console.log('actions error'); });
    };
    Panel.prototype.moveBoarder = function (boarderPosition, direction, pixels) {
        var positionClass = {
            top: ' n ',
            bot: ' s ',
            left: ' w ',
            right: ' e '
        };
        var boarder = this.container.all(this.commonData.boarders).filter(function (el) {
            return el.getAttribute('class')
                .then(function (cls) { return cls.includes(positionClass[boarderPosition]); });
        }).first();
        var location = { x: 0, y: 0 };
        if (boarderPosition === 'left' || boarderPosition === 'right') {
            location.y = 0;
            if (direction === 'left') {
                location.x = parseInt("-" + pixels);
            }
            else {
                location.x = parseInt(pixels);
            }
        }
        else {
            location.x = 0;
            if (direction === 'up') {
                location.y = parseInt("-" + pixels);
            }
            else {
                location.y = parseInt(pixels);
            }
        }
        return protractor_1.browser.actions().mouseMove(boarder).mouseDown().mouseMove(location).mouseUp().perform()
            .then(function () { return null; }, function () { return console.log('actions error'); });
    };
    return Panel;
}());
exports.Panel = Panel;
//# sourceMappingURL=panel.js.map