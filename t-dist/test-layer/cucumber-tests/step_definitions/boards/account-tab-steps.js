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
/* tslint:disable:max-line-length */
var cucumber_1 = require("cucumber");
var protractor_1 = require("protractor");
var timezones_1 = require("../../../../support/emuns/timezones");
var moment = require("moment");
cucumber_1.defineSupportCode(function (_a) {
    var Given = _a.Given, When = _a.When, Then = _a.Then;
    When(/^I go to '(.+)' section$/, function (section) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.click(section)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I click '(.+)' in (?:platform settings|account details|account funding|statements and contracts) section$/, function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            var currmail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (elementName === 'update now button') {
                            this.memory['password changed'] = true;
                        }
                        if (!(elementName === 'update email button')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.getElementText('current email')];
                    case 1:
                        currmail = _a.sent();
                        this.memory['previous email'] = currmail[1];
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.click(elementName)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I select '(.+)' option from '(.+)' dropdown in '(.+)' section$/, function (optionName, dropdownName, sectionName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(dropdownName === 'date format')) return [3 /*break*/, 2];
                        _a = this.memory;
                        _b = 'date format description';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.getDescription(dropdownName)];
                    case 1:
                        _a[_b] = _c.sent();
                        _c.label = 2;
                    case 2: return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.click(dropdownName)];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.selectDropdownOption(sectionName, dropdownName, optionName)];
                    case 4:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I select (from|to) date '(.+)' in the date picker$/, function (datePicker, date) {
        return __awaiter(this, void 0, void 0, function () {
            var dateValue, month, day, curdate, curmonth, clicks, i, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        date = new Date(date);
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.getDatePickerValue(datePicker)];
                    case 1:
                        dateValue = _b.sent();
                        month = date.getMonth();
                        day = date.getDate().toString();
                        curdate = dateValue === '' ? new Date() : moment(dateValue, 'DD/MM/YYYY').toDate();
                        curmonth = curdate.getMonth();
                        clicks = curmonth - month;
                        this.memory[datePicker] = date;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.click(datePicker)];
                    case 2:
                        _b.sent();
                        i = 0;
                        _b.label = 3;
                    case 3:
                        if (!(i < Math.abs(clicks))) return [3 /*break*/, 9];
                        if (!(clicks > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.click('previous month')];
                    case 4:
                        _a = _b.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.click('next month')];
                    case 6:
                        _a = _b.sent();
                        _b.label = 7;
                    case 7:
                        _a;
                        _b.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 3];
                    case 9: return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.selectDate(day)];
                    case 10:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I enter '(.+)' into '(.+)' text input field$/, function (text, input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (text === 'old password') {
                            text = 'password';
                        }
                        else if (text === 'new password') {
                            text = '12345678';
                        }
                        this.memory[input] = text;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.enterText(input, text)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I clear '(.+)' text input field$/, function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.clearText(input)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I select '(.+)'(?:st|th|nd|rd|) month from the list$/, function (month) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (parseInt(month)) {
                            month -= 1;
                        }
                        this.memory.month = month;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.selectMonth(month)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the (funding|statements|settings|details) section should be active$/, function (section) {
        return __awaiter(this, void 0, void 0, function () {
            var state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.isSectionActive(section)];
                    case 1:
                        state = _a.sent();
                        this.expect(state).to.equal(true);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the (?:funding|statements|settings|details) section (should|should not) contain items:$/, function (state, table) {
        return __awaiter(this, void 0, void 0, function () {
            var itemNames, i, actualItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemNames = table.raw().map(function (el) {
                            return el[0];
                        });
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < itemNames.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.isElementPresentAndVisible(itemNames[i], state)];
                    case 2:
                        actualItem = _a.sent();
                        state === 'should' ? this.expect(actualItem).to.equal(true) : this.expect(actualItem).to.equal(false);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' (should|should not) be visible within account tab$/, function (elementName, state) {
        return __awaiter(this, void 0, void 0, function () {
            var actualState, expectedState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.isElementPresentAndVisible(elementName, state)];
                    case 1:
                        actualState = _a.sent();
                        expectedState = state === 'should';
                        if (elementName === 'email') {
                            this.memory['new email'] = this.memory.clientInfo['PersonalEmailAddress'];
                        }
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' option is selected in '(.+)' dropdown$/, function (option, dropdown) {
        return __awaiter(this, void 0, void 0, function () {
            var actualOption;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.memory[dropdown] = option;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.getSelectedOption(dropdown)];
                    case 1:
                        actualOption = _a.sent();
                        this.expect(actualOption).to.equal(option);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' dropdown in '(.+)' section contains correct items$/, function (dropdown, section) {
        return __awaiter(this, void 0, void 0, function () {
            var actualOptions, expectedOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.getElementText(dropdown)];
                    case 1:
                        actualOptions = _a.sent();
                        if (dropdown === 'session timeout') {
                            expectedOptions = ['1 hour', '2 hours', '4 hours', '8 hours', '24 hours'];
                        }
                        else if (dropdown === 'time zone') {
                            expectedOptions = timezones_1.timezones.map(function (t) { return t.text; });
                        }
                        else {
                            expectedOptions = ['DD/MM/YYYY', 'MM/DD/YYYY'];
                        }
                        this.expect(actualOptions).to.deep.equal(expectedOptions);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^(time zone|date format|account funding) description is correct$/, function (description) {
        return __awaiter(this, void 0, void 0, function () {
            var actualDescription, expectedDescription;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.getDescription(description)];
                    case 1:
                        actualDescription = _a.sent();
                        if (description === 'time zone') {
                            expectedDescription = this.memory['time zone'];
                        }
                        else if (description === 'date format') {
                            expectedDescription = "Today " + moment(new Date()).format(this.memory['date format']);
                        }
                        else if (description === 'account funding') {
                            expectedDescription = 'You can fund your account by Debit and Credit card, BACS, CHAPS or cheque. For compliance purposes, client refunds will only be returned to the original funding source.';
                        }
                        this.expect(actualDescription).to.equal(expectedDescription);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the hedge is (on|off)$/, function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var actualState, expectedState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.waitLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.isHedgeOn()];
                    case 2:
                        actualState = _a.sent();
                        expectedState = state === 'on';
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)' section route is correct$/, function (section) {
        return __awaiter(this, void 0, void 0, function () {
            var actualRoute, expectedRoute;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.browser.getCurrentUrl()];
                    case 1:
                        actualRoute = _a.sent();
                        expectedRoute = protractor_1.browser.baseUrl + "account/" + section;
                        this.expect(actualRoute).to.equal(expectedRoute);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' should be (enabled|disabled)$/, function (elementName, state) {
        return __awaiter(this, void 0, void 0, function () {
            var actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.isElementActive(elementName)];
                    case 1:
                        actualState = _a.sent();
                        state === 'enabled' ? this.expect(actualState).to.equal(true) : this.expect(actualState).to.equal(false);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' text is '(.+)'$/, function (elementName, text) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedClientInfo, actualText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (text === 'correct') {
                            expectedClientInfo = {
                                'full username': this.memory.clientInfo['LogonUserName'],
                                'logged username': "Username: " + this.memory.clientInfo['TradingAccounts'][0]['TradingAccountCode']
                            };
                            text = expectedClientInfo[elementName];
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.getDescription(elementName)];
                    case 1:
                        actualText = _a.sent();
                        this.expect(actualText).to.equal(text);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' is updated$/, function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            var oldText, state;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        oldText = elementName === 'current email' ? this.memory['previous email'] : this.memory['date format description'];
                        return [4 /*yield*/, protractor_1.browser.wait(function () {
                                if (elementName === 'current email') {
                                    return _this.basePage.currentBoard.tabBody.myAccount.getElementText(elementName)
                                        .then(function (text) { return _this.helper.sleepIfFalse(text[1] !== oldText, 500); });
                                }
                                else {
                                    return _this.basePage.currentBoard.tabBody.myAccount.getDescription(elementName)
                                        .then(function (text) { return _this.helper.sleepIfFalse(text[1] !== oldText, 500); });
                                }
                            }, 10000)
                                .then(function () { return true; }, function () { return false; })];
                    case 1:
                        state = _a.sent();
                        this.expect(state).to.equal(true);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' text should be (fully displayed|with three dots in the name|with three dots in the domain name|with three dots in the name and domain name)$/, function (elementName, text) {
        return __awaiter(this, void 0, void 0, function () {
            var actualText, expectedText, name, domain, top;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.getElementText(elementName)];
                    case 1:
                        actualText = _a.sent();
                        if (elementName === 'current email') {
                            actualText = actualText[1];
                        }
                        else if (elementName === 'email') {
                            actualText = actualText[0];
                        }
                        expectedText = this.memory['new email'];
                        name = expectedText.split('@')[0];
                        domain = expectedText.split('@')[1].split('.')[0];
                        top = expectedText.split('@')[1].split('.')[1];
                        if (text === 'with three dots in the name') {
                            expectedText = name.slice(0, 3) + "..." + name.slice(-3) + "@" + domain + "." + top;
                        }
                        else if (text === 'with three dots in the domain name') {
                            expectedText = name + "@" + domain.slice(0, 3) + "..." + domain.slice(-3) + "." + top;
                        }
                        else if (text === 'with three dots in the name and domain name') {
                            expectedText = name.slice(0, 3) + "..." + name.slice(-3) + "@" + domain.slice(0, 3) + "..." + domain.slice(-3) + "." + top;
                        }
                        this.expect(actualText).to.equal(expectedText);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^email tooltip should be correct$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            var actualTooltip, expectedTooltip;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.getTooltip()];
                    case 1:
                        actualTooltip = _a.sent();
                        expectedTooltip = this.memory['new email'];
                        this.expect(actualTooltip).to.equal(expectedTooltip);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^password is changed successfully$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            var isChanged, oldPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.backendHelper.changePassword(this.memory['new password'], this.memory['old password'])];
                    case 1:
                        isChanged = _a.sent();
                        oldPassword = this.memory['new password'];
                        this.memory['new password'] = this.memory['old password'];
                        this.memory['old password'] = oldPassword;
                        this.expect(isChanged).to.equal(true);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' redirects to the correct url$/, function (link) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedUrl, actualUrl;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (link === 'add funds link') {
                            expectedUrl = process.env.npm_config_env === 'ppe' ? 'https://qappitp.cityindex.co.uk/funding.webui/'
                                : 'https://trade.loginandtrade.com/funding.webui/';
                        }
                        else if (link === 'withdraw funds link') {
                            expectedUrl = process.env.npm_config_env === 'ppe' ? 'https://qappitp.cityindex.co.uk/funding.webui/Funding/WithdrawFunds'
                                : 'https://account.cityindex.co.uk/funding/withdrawal/cards';
                        }
                        else if (link === 'add payment method link') {
                            expectedUrl = process.env.npm_config_env === 'ppe' ? 'https://qappitp.cityindex.co.uk/funding.webui/Funding/AddCard'
                                : 'https://account.cityindex.co.uk/funding/deposit/cards';
                        }
                        else {
                            expectedUrl = process.env.npm_config_env === 'ppe' ? 'https://qappitp.cityindex.co.uk/funding.webui/Funding/RemoveCard'
                                : 'https://trade.loginandtrade.com/funding.webui/Funding/RemoveCard';
                        }
                        return [4 /*yield*/, protractor_1.browser.wait(function () {
                                return protractor_1.browser.getCurrentUrl()
                                    .then(function (url) {
                                    actualUrl = url;
                                    return _this.helper.sleepIfFalse(url.includes(expectedUrl), 500);
                                });
                            }, 10000)
                                .then(function () { return null; }, function () { return null; })];
                    case 1:
                        _a.sent();
                        this.expect(actualUrl).to.equal(expectedUrl);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' option is (selected|not selected)$/, function (elementName, state) {
        return __awaiter(this, void 0, void 0, function () {
            var actualState, expectedState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.isElementSelected(elementName)];
                    case 1:
                        actualState = _a.sent();
                        expectedState = state === 'selected' ? true : false;
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)'(?:st|th|nd|rd|) month is selected in the list$/, function (month) {
        return __awaiter(this, void 0, void 0, function () {
            var actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (parseInt(month)) {
                            month -= 1;
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.isMonthSelected(month)];
                    case 1:
                        actualState = _a.sent();
                        this.expect(actualState).to.equal(true);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the list of statements and contracts (?:of|for) the correct '(month|date range)' is displayed$/, function (itemName) {
        return __awaiter(this, void 0, void 0, function () {
            var data, date, expectedValue, startDate_1, endDate_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.myAccount.getStatementsData('date')];
                    case 1:
                        data = _a.sent();
                        date = data.map(function (s) {
                            return moment(s, 'DD/MM/YYYY');
                        });
                        if (itemName === 'month') {
                            expectedValue = this.memory.month.split(' ')[0];
                            return [2 /*return*/, date.map(function (m) {
                                    _this.expect(m.format('MMMM') === expectedValue).to.equal(true);
                                })];
                        }
                        else {
                            startDate_1 = moment(this.memory.from, 'DD/MM/YYYY');
                            endDate_1 = moment(this.memory.to, 'DD/MM/YYYY');
                            return [2 /*return*/, date.map(function (d) {
                                    _this.expect(d.isBetween(startDate_1, endDate_1)).to.equal(true);
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=account-tab-steps.js.map