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
var MyAccount = /** @class */ (function () {
    function MyAccount() {
        this.data = {
            // 'account menu'
            'icon container': protractor_1.by.css('.icon-container'),
            username: protractor_1.by.css('.username'),
            clientAccount: protractor_1.by.css('.client-account'),
            tradingAccountNumber: protractor_1.by.css('.trading-account-number'),
            email: protractor_1.by.css('.email'),
            funding: protractor_1.by.css('div[routerlink="funding"]'),
            statements: protractor_1.by.css('div[routerlink="statements"]'),
            settings: protractor_1.by.css('div[routerlink="settings"]'),
            details: protractor_1.by.css('div[routerlink="details"]'),
            // 'account funding'
            'funding header': protractor_1.by.css('.funding-header'),
            'funding description': protractor_1.by.css('.funding-description'),
            'add funds link': protractor_1.by.css('.funding-link--funding'),
            'withdraw funds link': protractor_1.by.css('.funding-link--withdrawal'),
            'add payment method link': protractor_1.by.css('.funding-link--add-payment'),
            'remove payment method link': protractor_1.by.css('.funding-link--remove-payment'),
            // 'statemetns and contracts'
            'statements and contracts header': protractor_1.by.css('.statements__header'),
            'statements checkbox': protractor_1.by.css('input[formcontrolname="statements"]'),
            'contract notes checkbox': protractor_1.by.css('input[formcontrolname="contracts"]'),
            'select dates label': protractor_1.by.css('.statements-form__date-mode-select'),
            'select dates': protractor_1.by.css('select[formcontrolname="dateMode"]'),
            months: protractor_1.by.css('.date-input__list-item > span'),
            'month radio button': protractor_1.by.css('input[formcontrolname="month"]'),
            'other dates link': protractor_1.by.css('.date-input__toggle'),
            'search button': protractor_1.by.cssContainingText('button', 'Search'),
            'date input control': protractor_1.by.css('.date-input__control'),
            'date picker input': protractor_1.by.css('.selection'),
            'date picker label': protractor_1.by.css('.label'),
            'date picker buttons': protractor_1.by.css('.selbtngroup'),
            'previous month': protractor_1.by.css('button[aria-label="Previous Month"]'),
            'next month': protractor_1.by.css('button[aria-label="Next Month"]'),
            'statements and contract notes header': protractor_1.by.css('.statements-notes__header'),
            'statements placeholder': protractor_1.by.css('.statements-notes__placeholder'),
            'statements items': protractor_1.by.css('.statements-notes__list-item'),
            date: protractor_1.by.css('.statements-notes__item--date'),
            range: protractor_1.by.css('.statements-notes__item--range'),
            type: protractor_1.by.css('.statements-notes__item--type'),
            'download link': protractor_1.by.css('.contract-download-link'),
            pdf: protractor_1.by.css('embed[type="application/pdf"]'),
            // 'platform settings'
            'settings header': protractor_1.by.css('.settings-header'),
            icon: protractor_1.by.css('.icon-chart'),
            column: protractor_1.by.css('.form-column'),
            label: protractor_1.by.css('.form-section__label'),
            toggle: protractor_1.by.css('.hedge'),
            hedgeDescription: protractor_1.by.css('.form__item__description'),
            description: protractor_1.by.css('.form-section__description'),
            'session timeout': protractor_1.by.css('select[formcontrolname="sessionTimeout"]'),
            'time zone': protractor_1.by.css('select[formcontrolname="timezone"]'),
            'date format': protractor_1.by.css('select[formcontrolname="dateFormat"]'),
            // 'account details'
            'details header': protractor_1.by.css('.form-header'),
            'current email': protractor_1.by.css('.form__current-email'),
            'new email': protractor_1.by.css('.form-control__new-email'),
            're-enter email': protractor_1.by.css('.form-control__re-enter-email'),
            buttons: protractor_1.by.css('button'),
            'password description': protractor_1.by.css('.form-description'),
            'old password': protractor_1.by.css('.form-control__old-password'),
            'new password': protractor_1.by.css('.form-control__new-password'),
            're-enter password': protractor_1.by.css('.form-control__re-enter-new-password'),
            'error message': protractor_1.by.css('.form-container__error-message')
        };
    }
    MyAccount.prototype.isSectionActive = function (sectionName) {
        return __awaiter(this, void 0, void 0, function () {
            var is;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.element(this.data[sectionName]).waitReady(5000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data[sectionName]).getAttribute('class')];
                    case 2:
                        is = _a.sent();
                        return [2 /*return*/, is.includes('active')];
                }
            });
        });
    };
    MyAccount.prototype.click = function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            var self, elements;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        elements = {
                            'update email button': protractor_1.element.all(this.data.buttons).get(0),
                            'update now button': protractor_1.element.all(this.data.buttons).get(1),
                            'search button': protractor_1.element(this.data['search button']),
                            from: protractor_1.element.all(this.data['date picker buttons']).get(0),
                            to: protractor_1.element.all(this.data['date picker buttons']).get(1)
                        };
                        if (!elements[elementName]) return [3 /*break*/, 2];
                        return [4 /*yield*/, protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.elementToBeClickable(elements[elementName]), 10000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, elements[elementName].click()];
                    case 2: return [4 /*yield*/, protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.elementToBeClickable(protractor_1.element(this.data[elementName])), 10000)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, protractor_1.element(this.data[elementName]).click()];
                }
            });
        });
    };
    MyAccount.prototype.getParentText = function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            var self, elements, parentText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elementName = elementName.toLowerCase();
                        self = this;
                        elements = {
                            'hedge label': protractor_1.element(self.data.column).get(0).element(self.data.label)
                        };
                        return [4 /*yield*/, elements[elementName].getText()];
                    case 1:
                        parentText = _a.sent();
                        return [2 /*return*/, parentText.split('\n')[0].trim()];
                }
            });
        });
    };
    MyAccount.prototype.isElementPresentAndVisible = function (elementName, elementState) {
        return __awaiter(this, void 0, void 0, function () {
            var self, elements, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        elementName = elementName.toLowerCase();
                        self = this;
                        _a = {};
                        _b = 'cfd account';
                        return [4 /*yield*/, self.getElementByText('cfd account')];
                    case 1:
                        _a[_b] = _d.sent();
                        _c = 'spread account';
                        return [4 /*yield*/, self.getElementByText('spread account')];
                    case 2:
                        elements = (_a[_c] = _d.sent(),
                            _a['full username'] = protractor_1.element(self.data.username),
                            _a['logged username'] = protractor_1.element(self.data.clientAccount),
                            _a['hedge label'] = protractor_1.element.all(self.data.column).get(0).element(self.data.label),
                            _a['hedge toggle'] = protractor_1.element.all(self.data.column).get(0).element(self.data.toggle),
                            _a['hedge description'] = protractor_1.element(self.data.hedgeDescription),
                            _a['session timeout label'] = protractor_1.element.all(self.data.column).get(1)
                                .all(self.data.label).get(0),
                            _a['session timeout dropdown'] = protractor_1.element(self.data['session timeout']),
                            _a['timezone label'] = protractor_1.element.all(self.data.column).get(1).all(self.data.label).get(1),
                            _a['timezone dropdown'] = protractor_1.element(self.data['time zone']),
                            _a['timezone description'] = protractor_1.element.all(self.data.description).get(0),
                            _a['date format label'] = protractor_1.element.all(self.data.column).get(1).all(self.data.label).get(2),
                            _a['date format dropdown'] = protractor_1.element(self.data['date format']),
                            _a['date format description'] = protractor_1.element.all(self.data.description).get(1),
                            _a['current email'] = protractor_1.element(self.data['current email']),
                            _a['new email input'] = protractor_1.element(self.data['new email']),
                            _a['re-enter email input'] = protractor_1.element(self.data['re-enter email']),
                            _a['update email button'] = protractor_1.element.all(self.data.buttons).get(0),
                            _a['password description'] = protractor_1.element(self.data['password description']),
                            _a['old password input'] = protractor_1.element(self.data['old password']),
                            _a['new password input'] = protractor_1.element(self.data['new password']),
                            _a['re-enter password input'] = protractor_1.element(self.data['re-enter password']),
                            _a['update now button'] = protractor_1.element.all(self.data.buttons).get(1),
                            _a['from date'] = protractor_1.element.all(self.data['date input control']).get(0),
                            _a['to date'] = protractor_1.element.all(self.data['date input control']).get(1),
                            _a);
                        if (!!elements[elementName]) return [3 /*break*/, 6];
                        if (!(elementState === 'should')) return [3 /*break*/, 4];
                        return [4 /*yield*/, protractor_1.element(self.data[elementName]).waitReady(5000)
                                .then(function () { return null; }, function () { return null; })];
                    case 3:
                        _d.sent();
                        return [2 /*return*/, protractor_1.element(self.data[elementName]).isDisplayed()];
                    case 4: return [2 /*return*/, protractor_1.element(self.data[elementName]).isPresent()];
                    case 5: return [3 /*break*/, 9];
                    case 6:
                        if (!(elementState === 'should')) return [3 /*break*/, 8];
                        return [4 /*yield*/, elements[elementName].waitReady(5000)
                                .then(function () { return null; }, function () { return null; })];
                    case 7:
                        _d.sent();
                        return [2 /*return*/, elements[elementName].isDisplayed()];
                    case 8: return [2 /*return*/, elements[elementName].isPresent()];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    MyAccount.prototype.getElementByText = function (containingText) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, protractor_1.element.all(this.data.tradingAccountNumber).filter(function (elem) {
                        return elem.getText()
                            .then(function (text) {
                            return text.trim().toLowerCase().includes(containingText);
                        });
                    }).first()];
            });
        });
    };
    MyAccount.prototype.getSelectedOption = function (dropdownName) {
        return __awaiter(this, void 0, void 0, function () {
            var optionSelected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dropdownName = dropdownName.toLowerCase();
                        return [4 /*yield*/, protractor_1.element(this.data[dropdownName]).element(protractor_1.by.css('option:checked')).getText()];
                    case 1:
                        optionSelected = _a.sent();
                        return [2 /*return*/, optionSelected.trim()];
                }
            });
        });
    };
    MyAccount.prototype.isHedgeOn = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // const is = await element(this.data.toggle).getAttribute('class');
                //
                // return is.includes('active');
                return [2 /*return*/, protractor_1.element(this.data.toggle).waitText('on', 1000)
                        .then(function () { return true; }, function () { return false; })];
            });
        });
    };
    MyAccount.prototype.getElementText = function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            var content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.element(this.data[elementName]).waitReady(5000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element(this.data[elementName]).getText()];
                    case 2:
                        content = _a.sent();
                        return [2 /*return*/, content.split('\n').map(function (t) { return t.trim(); }).filter(function (t) { return t; })];
                }
            });
        });
    };
    MyAccount.prototype.getDescription = function (description) {
        return __awaiter(this, void 0, void 0, function () {
            var self, elements;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        description = description.toLowerCase();
                        self = this;
                        elements = {
                            hedge: protractor_1.element(self.data.hedgeDescription),
                            'time zone': protractor_1.element.all(self.data.description).get(0),
                            'date format': protractor_1.element.all(self.data.description).get(1),
                            'error message': protractor_1.element(self.data['error message']),
                            'account funding': protractor_1.element(self.data['funding description']),
                            'full username': protractor_1.element(self.data.username),
                            'logged username': protractor_1.element(self.data.clientAccount),
                            email: protractor_1.element(self.data.email)
                        };
                        return [4 /*yield*/, elements[description].waitReady(10000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, elements[description].getText()];
                }
            });
        });
    };
    MyAccount.prototype.getTooltip = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, protractor_1.element(this.data['email']).getAttribute('title')];
            });
        });
    };
    MyAccount.prototype.selectDropdownOption = function (sectionName, dropdownName, optionNameOrNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof optionNameOrNumber === 'number') {
                    return [2 /*return*/, protractor_1.element(this.data[dropdownName]).all(protractor_1.by.tagName('option')).get(optionNameOrNumber).click()];
                }
                else {
                    return [2 /*return*/, protractor_1.element(protractor_1.by.cssContainingText('option', optionNameOrNumber)).click()];
                }
                return [2 /*return*/];
            });
        });
    };
    MyAccount.prototype.enterText = function (inputField, text) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.element(this.data[inputField]).clear()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, protractor_1.element(this.data[inputField]).sendKeys(text)];
                }
            });
        });
    };
    MyAccount.prototype.clearText = function (inputField) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, protractor_1.element(this.data[inputField]).clear()];
            });
        });
    };
    MyAccount.prototype.isElementActive = function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            var self, elements;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elementName = elementName.toLowerCase();
                        self = this;
                        elements = {
                            'update email button': protractor_1.element.all(self.data.buttons).get(0),
                            'update now button': protractor_1.element.all(self.data.buttons).get(1),
                            'search button': protractor_1.element(self.data['search button'])
                        };
                        return [4 /*yield*/, elements[elementName].getAttribute('disabled')];
                    case 1: return [2 /*return*/, !(_a.sent())];
                }
            });
        });
    };
    MyAccount.prototype.isElementSelected = function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, protractor_1.element(this.data[elementName]).isSelected()];
            });
        });
    };
    MyAccount.prototype.selectMonth = function (nameOrNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof nameOrNumber === 'number') {
                    return [2 /*return*/, protractor_1.element.all(this.data['month radio button']).get(nameOrNumber).click()];
                }
                else {
                    return [2 /*return*/, protractor_1.element.all(this.data.months).filter(function (m) {
                            return m.getText()
                                .then(function (text) {
                                return text.trim() === nameOrNumber;
                            });
                        }).click()];
                }
                return [2 /*return*/];
            });
        });
    };
    MyAccount.prototype.isMonthSelected = function (nameOrNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof nameOrNumber === 'number')) return [3 /*break*/, 2];
                        return [4 /*yield*/, protractor_1.element.all(this.data['month radio button']).get(nameOrNumber).waitReady(3000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, protractor_1.element.all(this.data['month radio button']).get(nameOrNumber).isSelected()];
                    case 2: return [4 /*yield*/, protractor_1.element.all(this.data['month radio button']).get(0).waitReady(3000)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, protractor_1.element.all(this.data['month radio button']).filter(function (m) {
                                return m.element(protractor_1.by.xpath('following-sibling::span')).getText()
                                    .then(function (text) {
                                    return text.trim() === nameOrNumber;
                                });
                            }).first().isSelected()];
                }
            });
        });
    };
    MyAccount.prototype.getStatementsAndContractsValue = function (itemNumber, itemName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, protractor_1.element.all(this.data['statements items']).get(itemNumber)
                        .element(this.data[itemName]).getText()];
            });
        });
    };
    MyAccount.prototype.getStatementsData = function (itemName) {
        return __awaiter(this, void 0, void 0, function () {
            var itemsList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.element.all(this.data['statements items']).all(this.data[itemName]).getText()];
                    case 1:
                        itemsList = _a.sent();
                        return [2 /*return*/, itemsList];
                }
            });
        });
    };
    MyAccount.prototype.getDatePickerValue = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            var self, dates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        dates = {
                            from: protractor_1.element.all(self.data['date picker input']).get(0),
                            to: protractor_1.element.all(self.data['date picker input']).get(1)
                        };
                        return [4 /*yield*/, dates[date].waitReady(5000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, dates[date].getAttribute('value')];
                }
            });
        });
    };
    MyAccount.prototype.selectDate = function (day) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.element.all(protractor_1.by.cssContainingText('.currmonth', day)).get(0).waitReady(3000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.element.all(protractor_1.by.cssContainingText('.currmonth', day)).get(0).click()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MyAccount;
}());
exports.MyAccount = MyAccount;
//# sourceMappingURL=account-tab.js.map