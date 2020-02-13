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
    When(/^I open '(.+)'(?:st|th|nd|rd|) item$/, function (itemNameOrNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.helpModal.getItem(itemNameOrNumber).click()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I go back$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.helpModal.clickBack()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I close help dialogue$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.helpModal.close()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)'(?:st|th|nd|rd|) section should contain items:$/, function (sectionNameOrNumber, table) {
        return __awaiter(this, void 0, void 0, function () {
            var actualArray, actualFixedArray, expectedArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (parseInt(sectionNameOrNumber)) {
                            sectionNameOrNumber = sectionNameOrNumber - 1;
                        }
                        return [4 /*yield*/, this.basePage.helpModal.getSection(sectionNameOrNumber).getItemsNames()];
                    case 1:
                        actualArray = _a.sent();
                        actualFixedArray = actualArray.map(function (t) { return t.toLowerCase(); });
                        expectedArray = table.raw().map(function (el) {
                            return el[0].toLowerCase();
                        });
                        this.expect(actualFixedArray).to.deep.equal(expectedArray);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(\d+)'(?:st|th|nd|rd|) section header should be '(.+)'$/, function (sectionNumber, expectedText) {
        return __awaiter(this, void 0, void 0, function () {
            var actualText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sectionNumber = sectionNumber - 1;
                        return [4 /*yield*/, this.basePage.helpModal.getSection(sectionNumber).getHeader()];
                    case 1:
                        actualText = _a.sent();
                        this.expect(actualText.toLowerCase()).to.equal(expectedText.toLowerCase());
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^dialogue header should be '(.+)'$/, function (expectedText) {
        return __awaiter(this, void 0, void 0, function () {
            var actualText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.helpModal.getHeader()];
                    case 1:
                        actualText = _a.sent();
                        this.expect(actualText.toLowerCase()).to.equal(expectedText.toLowerCase());
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^help dialogue (?:'(.+)'|) ?should be (visible|invisible)$/, function (elementName, visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedState, actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedState = visibility === 'visible';
                        if (!elementName) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.basePage.helpModal.isElementVisible(elementName)];
                    case 1:
                        actualState = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.basePage.helpModal.isVisible()];
                    case 3:
                        actualState = _a.sent();
                        _a.label = 4;
                    case 4:
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=help-modal-steps.js.map