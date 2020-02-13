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
cucumber_1.defineSupportCode(function (_a) {
    var Given = _a.Given, When = _a.When, Then = _a.Then;
    When(/^I delete '(.+)' markets$/, function (marketName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.backendHelper.deletePositionsByMarketName(marketName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I add ([Oo]rder|[Pp]osition) with parameters:$/, function (type, table) {
        return __awaiter(this, void 0, void 0, function () {
            var market, marketId, sell, buy, ifDone, oppositeDirection, stopLimitObj, orderType;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = table.rowsHash();
                        marketId = this.idMatcher.market[market.MarketName];
                        market.Direction = market.Direction.toLowerCase();
                        this.lightstreamer.subscribe(marketId);
                        return [4 /*yield*/, this.lightstreamer.addListener('Bid')];
                    case 1:
                        sell = _a.sent();
                        return [4 /*yield*/, this.lightstreamer.addListener('Offer')];
                    case 2:
                        buy = _a.sent();
                        this.memory.marketName = market.MarketName;
                        this.memory.prices = {
                            sell: sell,
                            buy: buy
                        };
                        this.memory.sell = sell;
                        this.memory.buy = buy;
                        this.memory.direction = market.Direction;
                        this.memory.quantity = market.Quantity;
                        this.memory.amalgamatedQty = this.memory.amalgamatedQty ? this.memory.amalgamatedQty : 0;
                        this.memory.amalgamatedQty += parseInt(market.Quantity);
                        this.memory.qtyArray = this.memory.qtyArray ? this.memory.qtyArray : [];
                        this.memory.qtyArray.push(market.Quantity);
                        this.memory.price = market.Price;
                        this.memory['order price'] = market.Price;
                        ifDone = [];
                        oppositeDirection = market.Direction.match(/[Bb]uy/) ? 'sell' : 'buy';
                        if (market.StopPrice || market.LimitPrice) {
                            market.StopPrice = market.StopPrice === 'buy' ? this.memory.buy :
                                market.StopPrice === 'sell' ? this.memory.sell :
                                    market.StopPrice;
                            market.LimitPrice = market.LimitPrice === 'buy' ? this.memory.buy :
                                market.LimitPrice === 'sell' ? this.memory.sell :
                                    market.LimitPrice;
                            stopLimitObj = {
                                Stop: null,
                                Limit: null
                            };
                            if (market.LimitPrice) {
                                stopLimitObj.Limit = {
                                    OrderId: null,
                                    Direction: oppositeDirection,
                                    TrailingDistance: null,
                                    Quantity: market.LimitQuantity ? market.LimitQuantity : market.Quantity,
                                    Applicability: 'gtc',
                                    TriggerPrice: market.LimitPrice,
                                    Guaranteed: false,
                                    ExpiryDateTimeUTC: null
                                };
                            }
                            if (market.StopPrice) {
                                stopLimitObj.Stop = {
                                    OrderId: null,
                                    Direction: oppositeDirection,
                                    TrailingDistance: null,
                                    Quantity: market.StopQuantity ? market.StopQuantity : market.Quantity,
                                    Applicability: 'gtc',
                                    TriggerPrice: market.StopPrice,
                                    Guaranteed: false,
                                    ExpiryDateTimeUTC: null
                                };
                            }
                            ifDone.push(stopLimitObj);
                        }
                        orderType = type === 'position' ? 'TradeOrder' : 'StopLimitOrder';
                        if (!(type === 'position')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.backendHelper.addNewPosition(market.MarketName, market.Direction, market.Quantity, this.memory.sell, this.memory.buy, ifDone)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.backendHelper.addNewOrder(market.MarketName, market.Direction, market.Price, market.Quantity, this.memory.sell, this.memory.buy, ifDone)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    });
    When(/^I delete '([Oo]rder|[Pp]osition)' '(.+)'$/, function (ticketType, marketName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(ticketType.toLowerCase() === 'position')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.backendHelper.deletePositionsByMarketName(marketName)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.backendHelper.deleteOrdersByMarketName(marketName)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    When(/^I get '([Oo]rder|[Pp]osition)' History for '(DFT|CFD|Spread)'$/, function (ticketType, accType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accType = accType === 'Spread' ? 'DFT' : accType;
                        if (!(ticketType.toLowerCase() === 'position')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.backendHelper.getPositionHistory(1, accType).then(function (data) {
                                _this.memory.history = data[0];
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.backendHelper.getOrderHistory(1, accType).then(function (data) {
                            _this.memory.history = data[0];
                        })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=backend-call-steps.js.map