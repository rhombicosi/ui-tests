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
var LinkedOrder = /** @class */ (function () {
    function LinkedOrder(container) {
        this.data = {
            rows: {
                root: protractor_1.by.css('.row'),
                checkbox: protractor_1.by.css('.custom-checkbox'),
                'checkbox input': protractor_1.by.css('.custom-checkbox__input'),
                'trash icon': protractor_1.by.css('.icon-trash-can'),
                label: protractor_1.by.css('.row__label'),
                dropdown: protractor_1.by.css('.linked-order__available-types'),
                'linked order types': protractor_1.by.css('.icon-triangle-down'),
                link: protractor_1.by.css('.link'),
                price: protractor_1.by.css('[placeholder="price"]'),
                'price border': protractor_1.by.css('.at-lo-price-input'),
                ccy: protractor_1.by.css('.currency-label'),
                applicability: protractor_1.by.css('.applicability-dropdown'),
                'p/l': protractor_1.by.css('[placeholder="P/L"]'),
                'p/l border': protractor_1.by.css('.at-lo-profit-loss__input'),
                points: protractor_1.by.css('[placeholder="points"]'),
                'points border': protractor_1.by.css('[formcontrolname="points"]'),
                'points away': protractor_1.by.css('[placeholder="points away"]'),
                quantity: protractor_1.by.css('[placeholder="quantity"]'),
                'date picker': protractor_1.by.css('my-date-picker'),
                'calendar icon': protractor_1.by.css('.icon-mydpcalendar'),
                currentDayBtn: protractor_1.by.css('.markcurrday'),
                'time picker': protractor_1.by.css('app-timepicker'),
                time: protractor_1.by.css('.time-picker'),
                'undo button': protractor_1.by.css('.linked-orders__undo-button'),
                delitionMessage: protractor_1.by.css('.linked-orders__deletion-message'),
                // validation: by.css('.row__validations')
                validation: protractor_1.by.css('app-show-errors > ul > li')
            }
        };
        this.container = container;
    }
    LinkedOrder.prototype.getInputValue = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = name.toLowerCase();
                        if (!(name === 'applicability')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.container.element(protractor_1.by.css('.applicability-dropdown>.dropdown>span')).getText()];
                    case 1: return [2 /*return*/, (_a.sent()).trim()];
                    case 2:
                        if (!(name === 'ccy')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.container.element(this.data.rows[name]).getText()];
                    case 3: return [2 /*return*/, (_a.sent()).trim()];
                    case 4: return [4 /*yield*/, this.container.element(this.data.rows[name]).getAttribute('value')];
                    case 5: return [2 /*return*/, (_a.sent()).trim()];
                }
            });
        });
    };
    LinkedOrder.prototype.getBorderColor = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = name.toLowerCase();
                        return [4 /*yield*/, this.container.element(this.data.rows[name]).getCssValue('border-color')];
                    case 1: return [2 /*return*/, (_a.sent()).trim()];
                }
            });
        });
    };
    LinkedOrder.prototype.getCssValue = function (name, cssProperty) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = name.toLowerCase();
                        return [4 /*yield*/, this.container.element(this.data.rows[name]).getCssValue(cssProperty)];
                    case 1: return [2 /*return*/, (_a.sent()).trim()];
                }
            });
        });
    };
    LinkedOrder.prototype.fillInputWithValue = function (name, value) {
        return __awaiter(this, void 0, void 0, function () {
            var val;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = name.toLowerCase();
                        val = this.container.element(this.data.rows[name]);
                        if (!(name === 'time')) return [3 /*break*/, 3];
                        return [4 /*yield*/, val.waitReady(2000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, val.sendKeys(value)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, val.waitReady(2000)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, val.clear()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, val.sendKeys(value)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    LinkedOrder.prototype.clearField = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = name.toLowerCase();
                        return [4 /*yield*/, this.container.element(this.data.rows[name]).waitReady(1000)];
                    case 1:
                        el = _a.sent();
                        // workaround, since clear() method doesn't update angular model
                        return [4 /*yield*/, el.sendKeys(protractor_1.protractor.Key.chord(protractor_1.protractor.Key.CONTROL, 'a', protractor_1.protractor.Key.DELETE))];
                    case 2:
                        // workaround, since clear() method doesn't update angular model
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LinkedOrder.prototype.isElementPresent = function (elementName) {
        elementName = elementName.toLowerCase();
        var webElement = this.container.element(this.data.rows[elementName]);
        return webElement.isPresent();
    };
    LinkedOrder.prototype.isElementEnabled = function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            var el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.rows[elementName]).waitReady(5000)];
                    case 1:
                        el = _a.sent();
                        return [2 /*return*/, el.isEnabled()];
                }
            });
        });
    };
    LinkedOrder.prototype.removeLinkedOrder = function () {
        return this.container.element(this.data.rows['trash icon']).click();
    };
    LinkedOrder.prototype.expandApplicabilityDropdown = function () {
        return this.container.element(this.data.rows.applicability).click();
    };
    LinkedOrder.prototype.expandDropdown = function (dropdownName) {
        return __awaiter(this, void 0, void 0, function () {
            var el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.rows[dropdownName]).waitReady(5000)];
                    case 1:
                        el = _a.sent();
                        return [2 /*return*/, el.click()];
                }
            });
        });
    };
    LinkedOrder.prototype.selectStopType = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var stop;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stop = this.container.all(this.data.rows.link).filter(function (l) {
                            return l.getText()
                                .then(function (text) {
                                return text.toLowerCase().trim().includes(type);
                            });
                        }).first();
                        return [4 /*yield*/, stop.waitReady(10000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, stop.click()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LinkedOrder.prototype.getApplicabilityDropdownOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var textArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.rows.applicability).all(protractor_1.by.css('.dropdown__content > ul > li')).getText()];
                    case 1:
                        textArr = _a.sent();
                        return [2 /*return*/, textArr.map(function (t) { return t.trim().replace(/\s+/g, ' '); })];
                }
            });
        });
    };
    LinkedOrder.prototype.selectApplicability = function (nameOrNumber) {
        var applicability;
        var self = this;
        if (typeof nameOrNumber === 'number') {
            applicability = self.container.element(self.data.rows.applicability).all(protractor_1.by.css('.dropdown__content > ul > li')).get(nameOrNumber);
        }
        else {
            applicability = self.container.element(self.data.rows.applicability)
                .element(protractor_1.by.cssContainingText('.dropdown__content > ul > li', nameOrNumber.toUpperCase()));
        }
        return applicability.click();
    };
    LinkedOrder.prototype.selectCurrentDate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.rows['calendar icon']).click()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.element(this.data.rows.currentDayBtn).click()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LinkedOrder.prototype.getField = function (fieldName) {
        return this.container.element(this.data.rows[fieldName]);
    };
    LinkedOrder.prototype.checkCheckbox = function () {
        return this.container.element(this.data.rows.checkbox).click();
    };
    LinkedOrder.prototype.isChecked = function () {
        return __awaiter(this, void 0, void 0, function () {
            var is;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.rows['checkbox input']).getAttribute('checked')];
                    case 1:
                        is = _a.sent();
                        if (is) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LinkedOrder.prototype.getValidationMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.rows.validation).waitReady(5000)];
                    case 1:
                        el = _a.sent();
                        return [4 /*yield*/, el.getText()];
                    case 2: return [2 /*return*/, (_a.sent()).trim()];
                }
            });
        });
    };
    LinkedOrder.prototype.getPlaceholder = function (name) {
        return this.container.element(this.data.rows[name]).getAttribute('placeholder');
    };
    return LinkedOrder;
}());
exports.LinkedOrder = LinkedOrder;
//# sourceMappingURL=linked-order.js.map