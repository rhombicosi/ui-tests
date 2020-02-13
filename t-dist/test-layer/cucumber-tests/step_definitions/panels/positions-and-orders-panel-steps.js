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
var cucumber_1 = require("cucumber");
cucumber_1.defineSupportCode(function (_a) {
    var Given = _a.Given, When = _a.When, Then = _a.Then;
    When(/^I (?:select|am on the) '([Hh]istory|[Cc]urrent|[Pp]ositions|[Oo]rders|[Pp]osition [Hh]istory|[Oo]rder [Hh]istory|[Pp]rice [Aa]lerts)' (view|list)$/, function (itemName, type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(type === 'view')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.selectView(itemName)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.selectList(itemName)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Then(/^positions and orders panel header should contain items:$/, function (table) {
        return __awaiter(this, void 0, void 0, function () {
            var itemNames, itemNamesFromUi;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemNames = table.hashes().map(function (el) {
                            return el.itemName;
                        });
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getHeaderItemNames()];
                    case 1:
                        itemNamesFromUi = _a.sent();
                        this.expect(itemNames).to.deep.equal(itemNamesFromUi);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' item should be (active|not active)$/, function (itemName, cond) {
        return __awaiter(this, void 0, void 0, function () {
            var condition, is;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        condition = cond === 'active';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.isItemActive(itemName)];
                    case 1:
                        is = _a.sent();
                        this.expect(condition).to.equal(is);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' list should be (visible|not visible)$/, function (listName, cond) {
        return __awaiter(this, void 0, void 0, function () {
            var condition, is;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        condition = cond === 'visible';
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.isListVisible(listName)];
                    case 1:
                        is = _a.sent();
                        this.expect(condition).to.equal(is);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' market should be predefined with '(.+)'$/, function (name, expectedValue) {
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
    Then(/^'(.+)' panel table header should contain:$/, function (name, table) {
        return __awaiter(this, void 0, void 0, function () {
            var columnNames, columnNamesFromUi;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        columnNames = table.hashes().map(function (el) {
                            return el.columnName.toLowerCase();
                        });
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getColumnsName()];
                    case 1:
                        columnNamesFromUi = (_a.sent())
                            .map(function (n) { return n.toLowerCase(); });
                        this.expect(columnNamesFromUi).to.deep.equal(columnNames);
                        return [2 /*return*/];
                }
            });
        });
    });
    // tslint:disable-next-line:max-line-length
    Then(/^([Pp]osition [Hh]istory|[Oo]rder [Hh]istory) '(\d)'(?:st|th|nd|rd) table row with cell '(.+)' should contain correct '(.+)' data$/, function (typeHistory, rowNumber, cellName, memoryName) {
        return __awaiter(this, void 0, void 0, function () {
            var marketCellValue, expectedValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.currentList.getMarket(parseInt(rowNumber) - 1).getText(cellName)];
                    case 1:
                        marketCellValue = _a.sent();
                        switch (cellName.toLowerCase()) {
                            case 'date':
                            case 'last-edit':
                                expectedValue = this.moment(this.memory.history[memoryName]).utc().format('DD/MM/YYYY hh:mm:ss A (UTC)');
                                break;
                            case 'price':
                            case 'realised profit/loss':
                                marketCellValue = parseFloat(marketCellValue.replace(',', '')) ? parseFloat(marketCellValue.replace(',', '')) : null;
                                expectedValue = this.memory.history[memoryName];
                                break;
                            case 'quantity':
                                marketCellValue = parseFloat(marketCellValue.toLowerCase().match(/\d+,?\d*/)[0].replace(',', '')) ?
                                    parseFloat(marketCellValue.toLowerCase().match(/\d+,?\d*/)[0].replace(',', '')) : null;
                                expectedValue = this.memory.history[memoryName];
                                break;
                            case 'type':
                                expectedValue = this.orderApplicabilityEnum[this.memory.history[memoryName]];
                                break;
                            case 'status':
                                expectedValue = this.orderStatusEnum[this.memory.history[memoryName]];
                                break;
                            default:
                                expectedValue = this.memory.history[memoryName];
                        }
                        this.expect(marketCellValue).to.equal(expectedValue);
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=positions-and-orders-panel-steps.js.map