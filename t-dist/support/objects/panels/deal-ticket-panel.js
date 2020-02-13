"use strict";
/* tslint:disable:max-line-length */
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
var linked_order_1 = require("../elements/linked-order");
var helper_1 = require("../../utils/helper");
var DealTicketPanel = /** @class */ (function (_super) {
    __extends(DealTicketPanel, _super);
    function DealTicketPanel(panelRoot) {
        var _this = _super.call(this, panelRoot) || this;
        _this.data = {
            mainLabels: protractor_1.by.css('.ticket-type label'),
            market: protractor_1.by.css('.market-information'),
            directions: protractor_1.by.css('.market-prices label'),
            marketName: protractor_1.by.css('.market-information__market-name'),
            sellLabel: protractor_1.by.css('.sell'),
            buyLabel: protractor_1.by.css('.buy'),
            marketSpread: protractor_1.by.css('.market-prices__spread'),
            ticketFormClarification: protractor_1.by.css('.ticket-form__clarification'),
            main: protractor_1.by.css('[formgroupname=mainOrder] .market-prices'),
            oco: protractor_1.by.css('[formgroupname=ocoOrder] .market-prices'),
            mainOrderArea: protractor_1.by.css('.main-order'),
            ocoOrderArea: protractor_1.by.css('.oco-order'),
            primaryArea: {
                root: protractor_1.by.css('.order-primary-area'),
                rows: protractor_1.by.css('.row'),
                quantityInput: protractor_1.by.css('[formcontrolname=quantity] input'),
                orderPriceInput: protractor_1.by.css('[formcontrolname=price] input'),
                goodTillDropdown: protractor_1.by.css('.row__expiry'),
                validation: protractor_1.by.css('.row__validations')
            },
            addStopLimitLink: protractor_1.by.css('.linked-orders-controls__add-order'),
            addStopLimitDropdown: protractor_1.by.css('.dropdown__content'),
            hedgingToggleBtn: protractor_1.by.css('.slide-toggle--status'),
            hedgeInfoIcon: protractor_1.by.css('.icon-info'),
            hedgeTooltip: protractor_1.by.tagName('app-tooltip'),
            hedgingStatus: protractor_1.by.css('.order-controls__hedging-status'),
            positionInformation: protractor_1.by.css('.edit-form__position-info'),
            advancedTicketLink: protractor_1.by.css('.order-controls__mode-toggler--advanced'),
            standardTicketLink: protractor_1.by.css('.order-controls__mode-toggler--standard'),
            ocoLink: protractor_1.by.css('.oco-toggle'),
            marginCalculator: {
                root: protractor_1.by.css('.margin-calculator'),
                risks: protractor_1.by.css('.margin-calculator__calculated-risks'),
                margin: protractor_1.by.css('.margin-calculator__calculated-margin'),
                details: protractor_1.by.css('.margin-calculator__calculated-margin-details')
            },
            editLabel: protractor_1.by.css('.edit-form__collapse-header .at-edit-stops-and-limits-rb'),
            closeSection: {
                radioButton: protractor_1.by.css('.at-close-rb'),
                quantityInput: protractor_1.by.css('.at-close-quantity-input>input'),
                info: protractor_1.by.css('.edit-form__close-info'),
                label: protractor_1.by.css('.edit-form__collapse-header .at-close-rb')
            },
            confirmationSection: {
                confirmation: protractor_1.by.css('.at-confirmation-bot'),
                header: protractor_1.by.css('.ticket-confirmation-item__header'),
                message: protractor_1.by.css('.ticket-confirmation-item__body'),
                'ticket failure': protractor_1.by.css('.ticket-failure'),
                error: protractor_1.by.css('.ticket-confirmation-list__error-message'),
                'attached order confirmation': protractor_1.by.css('.body__row--attached-order')
            },
            marketStatus: {
                root: protractor_1.by.tagName('app-market-status'),
                closedMarketIcon: protractor_1.by.css('.icon-closedmarket'),
                callToTradeMarketIcon: protractor_1.by.css('.icon-calltotrade'),
                title: protractor_1.by.css('.market-status__title'),
                description: protractor_1.by.css('.market-status__description'),
                createAnOrderLink: protractor_1.by.css('.market-status__order-link')
            },
            orders: protractor_1.by.css('.linked-orders'),
            controls: protractor_1.by.css('.linked-orders-controls'),
            closeRadioBtn: protractor_1.by.css('.at-close-rb'),
            editRadioBtn: protractor_1.by.css('.at-edit-stops-and-limits-rb'),
            submitBtn: protractor_1.by.css('.ticket-footer__submit'),
            okBtn: protractor_1.by.css('.submit-button')
        };
        _this.name = 'Deal Ticket';
        return _this;
    }
    DealTicketPanel.prototype.isRadiobuttonSelected = function (name) {
        var self = this;
        name = name.toLowerCase();
        var radiobuttons = {
            close: self.data.closeSection.radioButton,
            edit: self.data.editRadioBtn
        };
        return this.container.element(radiobuttons[name]).element(protractor_1.by.tagName('input')).isSelected();
    };
    DealTicketPanel.prototype.isTypeSelected = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var label, cls;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        type = type.toLowerCase();
                        label = this.container.all(this.data.mainLabels).filter(function (lab) {
                            return lab.getText()
                                .then(function (text) {
                                return text.toLowerCase().trim().includes(type.toLowerCase());
                            });
                        }).first();
                        return [4 /*yield*/, label.waitReady(3000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, label.getAttribute('class')];
                    case 2:
                        cls = _a.sent();
                        return [2 /*return*/, cls.includes('selected')];
                }
            });
        });
    };
    DealTicketPanel.prototype.getDirection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var clsExt, arr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.buyLabel).waitReady(15000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.container.all(this.data.directions).filter(function (direction) {
                                return direction.getAttribute('class')
                                    .then(function (cls) { return cls.includes('selected'); });
                            }).first().getAttribute('class')];
                    case 2:
                        clsExt = _a.sent();
                        arr = clsExt.split(' ');
                        return [2 /*return*/, arr[0]];
                }
            });
        });
    };
    DealTicketPanel.prototype.getLinkedOrder = function (num) {
        var linkedOrderRoot = this.container.all(protractor_1.by.css('.linked-orders > li')).get(num);
        return new linked_order_1.LinkedOrder(linkedOrderRoot);
    };
    DealTicketPanel.prototype.getMainLinkedOrder = function (num) {
        var linkedOrderRoot = this.container.element(this.data.mainOrderArea).all(protractor_1.by.css('.linked-orders > li')).get(num);
        return new linked_order_1.LinkedOrder(linkedOrderRoot);
    };
    DealTicketPanel.prototype.getOCOLinkedOrder = function (num) {
        var linkedOrderRoot = this.container.element(this.data.ocoOrderArea).all(protractor_1.by.css('.linked-orders > li')).get(num);
        return new linked_order_1.LinkedOrder(linkedOrderRoot);
    };
    DealTicketPanel.prototype.getAnyLinkedOrder = function (ticketType, orderNumber) {
        var value = ticketType === 'main' ? this.getMainLinkedOrder(orderNumber) :
            ticketType === 'oco' ? this.getOCOLinkedOrder(orderNumber) :
                this.getLinkedOrder(orderNumber);
        return value;
    };
    DealTicketPanel.prototype.getInputValue = function (name) {
        name = name.toLowerCase();
        var self = this;
        var inputs = {
            'order price': self.container.all(self.data.primaryArea.orderPriceInput).get(0),
            quantity: self.container.all(self.data.primaryArea.quantityInput).get(0),
            'close quantity': self.container.element(self.data.closeSection.quantityInput),
            'primary area quantity': self.container.element(self.data.primaryArea.quantityInput),
            'stop price': self.container.all(self.data.primaryArea.orderPriceInput).get(0),
            'limit price': self.container.all(self.data.primaryArea.orderPriceInput).get(1)
        };
        return inputs[name].getAttribute('value');
    };
    DealTicketPanel.prototype.getElementText = function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            var self, stopOrder, limitOrder, linkedOrder, elements, el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elementName = elementName.toLowerCase();
                        self = this;
                        stopOrder = self.getLinkedOrder(0);
                        limitOrder = self.getLinkedOrder(1);
                        linkedOrder = self.getLinkedOrder(2);
                        elements = {
                            'trade label': self.container.all(self.data.mainLabels).get(0),
                            'order label': self.container.all(self.data.mainLabels).get(1),
                            'set alert label': self.container.all(self.data.mainLabels).get(2),
                            'ticket label': self.container.element(self.data.mainLabels),
                            'market info': self.container.element(self.data.marketName),
                            'position info': self.container.element(self.data.positionInformation),
                            'submit button': self.container.element(self.data.submitBtn),
                            'close label': self.container.element(self.data.closeSection.label),
                            'close info': self.container.element(self.data.closeSection.info),
                            confirmation: self.container.element(self.data.confirmationSection.confirmation),
                            'market name': self.container.element(self.data.confirmationSection.header),
                            'hedging status': self.container.element(self.data.hedgingStatus),
                            'margin calculator': self.container.element(self.data.marginCalculator.root),
                            'confirmation message': self.container.element(self.data.confirmationSection.message),
                            'confirmation message 1': self.container.all(self.data.confirmationSection.message).get(0),
                            'confirmation message 2': self.container.all(self.data.confirmationSection.message).get(1),
                            'confirmation message 3': self.container.all(self.data.confirmationSection.message).get(2),
                            'delete message': linkedOrder.getField('delitionMessage'),
                            'stop validation': stopOrder.getField('validation'),
                            'limit validation': limitOrder.getField('validation'),
                            'oco link': self.container.element(self.data.ocoLink),
                            'ticket form clarification': self.container.element(self.data.ticketFormClarification),
                            'main good till dropdown': self.container.element(self.data.mainOrderArea).element(self.data.primaryArea.goodTillDropdown),
                            'oco good till dropdown': self.container.element(self.data.ocoOrderArea).element(self.data.primaryArea.goodTillDropdown),
                            'market status title': self.container.element(self.data.marketStatus.title),
                            'ticket failure': self.container.element(self.data.confirmationSection['ticket failure']),
                            'error message': self.container.element(self.data.confirmationSection.error),
                            'attached order confirmation': self.container.element(self.data.confirmationSection['attached order confirmation'])
                        };
                        return [4 /*yield*/, elements[elementName].waitReady(6000)];
                    case 1:
                        el = _a.sent();
                        return [4 /*yield*/, el.getText()];
                    case 2: return [2 /*return*/, (_a.sent()).trim()];
                }
            });
        });
    };
    DealTicketPanel.prototype.clearField = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var self, inputs, el, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        name = name.toLowerCase();
                        self = this;
                        inputs = {
                            quantity: self.container.element(self.data.primaryArea.quantityInput),
                        };
                        return [4 /*yield*/, inputs[name].waitReady(1000)];
                    case 1:
                        el = _b.sent();
                        if (!
                        // workaround, since clear() method doesn't update angular model
                        (process.env.npm_config_browser === 'safari')) 
                        // workaround, since clear() method doesn't update angular model
                        return [3 /*break*/, 3];
                        return [4 /*yield*/, el.clear()];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, el.sendKeys(protractor_1.protractor.Key.chord(protractor_1.protractor.Key.CONTROL, 'a', protractor_1.protractor.Key.DELETE))];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        // workaround, since clear() method doesn't update angular model
                        _a;
                        return [2 /*return*/];
                }
            });
        });
    };
    DealTicketPanel.prototype.fillInputWithValue = function (name, value, type) {
        if (type === void 0) { type = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var self, inputs, order, el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = name.toLowerCase();
                        self = this;
                        order = type === '' ? self.container : self.container.element(self.data[type + "OrderArea"]);
                        inputs = {
                            'order price': order.all(self.data.primaryArea.orderPriceInput).get(0),
                            quantity: order.all(self.data.primaryArea.quantityInput).get(0),
                            'close quantity': order.element(self.data.closeSection.quantityInput)
                        };
                        return [4 /*yield*/, inputs[name].waitReady(1000)];
                    case 1:
                        el = _a.sent();
                        return [4 /*yield*/, el.clear()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, el.sendKeys(value)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DealTicketPanel.prototype.isElementActive = function (name, type) {
        if (type === void 0) { type = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var self, order, elements, el, activeEl, elHtml, activeHtml;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = name.toLowerCase();
                        self = this;
                        order = type === '' ? self.container : self.container.element(self.data[type + "OrderArea"]);
                        elements = {
                            'order price': order.all(self.data.primaryArea.orderPriceInput).get(0),
                            quantity: order.all(self.data.primaryArea.quantityInput).get(0),
                            'close quantity': order.element(self.data.closeSection.quantityInput)
                        };
                        return [4 /*yield*/, elements[name].waitReady(1000)];
                    case 1:
                        el = _a.sent();
                        return [4 /*yield*/, protractor_1.browser.driver.switchTo().activeElement()];
                    case 2:
                        activeEl = _a.sent();
                        return [4 /*yield*/, protractor_1.browser.executeScript('return arguments[0].outerHTML;', el.getWebElement())];
                    case 3:
                        elHtml = _a.sent();
                        return [4 /*yield*/, protractor_1.browser.executeScript('return arguments[0].outerHTML;', activeEl)];
                    case 4:
                        activeHtml = _a.sent();
                        return [2 /*return*/, elHtml === activeHtml];
                }
            });
        });
    };
    DealTicketPanel.prototype.selectItemType = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var label, cls;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        type = type.toLowerCase();
                        label = this.container.all(this.data.mainLabels).filter(function (lab) {
                            return lab.getText()
                                .then(function (text) {
                                return text.toLowerCase().trim().includes(type);
                            });
                        }).first();
                        return [4 /*yield*/, label.waitReady(10000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, label.click()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, label.getAttribute('class')];
                    case 3:
                        cls = _a.sent();
                        if (!!cls.includes('selected')) return [3 /*break*/, 6];
                        return [4 /*yield*/, helper_1.helper.sleep(1000)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, label.click()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    DealTicketPanel.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prices, cls, button, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        prices = { sell: null, buy: null };
                        return [4 /*yield*/, this.container.element(this.data.submitBtn).getAttribute('class')];
                    case 1:
                        cls = _c.sent();
                        if (!cls.includes('invalid')) return [3 /*break*/, 2];
                        throw new Error(' Submit button is not active! ');
                    case 2: return [4 /*yield*/, this.container.element(this.data.submitBtn).click()];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4: return [4 /*yield*/, this.container.element(this.data.okBtn).waitReady(3000)];
                    case 5:
                        button = _c.sent();
                        return [4 /*yield*/, helper_1.helper.sleep(50)];
                    case 6:
                        _c.sent();
                        _a = prices;
                        return [4 /*yield*/, this.container.element(this.data.sellLabel).element(protractor_1.by.css('.price__value')).getText()];
                    case 7:
                        _a.sell = (_c.sent()).trim();
                        _b = prices;
                        return [4 /*yield*/, this.container.element(this.data.buyLabel).element(protractor_1.by.css('.price__value')).getText()];
                    case 8:
                        _b.buy = (_c.sent()).trim();
                        return [4 /*yield*/, button.click()];
                    case 9:
                        _c.sent();
                        return [4 /*yield*/, this.container.waitMissing()];
                    case 10:
                        _c.sent();
                        return [2 /*return*/, prices];
                }
            });
        });
    };
    DealTicketPanel.prototype.getPrice = function (type, ticketType) {
        if (ticketType === void 0) { ticketType = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var price, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(ticketType === '')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.container.element(this.data[type + "Label"]).element(protractor_1.by.css('.price__value')).getText()];
                    case 1:
                        _a = (_b.sent()).trim();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.container.all(this.data[ticketType]).get(0).element(this.data[type + "Label"]).element(protractor_1.by.css('.price__value')).getText()];
                    case 3:
                        _a = (_b.sent()).trim();
                        _b.label = 4;
                    case 4:
                        price = _a;
                        return [2 /*return*/, price];
                }
            });
        });
    };
    DealTicketPanel.prototype.clickOnButton = function (buttonName) {
        return __awaiter(this, void 0, void 0, function () {
            var el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data[buttonName + "Btn"]).waitReady(2000)];
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
    DealTicketPanel.prototype.clickOnLabel = function (labelName) {
        return __awaiter(this, void 0, void 0, function () {
            var el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data[labelName + "Label"]).waitReady(2000)];
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
    DealTicketPanel.prototype.clickOnLink = function (linkName, type) {
        if (type === void 0) { type = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var self, order, el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        order = type === '' ? self.container : self.container.element(self.data[type + "OrderArea"]);
                        return [4 /*yield*/, order.element(this.data[linkName + "Link"]).waitReady(2000)];
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
    DealTicketPanel.prototype.clickAddStopLimit = function (ticketType) {
        if (ticketType === void 0) { ticketType = 'main'; }
        ticketType = ticketType === '' ? 'main' : ticketType;
        var order = ticketType === '' ? this.container : this.container.element(this.data[ticketType + "OrderArea"]);
        return order.element(this.data.addStopLimitLink).click();
    };
    DealTicketPanel.prototype.clickOnElement = function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            var mainOrder, ocoOrder, main, oco, elements, el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mainOrder = this.container.element(this.data.mainOrderArea);
                        ocoOrder = this.container.element(this.data.ocoOrderArea);
                        main = this.container.all(this.data.main).get(0);
                        oco = this.container.all(this.data.oco).get(0);
                        elements = {
                            'main advanced ticket link': mainOrder.element(this.data.advancedTicketLink),
                            'main sell label': main.element(this.data.sellLabel),
                            'main buy label': main.element(this.data.buyLabel),
                            'oco advanced ticket link': ocoOrder.element(this.data.advancedTicketLink),
                            'oco sell label': oco.element(this.data.sellLabel),
                            'oco buy label': oco.element(this.data.buyLabel),
                            'create an order link': mainOrder.element(this.data.marketStatus.createAnOrderLink)
                        };
                        return [4 /*yield*/, elements[elementName].waitReady(2000)];
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
    DealTicketPanel.prototype.hover = function (elementName, ticketType) {
        if (ticketType === void 0) { ticketType = 'main'; }
        return __awaiter(this, void 0, void 0, function () {
            var self, order, elements;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elementName = elementName.toLowerCase();
                        self = this;
                        ticketType = ticketType === '' ? 'main' : ticketType;
                        order = ticketType === '' ? self.container : self.container.element(self.data[ticketType + "OrderArea"]);
                        elements = {
                            'hedging info icon': order.element(self.data.hedgeInfoIcon)
                        };
                        return [4 /*yield*/, elements[elementName].waitPresent(5000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, elements[elementName].scrollIntoView()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, elements[elementName].hover()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DealTicketPanel.prototype.isControlDisabled = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var self, control, el, cls, _a, attribute;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        self = this;
                        control = {
                            'submit button': self.container.element(self.data.submitBtn),
                            'standard ticket link': self.container.element(self.data.standardTicketLink),
                            'hedge toggle': self.container.element(self.data.hedgingToggleBtn),
                            'main good till dropdown': self.container.element(self.data.mainOrderArea).element(self.data.primaryArea.goodTillDropdown),
                            'oco good till dropdown': self.container.element(self.data.ocoOrderArea).element(self.data.primaryArea.goodTillDropdown),
                            'close quantity': self.container.element(self.data.primaryArea.quantityInput)
                        };
                        return [4 /*yield*/, control[name].waitReady(3000)];
                    case 1:
                        el = _b.sent();
                        return [4 /*yield*/, el.getAttribute('class')];
                    case 2:
                        cls = _b.sent();
                        _a = name;
                        switch (_a) {
                            case 'hedge toggle': return [3 /*break*/, 3];
                            case 'close quantity': return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 6];
                    case 3: return [2 /*return*/, cls.includes('off')];
                    case 4: return [4 /*yield*/, el.getAttribute('disabled')];
                    case 5:
                        attribute = _b.sent();
                        return [2 /*return*/, attribute === 'true'];
                    case 6: return [2 /*return*/, cls.includes('disabled')];
                }
            });
        });
    };
    DealTicketPanel.prototype.getPlaceholder = function (name) {
        var self = this;
        var field = {
            quantity: self.container.all(self.data.primaryArea.quantityInput).get(0),
            'close quantity': self.container.element(self.data.closeSection.quantityInput)
        };
        return field[name].getAttribute('placeholder');
    };
    DealTicketPanel.prototype.getLabelColor = function (labelName) {
        return this.container.element(this.data[labelName + "Label"]).getCssValue('background-color');
    };
    DealTicketPanel.prototype.isElementPresent = function (elementName, ticketType, state) {
        if (ticketType === void 0) { ticketType = 'main'; }
        if (state === void 0) { state = true; }
        return __awaiter(this, void 0, void 0, function () {
            var self, order, elements;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elementName = elementName.toLowerCase();
                        self = this;
                        ticketType = ticketType === '' ? 'main' : ticketType;
                        order = ticketType === '' ? self.container : self.container.element(self.data[ticketType + "OrderArea"]);
                        elements = {
                            'sell label': self.container.all(self.data[ticketType]).get(0).element(self.data.sellLabel),
                            'buy label': self.container.all(self.data[ticketType]).get(0).element(self.data.buyLabel),
                            'ticket form clarification': self.container.element(self.data.ticketFormClarification),
                            'order price': order.all(self.data.primaryArea.orderPriceInput).get(0),
                            quantity: order.all(self.data.primaryArea.quantityInput).get(0),
                            'standard ticket link': order.element(self.data.standardTicketLink),
                            'advanced ticket link': order.element(self.data.advancedTicketLink),
                            'oco link': self.container.element(self.data.ocoLink),
                            'add stop limit dropdown link': order.element(self.data.addStopLimitLink),
                            'hedging toggle': order.element(self.data.hedgingToggleBtn),
                            'hedging info icon': order.element(self.data.hedgeInfoIcon),
                            'hedging status': order.element(self.data.hedgingStatus),
                            'good till dropdown': order.element(self.data.primaryArea.goodTillDropdown),
                            'closed icon': self.container.element(self.data.marketStatus.closedMarketIcon),
                            'call to trade': self.container.element(self.data.marketStatus.callToTradeMarketIcon),
                            'status description': self.container.element(self.data.marketStatus.description),
                            'create an order link': self.container.element(self.data.marketStatus.createAnOrderLink),
                            'close section': self.container.element(self.data.closeSection.label),
                            'edit section': self.container.element(self.data.editLabel)
                        };
                        return [4 /*yield*/, elements[elementName].waitReady(4000)
                                .then(function () { return null; }, function () { return null; })];
                    case 1:
                        _a.sent();
                        if (state) {
                            return [2 /*return*/, elements[elementName].isDisplayed()];
                        }
                        else {
                            return [2 /*return*/, elements[elementName].isPresent()];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DealTicketPanel.prototype.getStopLimitDropdownOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var textArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.controls).element(this.data.addStopLimitDropdown)
                            .element(protractor_1.by.tagName('ul')).all(protractor_1.by.tagName('li')).getText()];
                    case 1:
                        textArr = _a.sent();
                        return [2 /*return*/, textArr.map(function (t) { return t.trim(); })];
                }
            });
        });
    };
    DealTicketPanel.prototype.selectStopLimitDropdownOption = function (nameOrNumber) {
        var option;
        if (typeof nameOrNumber === 'number') {
            option = this.container.element(this.data.controls).element(this.data.addStopLimitDropdown)
                .element(protractor_1.by.tagName('ul')).all(protractor_1.by.tagName('li')).get(nameOrNumber);
        }
        else {
            option = this.container.element(this.data.controls).element(this.data.addStopLimitDropdown)
                .element(protractor_1.by.tagName('ul')).all(protractor_1.by.tagName('li')).filter(function (opt) {
                return opt.getText()
                    .then(function (text) {
                    return text.toLowerCase().trim().includes(nameOrNumber.toLowerCase());
                });
            }).first();
        }
        return option.click();
    };
    DealTicketPanel.prototype.getNumberOfLinkedOrders = function () {
        return this.container.all(protractor_1.by.css('.linked-orders > li')).count();
    };
    DealTicketPanel.prototype.isElementVisible = function (ticketType, elem) {
        elem = elem.toLowerCase();
        var self = this;
        var input;
        switch (ticketType) {
            case 'main': {
                var mainOrder = self.container.element(self.data.mainOrderArea);
                input = {
                    'order price': mainOrder.element(self.data.primaryArea.orderPriceInput),
                    'hedging tooltip': mainOrder.element(self.data.hedgeTooltip),
                    quantity: mainOrder.element(self.data.primaryArea.quantityInput)
                };
                break;
            }
            case 'oco': {
                var ocoOrder = self.container.element(self.data.mainOrderArea);
                input = {
                    'order price': ocoOrder.element(self.data.primaryArea.orderPriceInput),
                    'hedging tooltip': ocoOrder.element(self.data.hedgeTooltip),
                    quantity: ocoOrder.element(self.data.primaryArea.quantityInput)
                };
                break;
            }
            default: {
                input = {
                    'ticket form clarification': self.container.element(self.data.ticketFormClarification),
                    'hedging tooltip': self.container.element(self.data.hedgeTooltip)
                };
            }
        }
        return input[elem].waitReady(2000)
            .then(function () { return true; }, function () { return false; });
    };
    DealTicketPanel.prototype.getValidationMessage = function (ticketType, field) {
        var orderValidations = ticketType === '' ? this.container.all(this.data.primaryArea.validation)
            : this.container.element(this.data[ticketType + "OrderArea"]).all(this.data.primaryArea.validation);
        if (ticketType === '' && field === 'quantity') {
            return orderValidations.get(0).getText()
                .then(function (text) { return text.trim(); });
        }
        else {
            if (field === 'price') {
                return protractor_1.browser.wait(function () {
                    return orderValidations.count()
                        .then(function (count) { return helper_1.helper.sleepIfFalse(count > 0); });
                }, 3000)
                    .then(function () { return orderValidations.get(0).getText(); })
                    .then(function (text) { return text.trim(); });
            }
            else if (field === 'quantity') {
                return protractor_1.browser.wait(function () {
                    return orderValidations.count()
                        .then(function (count) { return helper_1.helper.sleepIfFalse(count > 1); });
                }, 3000)
                    .then(function () { return orderValidations.get(1).getText(); })
                    .then(function (text) { return text.trim(); });
            }
        }
    };
    DealTicketPanel.prototype.expandApplicabilityDropdown = function () {
        return this.container.element(this.data.mainOrderArea).element(this.data.primaryArea.goodTillDropdown).click();
    };
    DealTicketPanel.prototype.getApplicabilityDropdownOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var textArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.mainOrderArea).element(this.data.primaryArea.goodTillDropdown)
                            .all(protractor_1.by.css('.dropdown__content > ul > li')).getText()];
                    case 1:
                        textArr = _a.sent();
                        return [2 /*return*/, textArr.map(function (t) { return t.trim(); })];
                }
            });
        });
    };
    DealTicketPanel.prototype.selectApplicability = function (nameOrNumber) {
        var applicability;
        var self = this;
        if (typeof nameOrNumber === 'number') {
            applicability = self.container.element(this.data.mainOrderArea).element(self.data.primaryArea.goodTillDropdown)
                .all(protractor_1.by.css('.dropdown__content > ul > li')).get(nameOrNumber);
        }
        else {
            applicability = self.container.element(this.data.mainOrderArea).element(self.data.primaryArea.goodTillDropdown)
                .element(protractor_1.by.cssContainingText('.dropdown__content > ul > li', nameOrNumber.toUpperCase()));
        }
        return applicability.click();
    };
    DealTicketPanel.prototype.getMarginCalcText = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.marginCalculator.root).getText()];
                    case 1: return [2 /*return*/, (_a.sent()).trim()];
                }
            });
        });
    };
    DealTicketPanel.prototype.waitForConfirmationMessage = function (timeout) {
        if (timeout === void 0) { timeout = 2000; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.container.element(this.data.confirmationSection.header).waitReady(timeout)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DealTicketPanel.prototype.getCssValue = function (name, ticketType, cssProperty) {
        return __awaiter(this, void 0, void 0, function () {
            var self, order, elements;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = name.toLowerCase();
                        self = this;
                        ticketType = ticketType === '' ? 'main' : ticketType;
                        order = ticketType === '' ? self.container : self.container.element(self.data[ticketType + "OrderArea"]);
                        elements = {
                            quantity: order.all(self.data.primaryArea.quantityInput).get(0),
                        };
                        return [4 /*yield*/, elements[name].getCssValue(cssProperty)];
                    case 1: return [2 /*return*/, (_a.sent()).trim()];
                }
            });
        });
    };
    return DealTicketPanel;
}(panel_1.Panel));
exports.DealTicketPanel = DealTicketPanel;
//# sourceMappingURL=deal-ticket-panel.js.map