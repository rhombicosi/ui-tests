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
    When(/^I click on the value of '(.+)'(?:st|th|nd|rd|) row$/, function (rowNameOrNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (parseInt(rowNameOrNumber)) {
                            rowNameOrNumber = rowNameOrNumber - 1;
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getRow(rowNameOrNumber).clickOnValue()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^market name should be '(.+)'$/, function (expectedName) {
        return __awaiter(this, void 0, void 0, function () {
            var actualName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (expectedName === 'correct') {
                            expectedName = this.memory.marketName;
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getMarketName()];
                    case 1:
                        actualName = _a.sent();
                        this.expect(actualName).to.equal(expectedName);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)'(?:st|th|nd|rd|) (row|history row) should contain '(.*)' (?:word|data)$/, function (rowNameOrNumber, rowType, expectedValue) {
        return __awaiter(this, void 0, void 0, function () {
            var marketSimulate, actualValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (parseInt(rowNameOrNumber)) {
                            rowNameOrNumber = rowNameOrNumber - 1;
                        }
                        if (!(expectedValue === 'correct')) return [3 /*break*/, 2];
                        if (!(rowNameOrNumber === 'Margin Requirement')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.backendHelper.getSimulateInformation(this.idMatcher.market[this.memory.marketName], this.memory.direction, this.memory.quantity)];
                    case 1:
                        marketSimulate = _a.sent();
                        expectedValue = marketSimulate.ActualTotalMarginRequirement !== 0 ? marketSimulate.ActualTotalMarginRequirement.toString() : '';
                        _a.label = 2;
                    case 2:
                        if (!(rowType === 'history row')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getRow(rowNameOrNumber).getHistoryValue()];
                    case 3:
                        actualValue = _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getRow(rowNameOrNumber).getValue()];
                    case 5:
                        actualValue = _a.sent();
                        _a.label = 6;
                    case 6:
                        this.expect(actualValue).to.equal(expectedValue);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(Date changed|Date opened)' row should contain correct date$/, function (dateType) {
        return __awaiter(this, void 0, void 0, function () {
            var isPosition, actualDate, dateFromBackend, expectedDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isPosition = dateType === 'Date opened';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getRow(dateType).getValue()];
                    case 1:
                        actualDate = _a.sent();
                        return [4 /*yield*/, this.backendHelper.getBackendMultiDataByName(this.memory.marketName, 'LastChangedDateTimeUTC', isPosition)];
                    case 2:
                        dateFromBackend = _a.sent();
                        expectedDate = this.moment(dateFromBackend[0]).utc().format('DD/MM/YYYY hh:mm:ss A (UTC)');
                        this.expect(actualDate).to.equal(expectedDate);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'Order ID' row should contain correct ID(?: for (trade|stop\/limit)|)$/, function (orderType) {
        return __awaiter(this, void 0, void 0, function () {
            var isPosition, actualID, idFromBackend, expectedID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isPosition = orderType === 'trade';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getRow('Order ID').getValue()];
                    case 1:
                        actualID = _a.sent();
                        actualID = parseInt(actualID);
                        return [4 /*yield*/, this.backendHelper.getBackendMultiDataByName(this.memory.marketName, 'OrderId', isPosition)];
                    case 2:
                        idFromBackend = _a.sent();
                        expectedID = idFromBackend[0];
                        this.expect(actualID).to.equal(expectedID);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' row should contain correct '(.+)' data form history$/, function (rowName, dataType) {
        return __awaiter(this, void 0, void 0, function () {
            var actualValue, expectedValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getRow(rowName).getHistoryValue()];
                    case 1:
                        actualValue = _a.sent();
                        expectedValue = this.memory.history[dataType];
                        if (dataType === 'ExecutedDateTimeUtc') {
                            expectedValue = this.moment(expectedValue).utc().format('DD/MM/YYYY hh:mm:ss A (UTC)');
                        }
                        if (dataType === 'OrderId' || dataType === 'TriggerPrice') {
                            actualValue = parseInt(actualValue);
                        }
                        this.expect(actualValue).to.equal(expectedValue);
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=details-panel-steps.js.map