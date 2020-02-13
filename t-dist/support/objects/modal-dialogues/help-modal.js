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
var HelpModal = /** @class */ (function () {
    function HelpModal(container) {
        if (container === void 0) { container = protractor_1.element(protractor_1.by.tagName('app-help')); }
        this.data = {
            header: protractor_1.by.css('.header'),
            sections: protractor_1.by.css('.help-menu__section'),
            'section headers': protractor_1.by.css('.help-menu__section--header'),
            items: protractor_1.by.css('.help-menu__section--item'),
            description: protractor_1.by.css('.help-item'),
            'back button': protractor_1.by.css('.close-page'),
            'close button': protractor_1.by.css('.close-help__button')
        };
        this.container = container;
    }
    HelpModal.prototype.getSection = function (nameOrNumber) {
        var _this = this;
        var section;
        if (typeof nameOrNumber === 'number') {
            section = this.container.all(this.data.sections).get(nameOrNumber);
        }
        else {
            section = this.container.all(this.data.sections).filter(function (sect) {
                return sect.element(_this.data['section headers']).getText()
                    .then(function (text) {
                    return text.toLowerCase().trim() === nameOrNumber.toLowerCase();
                });
            }).first();
        }
        var self = this;
        return {
            getItemsNames: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var textArr;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, section.all(self.data.items).getText()];
                            case 1:
                                textArr = _a.sent();
                                return [2 /*return*/, textArr.map(function (t) { return t.trim(); })];
                        }
                    });
                });
            },
            getHeader: function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, section.element(self.data['section headers']).getText()];
                            case 1: return [2 /*return*/, (_a.sent()).trim()];
                        }
                    });
                });
            }
        };
    };
    HelpModal.prototype.getItem = function (nameOrNumber) {
        var item;
        if (parseInt(nameOrNumber)) {
            item = this.container.all(this.data.items).get(nameOrNumber);
        }
        else {
            item = this.container.all(this.data.items).filter(function (i) {
                return i.getText()
                    .then(function (text) {
                    return text.toLowerCase().trim() === nameOrNumber.toLowerCase();
                });
            }).first();
        }
        return {
            click: function () {
                return item.click();
            },
            scrollTo: function () {
                return item.scrollTo();
            }
        };
    };
    HelpModal.prototype.isVisible = function () {
        return this.container.isDisplayed()
            .then(function (is) { return is; }, function () { return false; });
    };
    HelpModal.prototype.close = function () {
        return this.container.element(this.data['close button']).click();
    };
    HelpModal.prototype.clickBack = function () {
        return this.container.element(this.data['back button']).click();
    };
    HelpModal.prototype.getHeader = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.header).getText()];
                    case 1: return [2 /*return*/, (_a.sent()).trim()];
                }
            });
        });
    };
    HelpModal.prototype.getSectionNames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var textArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.all(this.data['section headers']).getText()];
                    case 1:
                        textArr = _a.sent();
                        return [2 /*return*/, textArr.map(function (t) { return t.trim(); })];
                }
            });
        });
    };
    HelpModal.prototype.isElementVisible = function (elementName) {
        elementName = elementName.toLowerCase();
        return this.container.element(this.data[elementName]).isDisplayed()
            .then(function (is) { return is; }, function () { return false; });
    };
    return HelpModal;
}());
exports.HelpModal = HelpModal;
//# sourceMappingURL=help-modal.js.map