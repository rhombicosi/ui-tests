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
    When(/^I click on '(.+)' (?:element|button|link) in search modal$/, function (elementName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.searchModal.click(elementName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I wait for markets loading$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.searchModal.waitForMarketsLoading()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I select '(Market|ProductType)' filter with value '(.+)'$/, function (filterType, filterValue) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.searchModal["select" + filterType + "Filter"](filterValue)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I switch ([Oo]n|[Oo]ff) 'Include options' toggle$/, function (state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.searchModal.setIncludeOptions(state)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I remember found markets number$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.memory;
                        return [4 /*yield*/, this.basePage.searchModal.getMarketsCount()];
                    case 1:
                        _a.searchMarketsAmount = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^Search modal should be (visible|not visible)$/, function (visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedState, actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedState = visibility === 'visible';
                        return [4 /*yield*/, this.basePage.searchModal.isVisible()];
                    case 1:
                        actualState = _a.sent();
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^[Ss]earch modal element '(.+)' should be (visible|not visible)$/, function (elementName, visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedState, actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedState = visibility === 'visible';
                        return [4 /*yield*/, this.basePage.searchModal.isElementVisible(elementName)];
                    case 1:
                        actualState = _a.sent();
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^[Ss]earch modal element '(.+)' text should be '(.+)'$/, function (elementName, expectedText) {
        return __awaiter(this, void 0, void 0, function () {
            var actualElementText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedText = expectedText.toLowerCase();
                        return [4 /*yield*/, this.basePage.searchModal.getElementText(elementName)];
                    case 1:
                        actualElementText = (_a.sent()).toLowerCase();
                        this.expect(actualElementText).to.equal(expectedText);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^Default displayed markets should be first '(\d+)' from Popular Markets$/, function (num) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedArray, actualArray, expectedNumber, actualNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.backendHelper.getMarketsParametersByTagId(152, parseInt(num))];
                    case 1:
                        expectedArray = _a.sent();
                        return [4 /*yield*/, this.basePage.searchModal.getAllMarketsTitles()];
                    case 2:
                        actualArray = _a.sent();
                        expectedNumber = expectedArray.length;
                        actualNumber = actualArray.length;
                        this.expect(actualNumber).to.equal(expectedNumber);
                        this.expect(actualArray.sort()).to.deep.equal(expectedArray.sort());
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^markets count should be (more|less|equal) (?:than|to) '(\d+|remembered)'$/, function (comparator, num) {
        return __awaiter(this, void 0, void 0, function () {
            var actualNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (num === 'remembered') {
                            num = this.memory.searchMarketsAmount;
                        }
                        num = parseInt(num);
                        return [4 /*yield*/, this.basePage.searchModal.getMarketsCount()];
                    case 1:
                        actualNumber = _a.sent();
                        if (comparator === 'equal') {
                            this.expect(actualNumber).to.equal(num);
                        }
                        else if (comparator === 'more') {
                            this.expect(actualNumber).to.be.above(num);
                        }
                        else {
                            this.expect(actualNumber).to.be.below(num);
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^all markets should contain '(.+)'$/, function (values) {
        return __awaiter(this, void 0, void 0, function () {
            var valuesArr, titlesArray;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        valuesArr = values.replace(/[ )(]/g, '').split('and');
                        return [4 /*yield*/, this.basePage.searchModal.getAllMarketsTitles()];
                    case 1:
                        titlesArray = _a.sent();
                        titlesArray.forEach(function (title) {
                            valuesArr.forEach(function (value) {
                                var strArr = value.split('or');
                                var arrOfStates = strArr.map(function (str) {
                                    if (str.match(/match\//)) {
                                        var strForRegexp = str.replace(/match\/(.+)\//, '$1');
                                        var regexp = new RegExp(strForRegexp);
                                        return !!title.match(regexp);
                                    }
                                    else {
                                        return title.replace(/[ )(]/g, '').toLowerCase().includes(str.toLowerCase());
                                    }
                                });
                                _this.expect(arrOfStates).to.include(true);
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^search modal dialogue header should be colored in '(black|gray)'$/, function (color) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedColorPart, actualColor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedColorPart = color === 'black' ? '72, 72, 72' : '238, 238, 238';
                        return [4 /*yield*/, this.basePage.searchModal.getHeaderBackground()];
                    case 1:
                        actualColor = _a.sent();
                        this.expect(actualColor).to.include(expectedColorPart);
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=search-modal-steps.js.map