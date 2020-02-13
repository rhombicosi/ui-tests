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
var protractor_1 = require("protractor");
cucumber_1.defineSupportCode(function (_a) {
    var Given = _a.Given, When = _a.When, Then = _a.Then;
    When(/^I add new tab$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.header.addNewTab()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I add new '(.+)' panel in '(.+)'(?:st|th|nd|rd|) tab$/, function (pan, tab) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(tab !== 'current')) return [3 /*break*/, 2];
                        if (parseInt(tab)) {
                            tab = tab * 1 - 1;
                        }
                        this.memory.currentTab = tab;
                        return [4 /*yield*/, this.basePage.currentBoard.header.getTab(tab).switchTo()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (parseInt(pan)) {
                            pan = pan - 1;
                        }
                        return [4 /*yield*/, this.basePage.waitLoading()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.header.getTab(this.memory.currentTab).addNewPan(pan)];
                    case 4:
                        _a.sent();
                        if (!!parseInt(pan)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel(pan)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    });
    When(/^I add '(.+)' Chart panels$/, function (panelsNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var _loop_1, this_1, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _loop_1 = function (i) {
                            var count;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this_1.basePage.currentBoard.header.getTab(this_1.memory.currentTab).getChartsNumber()];
                                    case 1:
                                        count = _a.sent();
                                        return [4 /*yield*/, this_1.basePage.currentBoard.header.getTab(this_1.memory.currentTab).clickButton('Chart')];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, protractor_1.browser.wait(function () { return __awaiter(_this, void 0, void 0, function () {
                                                var newCount;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, this.basePage.currentBoard.header.getTab(this.memory.currentTab).getChartsNumber()];
                                                        case 1:
                                                            newCount = _a.sent();
                                                            return [2 /*return*/, this.helper.sleepIfFalse(newCount > count, 300)];
                                                    }
                                                });
                                            }); }, 5000)];
                                    case 3:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < panelsNumber)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    When(/^I switch to '(.+)'(?:st|th|nd|rd|) workspace tab$/, function (tabNameOrNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (tabNameOrNumber === 'current market product') {
                            tabNameOrNumber = this.memory.marketName;
                        }
                        if (parseInt(tabNameOrNumber)) {
                            tabNameOrNumber = tabNameOrNumber * 1 - 1;
                        }
                        return [4 /*yield*/, this.basePage.waitLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.header.getTab(tabNameOrNumber).switchTo()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.basePage.waitLoading()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I type '(.+)' name workspace and save$/, function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.header.getTab(this.memory.currentTab).typeAndSaveWorkspaceName(name)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I expand dropdown in '(.+)'(?:st|th|nd|rd|) tab$/, function (tab) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(tab !== 'current')) return [3 /*break*/, 2];
                        if (parseInt(tab)) {
                            tab = tab * 1 - 1;
                        }
                        this.memory.currentTab = tab;
                        return [4 /*yield*/, this.basePage.currentBoard.header.getTab(this.memory.currentTab).switchTo()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.basePage.currentBoard.header.getTab(this.memory.currentTab).expandDropdown()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I click '(.+)' button in '(.+)'(?:st|th|nd|rd|) tab$/, function (element, tab) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(tab !== 'current')) return [3 /*break*/, 2];
                        if (parseInt(tab)) {
                            tab = tab * 1 - 1;
                        }
                        this.memory.currentTab = tab;
                        return [4 /*yield*/, this.basePage.currentBoard.header.getTab(tab).switchTo()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        element = element.toLowerCase();
                        _a = element;
                        switch (_a) {
                            case 'clear workspace': return [3 /*break*/, 3];
                            case 'show me': return [3 /*break*/, 5];
                            case 'grid view component': return [3 /*break*/, 7];
                            case 'edit icon': return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 11];
                    case 3: return [4 /*yield*/, this.basePage.currentBoard.header.getTab(this.memory.currentTab).clickClearButton()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 5: return [4 /*yield*/, this.basePage.currentBoard.header.getTab(this.memory.currentTab).clickShowMeButton()];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 7: return [4 /*yield*/, this.basePage.currentBoard.header.getTab(this.memory.currentTab).clickCloseComponentButton()];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 9: return [4 /*yield*/, this.basePage.currentBoard.header.getTab(this.memory.currentTab).clickEditIcon()];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        {
                            return [3 /*break*/, 12];
                        }
                        _b.label = 12;
                    case 12: return [2 /*return*/];
                }
            });
        });
    });
    When(/^I close '(.+)'(?:st|th|nd|rd|) tab$/, function (tab) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(tab !== 'current')) return [3 /*break*/, 2];
                        if (parseInt(tab)) {
                            tab = tab * 1 - 1;
                        }
                        this.memory.currentTab = tab;
                        return [4 /*yield*/, this.basePage.currentBoard.header.getTab(tab).switchTo()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.basePage.currentBoard.header.getTab(tab).closeTab()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)' (?:panel|button) is (active|disabled) in '(.+)'(?:st|th|nd|rd|) tab$/, function (pan, activity, tab) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedResult, actualResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(tab !== 'current')) return [3 /*break*/, 2];
                        if (parseInt(tab)) {
                            tab = tab * 1 - 1;
                        }
                        this.memory.currentTab = tab;
                        return [4 /*yield*/, this.basePage.currentBoard.header.getTab(tab).switchTo()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        expectedResult = activity.toLowerCase() === 'active';
                        if (parseInt(pan)) {
                            pan = pan - 1;
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.header.getTab(this.memory.currentTab).isPanelActive(pan)];
                    case 3:
                        actualResult = _a.sent();
                        this.expect(expectedResult).to.equal(actualResult);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^tabs count should be '(\d+)'$/, function (expectedCount) {
        return __awaiter(this, void 0, void 0, function () {
            var actualCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedCount = expectedCount * 1;
                        return [4 /*yield*/, this.basePage.currentBoard.header.getTabsNumber()];
                    case 1:
                        actualCount = _a.sent();
                        this.expect(actualCount).to.equal(expectedCount);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(.+)'(?:st|th|nd|rd|) tab should be (active|not active)$/, function (tabNameOrNumber, isActive) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedState, actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (tabNameOrNumber === 'previously added' || tabNameOrNumber === 'current' || tabNameOrNumber === 'current market product') {
                            tabNameOrNumber = this.memory.marketName;
                        }
                        else if (parseInt(tabNameOrNumber)) {
                            tabNameOrNumber = tabNameOrNumber - 1;
                        }
                        expectedState = isActive === 'active';
                        return [4 /*yield*/, this.basePage.waitLoading()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.header.getTab(tabNameOrNumber).isActive()];
                    case 2:
                        actualState = _a.sent();
                        this.expect(actualState).to.equal(expectedState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^'(\d+)'(?:st|th|nd|rd|) tab name should be '(.+)'$/, function (tabNameOrNumber, expectedMarketName) {
        return __awaiter(this, void 0, void 0, function () {
            var actualMarketName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tabNameOrNumber = tabNameOrNumber - 1;
                        if (expectedMarketName === 'from parent market' || expectedMarketName === 'previously added market') {
                            expectedMarketName = this.memory.marketName;
                        }
                        return [4 /*yield*/, this.basePage.currentBoard.header.getTab(tabNameOrNumber).getName()];
                    case 1:
                        actualMarketName = _a.sent();
                        this.expect(actualMarketName).to.equal(expectedMarketName);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the '(.+)' element is (visible|invisible) in '(.+)'(?:st|th|nd|rd|) tab$/, function (element, visibility, tab) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedResult, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = visibility.toLowerCase() === 'visible';
                        if (!(tab !== 'current')) return [3 /*break*/, 2];
                        if (parseInt(tab)) {
                            tab = tab * 1 - 1;
                        }
                        this.memory.currentTab = tab;
                        return [4 /*yield*/, this.basePage.currentBoard.header.getTab(tab).switchTo()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.basePage.currentBoard.header.getTab(this.memory.currentTab).isVisible(element)];
                    case 3:
                        result = _a.sent();
                        this.expect(result).to.equal(expectedResult);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^Charts number should be '(\d+|empty)'$/, function (chartsNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var actualFullName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.header.getTab(this.memory.currentTab).getButtonName('Chart')];
                    case 1:
                        actualFullName = _a.sent();
                        if (parseInt(chartsNumber)) {
                            this.expect(actualFullName).to.include(chartsNumber);
                        }
                        else {
                            this.expect(actualFullName).to.equal('Chart');
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=workspace-board-steps.js.map