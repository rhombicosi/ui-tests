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
var protractor_1 = require("protractor");
var market_id_enum_1 = require("../emuns/market-id.enum");
var rp = require("request-promise");
var request = require("request");
var lightstreamer = require("./lightstreamer-helper");
var helper_1 = require("./helper");
exports.backendHelper = {
    session: null,
    account: null,
    getSession: function () {
        return __awaiter(this, void 0, void 0, function () {
            var parsedSession;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.session) return [3 /*break*/, 4];
                        parsedSession = null;
                        return [4 /*yield*/, protractor_1.browser.executeScript('return window.sessionStorage.getItem("web_trader_session");')];
                    case 1:
                        parsedSession = _a.sent();
                        if (!!parsedSession) return [3 /*break*/, 3];
                        return [4 /*yield*/, protractor_1.browser.executeScript('return window.localStorage.getItem("web_trader_session");')];
                    case 2:
                        parsedSession = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!parsedSession) {
                            throw new Error("Can't get session");
                        }
                        this.session = JSON.parse(parsedSession);
                        return [2 /*return*/, this.session];
                    case 4: return [2 /*return*/, this.session];
                }
            });
        });
    },
    getAccount: function () {
        return __awaiter(this, void 0, void 0, function () {
            var parsedAccount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.account) return [3 /*break*/, 4];
                        parsedAccount = null;
                        return [4 /*yield*/, protractor_1.browser.executeScript('return window.sessionStorage.getItem("web_trader_account");')];
                    case 1:
                        parsedAccount = _a.sent();
                        if (!!parsedAccount) return [3 /*break*/, 3];
                        return [4 /*yield*/, protractor_1.browser.executeScript('return window.localStorage.getItem("web_trader_account");')];
                    case 2:
                        parsedAccount = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!parsedAccount) {
                            throw new Error("Can't get session");
                        }
                        this.account = JSON.parse(parsedAccount);
                        return [2 /*return*/, this.account];
                    case 4: return [2 /*return*/, this.account];
                }
            });
        });
    },
    setSession: function () {
        return __awaiter(this, void 0, void 0, function () {
            var parsedSession;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parsedSession = null;
                        return [4 /*yield*/, protractor_1.browser.executeScript('return window.sessionStorage.getItem("web_trader_session");')];
                    case 1:
                        parsedSession = _a.sent();
                        if (!!parsedSession) return [3 /*break*/, 3];
                        return [4 /*yield*/, protractor_1.browser.executeScript('return window.localStorage.getItem("web_trader_session");')];
                    case 2:
                        parsedSession = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!parsedSession) {
                            throw new Error("Can't get session");
                        }
                        this.session = JSON.parse(parsedSession);
                        return [2 /*return*/, this.session];
                }
            });
        });
    },
    setAccount: function () {
        return __awaiter(this, void 0, void 0, function () {
            var parsedAccount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parsedAccount = null;
                        return [4 /*yield*/, protractor_1.browser.executeScript('return window.sessionStorage.getItem("web_trader_account");')];
                    case 1:
                        parsedAccount = _a.sent();
                        if (!!parsedAccount) return [3 /*break*/, 3];
                        return [4 /*yield*/, protractor_1.browser.executeScript('return window.localStorage.getItem("web_trader_account");')];
                    case 2:
                        parsedAccount = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!parsedAccount) {
                            throw new Error("Can't get session");
                        }
                        this.account = JSON.parse(parsedAccount);
                        return [2 /*return*/, this.account];
                }
            });
        });
    },
    getActiveOrders: function () {
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl, parsedSession, options, ordersBody;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseUrl = protractor_1.browser.params.tradingApiUrl;
                        return [4 /*yield*/, this.getSession()];
                    case 1:
                        parsedSession = _a.sent();
                        options = {
                            method: 'POST',
                            url: baseUrl + "/order/activeorders",
                            headers: {
                                Connection: 'keep-alive',
                                'Content-Type': 'application/json',
                                UserName: parsedSession['username'],
                                Session: parsedSession['sessionKey']
                            },
                            body: "{}"
                        };
                        return [4 /*yield*/, rp(options)];
                    case 2:
                        ordersBody = _a.sent();
                        return [2 /*return*/, JSON.parse(ordersBody)];
                }
            });
        });
    },
    resetClientPreferences: function () {
        var baseUrl = protractor_1.browser.params.tradingApiUrl;
        var keysForDelete = ['MERCURY_LAYOUT', 'mercury_helptip_number', 'MARKET_QUANTITIES'];
        return this.getSession()
            .then(function (parsedSession) {
            if (parsedSession) {
                keysForDelete.forEach(function (key) {
                    var options = {
                        method: 'POST',
                        url: baseUrl + "/clientpreference/delete",
                        headers: {
                            'Content-Type': 'application/json',
                            UserName: parsedSession['username'],
                            Session: parsedSession['sessionKey']
                        },
                        body: "{ 'Key': '" + key + "' }"
                    };
                    request(options);
                });
            }
        }, function (error) {
            console.error(error);
        });
    },
    setClientPreferenece: function (preference, value) {
        var baseUrl = protractor_1.browser.params.tradingApiUrl;
        return this.getSession()
            .then(function (parsedSession) {
            if (parsedSession) {
                var options = {
                    method: 'POST',
                    url: baseUrl + "/clientpreference/save",
                    headers: {
                        'Content-Type': 'application/json',
                        UserName: parsedSession['username'],
                        Session: parsedSession['sessionKey']
                    },
                    body: JSON.stringify({
                        ClientPreference: {
                            Key: preference,
                            Value: value
                        }
                    })
                };
                request(options);
            }
        }, function (error) {
            console.error(error);
        });
    },
    changePassword: function (oldPassword, newPassword) {
        var baseUrl = protractor_1.browser.params.tradingApiUrl;
        return this.getSession()
            .then(function (parsedSession) {
            if (parsedSession) {
                var options = {
                    method: 'POST',
                    url: baseUrl + "/session/changePassword",
                    headers: {
                        'Content-Type': 'application/json',
                        UserName: parsedSession['username'],
                        Session: parsedSession['sessionKey']
                    },
                    body: JSON.stringify({
                        NewPassword: newPassword,
                        Password: oldPassword,
                        Username: parsedSession['username']
                    })
                };
                if (parsedSession) {
                    return rp(options);
                }
            }
        })
            .then(function (body) {
            return JSON.parse(body).IsPasswordChanged;
        })
            .catch(function (error) {
            console.log(error);
        });
    },
    changeUserAccountEmail: function (email) {
        var baseUrl = protractor_1.browser.params.tradingApiUrl;
        return this.getSession()
            .then(function (parsedSession) {
            if (parsedSession) {
                var options = {
                    method: 'POST',
                    url: baseUrl + "/useraccount/Save",
                    headers: {
                        'Content-Type': 'application/json',
                        UserName: parsedSession['username'],
                        Session: parsedSession['sessionKey']
                    },
                    body: JSON.stringify({
                        PersonalEmailAddress: email,
                        PersonalEmailAddressIsDirty: true
                    })
                };
                if (parsedSession) {
                    return rp(options);
                }
            }
        })
            .catch(function (error) {
            console.log(error);
        });
    },
    getClientAndTradingAccount: function () {
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl;
            var _this = this;
            return __generator(this, function (_a) {
                baseUrl = protractor_1.browser.params.tradingApiUrl;
                return [2 /*return*/, Promise.resolve()
                        .then(function () { return _this.getSession(); })
                        .then(function (parsedSession) {
                        var options = {
                            method: 'GET',
                            url: baseUrl + "/useraccount/ClientAndTradingAccount",
                            headers: {
                                'Content-Type': 'application/json',
                                UserName: parsedSession['username'],
                                Session: parsedSession['sessionKey']
                            }
                        };
                        if (parsedSession) {
                            return rp(options);
                        }
                    })
                        .then(function (body) {
                        return JSON.parse(body);
                    })
                        .catch(function (error) {
                        console.log(error);
                    })];
            });
        });
    },
    getClientApplicationMessageTranslationWithInterestingItems: function (clientApplicationId, cultureId, accountOperatorId, interestedTranslationKeys) {
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl;
            var _this = this;
            return __generator(this, function (_a) {
                baseUrl = protractor_1.browser.params.tradingApiUrl;
                return [2 /*return*/, Promise.resolve()
                        .then(function () { return _this.getSession(); })
                        .then(function (parsedSession) {
                        var options = {
                            method: 'POST',
                            url: baseUrl + "/message/translationWithInterestingItems",
                            headers: {
                                'Content-Type': 'application/json',
                                UserName: parsedSession['username'],
                                Session: parsedSession['sessionKey']
                            },
                            body: JSON.stringify({
                                ClientApplicationId: clientApplicationId,
                                CultureId: cultureId,
                                AccountOperatorId: accountOperatorId,
                                InterestedTranslationKeys: interestedTranslationKeys
                            })
                        };
                        if (parsedSession) {
                            return rp(options);
                        }
                    })
                        .then(function (body) {
                        return JSON.parse(body).TranslationKeyValuePairs;
                    })
                        .catch(function (error) {
                        console.log(error);
                    })];
            });
        });
    },
    getMarketInformation: function (marketId) {
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl;
            var _this = this;
            return __generator(this, function (_a) {
                baseUrl = protractor_1.browser.params.tradingApiUrl;
                return [2 /*return*/, Promise.resolve()
                        .then(function () { return _this.getSession(); })
                        .then(function (parsedSession) {
                        var options = {
                            method: 'GET',
                            url: baseUrl + "/market/" + marketId + "/information",
                            headers: {
                                'Content-Type': 'application/json',
                                UserName: parsedSession['username'],
                                Session: parsedSession['sessionKey']
                            }
                        };
                        if (parsedSession) {
                            return rp(options);
                        }
                    })
                        .then(function (body) {
                        return JSON.parse(body).MarketInformation;
                    })
                        .catch(function (error) {
                        console.log(error);
                    })];
            });
        });
    },
    getMarketExtendedInfo: function (marketId) {
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl, parsedSession, options, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseUrl = protractor_1.browser.params.tradingApiUrl;
                        return [4 /*yield*/, this.getSession()];
                    case 1:
                        parsedSession = _a.sent();
                        options = {
                            method: 'GET',
                            url: baseUrl + "/market/" + marketId + "/informationextended",
                            headers: {
                                'Content-Type': 'application/json',
                                UserName: parsedSession['username'],
                                Session: parsedSession['sessionKey']
                            }
                        };
                        return [4 /*yield*/, rp(options)];
                    case 2:
                        body = _a.sent();
                        return [2 /*return*/, JSON.parse(body)];
                }
            });
        });
    },
    getMarginInfo: function () {
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl, parsedSession, options, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseUrl = protractor_1.browser.params.tradingApiUrl;
                        return [4 /*yield*/, this.getSession()];
                    case 1:
                        parsedSession = _a.sent();
                        options = {
                            method: 'GET',
                            url: baseUrl + "/margin/ClientAccountMargin",
                            headers: {
                                'Content-Type': 'application/json',
                                UserName: parsedSession['username'],
                                Session: parsedSession['sessionKey']
                            }
                        };
                        return [4 /*yield*/, rp(options)];
                    case 2:
                        body = _a.sent();
                        return [2 /*return*/, JSON.parse(body)];
                }
            });
        });
    },
    getSimulateInformation: function (marketId, direction, quantity) {
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl, parsedSession, marketTypeId, parsedAccount, accPosition, options, _a, _b, _c, _d, body;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        baseUrl = protractor_1.browser.params.tradingApiUrl;
                        return [4 /*yield*/, this.getSession()];
                    case 1:
                        parsedSession = _e.sent();
                        return [4 /*yield*/, this.getMarketExtendedInfo(marketId)];
                    case 2:
                        marketTypeId = (_e.sent()).MarketInformation.MarketSettingsTypeId;
                        return [4 /*yield*/, this.getAccount()];
                    case 3:
                        parsedAccount = _e.sent();
                        accPosition = marketTypeId === 1 ? 1 : 0;
                        lightstreamer.subscribe(marketId);
                        _a = {
                            method: 'POST',
                            url: baseUrl + "/order/simulate/newtradeorder",
                            headers: {
                                'Content-Type': 'application/json',
                                UserName: parsedSession['username'],
                                Session: parsedSession['sessionKey']
                            }
                        };
                        _c = (_b = JSON).stringify;
                        _d = {};
                        return [4 /*yield*/, lightstreamer.addListener('Bid')];
                    case 4:
                        _d.BidPrice = _e.sent(),
                            _d.Direction = direction,
                            _d.IfDone = [],
                            _d.MarketId = marketId;
                        return [4 /*yield*/, lightstreamer.addListener('Offer')];
                    case 5:
                        options = (_a.body = _c.apply(_b, [(_d.OfferPrice = _e.sent(),
                                _d.PositionMethodId = 1,
                                _d.Quantity = quantity,
                                _d.TradingAccountId = parsedAccount.TradingAccounts[accPosition].TradingAccountId,
                                _d)]),
                            _a);
                        return [4 /*yield*/, rp(options)];
                    case 6:
                        body = _e.sent();
                        return [2 /*return*/, JSON.parse(body)];
                }
            });
        });
    },
    getMarketsNamesByTagName: function (tagName, num) {
        var _this = this;
        var baseUrl = protractor_1.browser.params.tradingApiUrl;
        var parsedSession;
        return Promise.resolve()
            .then(function () { return _this.getSession(); })
            .then(function (ps) {
            parsedSession = ps;
            var options = {
                method: 'GET',
                url: baseUrl + "/market/taglookup",
                headers: {
                    'Content-Type': 'application/json',
                    UserName: parsedSession['username'],
                    Session: parsedSession['sessionKey']
                }
            };
            if (parsedSession) {
                return rp(options);
            }
        })
            .then(function (body) {
            var bodyObj = JSON.parse(body);
            var popMarketId = bodyObj.Tags.filter(function (tag) {
                return tag.Name === tagName;
            })[0].MarketTagId;
            var options2 = {
                method: 'GET',
                url: baseUrl + "/market/fullsearchwithtags?tagId=" + popMarketId + "&maxResults=" + num + "&" +
                    "query=&spreadProductType=true&cfdProductType=true&includeOptions=true",
                headers: {
                    'Content-Type': 'application/json',
                    UserName: parsedSession['username'],
                    Session: parsedSession['sessionKey']
                }
            };
            return rp(options2);
        })
            .then(function (body) {
            var bodyObj = JSON.parse(body);
            return bodyObj.MarketInformation.map(function (market) {
                return market.Name;
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    },
    getMarketsParametersByTagId: function (tagId, num, parameter) {
        var _this = this;
        if (parameter === void 0) { parameter = 'Name'; }
        var baseUrl = protractor_1.browser.params.tradingApiUrl;
        return Promise.resolve()
            .then(function () { return _this.getSession(); })
            .then(function (parsedSession) {
            var options = {
                method: 'GET',
                url: baseUrl + "/market/fullsearchwithtags?tagId=" + tagId + "&maxResults=" + num + "&" +
                    "query=&spreadProductType=true&cfdProductType=true&includeOptions=true",
                headers: {
                    'Content-Type': 'application/json',
                    UserName: parsedSession['username'],
                    Session: parsedSession['sessionKey']
                }
            };
            if (parsedSession) {
                return rp(options);
            }
        })
            .then(function (body) {
            var bodyObj = JSON.parse(body);
            return bodyObj.MarketInformation.map(function (market) {
                return market[parameter];
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    },
    getMarketsNamesByQuery: function (tagId, num, query, spread, cfd, includeOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl, body, parsedSession, options, bodyObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseUrl = protractor_1.browser.params.tradingApiUrl;
                        return [4 /*yield*/, this.getSession()];
                    case 1:
                        parsedSession = _a.sent();
                        options = {
                            method: 'GET',
                            url: baseUrl + "/market/fullsearchwithtags?query=" + query + "&tagId=" + tagId + "&maxResults=" + num + "&" +
                                ("searchByMarketCode=true&searchByMarketName=true&spreadProductType=" + spread + "&cfdProductType=" + cfd + "&") +
                                ("quebinaryProductTypery=true&includeOptions=" + includeOptions + "&useMobileShortName=false"),
                            headers: {
                                'Content-Type': 'application/json',
                                UserName: parsedSession['username'],
                                Session: parsedSession['sessionKey']
                            }
                        };
                        if (!parsedSession) return [3 /*break*/, 3];
                        return [4 /*yield*/, rp(options)];
                    case 2:
                        body = _a.sent();
                        _a.label = 3;
                    case 3:
                        try {
                            bodyObj = JSON.parse(body);
                            return [2 /*return*/, bodyObj.MarketInformation];
                        }
                        catch (err) {
                            console.log(err);
                            return [2 /*return*/];
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    getMarketsInformation: function (tagId, num, includeOptions) {
        var _this = this;
        if (includeOptions === void 0) { includeOptions = 'false'; }
        var baseUrl = protractor_1.browser.params.tradingApiUrl;
        return Promise.resolve()
            .then(function () { return _this.getSession(); })
            .then(function (parsedSession) {
            var options = {
                method: 'GET',
                url: baseUrl + "/market/fullsearchwithtags?tagId=" + tagId + "&maxResults=" + num + "&" +
                    ("query=&spreadProductType=true&cfdProductType=true&includeOptions=" + includeOptions),
                headers: {
                    'Content-Type': 'application/json',
                    UserName: parsedSession['username'],
                    Session: parsedSession['sessionKey']
                }
            };
            if (parsedSession) {
                return rp(options);
            }
        })
            .then(function (body) {
            var bodyObj = JSON.parse(body);
            return bodyObj.MarketInformation;
        })
            .catch(function (err) {
            console.log(err);
        });
    },
    getMarketsNews: function (tagId) {
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl, body, parsedSession, options, bodyObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseUrl = protractor_1.browser.params.tradingApiUrl;
                        return [4 /*yield*/, this.getSession()];
                    case 1:
                        parsedSession = _a.sent();
                        options = {
                            method: 'GET',
                            url: baseUrl + "/news/marketreportheadlines?marketId=" + tagId + "&cultureId=69&maxResults=50",
                            headers: {
                                'Content-Type': 'application/json',
                                UserName: parsedSession['username'],
                                Session: parsedSession['sessionKey']
                            }
                        };
                        if (!parsedSession) return [3 /*break*/, 3];
                        return [4 /*yield*/, rp(options)];
                    case 2:
                        body = _a.sent();
                        _a.label = 3;
                    case 3:
                        try {
                            bodyObj = JSON.parse(body);
                            return [2 /*return*/, bodyObj.Headlines.map(function (news) {
                                    // it's necessary to replace all HTML mnemonics from http-response
                                    return news['Headline'].trim().replace('amp;', '').replace('&apos;', '\'').split('&quot;').join('\"');
                                })];
                        }
                        catch (err) {
                            console.log(err);
                            return [2 /*return*/];
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    getAllWatchlists: function () {
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl, body, parsedSession, options, allwatchlists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseUrl = protractor_1.browser.params.tradingApiUrl;
                        return [4 /*yield*/, this.getSession()];
                    case 1:
                        parsedSession = _a.sent();
                        options = {
                            method: 'GET',
                            url: baseUrl + "/watchlists",
                            headers: {
                                'Content-Type': 'application/json',
                                UserName: parsedSession['username'],
                                Session: parsedSession['sessionKey']
                            }
                        };
                        if (!parsedSession) return [3 /*break*/, 3];
                        return [4 /*yield*/, rp(options)];
                    case 2:
                        body = _a.sent();
                        _a.label = 3;
                    case 3:
                        try {
                            allwatchlists = JSON.parse(body).ClientAccountWatchlists
                                .map(function (watchlist) { return watchlist['WatchlistDescription']; });
                            allwatchlists.push('Popular Markets');
                            return [2 /*return*/, allwatchlists];
                        }
                        catch (err) {
                            console.log(err);
                            return [2 /*return*/];
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    getTagLookup: function () {
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl, body, parsedSession, options, bodyObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseUrl = protractor_1.browser.params.tradingApiUrl;
                        return [4 /*yield*/, this.getSession()];
                    case 1:
                        parsedSession = _a.sent();
                        options = {
                            method: 'GET',
                            url: baseUrl + "/market/taglookup",
                            headers: {
                                'Content-Type': 'application/json',
                                UserName: parsedSession['username'],
                                Session: parsedSession['sessionKey']
                            }
                        };
                        if (!parsedSession) return [3 /*break*/, 3];
                        return [4 /*yield*/, rp(options)];
                    case 2:
                        body = _a.sent();
                        _a.label = 3;
                    case 3:
                        try {
                            bodyObj = JSON.parse(body);
                            return [2 /*return*/, bodyObj.Tags];
                        }
                        catch (err) {
                            console.log(err);
                            return [2 /*return*/];
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    deleteWatchlists: function () {
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl, parsedSession;
            var _this = this;
            return __generator(this, function (_a) {
                baseUrl = protractor_1.browser.params.tradingApiUrl;
                return [2 /*return*/, Promise.resolve()
                        .then(function () { return _this.getSession(); })
                        .then(function (ps) {
                        parsedSession = ps;
                        var options = {
                            method: 'GET',
                            url: baseUrl + "/watchlists",
                            headers: {
                                'Content-Type': 'application/json',
                                UserName: parsedSession['username'],
                                Session: parsedSession['sessionKey']
                            }
                        };
                        if (parsedSession) {
                            return rp(options);
                        }
                    })
                        .then(function (body) {
                        var arrayPromises = [];
                        var bodyObj = JSON.parse(body);
                        bodyObj['ClientAccountWatchlists'].forEach(function (watchlist) {
                            var options = {
                                method: 'POST',
                                url: baseUrl + "/watchlist/delete",
                                headers: {
                                    'Content-Type': 'application/json',
                                    UserName: parsedSession['username'],
                                    Session: parsedSession['sessionKey']
                                },
                                body: "{}"
                            };
                            options.body = JSON.stringify({
                                WatchlistId: watchlist['WatchlistId']
                            });
                            arrayPromises.push(rp(options));
                        });
                        return Promise.all(arrayPromises)
                            .then(function () { return bodyObj['ClientAccountWatchlists'].length; }, function (err) { return console.log(err.message); });
                    })];
            });
        });
    },
    deletePositionsByMarketName: function (marketName) {
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl, parsedSession, options, ordersBodyObj, activeOrdersFromBody, iterator, deleteAllWithChecking;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseUrl = protractor_1.browser.params.tradingApiUrl;
                        return [4 /*yield*/, this.getSession()];
                    case 1:
                        parsedSession = _a.sent();
                        options = {
                            method: 'POST',
                            url: null,
                            headers: {
                                Connection: 'keep-alive',
                                'Content-Type': 'application/json',
                                UserName: parsedSession['username'],
                                Session: parsedSession['sessionKey']
                            },
                            body: "{}"
                        };
                        return [4 /*yield*/, this.getActiveOrders()];
                    case 2:
                        ordersBodyObj = _a.sent();
                        activeOrdersFromBody = ordersBodyObj.ActiveOrders.filter(function (order) {
                            if (order.TradeOrder) {
                                return order.TradeOrder.MarketId === market_id_enum_1.idMatcher.market[marketName];
                            }
                        });
                        iterator = 0;
                        deleteAllWithChecking = function (activeOrders) { return __awaiter(_this, void 0, void 0, function () {
                            var promises, multiplier, ordersBodyObjNew, activeOrdersFromBodyNew;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        promises = [];
                                        multiplier = parseFloat((Math.random() * 0.02 + 1.00).toFixed(4));
                                        activeOrders.forEach(function (order) {
                                            var bidPrice;
                                            var offerPrice;
                                            if (order.TradeOrder.Direction === 'sell') {
                                                bidPrice = order.TradeOrder.Price;
                                                offerPrice = parseFloat((order.TradeOrder.Price * multiplier).toPrecision(6));
                                            }
                                            else {
                                                bidPrice = parseFloat((order.TradeOrder.Price / multiplier).toPrecision(6));
                                                offerPrice = order.TradeOrder.Price;
                                            }
                                            options.url = baseUrl + "/order/newtradeorder";
                                            options.body = JSON.stringify({
                                                MarketId: order.TradeOrder.MarketId,
                                                Direction: order.TradeOrder.Direction === 'sell' ? 'buy' : 'sell',
                                                Close: [order.TradeOrder.OrderId],
                                                Quantity: order.TradeOrder.Quantity,
                                                BidPrice: bidPrice,
                                                OfferPrice: offerPrice,
                                                TradingAccountId: order.TradeOrder.TradingAccountId
                                            });
                                            promises.push(rp(options));
                                        });
                                        return [4 /*yield*/, Promise.all(promises)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, this.getActiveOrders()];
                                    case 2:
                                        ordersBodyObjNew = _a.sent();
                                        activeOrdersFromBodyNew = ordersBodyObjNew.ActiveOrders.filter(function (order) {
                                            if (order.TradeOrder) {
                                                return order.TradeOrder.MarketId === market_id_enum_1.idMatcher.market[marketName];
                                            }
                                        });
                                        if (!(activeOrdersFromBodyNew.length > 0 && iterator < 5)) return [3 /*break*/, 5];
                                        iterator += 1;
                                        return [4 /*yield*/, helper_1.helper.sleep(3000)];
                                    case 3:
                                        _a.sent();
                                        console.log("Trying to delete the market attempt " + (iterator + 1));
                                        return [4 /*yield*/, deleteAllWithChecking(activeOrdersFromBodyNew)];
                                    case 4:
                                        _a.sent();
                                        _a.label = 5;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, deleteAllWithChecking(activeOrdersFromBody)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    deleteOrdersByMarketName: function (marketName) {
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl, parsedSession, options, ordersBodyObj, activeOrdersFromBody, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseUrl = protractor_1.browser.params.tradingApiUrl;
                        return [4 /*yield*/, this.getSession()];
                    case 1:
                        parsedSession = _a.sent();
                        options = {
                            method: 'POST',
                            url: null,
                            headers: {
                                Connection: 'keep-alive',
                                'Content-Type': 'application/json',
                                UserName: parsedSession['username'],
                                Session: parsedSession['sessionKey']
                            },
                            body: "{}"
                        };
                        return [4 /*yield*/, this.getActiveOrders()];
                    case 2:
                        ordersBodyObj = _a.sent();
                        activeOrdersFromBody = ordersBodyObj.ActiveOrders.filter(function (order) {
                            if (order.StopLimitOrder) {
                                return order.StopLimitOrder.MarketId === market_id_enum_1.idMatcher.market[marketName];
                            }
                        });
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < activeOrdersFromBody.length)) return [3 /*break*/, 6];
                        options.url = baseUrl + "/order/cancel";
                        options.body = JSON.stringify({
                            OrderId: activeOrdersFromBody[i].StopLimitOrder.OrderId,
                            TradingAccountId: activeOrdersFromBody[i].StopLimitOrder.TradingAccountId
                        });
                        return [4 /*yield*/, Promise.resolve()
                                .then(function () { return rp(options); })
                                .catch(function (err) {
                                console.log("Can't delete order. Error statuse code: " + err);
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i += 1;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    getPositionHistory: function (maxResults, accType) {
        return __awaiter(this, void 0, void 0, function () {
            var parsedSession, parsedAccount, accPosition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSession()];
                    case 1:
                        parsedSession = _a.sent();
                        return [4 /*yield*/, this.getAccount()];
                    case 2:
                        parsedAccount = _a.sent();
                        accPosition = accType === 'DFT' ? 1 : 0;
                        return [2 /*return*/, Promise.resolve()
                                .then(function () {
                                var baseUrl = protractor_1.browser.params.tradingApiUrl;
                                var tradingAccountId = parsedAccount.TradingAccounts[accPosition].TradingAccountId;
                                var options = {
                                    method: 'GET',
                                    url: baseUrl + "/order/tradehistory?TradingAccountId=" + tradingAccountId + "&MaxResults=" + maxResults,
                                    headers: {
                                        'Content-Type': 'application/json',
                                        UserName: parsedSession['username'],
                                        Session: parsedSession['sessionKey']
                                    }
                                };
                                if (parsedSession) {
                                    return rp(options);
                                }
                            })
                                .then(function (data) { return JSON.parse(data)['TradeHistory']; })
                                .catch(function (error) {
                                console.error(error);
                            })];
                }
            });
        });
    },
    getOrderHistory: function (maxResults, accType) {
        return __awaiter(this, void 0, void 0, function () {
            var parsedSession, parsedAccount, accPosition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSession()];
                    case 1:
                        parsedSession = _a.sent();
                        return [4 /*yield*/, this.getAccount()];
                    case 2:
                        parsedAccount = _a.sent();
                        accPosition = accType === 'DFT' ? 1 : 0;
                        return [2 /*return*/, Promise.resolve()
                                .then(function () {
                                var baseUrl = protractor_1.browser.params.tradingApiUrl;
                                var tradingAccountId = parsedAccount.TradingAccounts[accPosition].TradingAccountId;
                                var options = {
                                    method: 'GET',
                                    url: baseUrl + "/order/stoplimitorderhistory?TradingAccountId=" + tradingAccountId + "&MaxResults=" + maxResults,
                                    headers: {
                                        'Content-Type': 'application/json',
                                        UserName: parsedSession['username'],
                                        Session: parsedSession['sessionKey']
                                    }
                                };
                                if (parsedSession) {
                                    return rp(options);
                                }
                            })
                                .then(function (data) { return JSON.parse(data)['StopLimitOrderHistory']; })
                                .catch(function (error) {
                                console.error(error);
                            })];
                }
            });
        });
    },
    addNewPosition: function (marketName, direction, quantity, bidPrice, offerPrice, ifDone) {
        if (ifDone === void 0) { ifDone = []; }
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl, parsedSession, parsedAccount, tradingAccountId, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseUrl = protractor_1.browser.params.tradingApiUrl;
                        return [4 /*yield*/, this.getSession()];
                    case 1:
                        parsedSession = _a.sent();
                        return [4 /*yield*/, this.getAccount()];
                    case 2:
                        parsedAccount = _a.sent();
                        tradingAccountId = parsedAccount.TradingAccounts.filter(function (acc) {
                            if (marketName.indexOf('DFT') !== -1 || marketName.indexOf('Spread') !== -1) {
                                return acc.TradingAccountType === 'Spread Betting';
                            }
                            else {
                                return acc.TradingAccountType === 'CFD';
                            }
                        })[0].TradingAccountId;
                        options = {
                            method: 'POST',
                            url: baseUrl + "/order/newtradeorder",
                            headers: {
                                'Content-Type': 'application/json',
                                UserName: parsedSession['username'],
                                Session: parsedSession['sessionKey']
                            },
                            body: JSON.stringify({
                                MarketId: market_id_enum_1.idMatcher.market[marketName],
                                Direction: direction,
                                Quantity: quantity,
                                BidPrice: parseFloat(bidPrice),
                                OfferPrice: parseFloat(offerPrice),
                                TradingAccountId: tradingAccountId,
                                PositionMethodId: 1,
                                IfDone: ifDone
                            })
                        };
                        return [4 /*yield*/, rp(options)
                                .then(function (resp) {
                                if (JSON.parse(resp).OrderId === 0) {
                                    console.log("Position haven't been created form first attempt. Try again");
                                    return helper_1.helper.sleep(10000)
                                        .then(function () { return rp(options); });
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    addNewOrder: function (marketName, direction, orderPrice, quantity, bidPrice, offerPrice, ifDone) {
        if (ifDone === void 0) { ifDone = []; }
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl, parsedSession, parsedAccount, tradingAccountId, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseUrl = protractor_1.browser.params.tradingApiUrl;
                        return [4 /*yield*/, this.getSession()];
                    case 1:
                        parsedSession = _a.sent();
                        return [4 /*yield*/, this.getAccount()];
                    case 2:
                        parsedAccount = _a.sent();
                        tradingAccountId = parsedAccount.TradingAccounts.filter(function (acc) {
                            if (marketName.indexOf('DFT') !== -1 || marketName.indexOf('Spread') !== -1) {
                                return acc.TradingAccountType === 'Spread Betting';
                            }
                            else {
                                return acc.TradingAccountType === 'CFD';
                            }
                        })[0].TradingAccountId;
                        options = {
                            method: 'POST',
                            url: baseUrl + "/order/newstoplimitorder",
                            headers: {
                                'Content-Type': 'application/json',
                                UserName: parsedSession['username'],
                                Session: parsedSession['sessionKey']
                            },
                            body: JSON.stringify({
                                Applicability: 'gtc',
                                BidPrice: parseFloat(bidPrice),
                                Direction: direction,
                                IfDone: ifDone,
                                MarketId: market_id_enum_1.idMatcher.market[marketName],
                                OfferPrice: parseFloat(offerPrice),
                                OrderId: 0,
                                PositionMethodId: 1,
                                Quantity: quantity,
                                TradingAccountId: tradingAccountId,
                                TriggerPrice: orderPrice,
                                ExpiryDateTimeUTC: null,
                                OcoOrder: null
                            })
                        };
                        return [4 /*yield*/, rp(options).catch(function (error) {
                                console.error(error);
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    getBackendMultiDataByName: function (marketName, param, isPosition) {
        return __awaiter(this, void 0, void 0, function () {
            var orderType, ordersBodyObj, activeOrdersFromBody, params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderType = isPosition ? 'TradeOrder' : 'StopLimitOrder';
                        return [4 /*yield*/, this.getActiveOrders()];
                    case 1:
                        ordersBodyObj = _a.sent();
                        activeOrdersFromBody = ordersBodyObj.ActiveOrders.filter(function (order) {
                            if (order[orderType]) {
                                return order[orderType].MarketId === market_id_enum_1.idMatcher.market[marketName];
                            }
                        });
                        params = activeOrdersFromBody.map(function (order) {
                            return order[orderType][param];
                        });
                        return [2 /*return*/, params];
                }
            });
        });
    },
    clearPositionsAndOrders: function () {
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl, parsedSession, options, ordersBodyObj, tradeOrdersFromBody, stopLimitOrdersFromBody, promises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseUrl = protractor_1.browser.params.tradingApiUrl;
                        return [4 /*yield*/, this.getSession()];
                    case 1:
                        parsedSession = _a.sent();
                        options = {
                            method: 'POST',
                            url: null,
                            headers: {
                                Connection: 'keep-alive',
                                'Content-Type': 'application/json',
                                UserName: parsedSession['username'],
                                Session: parsedSession['sessionKey']
                            },
                            body: "{}"
                        };
                        return [4 /*yield*/, this.getActiveOrders()];
                    case 2:
                        ordersBodyObj = _a.sent();
                        tradeOrdersFromBody = ordersBodyObj.ActiveOrders.map(function (order) {
                            if (order.TradeOrder) {
                                return order.TradeOrder;
                            }
                        }).filter(function (order) {
                            return !!order;
                        });
                        stopLimitOrdersFromBody = ordersBodyObj.ActiveOrders.map(function (order) {
                            if (order.StopLimitOrder) {
                                return order.StopLimitOrder;
                            }
                        }).filter(function (order) {
                            return !!order;
                        });
                        promises = [];
                        tradeOrdersFromBody.forEach(function (trade) { return __awaiter(_this, void 0, void 0, function () {
                            var bidPrice, offerPrice;
                            return __generator(this, function (_a) {
                                if (trade.Direction === 'sell') {
                                    bidPrice = trade.Price;
                                    offerPrice = parseFloat((trade.Price * 1.005).toPrecision(6));
                                }
                                else {
                                    bidPrice = parseFloat((trade.Price / 1.005).toPrecision(6));
                                    offerPrice = trade.Price;
                                }
                                options.url = baseUrl + "/order/newtradeorder";
                                options.body = JSON.stringify({
                                    MarketId: trade.MarketId,
                                    Direction: trade.Direction === 'sell' ? 'buy' : 'sell',
                                    Close: [trade.OrderId],
                                    Quantity: trade.Quantity,
                                    BidPrice: bidPrice,
                                    OfferPrice: offerPrice,
                                    TradingAccountId: trade.TradingAccountId
                                });
                                promises.push(rp(options));
                                return [2 /*return*/];
                            });
                        }); });
                        stopLimitOrdersFromBody.forEach(function (order) {
                            options.url = baseUrl + "/order/cancel";
                            options.body = JSON.stringify({
                                OrderId: order.OrderId,
                                TradingAccountId: order.TradingAccountId
                            });
                            promises.push(rp(options));
                        });
                        return [4 /*yield*/, Promise.all(promises)
                                .catch(function (err) {
                                console.error("Can't delete Position or order. Error status code: " + err);
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    deleteSession: function () {
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl, parsedSession, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseUrl = protractor_1.browser.params.tradingApiUrl;
                        return [4 /*yield*/, this.getSession()];
                    case 1:
                        parsedSession = _a.sent();
                        options = {
                            method: 'POST',
                            url: baseUrl + "/session/deleteSession",
                            headers: {
                                Connection: 'keep-alive',
                                'Content-Type': 'application/json',
                                UserName: parsedSession['username'],
                                Session: parsedSession['sessionKey']
                            },
                            body: JSON.stringify({
                                UserName: parsedSession['username'],
                                Session: parsedSession['sessionKey']
                            })
                        };
                        return [4 /*yield*/, rp(options)
                                .then(function () { return null; }, function (err) { return console.log(err.message); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
};
//# sourceMappingURL=backend-helper.js.map