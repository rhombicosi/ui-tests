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
    var Before = _a.Before, After = _a.After;
    Before('@delete-watchlist', function () {
        return this.backendHelper.deleteWatchlists()
            .then(function (num) {
            if (num > 0) {
                return protractor_1.browser.get(protractor_1.browser.baseUrl);
            }
        });
    });
    Before('@statements-and-contracts', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.browser.executeScript('window.sessionStorage.clear();')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.backendHelper.deleteSession()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.get(protractor_1.browser.baseUrl)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.loginPage.signIn('KL76429', 'password')];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.basePage.waitLoading()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.backendHelper.setSession()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    After('@default-resize-window', function () {
        return __awaiter(this, void 0, void 0, function () {
            var size;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        size = {
                            height: parseInt(process.env.npm_config_size.split(',')[1]),
                            width: parseInt(process.env.npm_config_size.split(',')[0]),
                        };
                        return [4 /*yield*/, protractor_1.browser.driver.manage().window().setSize(size.width, size.height)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    After('@delete-watchlist', function () {
        return this.backendHelper.deleteWatchlists()
            .catch(function (err) { return console.log(err.status + " error during watchlist deleting"); });
    });
    After('@account-details', function () {
        console.log(this.memory['password changed']);
        console.log(this.memory['new password']);
        if (this.memory['password changed']) {
            return this.backendHelper.changePassword(this.memory['new password'], 'password');
        }
    });
    After('@statements-and-contracts', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.browser.executeScript('window.sessionStorage.clear();')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.backendHelper.deleteSession()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.get(protractor_1.browser.baseUrl)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.loginPage.signIn(protractor_1.browser.params.login, protractor_1.browser.params.password)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.basePage.waitLoading()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.backendHelper.setSession()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=tagged-hooks.js.map