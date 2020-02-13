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
var currency_sign_enum_1 = require("./../../../../support/emuns/currency-sign.enum");
var currency_decimal_digits_enum_1 = require("./../../../../support/emuns/currency-decimal-digits.enum");
var _ = require("lodash");
cucumber_1.defineSupportCode(function (_a) {
    var Given = _a.Given, When = _a.When, Then = _a.Then;
    When(/^I fill( main | oco | )'(.+)' with value '(.+)'$/, function (ticketType, field, value) {
        return __awaiter(this, void 0, void 0, function () {
            var direction, multiplier;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        field = field.toLowerCase();
                        if (value.match(/sell\*\d+?\.?\d*/)) {
                            direction = value.split(/\*/)[0];
                            multiplier = value.split(/\*/)[1];
                            value = this.memory.prices[direction] * multiplier;
                        }
                        this.memory[field] = value;
                        ticketType = ticketType.trim();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.fillInputWithValue(field, value, ticketType)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I fill the '(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) linked order '(.+)' with computed value '(.+)' in the '(.+)'$/, function (orderNumber, field, value, marketName) {
        return __awaiter(this, void 0, void 0, function () {
            var marketInformation, marketId, decimals, buyPrice, sellPrice, direction, multiplier, lessThanOrderPrice, moreThanOrderPrice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (marketName === 'current market') {
                            marketName = this.memory.marketName;
                        }
                        return [4 /*yield*/, this.backendHelper.getMarketInformation(this.idMatcher.market[marketName])];
                    case 1:
                        marketInformation = _a.sent();
                        orderNumber = parseInt(orderNumber) - 1;
                        marketId = this.idMatcher.market[marketName];
                        this.lightstreamer.subscribe(marketId);
                        decimals = marketInformation.PriceDecimalPlaces;
                        return [4 /*yield*/, this.lightstreamer.addListener('Offer')];
                    case 2:
                        buyPrice = _a.sent();
                        return [4 /*yield*/, this.lightstreamer.addListener('Bid')];
                    case 3:
                        sellPrice = _a.sent();
                        if (!value.match(/sell|buy\*\d+?\.?\d*/)) return [3 /*break*/, 7];
                        direction = value.split(/\*/)[0];
                        multiplier = value.split(/\*/)[1];
                        if (!this.memory['order price']) return [3 /*break*/, 5];
                        lessThanOrderPrice = (this.memory['order price'] * 0.99).toFixed(decimals);
                        moreThanOrderPrice = (this.memory['order price'] * 1.01).toFixed(decimals);
                        value = direction === 'buy'
                            ? orderNumber === 0 ? lessThanOrderPrice : moreThanOrderPrice
                            : orderNumber === 0 ? moreThanOrderPrice : lessThanOrderPrice;
                        if (orderNumber === 0) {
                            this.memory['stop price'] = value;
                        }
                        else {
                            this.memory['limit price'] = value;
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getLinkedOrder(orderNumber).fillInputWithValue(field, value)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        value = direction === 'buy'
                            ? orderNumber === 0 ? sellPrice : buyPrice
                            : orderNumber === 0 ? buyPrice : sellPrice;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getLinkedOrder(orderNumber).fillInputWithValue(field, value * multiplier)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    });
    When(/^I fill '(.+)'( main | oco | )price with value between current prices$/, function (marketName, ticketType) {
        return __awaiter(this, void 0, void 0, function () {
            var marketInformation, sellPrice, buyPrice, decimals, between;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.backendHelper.getMarketInformation(this.idMatcher.market[marketName])];
                    case 1:
                        marketInformation = _a.sent();
                        ticketType = ticketType.trim();
                        this.lightstreamer.subscribe(this.idMatcher.market[marketName]);
                        return [4 /*yield*/, this.lightstreamer.addListener('Bid')];
                    case 2:
                        sellPrice = _a.sent();
                        return [4 /*yield*/, this.lightstreamer.addListener('Offer')];
                    case 3:
                        buyPrice = _a.sent();
                        decimals = marketInformation.PriceDecimalPlaces;
                        between = ((sellPrice * 1 + buyPrice * 1) / 2).toFixed(decimals);
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.fillInputWithValue('order price', between, ticketType)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I fill '(.+)'( main | oco | )price with value not between current prices on '(.+)'$/, function (marketName, ticketType, direction) {
        return __awaiter(this, void 0, void 0, function () {
            var marketInformation, sellPrice, buyPrice, decimals, notBetween;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.backendHelper.getMarketInformation(this.idMatcher.market[marketName])];
                    case 1:
                        marketInformation = _a.sent();
                        ticketType = ticketType.trim();
                        this.lightstreamer.subscribe(this.idMatcher.market[marketName]);
                        return [4 /*yield*/, this.lightstreamer.addListener('Bid')];
                    case 2:
                        sellPrice = _a.sent();
                        return [4 /*yield*/, this.lightstreamer.addListener('Offer')];
                    case 3:
                        buyPrice = _a.sent();
                        decimals = marketInformation.PriceDecimalPlaces;
                        notBetween = direction === 'buy'
                            ? (sellPrice * 0.99).toFixed(decimals)
                            : (buyPrice * 1.01).toFixed(decimals);
                        this.memory.marketName = marketName;
                        this.memory['order price'] = notBetween;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.fillInputWithValue('order price', notBetween, ticketType)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I clear '(.+)' field$/, function (field) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        field = field.toLowerCase();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.clearField(field)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I fill the( main | oco | )'(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) linked order '(.+)' with value '(.+)'$/, function (ticketType, orderNumber, field, value) {
        return __awaiter(this, void 0, void 0, function () {
            var direction, multiplier;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        field = field.toLowerCase();
                        orderNumber = parseInt(orderNumber) - 1;
                        if (value.match(/sell\*\d+?\.?\d*/)) {
                            direction = value.split(/\*/)[0];
                            multiplier = value.split(/\*/)[1];
                            value = this.memory.prices[direction] * multiplier;
                        }
                        // workaround for bug with different time representation
                        if (process.env.npm_config_browser.includes('firefox')) {
                            if (value.includes('pm')) {
                                value = parseInt(value.replace('pm', '')) + 1200;
                            }
                            else if (value.includes('am')) {
                                value = value.replace('am', '');
                            }
                        }
                        if (orderNumber === 0 && field === 'price') {
                            this.memory['stop price'] = value;
                        }
                        else if (orderNumber === 1 && field === 'price') {
                            this.memory['limit price'] = value;
                        }
                        else if (field === 'quantity') {
                            this.memory[orderNumber + " quantity"] = value;
                        }
                        else {
                            this.memory[field] = value;
                        }
                        ticketType = ticketType.trim();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).fillInputWithValue(field, value)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I clear the( main | oco | )'(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) linked order '(.+)' input field$/, function (ticketType, orderNumber, field) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderNumber = parseInt(orderNumber) - 1;
                        ticketType = ticketType.trim();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).clearField(field)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I submit the form$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.memory;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.submit()];
                    case 1:
                        _a.prices = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I (?:check|uncheck)( main | oco | )'([Ss]top|[Ll]imit)' checkbox$/, function (ticketType, name) {
        return __awaiter(this, void 0, void 0, function () {
            var orderNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = name.toLowerCase();
                        orderNumber = name === 'stop' ? 0 : 1;
                        ticketType = ticketType.trim();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).checkCheckbox()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I click on( main | oco | )'(.+)' (button|label|link|element)$/, function (ticketType, name, element) {
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = element.charAt(0).toUpperCase() + element.slice(1);
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel["clickOn" + method](name, ticketType.trim())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I expand( main | oco | )add stop limit dropdown$/, function (ticketType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.clickAddStopLimit(ticketType.trim())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I switch to '([Tt]rade|[Oo]rder)' tab$/, function (itemType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.selectItemType(itemType)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I select '(.+)' in [Aa]dd stop or limit dropdown$/, function (optionNameOrNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (parseInt(optionNameOrNumber)) {
                            optionNameOrNumber = optionNameOrNumber - 1;
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.selectStopLimitDropdownOption(optionNameOrNumber)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I remove '(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) order$/, function (orderNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderNumber = parseInt(orderNumber) - 1;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getLinkedOrder(orderNumber).removeLinkedOrder()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I expand( main | oco | )'(.+)'(?:st|th|nd|rd|) (applicability|linked order types) dropdown$/, function (orderType, orderNumber, dropdownName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderNumber = parseInt(orderNumber) - 1;
                        orderType = orderType.trim();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(orderType, orderNumber).expandDropdown(dropdownName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I expand (?:applicability|[Gg][Tt][Cc]) dropdown$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.expandApplicabilityDropdown()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I select( main | oco | )'(.+)'(?:st|th|nd|rd|) linked order '(.+)' stop type$/, function (orderType, orderNumber, stopType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderNumber = parseInt(orderNumber) - 1;
                        orderType = orderType.trim();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(orderType, orderNumber).selectStopType(stopType)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I reload page$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.browser.get(protractor_1.browser.baseUrl)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I select '(.+)'(?:st|th|nd|rd|) option from '(.+)'(?:st|th|nd|rd|) (?:applicability|[Gg][Tt][Cc]) dropdown$/, function (nameOrNumber, orderNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (parseInt(nameOrNumber)) {
                            nameOrNumber = nameOrNumber - 1;
                        }
                        orderNumber = parseInt(orderNumber) - 1;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getLinkedOrder(orderNumber).selectApplicability(nameOrNumber)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I select '(.+)'(?:st|th|nd|rd|) option from (?:applicability|[Gg][Tt][Cc]) dropdown$/, function (nameOrNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (parseInt(nameOrNumber)) {
                            nameOrNumber = nameOrNumber - 1;
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.selectApplicability(nameOrNumber)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I enter current date in '(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) linked order$/, function (orderNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderNumber = parseInt(orderNumber) - 1;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getLinkedOrder(orderNumber).selectCurrentDate()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I find market with '(.+)' status$/, function (status) {
        return __awaiter(this, void 0, void 0, function () {
            var marketsPool, statusNum, _a, _b, _i, name_1, marketStatus;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        marketsPool = this.idMatcher[status];
                        statusNum = {
                            closed: '4',
                            'phone only': '2'
                        };
                        _a = [];
                        for (_b in marketsPool)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        name_1 = _a[_i];
                        if (!marketsPool.hasOwnProperty(name_1)) return [3 /*break*/, 3];
                        this.lightstreamer.subscribe(marketsPool[name_1]);
                        return [4 /*yield*/, this.lightstreamer.addListener('StatusSummary')];
                    case 2:
                        marketStatus = _c.sent();
                        if (marketStatus === statusNum[status]) {
                            this.memory[status] = name_1;
                            return [3 /*break*/, 4];
                        }
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    When(/^I hover (main|oco) order '(.+)' element$/, function (orderType, elementName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.hover(elementName, orderType)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I wait confirmation message is displayed within panel$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.waitForConfirmationMessage(60000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I wait for '(.+)' price has trailing zeros$/, function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var state;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.browser.wait(function () {
                            return _this.basePage.currentBoard.tabBody.currentPanel.getPrice(type)
                                .then(function (text) {
                                _this.memory.priceWithZeros = text;
                                return text.match(/0+$/);
                            });
                        }, 60000)
                            .then(function () { return true; }, function () { return false; })];
                    case 1:
                        state = _a.sent();
                        this.expect(state).to.equal(true);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' radiobutton should be '(selected|not selected)'$/, function (name, isSelected) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedCondition, actualCondition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedCondition = isSelected === 'selected';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.isRadiobuttonSelected(name)];
                    case 1:
                        actualCondition = _a.sent();
                        this.expect(actualCondition).to.equal(expectedCondition);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the( main | oco | )'([Ss]top|[Ll]imit)' checkbox is (checked|unchecked)$/, function (ticketType, name, state) {
        return __awaiter(this, void 0, void 0, function () {
            var orderNumber, currentState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = name.toLowerCase();
                        orderNumber = name === 'stop' ? 0 : 1;
                        ticketType = ticketType.trim();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).isChecked()];
                    case 1:
                        currentState = _a.sent();
                        state === 'checked' ? this.expect(currentState).to.equal(true) : this.expect(currentState).to.equal(false);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' ticket type should be '(selected|not selected)'$/, function (name, isSelected) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedCondition, actualCondition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedCondition = isSelected === 'selected';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.isTypeSelected(name)];
                    case 1:
                        actualCondition = _a.sent();
                        this.expect(actualCondition).to.equal(expectedCondition);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' input should be predefined with '(.*)'$/, function (name, expectedValue) {
        return __awaiter(this, void 0, void 0, function () {
            var actualValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getInputValue(name)];
                    case 1:
                        actualValue = _a.sent();
                        this.expect(actualValue).to.equal(expectedValue);
                        return [2 /*return*/];
                }
            });
        });
    });
    // TODO can be deleted when all features are updated with new steps
    Then(/^'(.+)' input should be autopopulated$/, function (fieldName) {
        return __awaiter(this, void 0, void 0, function () {
            var actualValue, expectedValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getInputValue(fieldName)];
                    case 1:
                        actualValue = _a.sent();
                        expectedValue = new RegExp('\\d+?\\.?\\d*');
                        this.expect(actualValue).to.match(expectedValue);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the( main | oco | )'(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) linked order '(.+)' input should be (autopopulated|blank)$/, function (ticketType, orderNumber, name, value) {
        return __awaiter(this, void 0, void 0, function () {
            var actualValue, expectedValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderNumber = parseInt(orderNumber) - 1;
                        ticketType = ticketType.trim();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue(name)];
                    case 1:
                        actualValue = _a.sent();
                        expectedValue = value === 'autopopulated' ? new RegExp('\\d+?\\.?\\d*') : new RegExp('^\s*$');
                        this.expect(actualValue).to.match(expectedValue);
                        return [2 /*return*/];
                }
            });
        });
    });
    // INFO: CurrencyDecimalDigitsEnum
    Then(/^the (sell|buy) '(.+)'( main | oco | )'(.+)'(?:st|th|nd|rd|) (stop|guaranteed stop|trailing stop|limit) linked order '(.+)' input should be calculated from '(.+)'$/, function (direction, marketName, ticketType, orderNumber, orderType, name, from) {
        return __awaiter(this, void 0, void 0, function () {
            var marketInformation, pfd, qcf, betPer, trailingStopConversionFactor, decimals, plDecimals, qty, price, currentPrice, lightDir, promiseArr, actualValue, expectedValue;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderNumber = parseInt(orderNumber) - 1;
                        ticketType = ticketType.trim();
                        return [4 /*yield*/, this.backendHelper.getMarketInformation(this.idMatcher.market[marketName])];
                    case 1:
                        marketInformation = _a.sent();
                        pfd = marketInformation.PointFactorDivisor;
                        qcf = marketInformation.QuantityConversionFactor;
                        betPer = marketInformation.BetPer;
                        trailingStopConversionFactor = marketInformation.TrailingStopConversionFactor || 1;
                        decimals = marketInformation.PriceDecimalPlaces;
                        plDecimals = +currency_decimal_digits_enum_1.CurrencyDecimalDigitsEnum[marketInformation.MarketSizesCurrencyCode];
                        qty = this.memory.quantity;
                        price = this.memory['order price'];
                        lightDir = direction === 'sell' ? 'Bid' : 'Offer';
                        promiseArr = [];
                        if (ticketType === '') {
                            this.lightstreamer.subscribe(this.idMatcher.market[marketName]);
                        }
                        return [4 /*yield*/, protractor_1.browser.wait(function () {
                                promiseArr = [];
                                if (ticketType === '' && (name !== 'points' || from !== 'p/l')) {
                                    promiseArr.push(_this.lightstreamer.addListener(lightDir)
                                        .then(function (cp) { return currentPrice = cp; }));
                                }
                                else {
                                    currentPrice = price;
                                }
                                if (name === 'price' && (from === 'points' || from === 'p/l')) {
                                    promiseArr.push(_this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue('points')
                                        .then(function (points) { return expectedValue = _this.formulas.calculatePriceFromPoints(currentPrice, pfd, points, betPer, trailingStopConversionFactor, orderType, direction).toFixed(decimals); }));
                                }
                                else if (name === 'p/l' && (from === 'points' || from === 'price')) {
                                    promiseArr.push(_this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue('price')
                                        .then(function (orderPrice) { return expectedValue = _this.formulas.calculatePLFromPrice(orderPrice, currentPrice, pfd, betPer, qty, qcf, trailingStopConversionFactor, direction, orderType).toFixed(plDecimals); }));
                                }
                                else if (name === 'points' && from === 'price') {
                                    promiseArr.push(_this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue('price')
                                        .then(function (orderPrice) { return expectedValue = _this.formulas.calculatePointsFromPrice(orderPrice, currentPrice, pfd, betPer, trailingStopConversionFactor, direction, orderType).toFixed(decimals); }));
                                }
                                else if (name === 'points' && from === 'p/l') {
                                    promiseArr.push(_this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue('p/l')
                                        .then(function (pl) { return expectedValue = _.round(_this.formulas.calculatePointsFromPL(pl, qty, qcf, trailingStopConversionFactor, orderType, direction), decimals); }));
                                }
                                promiseArr.push(_this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue(name)
                                    .then(function (av) { return actualValue = av; }));
                                return Promise.all(promiseArr)
                                    .then(function () { return actualValue === expectedValue; });
                            }, 90000)
                                .then(function () { return null; }, function () { return null; })];
                    case 2:
                        _a.sent();
                        if (name === 'p/l') {
                            expectedValue = _.round(expectedValue, plDecimals);
                        }
                        this.expect("" + actualValue).to.equal("" + expectedValue);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the( main | oco | )'(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) linked order '(.+)' input should be '(.*)'/, function (ticketType, orderNumber, name, expectedValue) {
        return __awaiter(this, void 0, void 0, function () {
            var actualValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderNumber = parseInt(orderNumber) - 1;
                        ticketType = ticketType.trim();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue(name)];
                    case 1:
                        actualValue = _a.sent();
                        this.expect(actualValue).to.equal(expectedValue);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' element text should (contain|be) '(.+)'$/, function (name, comparisonType, expectedText) {
        return __awaiter(this, void 0, void 0, function () {
            var text, actualText;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (expectedText.includes('current market')) {
                            expectedText = this.memory.marketName;
                        }
                        expectedText = expectedText.toLowerCase();
                        return [4 /*yield*/, protractor_1.browser.wait(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getElementText(name)];
                                        case 1:
                                            text = _a.sent();
                                            actualText = text.replace(/ *\n */g, ' ').toLowerCase();
                                            if (comparisonType === 'contain') {
                                                return [2 /*return*/, this.helper.sleepIfFalse(actualText.includes(expectedText))];
                                            }
                                            else {
                                                return [2 /*return*/, this.helper.sleepIfFalse(actualText === expectedText)];
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, 2000)
                                .then(function () { return null; }, function () { return null; })];
                    case 1:
                        _a.sent();
                        if (comparisonType === 'contain') {
                            this.expect(actualText).to.include(expectedText);
                        }
                        else {
                            this.expect(actualText).to.equal(expectedText);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^(?:|partially )close info message should be correct$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            var text, closeQuantity, actualText, leftQuantity, expectedPattern;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getElementText('close info')];
                    case 1:
                        text = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getInputValue('close quantity')];
                    case 2:
                        closeQuantity = _a.sent();
                        actualText = text.replace(/\s+/g, ' ');
                        leftQuantity = this.memory.quantity - closeQuantity;
                        this.memory.leftQuantity = leftQuantity;
                        expectedPattern = new RegExp("Close " + closeQuantity + " of " + this.memory.quantity + " at \\d+?\\.?\\d* Leaving a position of " + leftQuantity);
                        this.expect(actualText).to.match(expectedPattern);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^amalgamated position close info message should be correct$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            var text, closeQuantity, actualText, leftAmalgamatedQty, expectedPattern;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getElementText('close info')];
                    case 1:
                        text = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getInputValue('close quantity')];
                    case 2:
                        closeQuantity = _a.sent();
                        actualText = text.replace(/\s+/g, ' ');
                        leftAmalgamatedQty = this.memory.amalgamatedQty - closeQuantity;
                        this.memory.leftAmalgamatedQty = leftAmalgamatedQty;
                        expectedPattern = new RegExp("Close " + closeQuantity + " of " + this.memory.amalgamatedQty + " at \\d+?\\.?\\d* Leaving a position of " + leftAmalgamatedQty);
                        this.expect(actualText).to.match(expectedPattern);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^current (simple|amalgamated) position information should be correct$/, function (positionType) {
        return __awaiter(this, void 0, void 0, function () {
            var text, actualText, expectedPattern;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getElementText('position info')];
                    case 1:
                        text = _a.sent();
                        actualText = text.replace(/\s+/g, ' ').toLowerCase();
                        expectedPattern = positionType === 'simple' ? new RegExp("position " + this.memory.direction.toLowerCase() + " " + this.memory.quantity + " at \\d+?\\.?\\d* -?\\d+?\\.?\\d* gbp")
                            : new RegExp("position " + this.memory.direction.toLowerCase() + " " + this.memory.amalgamatedQty + " at \\d+?\\.?\\d* -?\\d+?\\.?\\d* gbp");
                        this.expect(actualText).to.match(expectedPattern);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^(?:'(trade|order|oco order)' |)confirmation message should be correct$/, function (ticketType) {
        return __awaiter(this, void 0, void 0, function () {
            var text, actualText, expectedPattern;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getElementText('confirmation message')];
                    case 1:
                        text = _a.sent();
                        actualText = text.replace(/\s+/g, ' ');
                        if (!ticketType || ticketType === 'trade') {
                            expectedPattern = new RegExp("Closed: (Buy|Sell) "
                                + (this.memory.quantity + " at \\d+\\.?\\d*")
                                + " You (lost|made) \\d+\\.?\\d* GBP on this trade");
                        }
                        else if (ticketType === 'oco order') {
                            expectedPattern = new RegExp("Order added to (Buy|Sell) \\d+\\.?\\d* at \\d+\\.?\\d* ?"
                                + "(Attached stop order added to (Buy|Sell) \\d+\\.?\\d* at \\d+\\.?\\d* \\(-?\\d+\\.?\\d* [A-Z]{3}\\)|) ?"
                                + "(Attached limit order added to (Buy|Sell) \\d+\\.?\\d* at \\d+\\.?\\d* \\(-?\\d+\\.?\\d* [A-Z]{3}\\)|) ?"
                                + "OCO Order added to (Buy|Sell) \\d+\\.?\\d* at \\d+\\.?\\d* ?"
                                + "(Attached stop order added to (Buy|Sell) \\d+\\.?\\d* at \\d+\\.?\\d* \\(-?\\d+\\.?\\d* [A-Z]{3}\\)|) ?"
                                + "(Attached limit order added to (Buy|Sell) \\d+\\.?\\d* at \\d+\\.?\\d* \\(-?\\d+\\.?\\d* [A-Z]{3}\\)|)");
                        }
                        this.expect(actualText).to.match(expectedPattern);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' confirmation messages about close amalgamated positions should be displayed$/, function (positions) {
        return __awaiter(this, void 0, void 0, function () {
            var closeQuantity, dif, closed, n, text, actualText, qty, expectedPattern, actualCondition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        positions = parseInt(positions);
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getInputValue('close quantity')];
                    case 1:
                        closeQuantity = _a.sent();
                        dif = closeQuantity;
                        closed = 0;
                        n = 0;
                        _a.label = 2;
                    case 2:
                        if (!(n < positions)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getElementText("confirmation message " + (n + 1))];
                    case 3:
                        text = _a.sent();
                        actualText = text.replace(/\s+/g, ' ');
                        qty = dif - this.memory.qtyArray[n] > 0 ? this.memory.qtyArray[n] : dif;
                        if (dif - this.memory.qtyArray[n] > 0) {
                            closed++;
                        }
                        else {
                            this.memory.qtyArray[n] = this.memory.qtyArray[n] - dif;
                        }
                        dif = dif - this.memory.qtyArray[n];
                        expectedPattern = new RegExp("Closed: (Buy|Sell) "
                            + (qty + " at \\d+?\\.?\\d*")
                            + " You (lost|made) \\d+?\\.?\\d* GBP on this trade");
                        actualCondition = false;
                        if (actualText.match(expectedPattern)) {
                            actualCondition = true;
                        }
                        this.memory.amalgamatedQty = this.memory.amalgamatedQty - closeQuantity;
                        this.expect(actualCondition).to.equal(true);
                        _a.label = 4;
                    case 4:
                        n++;
                        return [3 /*break*/, 2];
                    case 5:
                        if (closed !== 0) {
                            this.memory.qtyArray = this.memory.qtyArray.splice(0, closed);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^correct confirmation message about adding '(.+)' linked orders should be displayed$/, function (orders) {
        return __awaiter(this, void 0, void 0, function () {
            var text, actualText, pattern, expectedMessage, message, n, expectedPattern, actualCondition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orders = parseInt(orders);
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getElementText('confirmation message')];
                    case 1:
                        text = _a.sent();
                        actualText = text.replace(/\s+/g, ' ');
                        pattern = 'Your order has been updated.';
                        expectedMessage = '';
                        message = ' You have successfully added an order. Your order is confirmed with Order ID \\d{9}.';
                        for (n = 0; n < orders; n++) {
                            expectedMessage = expectedMessage + message;
                        }
                        expectedPattern = new RegExp("^" + pattern + expectedMessage + "$");
                        actualCondition = false;
                        if (actualText.match(expectedPattern)) {
                            actualCondition = true;
                        }
                        this.expect(actualCondition).to.equal(true);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^correct confirmation message about removing '(.+)' linked orders should be displayed$/, function (orders) {
        return __awaiter(this, void 0, void 0, function () {
            var text, actualText, pattern, expectedMessage, message, n, expectedPattern, actualCondition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orders = parseInt(orders);
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getElementText('confirmation message')];
                    case 1:
                        text = _a.sent();
                        actualText = text.replace(/\s+/g, ' ');
                        pattern = 'Your order has been updated.';
                        expectedMessage = '';
                        message = ' Your attached (Stop|Limit) has been deleted.';
                        for (n = 0; n < orders; n++) {
                            expectedMessage = expectedMessage + message;
                        }
                        expectedPattern = new RegExp("^" + pattern + expectedMessage + "$");
                        actualCondition = false;
                        if (actualText.match(expectedPattern)) {
                            actualCondition = true;
                        }
                        this.expect(actualCondition).to.equal(true);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^partially close confirmation message should be correct$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            var text, actualText, expectedPattern;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getElementText('confirmation message')];
                    case 1:
                        text = _a.sent();
                        actualText = text.replace(/\s+/g, ' ');
                        expectedPattern = new RegExp("Closed: (Buy|Sell) "
                            + (this.memory.leftQuantity + " at \\d+?\\.?\\d*")
                            + " You (lost|made) \\d+?\\.?\\d* GBP on this trade");
                        this.expect(actualText).to.match(expectedPattern);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^open ([Bb]uy|[Ss]ell) '(.+)' (trade|order) confirmation message should be correct$/, function (direction, marketName, tradeOrOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var text, actualText, point, stopPrice, stopProfitLoss, limitPrice, limitProfitLoss, marketInfo, ccy, stringStartFrom, expectedPattern;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getElementText('confirmation message')];
                    case 1:
                        text = _a.sent();
                        actualText = text.replace(/\s+/g, ' ');
                        point = direction.match(/[Bb]uy/) ? 'Sell' : 'Buy';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getLinkedOrder(0).getInputValue('price')];
                    case 2:
                        stopPrice = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getLinkedOrder(0).getInputValue('p/l')];
                    case 3:
                        stopProfitLoss = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getLinkedOrder(1).getInputValue('price')];
                    case 4:
                        limitPrice = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getLinkedOrder(1).getInputValue('p/l')];
                    case 5:
                        limitProfitLoss = _a.sent();
                        return [4 /*yield*/, this.backendHelper.getMarketInformation(this.idMatcher.market[marketName])];
                    case 6:
                        marketInfo = _a.sent();
                        ccy = marketInfo.MarketSizesCurrencyCode;
                        stringStartFrom = tradeOrOrder === 'trade' ? 'Opened:' : 'Order added to';
                        expectedPattern = new RegExp(stringStartFrom + " " + (direction.charAt(0).toUpperCase() + direction.slice(1)) + " "
                            + (this.memory.quantity + " at \\d+?\\.?\\d* ")
                            + ("Attached stop order added to " + point + " ")
                            + (this.memory.quantity + " at " + stopPrice)
                            + (" \\(" + stopProfitLoss + " " + ccy + "\\) ")
                            + ("Attached limit order added to " + point + " ")
                            + (this.memory.quantity + " at " + limitPrice)
                            + (" \\(" + limitProfitLoss + " " + ccy + "\\)"));
                        this.expect(actualText).to.match(expectedPattern);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^open (?:buy|sell) confirmation message should display correct price$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            var actualMessage, expectedMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getElementText('confirmation message')];
                    case 1:
                        actualMessage = _a.sent();
                        expectedMessage = new RegExp("Opened: (Buy|Sell) \\d+?\\.?\\d* at " + this.memory.priceWithZeros);
                        this.expect(actualMessage).to.match(expectedMessage);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^open '(.+)' (buy|sell)( | main | oco )attached (stop|limit) order confirmation message should display correct p\/l$/, function (marketName, direction, ticketType, orderType) {
        return __awaiter(this, void 0, void 0, function () {
            var marketInformation, pfd, qcf, betPer, trailingStopConversionFactor, decimals, plDecimals, qty, ccy, price, orderPrice, points, pl, currentPrice, actualMessage, expectedMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ticketType = ticketType.trim();
                        return [4 /*yield*/, this.backendHelper.getMarketInformation(this.idMatcher.market[marketName])];
                    case 1:
                        marketInformation = _a.sent();
                        pfd = marketInformation.PointFactorDivisor;
                        qcf = marketInformation.QuantityConversionFactor;
                        betPer = marketInformation.BetPer;
                        trailingStopConversionFactor = marketInformation.TrailingStopConversionFactor || 1;
                        decimals = marketInformation.PriceDecimalPlaces;
                        plDecimals = +currency_decimal_digits_enum_1.CurrencyDecimalDigitsEnum[marketInformation.MarketSizesCurrencyCode];
                        qty = this.memory.quantity;
                        ccy = marketInformation.MarketSizesCurrencyCode;
                        price = this.memory['order price'];
                        points = this.memory['points away'];
                        if (!(ticketType === '')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getPrice(direction)];
                    case 2:
                        currentPrice = _a.sent();
                        currentPrice = parseFloat(currentPrice.replace(/\,/g, ''));
                        return [3 /*break*/, 4];
                    case 3:
                        currentPrice = price;
                        _a.label = 4;
                    case 4:
                        orderPrice = this.formulas.calculatePriceFromPoints(currentPrice, pfd, points, betPer, trailingStopConversionFactor, orderType, direction).toFixed(decimals);
                        pl = this.formulas.calculatePLFromPrice(orderPrice, currentPrice, pfd, betPer, qty, qcf, trailingStopConversionFactor, direction, orderType).toFixed(plDecimals);
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getElementText('attached order confirmation')];
                    case 5:
                        actualMessage = _a.sent();
                        expectedMessage = new RegExp("Attached stop order added to (Buy|Sell) \\d+?\\.?\\d* at \\d+?\\.?\\d* \\(" + _.round(pl, plDecimals) + " " + ccy + "\\)");
                        this.expect(actualMessage).to.match(expectedMessage);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^trade direction should be '(buy|sell)'$/, function (expectedDirection) {
        return __awaiter(this, void 0, void 0, function () {
            var actualDirection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getDirection()];
                    case 1:
                        actualDirection = _a.sent();
                        this.expect(actualDirection).to.equal(expectedDirection);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' price should change with time$/, function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var data, state;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getPrice(type)];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, protractor_1.browser.wait(function () {
                                return _this.basePage.currentBoard.tabBody.currentPanel.getPrice(type)
                                    .then(function (text) { return _this.helper.sleepIfFalse(text !== data, 1000); });
                            }, 20000)
                                .then(function () { return true; }, function () { return false; })];
                    case 2:
                        state = _a.sent();
                        this.expect(state).to.equal(true);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the (main|oco|)'(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) linked order '(.+)' value should change with time$/, function (ticketType, orderNumber, field) {
        return __awaiter(this, void 0, void 0, function () {
            var currentValue, state;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderNumber = parseInt(orderNumber) - 1;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue(field)];
                    case 1:
                        currentValue = _a.sent();
                        return [4 /*yield*/, protractor_1.browser.wait(function () {
                                return _this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue(field)
                                    .then(function (value) { return _this.helper.sleepIfFalse(value !== currentValue, 1000); });
                            }, 20000)
                                .then(function () { return true; }, function () { return false; })];
                    case 2:
                        state = _a.sent();
                        this.expect(state).to.equal(true);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' element should be (disabled|enabled)$/, function (name, status) {
        return __awaiter(this, void 0, void 0, function () {
            var actualState, expectedState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.isControlDisabled(name)];
                    case 1:
                        actualState = _a.sent();
                        expectedState = status === 'disabled';
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' '(.+)' placeholder should be correct$/, function (marketName, field) {
        return __awaiter(this, void 0, void 0, function () {
            var marketInformation, size, actualPlaceholder, expectedPlaceholder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.backendHelper.getMarketInformation(this.idMatcher.market[marketName])];
                    case 1:
                        marketInformation = _a.sent();
                        size = marketInformation.WebMinSize;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getPlaceholder(field)];
                    case 2:
                        actualPlaceholder = _a.sent();
                        expectedPlaceholder = "min. " + size;
                        this.expect(actualPlaceholder).to.equal(expectedPlaceholder);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the (main|oco|)'(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) linked order '(.+)' placeholder should be correct$/, function (ticketType, orderNumber, field) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedPlaceholder, actualPlaceholder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderNumber = parseInt(orderNumber) - 1;
                        if (field === 'price') {
                            expectedPlaceholder = "price";
                        }
                        else if (field === 'points') {
                            expectedPlaceholder = "points";
                        }
                        else if (field === 'p/l') {
                            expectedPlaceholder = "P/L";
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getPlaceholder(field)];
                    case 1:
                        actualPlaceholder = _a.sent();
                        this.expect(actualPlaceholder).to.equal(expectedPlaceholder);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the( main | oco | )'(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) linked order '(.+)' element should be (enabled|disabled)$/, function (ticketType, orderNumber, field, state) {
        return __awaiter(this, void 0, void 0, function () {
            var actualState, expectedState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderNumber = parseInt(orderNumber) - 1;
                        ticketType = ticketType.trim();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).isElementEnabled(field)];
                    case 1:
                        actualState = _a.sent();
                        expectedState = state === 'enabled';
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)'( main | oco | )'(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) linked order p\/l (currency sign|value) should be correct$/, function (marketName, ticketType, orderNumber, value) {
        return __awaiter(this, void 0, void 0, function () {
            var marketInformation, ccy, expectedPlaceholder, linkedOrderPrice, linkedOrderQty, is, _a, expectedValue, actualPlaceholder, actualValue;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ticketType = ticketType.trim();
                        orderNumber = parseInt(orderNumber) - 1;
                        return [4 /*yield*/, this.backendHelper.getMarketInformation(this.idMatcher.market[marketName])];
                    case 1:
                        marketInformation = _b.sent();
                        ccy = marketInformation.MarketSizesCurrencyCode;
                        expectedPlaceholder = currency_sign_enum_1.CurrencySign[ccy];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue('price')];
                    case 2:
                        linkedOrderPrice = _b.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).isElementPresent('quantity')];
                    case 3:
                        is = _b.sent();
                        if (!is) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue('quantity')];
                    case 4:
                        _a = _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _a = this.memory.quantity;
                        _b.label = 6;
                    case 6:
                        linkedOrderQty = _a;
                        expectedValue = this.memory.direction === 'buy' ? (linkedOrderPrice - this.memory['order price']) * linkedOrderQty / parseFloat(marketInformation.BetPer)
                            : -(linkedOrderPrice - this.memory['order price']) * linkedOrderQty / parseFloat(marketInformation.BetPer);
                        if (!(value === 'currency sign')) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue('ccy')];
                    case 7:
                        actualPlaceholder = _b.sent();
                        this.expect(actualPlaceholder).to.equal(expectedPlaceholder);
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getInputValue('p/l')];
                    case 9:
                        actualValue = _b.sent();
                        this.expect(parseInt(actualValue)).to.equal(expectedValue);
                        _b.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)' button should be '(red|blue)' when it is clicked$/, function (labelName, color) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedColorPart, actualColor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        labelName = labelName.toLowerCase();
                        expectedColorPart = color === 'red' ? '222, 69, 89' : '44, 124, 179';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.clickOnLabel(labelName)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getLabelColor(labelName)];
                    case 2:
                        actualColor = _a.sent();
                        this.expect(actualColor).to.include(expectedColorPart);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the (?:trade|order|edit) ticket (?:standard|advanced) view panel (should|should not) contain items:$/, function (state, table) {
        return __awaiter(this, void 0, void 0, function () {
            var itemNames, i, actualState, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        itemNames = table.hashes().map(function (el) {
                            return el.itemName;
                        });
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < itemNames.length)) return [3 /*break*/, 7];
                        if (!(state === 'should')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.isElementPresent(itemNames[i])];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.isElementPresent(itemNames[i], '', false)];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        actualState = _a;
                        state === 'should' ? this.expect(actualState).to.equal(true) : this.expect(actualState).to.equal(false);
                        _b.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)' order area should contain items:$/, function (orderType, table) {
        return __awaiter(this, void 0, void 0, function () {
            var itemNames, i, actualState, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        itemNames = table.hashes().map(function (el) {
                            return el.itemName;
                        });
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < itemNames.length)) return [3 /*break*/, 7];
                        if (!(orderType === 'main')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.isElementPresent(itemNames[i], 'main')];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.isElementPresent(itemNames[i], 'oco')];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        actualState = _a;
                        this.expect(actualState).to.equal(true);
                        _b.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the( main | oco | )'(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) order should contain fields:$/, function (ticketType, orderNumber, table) {
        return __awaiter(this, void 0, void 0, function () {
            var itemNames, i, actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemNames = table.hashes().map(function (el) {
                            return el.itemName;
                        });
                        orderNumber = parseInt(orderNumber) - 1;
                        ticketType = ticketType.trim();
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < itemNames.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).isElementPresent(itemNames[i])];
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
    Then(/^the [Aa]dd a stop or limit dropdown options should be:$/, function (table) {
        return __awaiter(this, void 0, void 0, function () {
            var actualArray, expectedArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getStopLimitDropdownOptions()];
                    case 1:
                        actualArray = _a.sent();
                        actualArray = actualArray.map(function (text) {
                            return text.replace(/\s+/g, ' ');
                        });
                        expectedArray = table.raw().map(function (el) {
                            return el[0];
                        });
                        this.expect(actualArray).to.deep.equal(expectedArray);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the number of linked orders should be '(.+)'$/, function (orderNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var actualNumber, expectedNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getNumberOfLinkedOrders()];
                    case 1:
                        actualNumber = _a.sent();
                        expectedNumber = parseInt(orderNumber);
                        this.expect(actualNumber).to.deep.equal(expectedNumber);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)'(?:st|th|nd|rd|) applicability dropdown options should be:$/, function (orderNumber, table) {
        return __awaiter(this, void 0, void 0, function () {
            var actualArray, expectedArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderNumber = parseInt(orderNumber) - 1;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getLinkedOrder(orderNumber).getApplicabilityDropdownOptions()];
                    case 1:
                        actualArray = _a.sent();
                        actualArray = actualArray.map(function (text) {
                            return text.replace(/ *\n */g, ' ');
                        });
                        expectedArray = table.raw().map(function (el) {
                            return el[0];
                        });
                        this.expect(actualArray).to.deep.equal(expectedArray);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^applicability dropdown options should be:$/, function (table) {
        return __awaiter(this, void 0, void 0, function () {
            var actualArray, expectedArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getApplicabilityDropdownOptions()];
                    case 1:
                        actualArray = _a.sent();
                        actualArray = actualArray.map(function (text) {
                            return text.replace(/ *\n */g, ' ');
                        });
                        expectedArray = table.raw().map(function (el) {
                            return el[0];
                        });
                        this.expect(actualArray).to.deep.equal(expectedArray);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)'(?:st|th|nd|rd|) option should be selected in '(.+)'(?:st|th|nd|rd|) (?:applicability|[Gg][Tt][Cc]) dropdown$/, function (nameOrNumber, orderNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var actualApplicability, expectedApplicability;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderNumber = parseInt(orderNumber) - 1;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getLinkedOrder(orderNumber).getInputValue('applicability')];
                    case 1:
                        actualApplicability = _a.sent();
                        expectedApplicability = nameOrNumber;
                        if (typeof expectedApplicability === 'number') {
                            this.expect(this.OrderApplicabilityEnum[actualApplicability].to.equal(expectedApplicability));
                        }
                        this.expect(actualApplicability).to.equal(expectedApplicability);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)'(?:st|th|nd|rd|) option should be selected in (main|oco) (?:applicability|[Gg][Tt][Cc]) dropdown$/, function (nameOrNumber, ticketType) {
        return __awaiter(this, void 0, void 0, function () {
            var actualApplicability, expectedApplicability;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getElementText(ticketType + " good till dropdown")];
                    case 1:
                        actualApplicability = _a.sent();
                        expectedApplicability = nameOrNumber;
                        if (typeof expectedApplicability === 'number') {
                            this.expect(this.OrderApplicabilityEnum[actualApplicability].to.equal(expectedApplicability));
                        }
                        this.expect(actualApplicability).to.include(expectedApplicability);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^(trade|order|oco) ticket '(.+)' element is (visible|not visible)$/, function (ticketType, element, visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedState, actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedState = visibility === 'visible';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.isElementVisible(ticketType, element)];
                    case 1:
                        actualState = _a.sent();
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' input value is '(.+)'$/, function (element, value) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedValue, actualValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (value === 'correct') {
                            expectedValue = this.memory[element];
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getInputValue(element)];
                    case 1:
                        actualValue = _a.sent();
                        this.expect(actualValue).to.equal(expectedValue);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)'( main | oco | )order '(.+)' validation should be correct$/, function (marketName, ticketType, field) {
        return __awaiter(this, void 0, void 0, function () {
            var marketInformation, minSize, maxSize, expectedPattern, actualMessage, promiseArr;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.backendHelper.getMarketInformation(this.idMatcher.market[marketName])];
                    case 1:
                        marketInformation = _a.sent();
                        minSize = marketInformation.WebMinSize;
                        maxSize = marketInformation.MaxLongSize;
                        promiseArr = [];
                        ticketType = ticketType.trim();
                        this.lightstreamer.subscribe(this.idMatcher.market[marketName]);
                        if (!(field === 'sell price')) return [3 /*break*/, 3];
                        return [4 /*yield*/, protractor_1.browser.wait(function () {
                                promiseArr = [];
                                promiseArr.push(_this.lightstreamer.addListener('Offer')
                                    .then(function (dt) { return expectedPattern = "\u0421annot be less than or equal to " + dt.replace(/0+$/, ''); }));
                                promiseArr.push(_this.basePage.currentBoard.tabBody.currentPanel.getValidationMessage(ticketType, 'price')
                                    .then(function (am) { return actualMessage = am; }));
                                return Promise.all(promiseArr)
                                    .then(function () { return _this.helper.sleepIfFalse(actualMessage === expectedPattern, 500); });
                            }, 10000)
                                .catch(function () { return null; })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 3:
                        if (!(field === 'buy price')) return [3 /*break*/, 5];
                        return [4 /*yield*/, protractor_1.browser.wait(function () {
                                promiseArr = [];
                                promiseArr.push(_this.lightstreamer.addListener('Bid')
                                    .then(function (dt) { return expectedPattern = "\u0421annot be more than or equal to " + dt.replace(/0+$/, ''); }));
                                promiseArr.push(_this.basePage.currentBoard.tabBody.currentPanel.getValidationMessage(ticketType, 'price')
                                    .then(function (am) { return actualMessage = am; }));
                                return Promise.all(promiseArr)
                                    .then(function () { return _this.helper.sleepIfFalse(actualMessage === expectedPattern, 500); });
                            }, 10000)
                                .catch(function () { return null; })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 5:
                        if (!(field === 'min quantity')) return [3 /*break*/, 8];
                        expectedPattern = "Too low. Minimum " + minSize;
                        return [4 /*yield*/, protractor_1.browser.wait(function () {
                                return _this.basePage.currentBoard.tabBody.currentPanel.getValidationMessage(ticketType, 'quantity')
                                    .then(function (text) { return _this.helper.sleepIfFalse(text === expectedPattern, 300); });
                            }, 5000)
                                .catch(function () { return null; })];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getValidationMessage(ticketType, 'quantity')];
                    case 7:
                        actualMessage = _a.sent();
                        return [3 /*break*/, 13];
                    case 8:
                        if (!(field === 'max quantity')) return [3 /*break*/, 11];
                        expectedPattern = "Too high. Maximum " + maxSize;
                        return [4 /*yield*/, protractor_1.browser.wait(function () {
                                return _this.basePage.currentBoard.tabBody.currentPanel.getValidationMessage(ticketType, 'quantity')
                                    .then(function (text) { return _this.helper.sleepIfFalse(text === expectedPattern, 300); });
                            }, 5000)
                                .catch(function () { return null; })];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getValidationMessage(ticketType, 'quantity')];
                    case 10:
                        actualMessage = _a.sent();
                        return [3 /*break*/, 13];
                    case 11:
                        if (!(field === 'between price')) return [3 /*break*/, 13];
                        expectedPattern = 'Price must not be between the buy and sell price';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getValidationMessage(ticketType, 'price')];
                    case 12:
                        actualMessage = _a.sent();
                        _a.label = 13;
                    case 13:
                        this.expect(actualMessage).to.equal(expectedPattern);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' '(.+)'( main | oco | )'(.+)'(?:st|th|nd|rd|) (stop|limit) price validation should be correct$/, function (direction, marketName, ticketType, orderNumber, orderType) {
        return __awaiter(this, void 0, void 0, function () {
            function getValidPricePointsUnits(dir, price, type) {
                var betPer = parseFloat(marketInformation.BetPer);
                var minDistance = parseFloat(marketInformation.MinDistance);
                var decimals = marketInformation.PriceDecimalPlaces;
                var d = dir === 'sell' ? 1 : -1;
                var validPrice = type === 'stop'
                    ? (parseFloat(price) + d * betPer * minDistance).toFixed(decimals)
                    : (parseFloat(price) - d * betPer * minDistance).toFixed(decimals);
                return validPrice;
            }
            function getExpectedPattern(dir, price, type) {
                var expectedPattern1 = "Too low. Minimum price " + price.toString().replace(/0+$/, '');
                var expectedPattern2 = "Too high. Maximum price " + price.toString().replace(/0+$/, '');
                if (dir === 'sell' && type === 'stop') {
                    return expectedPattern1;
                }
                else if (dir === 'sell' && type === 'limit') {
                    return expectedPattern2;
                }
                else if (dir === 'buy' && type === 'stop') {
                    return expectedPattern2;
                }
                else if (dir === 'buy' && type === 'limit') {
                    return expectedPattern1;
                }
            }
            function compareValidationMsg(dir, tType, oType) {
                return __awaiter(this, void 0, void 0, function () {
                    var oppositeDir;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self.lightstreamer.subscribe(self.idMatcher.market[marketName]);
                                oppositeDir = dir === 'sell' ? 'Offer' : 'Bid';
                                return [4 /*yield*/, protractor_1.browser.wait(function () {
                                        promiseArr = [];
                                        promiseArr.push(self.lightstreamer.addListener(oppositeDir)
                                            .then(function (dt) {
                                            expectedPrice = tType === '' ? getValidPricePointsUnits(dir, dt, oType)
                                                : getValidPricePointsUnits(dir, orderPrice, oType);
                                            expectedPattern = getExpectedPattern(dir, expectedPrice, oType);
                                        }));
                                        promiseArr.push(order.getValidationMessage()
                                            .then(function (am) { return actualMessage = am; }));
                                        return Promise.all(promiseArr)
                                            .then(function () {
                                            console.log(actualMessage + " === " + expectedPattern);
                                            return _this.helper.sleepIfFalse(actualMessage === expectedPattern);
                                        });
                                    }, 20000)
                                        .then(function () { return null; }, function () { return null; })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            }
            var self, marketInformation, expectedPattern, expectedPrice, actualMessage, promiseArr, orderPrice, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.backendHelper.getMarketInformation(this.idMatcher.market[marketName])];
                    case 1:
                        marketInformation = _a.sent();
                        promiseArr = [];
                        orderPrice = self.memory['order price'];
                        ticketType = ticketType.trim();
                        orderNumber = orderNumber === 'default' ? orderType : orderNumber;
                        orderNumber = orderNumber === 'stop'
                            ? 1
                            : orderNumber === 'limit'
                                ? 2
                                : orderNumber;
                        orderNumber = parseInt(orderNumber) - 1;
                        return [4 /*yield*/, self.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber)];
                    case 2:
                        order = _a.sent();
                        return [4 /*yield*/, compareValidationMsg(direction, ticketType, orderType)];
                    case 3:
                        _a.sent();
                        this.expect(actualMessage).to.equal(expectedPattern);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^(buy|sell) '(.+)' '(.+)'(?:st|th|nd|rd|) guaranteed stop price validation should be correct$/, function (direction, marketName, orderNumber) {
        return __awaiter(this, void 0, void 0, function () {
            function getValidPricePointsUnits(dir, price) {
                var betPer = parseFloat(marketInformation.BetPer);
                var minDistance = parseFloat(marketInformation.GuaranteedOrderMinDistance);
                var units = parseInt(marketInformation.GuaranteedOrderMinDistanceUnits); // 26 - percentage, 27 - points
                var decimals = marketInformation.PriceDecimalPlaces;
                var d = dir === 'sell' ? 1 : -1;
                var validPrice;
                if (units === 26) {
                    validPrice = (parseFloat(price) * (1 + d * minDistance * 0.01)).toFixed(decimals);
                }
                else {
                    validPrice = (parseFloat(price) + d * minDistance * betPer).toFixed(decimals);
                }
                return validPrice;
            }
            function getExpectedPattern(dir, price) {
                var expectedPattern1 = "Too low. Minimum price " + price.toString().replace(/0+$/, '');
                var expectedPattern2 = "Too high. Maximum price " + price.toString().replace(/0+$/, '');
                if (dir === 'sell') {
                    return expectedPattern1;
                }
                else if (dir === 'buy') {
                    return expectedPattern2;
                }
            }
            function compareValidationMsg(dir) {
                return __awaiter(this, void 0, void 0, function () {
                    var oppositeDir;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self.lightstreamer.subscribe(self.idMatcher.market[marketName]);
                                oppositeDir = dir === 'sell' ? 'Offer' : 'Bid';
                                return [4 /*yield*/, protractor_1.browser.wait(function () {
                                        promiseArr = [];
                                        promiseArr.push(self.lightstreamer.addListener(oppositeDir)
                                            .then(function (dt) {
                                            expectedPrice = getValidPricePointsUnits(dir, dt);
                                            expectedPattern = getExpectedPattern(dir, expectedPrice);
                                        }));
                                        promiseArr.push(order.getValidationMessage()
                                            .then(function (am) { return actualMessage = am; }));
                                        return Promise.all(promiseArr)
                                            .then(function () {
                                            console.log(actualMessage + " === " + expectedPattern);
                                            return _this.helper.sleepIfFalse(actualMessage === expectedPattern);
                                        });
                                    }, 20000)
                                        .then(function () { return null; }, function () { return null; })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            }
            var self, marketInformation, expectedPattern, expectedPrice, actualMessage, promiseArr, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.backendHelper.getMarketInformation(this.idMatcher.market[marketName])];
                    case 1:
                        marketInformation = _a.sent();
                        promiseArr = [];
                        orderNumber = parseInt(orderNumber) - 1;
                        return [4 /*yield*/, self.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder('', orderNumber)];
                    case 2:
                        order = _a.sent();
                        return [4 /*yield*/, compareValidationMsg(direction)];
                    case 3:
                        _a.sent();
                        this.expect(actualMessage).to.equal(expectedPattern);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the( main | oco | )'(.+)'(?:st|th|nd|rd|) (stop|limit) max quantity validation should be correct$/, function (ticketType, orderNumber, orderType) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedPattern, actualMessage, quantity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        quantity = this.memory.quantity;
                        orderNumber = parseInt(orderNumber) - 1;
                        ticketType = ticketType.trim();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getValidationMessage()];
                    case 1:
                        actualMessage = _a.sent();
                        expectedPattern = "Max for all " + orderType + "s can't be greater than " + quantity;
                        this.expect(actualMessage).to.equal(expectedPattern);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the( main | oco | )'(.+)'(?:st|th|nd|rd|) (stop|limit) max quantity validation should be correct for '(.+)'$/, function (ticketType, orderNumber, orderType, marketName) {
        return __awaiter(this, void 0, void 0, function () {
            var marketInformation, minSize, maxSize, expectedPattern, actualMessage, quantity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.backendHelper.getMarketInformation(this.idMatcher.market[marketName])];
                    case 1:
                        marketInformation = _a.sent();
                        minSize = marketInformation.WebMinSize;
                        maxSize = marketInformation.MaxLongSize;
                        quantity = this.memory.quantity;
                        if (quantity > maxSize) {
                            quantity = maxSize;
                        }
                        orderNumber = parseInt(orderNumber) - 1;
                        ticketType = ticketType.trim();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getValidationMessage()];
                    case 2:
                        actualMessage = _a.sent();
                        expectedPattern = "Max for all " + orderType + "s can't be greater than " + quantity;
                        this.expect(actualMessage).to.equal(expectedPattern);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^margin calculator should contain (correct information|nothing)$/, function (expectedState) {
        return __awaiter(this, void 0, void 0, function () {
            var actualText, expectedPattern, quantity, marketSimulate, marketInfoExt, marginInfo, actRisking, actCurrency, actPer, actMarginReq, actAvailableFunds, trailingStopConvFactor, quantityConversionFactor, betPer, tradableFunds, marketTypeId, expRisking, expCurrency, expPer, expMarginReq, expAvailableFunds;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedPattern = expectedState === 'nothing' ? /^$/ : /^Risking (\d+.?\d*) ([A-Z]{3}) per (\d+.?\d*) point movement\nMargin required: (\d+.?\d*) GBP\nPercentage of available funds: (\d+.?\d*)%$/;
                        return [4 /*yield*/, protractor_1.browser.wait(function () {
                                return _this.basePage.currentBoard.tabBody.currentPanel.getMarginCalcText()
                                    .then(function (text) {
                                    actualText = text;
                                    return _this.helper.sleepIfFalse(!!actualText.match(expectedPattern));
                                });
                            }, 2000)
                                .then(function () { return null; }, function () { return null; })];
                    case 1:
                        _a.sent();
                        if (!(expectedState !== 'nothing')) return [3 /*break*/, 5];
                        quantity = parseInt(this.memory.quantity);
                        return [4 /*yield*/, this.backendHelper.getSimulateInformation(this.idMatcher.market[this.memory.marketName], this.memory.direction, quantity)];
                    case 2:
                        marketSimulate = _a.sent();
                        return [4 /*yield*/, this.backendHelper.getMarketExtendedInfo(this.idMatcher.market[this.memory.marketName])];
                    case 3:
                        marketInfoExt = _a.sent();
                        return [4 /*yield*/, this.backendHelper.getMarginInfo()];
                    case 4:
                        marginInfo = _a.sent();
                        actRisking = parseFloat(actualText.replace(expectedPattern, '$1'));
                        actCurrency = actualText.replace(expectedPattern, '$2');
                        actPer = parseFloat(actualText.replace(expectedPattern, '$3'));
                        actMarginReq = parseFloat(actualText.replace(expectedPattern, '$4'));
                        actAvailableFunds = parseFloat(actualText.replace(expectedPattern, '$5'));
                        trailingStopConvFactor = marketInfoExt.MarketInformation.TrailingStopConversionFactor ? marketInfoExt.MarketInformation.TrailingStopConversionFactor : 1;
                        quantityConversionFactor = marketInfoExt.MarketInformation.QuantityConversionFactor;
                        betPer = marketInfoExt.MarketInformation.BetPer;
                        tradableFunds = marginInfo.TradableFunds;
                        marketTypeId = marketInfoExt.MarketInformation.MarketSettingsTypeId;
                        expRisking = quantity * trailingStopConvFactor / quantityConversionFactor;
                        expCurrency = marketTypeId === 2 ? marketInfoExt.MarketInformation.MarketCurrencyCode : 'GBP';
                        expPer = trailingStopConvFactor * betPer;
                        expMarginReq = marketSimulate.SimulatedTotalMarginRequirement;
                        expAvailableFunds = parseFloat((expMarginReq / tradableFunds * 100).toFixed(1));
                        this.expect(actRisking).to.equal(expRisking);
                        this.expect(actCurrency).to.equal(expCurrency);
                        this.expect(actPer).to.equal(expPer);
                        if (marketTypeId === 2) {
                            this.expect(actMarginReq).to.equal(expMarginReq);
                        }
                        else {
                            this.expect(actMarginReq).to.be.closeTo(expMarginReq, expMarginReq * 0.001);
                        }
                        this.expect(actAvailableFunds).to.equal(expAvailableFunds);
                        _a.label = 5;
                    case 5:
                        this.expect(actualText).to.match(expectedPattern);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^(main |oco |)'(.+)' (?:element|input) should be (active|inactive)$/, function (ticketType, field, state) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedState, actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        field = field.toLowerCase();
                        ticketType = ticketType.trim();
                        expectedState = state === 'active';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.isElementActive(field, ticketType)];
                    case 1:
                        actualState = _a.sent();
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^cursor is placed in the '(.+)' field$/, function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            var elementPlaceholder, focusPlaceholder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getPlaceholder(elementName)];
                    case 1:
                        elementPlaceholder = _a.sent();
                        return [4 /*yield*/, protractor_1.browser.switchTo().activeElement().getAttribute('placeholder')];
                    case 2:
                        focusPlaceholder = _a.sent();
                        this.expect(elementPlaceholder).to.be.equal(focusPlaceholder);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the number of decimal places in (sell|buy) price button is correct for '(.+)'$/, function (direction, marketName) {
        return __awaiter(this, void 0, void 0, function () {
            var marketInformation, decimals, price;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.backendHelper.getMarketInformation(this.idMatcher.market[marketName])];
                    case 1:
                        marketInformation = _a.sent();
                        decimals = marketInformation.PriceDecimalPlaces;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getPrice(direction)];
                    case 2:
                        price = _a.sent();
                        this.expect(price.split('.')[1].length).to.equal(decimals);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the( main | oco | )'(.+)'(?:st|th|nd|rd|) (?:normal stop|guaranteed stop|trailing stop|limit) order '(.+)' (?:field|element) should have (red|blue) color$/, function (ticketType, orderNumber, fieldName, expectedColor) {
        return __awaiter(this, void 0, void 0, function () {
            var actualColor, colors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderNumber = parseInt(orderNumber) - 1;
                        ticketType = ticketType.trim();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getBorderColor(fieldName)];
                    case 1:
                        actualColor = _a.sent();
                        if (!(fieldName === 'p/l border')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getAnyLinkedOrder(ticketType, orderNumber).getCssValue(fieldName, 'border-right-color')];
                    case 2:
                        actualColor = _a.sent();
                        _a.label = 3;
                    case 3:
                        colors = {
                            red: '208, 1, 27'
                        };
                        this.expect(actualColor).to.include(colors[expectedColor]);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the( main | oco | )order '(.+)' field should have (red|blue|no) color$/, function (ticketType, fieldName, expectedColor) {
        return __awaiter(this, void 0, void 0, function () {
            var actualColor, colors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ticketType = ticketType.trim();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getCssValue(fieldName, ticketType, 'border-color')];
                    case 1:
                        actualColor = _a.sent();
                        if (!(expectedColor === 'no')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getCssValue(fieldName, ticketType, 'border')];
                    case 2:
                        actualColor = _a.sent();
                        _a.label = 3;
                    case 3:
                        colors = {
                            red: '208, 1, 27',
                            no: 'none'
                        };
                        this.expect(actualColor).to.include(colors[expectedColor]);
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=deal-ticket-steps.js.map