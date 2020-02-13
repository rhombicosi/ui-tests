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
var rp = require("request-promise");
var protractor_1 = require("protractor");
var account_pool_1 = require("../../configs/data/account-pool");
exports.userCreator = {
    getSessionInforForAccountCreation: function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, cookie;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, protractor_1.browser.get("https://www1.applyforanaccount.com/testdemo")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, protractor_1.browser.getCurrentUrl()];
                    case 2:
                        url = _a.sent();
                        process.env.userCreationSessionKey = url.replace(/.*sessionKey=(.+)&.*/, '$1');
                        return [4 /*yield*/, protractor_1.browser.manage().getCookie('ASP.NET_SessionId')];
                    case 3:
                        cookie = _a.sent();
                        process.env.userCreationCookie = cookie.value;
                        return [2 /*return*/];
                }
            });
        });
    },
    getUserFromPool: function () {
        var username = account_pool_1.accounts[process.env.npm_config_env][process.env.npm_config_browser.replace('Headless', '')];
        return Promise.resolve()
            .then(function () {
            return { username: username, password: 'password', state: 'pool' };
        });
    },
    createUser: function () {
        var optionsSet = {
            optionsForAccountCreation: {
                method: 'POST',
                url: protractor_1.browser.params.accountCreationUrl + "/DemoStartForm/Input?sessionKey=" + process.env.userCreationSessionKey + "&form=testdemo&navigationDirection=Next&",
                headers: {
                    Connection: 'keep-alive',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Cookie: "ASP.NET_SessionId=" + process.env.userCreationCookie
                },
                body: "txtNavigationDirection=Next&aApplicationSourceStaffId=28&aProductCFD=true&aProductSpreadBetting=true&aDemoCurrencyId=6&aDemoCultureId=69&aTitle=4&aFirstName=test&aLastName=test&aMobileNumber=1234567890&aContactEmail=test%40gmail.com&aConfirmEmail=test%40gmail.com&aPassword=password&aConfirmPassword=password&aDemoAggreeDeclaration=true&aDemoAggreePrivacy=true"
            },
            optionsForGettingUserName: {
                method: 'GET',
                url: protractor_1.browser.params.accountCreationUrl + "/DemoThankYouForm/Input?sessionKey=" + process.env.userCreationSessionKey + "&formName=DemoThankYou&form=testdemo",
                headers: {
                    Connection: 'keep-alive',
                    Cookie: "ASP.NET_SessionId=" + process.env.userCreationCookie
                }
            },
        };
        return rp(optionsSet.optionsForAccountCreation)
            .then(null, function (err) {
            return rp(optionsSet.optionsForGettingUserName);
        })
            .then(function (body) {
            var username = body.match(/DA\d+/)[0];
            return { username: username, password: 'password', state: 'new' };
        }, function () { return null; });
    }
};
//# sourceMappingURL=user-creator.js.map