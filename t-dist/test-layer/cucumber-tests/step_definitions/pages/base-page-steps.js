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
var balance_enum_1 = require("../../../../support/emuns/balance.enum");
cucumber_1.defineSupportCode(function (_a) {
    var Given = _a.Given, When = _a.When, Then = _a.Then;
    When(/^I click on Search input$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.header.clickSearch()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I click on '(.+)' (header|userMenu|feedbackModal) element$/, function (elementName, componentName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage[componentName].click(elementName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I go to my account (?:page|tab)$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.userMenu.click('myAccLink')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I redirect to '(.+)'$/, function (to) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.feedbackModal.redirect(to)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I close current browser tab$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.browser.close()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I switch to '(.+)' browser tab$/, function (tabNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tabNumber = parseInt(tabNumber) - 1;
                        return [4 /*yield*/, protractor_1.browser.getAllWindowHandles().then(function (handles) {
                                protractor_1.browser.switchTo().window(handles[tabNumber]);
                                protractor_1.browser.waitForAngularEnabled(false);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I dismiss alert$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.browser.switchTo().alert().then(function (alert) { return alert.accept(); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I close [Ss]earch input$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.header.clickLogo()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I select '([Ww]orkspace|[Bb]rowse)' board$/, function (boardName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.header.selectBoard(boardName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I fill search field with value '(.+)'$/, function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.header.addSearchValue(value)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I clear search input field$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.header.clearSearchInput()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I fill feedback text field with value '(.+)'/, function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.feedbackModal.fillInputWithValue(value)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I obtain '(.+)' url from kvp/, function (itemKey) {
        return __awaiter(this, void 0, void 0, function () {
            var accountInformation, expectedUrl, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.backendHelper.getClientAndTradingAccount()];
                    case 1:
                        accountInformation = _b.sent();
                        if (!(itemKey === 'contact us')) return [3 /*break*/, 2];
                        _a = protractor_1.browser.params.logOutRedirectUrl;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.backendHelper.getClientApplicationMessageTranslationWithInterestingItems(0, // INFO: as in AP app
                        accountInformation.CultureId, accountInformation.AccountOperatorId, [itemKey])];
                    case 3:
                        _a = (_b.sent())[0].Value.split(',')[0];
                        _b.label = 4;
                    case 4:
                        expectedUrl = _a;
                        this.memory[itemKey] = expectedUrl;
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I relogin to the application( as '(CFD|Spread|CFD & Spread|)' account|)$/, function (accountType) {
        return __awaiter(this, void 0, void 0, function () {
            var url, accounts;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.browser.getCurrentUrl()];
                    case 1:
                        url = _a.sent();
                        return [4 /*yield*/, this.basePage.logOut()];
                    case 2:
                        _a.sent();
                        this.lightstreamer.disconnectLS();
                        return [4 /*yield*/, protractor_1.browser.wait(function () {
                                return protractor_1.browser.getCurrentUrl()
                                    .then(function (changedUrl) { return _this.helper.sleepIfFalse(url !== changedUrl, 500); });
                            }, 10000)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.get(protractor_1.browser.baseUrl)];
                    case 4:
                        _a.sent();
                        if (!accountType) {
                            accountType = 'CFD & Spread';
                        }
                        accounts = {
                            CFD: {
                                login: '11420806',
                                password: 'password'
                            },
                            Spread: {
                                login: 'DM188265',
                                password: 'password'
                            },
                            'CFD & Spread': {
                                login: protractor_1.browser.params.login,
                                password: protractor_1.browser.params.password
                            }
                        };
                        return [4 /*yield*/, this.loginPage.signIn(accounts[accountType].login, accounts[accountType].password)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.basePage.waitLoading()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.waitForAngularEnabled(false)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.backendHelper.setSession()];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.backendHelper.setAccount()];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.lightstreamer.connectLS()];
                    case 10:
                        _a.sent();
                        if (!accountType) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.backendHelper.resetClientPreferences()];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12: return [4 /*yield*/, this.basePage.waitLoading()];
                    case 13:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^balance bar displays items in the correct order:$/, function (table) {
        return __awaiter(this, void 0, void 0, function () {
            var itemNames, actualItem, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemNames = table.raw().map(function (el) {
                            return el[0];
                        });
                        return [4 /*yield*/, this.basePage.balanceBar.getElementText('root')];
                    case 1:
                        actualItem = _a.sent();
                        actualItem = actualItem.replace(/[0-9]|[,]|[.]|[-]|[>]|[%]|\ss+/g, '').split('\n').map(function (t) { return t.trim(); }).filter(function (t) { return t; });
                        for (i = 0; i < itemNames.length; i++) {
                            this.expect(actualItem[i]).to.contain(itemNames[i]);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' is displayed on balance bar with correct text and value$/, function (itemName) {
        return __awaiter(this, void 0, void 0, function () {
            var self, expectedValue, actualValue;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, protractor_1.browser.wait(function () {
                                var promiseArr = [];
                                promiseArr.push(self.backendHelper.getMarginInfo()
                                    .then(function (balanceInformation) {
                                    var expectedNumber = balanceInformation[balance_enum_1.BalanceEnum[itemName]];
                                    expectedValue = expectedNumber.toLocaleString(undefined, { minimumFractionDigits: 2 }) + " " + itemName;
                                    if (itemName.toLowerCase() === 'cash' || itemName.toLowerCase() === 'unrealised p&l') {
                                        var expectedCurrency = balanceInformation.CurrencyIsoCode;
                                        expectedValue = expectedValue + " (" + expectedCurrency + ")";
                                    }
                                    else if (itemName.toLowerCase() === 'margin indicator') {
                                        expectedValue = expectedNumber === -1 ? "> 200% " + itemName : Math.round(expectedNumber).toLocaleString() + "% " + itemName;
                                    }
                                }));
                                promiseArr.push(self.basePage.balanceBar.getElementText(itemName.toLowerCase())
                                    .then(function (av) {
                                    actualValue = av.replace(/\n/g, ' ');
                                }));
                                return Promise.all(promiseArr)
                                    .then(function () { return _this.helper.sleepIfFalse(actualValue === expectedValue, 300); });
                            }, 100000)
                                .then(function () { return null; }, function () { return null; })];
                    case 1:
                        _a.sent();
                        this.expect(actualValue).to.deep.equal(expectedValue);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'([Ww]orkspace|[Bb]rowse)' board should be (active|not active)$/, function (boardName, activeState) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedState, actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedState = activeState === 'active';
                        return [4 /*yield*/, this.basePage.header.isBoardActive(boardName)];
                    case 1:
                        actualState = _a.sent();
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^link redirects to the correct '(.+)' url$/, function (redirectUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedUrl, actualUrl, checkUrl;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedUrl = this.memory[redirectUrl];
                        if (!(redirectUrl === 'AP_Online_Chat_URL')) return [3 /*break*/, 3];
                        return [4 /*yield*/, protractor_1.browser.get(expectedUrl)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.getCurrentUrl()];
                    case 2:
                        checkUrl = _a.sent();
                        expectedUrl = checkUrl.slice(0, 156);
                        _a.label = 3;
                    case 3: return [4 /*yield*/, protractor_1.browser.wait(function () {
                            return protractor_1.browser.getCurrentUrl()
                                .then(function (url) {
                                actualUrl = url;
                                return _this.helper.sleepIfFalse(url.includes(expectedUrl));
                            });
                        }, 10000)
                            .then(function () { return null; }, function () { return null; })];
                    case 4:
                        _a.sent();
                        this.expect(actualUrl).to.include(expectedUrl);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^[Aa]ccount board should be (active|not active)$/, function (activeState) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, expectedState, actualState;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.memory;
                        return [4 /*yield*/, this.backendHelper.getClientAndTradingAccount()];
                    case 1:
                        _a.clientInfo = _b.sent();
                        expectedState = activeState === 'active';
                        return [4 /*yield*/, this.basePage.waitLoading()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.basePage.userMenu.isAccountActive()];
                    case 3:
                        actualState = _b.sent();
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(header|userMenu|feedbackModal)' should contain items:$/, function (componentName, table) {
        return __awaiter(this, void 0, void 0, function () {
            var itemNames, i, actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemNames = table.hashes().map(function (el) {
                            return el.itemName;
                        });
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < itemNames.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.basePage[componentName].isElementPresent(itemNames[i])];
                    case 2:
                        actualState = _a.sent();
                        this.expect(actualState).to.equal(true);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the submit button should be (enabled|disabled)$/, function (isDisabled) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedCondition, actualCondition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedCondition = isDisabled === 'disabled';
                        return [4 /*yield*/, this.basePage.feedbackModal.isSubmitActive()];
                    case 1:
                        actualCondition = _a.sent();
                        this.expect(actualCondition).to.equal(expectedCondition);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the search text input '(placeholder|value)' should be '(.+)'$/, function (textType, expectedText) {
        return __awaiter(this, void 0, void 0, function () {
            var actualText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.header.getSearchText(textType)];
                    case 1:
                        actualText = _a.sent();
                        this.expect(actualText).to.equal(expectedText);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' tab should be (below|to the right of|to the left of) '(.+)'( tab|)$/, function (tabElement, location, elemToCompare, isTab) {
        return __awaiter(this, void 0, void 0, function () {
            var tab, elementToCompare, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.header.getTab(tabElement).getLocation()];
                    case 1:
                        tab = _b.sent();
                        if (!isTab) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.basePage.currentBoard.header.getTab(elemToCompare).getLocation()];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.basePage.header.getElementLocation(elemToCompare)];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        elementToCompare = _a;
                        if (location === 'below') {
                            this.expect(tab.y).to.be.above(elementToCompare.y);
                        }
                        else if (location === 'to the right of') {
                            this.expect(tab.x).to.be.above(elementToCompare.x);
                        }
                        else {
                            this.expect(tab.x).to.be.below(elementToCompare.x);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)'( tab| section|) default (width|height) should be '(.+)' px$/, function (elementName, elementType, size, expectedValue) {
        return __awaiter(this, void 0, void 0, function () {
            var actualValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        size = size.trim().toLowerCase();
                        if (!elementType.includes('tab')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.basePage.currentBoard.header.getTab(elementName).getSize()];
                    case 1:
                        actualValue = _a.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        if (!elementType.includes('section')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getSize()];
                    case 3:
                        actualValue = _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        if (!elementName.includes('search input')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.basePage.header.getSize('searchDiv')];
                    case 5:
                        actualValue = _a.sent();
                        _a.label = 6;
                    case 6:
                        this.expect(actualValue[size]).to.equal(parseInt(expectedValue));
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' feedback link should lead us to '(.+)'$/, function (linkName, expectedLink) {
        return __awaiter(this, void 0, void 0, function () {
            var actualLink;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.feedbackModal.getElementHref(linkName)];
                    case 1:
                        actualLink = _a.sent();
                        this.expect(actualLink).to.equal(expectedLink);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' element in feedback modal dialogue should contain text '(.+)'$/, function (elementName, expectedText) {
        return __awaiter(this, void 0, void 0, function () {
            var actualText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.feedbackModal.getElementText(elementName)];
                    case 1:
                        actualText = _a.sent();
                        this.expect(actualText).to.equal(expectedText);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' element in feedback modal dialogue should be (visible|invisible)$/, function (elementName, visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedState, actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedState = visibility === 'visible';
                        return [4 /*yield*/, this.basePage.feedbackModal.isElementPresent(elementName)];
                    case 1:
                        actualState = _a.sent();
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=base-page-steps.js.map