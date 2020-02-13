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
cucumber_1.defineSupportCode(function (_a) {
    var Given = _a.Given, When = _a.When, Then = _a.Then;
    When(/^I resize panel with:$/, function (table) {
        return __awaiter(this, void 0, void 0, function () {
            var height, width;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        height = table.rowsHash().height * 1;
                        width = table.rowsHash().width * 1;
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.setSize(height, width)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I close (?:'(.+)' |)panel$/, function (panelName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!panelName) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel(panelName).close()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.close()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    When(/^I get panel offset$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            var position, size;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getPosition()];
                    case 1:
                        position = _a.sent();
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getSize()];
                    case 2:
                        size = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I move panel to the '(top-right|top-left|bottom-right|bottom-left)' corner$/, function (corner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.setPosition(corner)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I make '(.+)' panel active$/, function (panelName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel(panelName).makeActive()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    When(/^I wait for '(.+)' panel loading(?:| during '(.+)')$/, function (panelName, timeout) {
        if (timeout === void 0) { timeout = '10000'; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        panelName = panelName.toLowerCase();
                        if (!(panelName === 'deal ticket')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel(panelName).waitReady(parseInt(timeout))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    });
    When(/^I move '(top|bot|left|right)' border '(\d+)' pixels? '(left|right|up|down)'(?: for '(.+)' panel|)$/, function (boarderPosition, pixels, direction, panelName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!panelName) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel(panelName).moveBoarder(boarderPosition, direction, pixels)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.moveBoarder(boarderPosition, direction, pixels)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    Then(/^I am on the '(.+)' component$/, function (componentName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.getNoPanelComponent(componentName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the (?:'|)([\w ]+|)(?:' |)(panel|no panel component) should be (visible|invisible)$/, function (componentName, componentType, visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedState, actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedState = visibility === 'visible';
                        if (!(componentName.toLowerCase() === 'chart in search modal')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel('chart').isChartVisible()];
                    case 1:
                        actualState = _a.sent();
                        return [3 /*break*/, 9];
                    case 2:
                        if (!componentName) return [3 /*break*/, 7];
                        if (!(componentType === 'panel')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel(componentName).isVisible()];
                    case 3:
                        actualState = _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.basePage.currentBoard.tabBody.getNoPanelComponent(componentName).isVisible()];
                    case 5:
                        actualState = _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.isVisible()];
                    case 8:
                        actualState = _a.sent();
                        _a.label = 9;
                    case 9:
                        this.expect(expectedState).to.equal(actualState);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the header of '(.+)' panel is '(.+)'$/, function (componentName, expectedPanName) {
        return __awaiter(this, void 0, void 0, function () {
            var headerName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(componentName.toLowerCase() === 'previously added' || componentName.toLowerCase() === 'current')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.getPanelHeaderName()];
                    case 1:
                        headerName = _a.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(componentName.toLowerCase() === 'chart in search modal')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel('chart').getMarketNameLabelText(true)];
                    case 3:
                        headerName = _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.basePage.currentBoard.tabBody.getPanel(componentName).getPanelHeaderName()];
                    case 5:
                        headerName = _a.sent();
                        _a.label = 6;
                    case 6:
                        if (expectedPanName === 'current market') {
                            expectedPanName = this.memory.marketName;
                        }
                        this.expect(headerName.toLowerCase()).to.include(expectedPanName.toLowerCase());
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the header no panel component of '(.+)' is '(.+)'$/, function (componentName, expectedPanName) {
        return __awaiter(this, void 0, void 0, function () {
            var headerName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.getNoPanelComponent(componentName)
                            .getNoPanelComponentHeaderName(componentName)];
                    case 1:
                        headerName = _a.sent();
                        this.expect(expectedPanName.toLowerCase()).to.equal(headerName.toLowerCase());
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^count of '(.+)' panels should be '(.+)'$/, function (componentName, countComponents) {
        return __awaiter(this, void 0, void 0, function () {
            var actualCount;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.browser.wait(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.getCountSamePanel(componentName)];
                                    case 1:
                                        actualCount = _a.sent();
                                        return [2 /*return*/, this.helper.sleepIfFalse(actualCount === parseInt(countComponents))];
                                }
                            });
                        }); }, 2000)
                            .then(function () { return null; }, function () { return null; })];
                    case 1:
                        _a.sent();
                        this.expect(parseInt(countComponents)).to.equal(actualCount);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the count of tabs should be '(.+)'$/, function (countTabs) {
        return __awaiter(this, void 0, void 0, function () {
            var actualCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.header.getTabsNumber()];
                    case 1:
                        actualCount = _a.sent();
                        this.expect(parseInt(countTabs)).to.equal(actualCount);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^the icon create new workspace is (visible|invisible)$/, function (visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var expectedResult, actualResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = visibility.toLowerCase() === 'visible';
                        return [4 /*yield*/, this.basePage.currentBoard.header.isCreateNewWorkspaceVisible()];
                    case 1:
                        actualResult = _a.sent();
                        this.expect(expectedResult).to.equal(actualResult);
                        return [2 /*return*/];
                }
            });
        });
    });
    Then(/^close button is available$/, function () {
        return __awaiter(this, void 0, void 0, function () {
            var actualState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.basePage.currentBoard.tabBody.currentPanel.isCloseAvailable()];
                    case 1:
                        actualState = _a.sent();
                        this.expect(actualState).to.equal(true);
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=panel-steps.js.map