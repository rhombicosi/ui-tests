import { browser } from 'protractor';
import { idMatcher } from '../emuns/market-id.enum';
import * as rp from 'request-promise';
import * as request from 'request';
import * as lightstreamer from './lightstreamer-helper';
import { helper } from './helper';


export let backendHelper = {

  session: null,
  account: null,

  async getSession() {
    if (!this.session) {
      let parsedSession = null;
      parsedSession = await browser.executeScript('return window.sessionStorage.getItem("web_trader_session");');
      if (!parsedSession) {
        parsedSession = await browser.executeScript('return window.localStorage.getItem("web_trader_session");');
      }
      if (!parsedSession) {
        throw new Error(`Can't get session`);
      }
      this.session = JSON.parse(parsedSession);

      return this.session;
    } else {
      return this.session;
    }
  },

  async getAccount() {
    if (!this.account) {
      let parsedAccount = null;
      parsedAccount = await browser.executeScript('return window.sessionStorage.getItem("web_trader_account");');
      if (!parsedAccount) {
        parsedAccount = await browser.executeScript('return window.localStorage.getItem("web_trader_account");');
      }
      if (!parsedAccount) {
        throw new Error(`Can't get session`);
      }
      this.account = JSON.parse(parsedAccount);

      return this.account;
    } else {
      return this.account;
    }
  },

  async setSession() {
    let parsedSession = null;
    parsedSession = await browser.executeScript('return window.sessionStorage.getItem("web_trader_session");');
    if (!parsedSession) {
      parsedSession = await browser.executeScript('return window.localStorage.getItem("web_trader_session");');
    }
    if (!parsedSession) {
      throw new Error(`Can't get session`);
    }
    this.session = JSON.parse(parsedSession);

    return this.session;
  },

  async setAccount() {
    let parsedAccount = null;
    parsedAccount = await browser.executeScript('return window.sessionStorage.getItem("web_trader_account");');
    if (!parsedAccount) {
      parsedAccount = await browser.executeScript('return window.localStorage.getItem("web_trader_account");');
    }
    if (!parsedAccount) {
      throw new Error(`Can't get session`);
    }
    this.account = JSON.parse(parsedAccount);

    return this.account;
  },

  async getActiveOrders() {
    const baseUrl = browser.params.tradingApiUrl;
    const parsedSession = await this.getSession();
    const options = {
      method: 'POST',
      url: `${baseUrl}/order/activeorders`,
      headers: {
        Connection: 'keep-alive',
        'Content-Type': 'application/json',
        UserName: parsedSession['username'],
        Session: parsedSession['sessionKey']
      },
      body: `{}`
    };
    const ordersBody = await rp(options);

    return JSON.parse(ordersBody);
  },

  resetClientPreferences() {
    const baseUrl = browser.params.tradingApiUrl;
    const keysForDelete = ['MERCURY_LAYOUT', 'mercury_helptip_number', 'MARKET_QUANTITIES'];

    return this.getSession()
      .then((parsedSession) => {
          if (parsedSession) {
            keysForDelete.forEach((key) => {
              const options = {
                method: 'POST',
                url: `${baseUrl}/clientpreference/delete`,
                headers: {
                  'Content-Type': 'application/json',
                  UserName: parsedSession['username'],
                  Session: parsedSession['sessionKey']
                },
                body: `{ 'Key': '${key}' }`
              };
              request(options);
            });
          }
        },
        (error) => {
          console.error(error);
        }
      );
  },

  setClientPreferenece(preference, value) {
    const baseUrl = browser.params.tradingApiUrl;

    return this.getSession()
      .then((parsedSession) => {
          if (parsedSession) {
            const options = {
              method: 'POST',
              url: `${baseUrl}/clientpreference/save`,
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
        },
        (error) => {
          console.error(error);
        }
      );
  },

  changePassword(oldPassword, newPassword) {
    const baseUrl = browser.params.tradingApiUrl;

    return this.getSession()
      .then((parsedSession) => {
          if (parsedSession) {
            const options = {
              method: 'POST',
              url: `${baseUrl}/session/changePassword`,
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
        }
      )
      .then((body) => {
        return JSON.parse(body).IsPasswordChanged;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  changeUserAccountEmail(email) {
    const baseUrl = browser.params.tradingApiUrl;

    return this.getSession()
      .then((parsedSession) => {
        if (parsedSession) {
          const options = {
            method: 'POST',
            url: `${baseUrl}/useraccount/Save`,
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
      .catch((error) => {
        console.log(error);
      });
  },

  async getClientAndTradingAccount() {
    const baseUrl = browser.params.tradingApiUrl;

    return Promise.resolve()
      .then(() => this.getSession())
      .then((parsedSession) => {
        const options = {
          method: 'GET',
          url: `${baseUrl}/useraccount/ClientAndTradingAccount`,
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
      .then((body) => {
        return JSON.parse(body);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async getClientApplicationMessageTranslationWithInterestingItems(
    clientApplicationId: number,
    cultureId: number,
    accountOperatorId: number,
    interestedTranslationKeys: string[]
  ) {
    const baseUrl = browser.params.tradingApiUrl;

    return Promise.resolve()
      .then(() => this.getSession())
      .then((parsedSession) => {
        const options = {
          method: 'POST',
          url: `${baseUrl}/message/translationWithInterestingItems`,
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
      .then((body) => {
        return JSON.parse(body).TranslationKeyValuePairs;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async getMarketInformation(marketId: number) {
    const baseUrl = browser.params.tradingApiUrl;

    return Promise.resolve()
      .then(() => this.getSession())
      .then((parsedSession) => {
        const options = {
          method: 'GET',
          url: `${baseUrl}/market/${marketId}/information`,
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
      .then((body) => {
        return JSON.parse(body).MarketInformation;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async getMarketExtendedInfo(marketId: number) {
    const baseUrl = browser.params.tradingApiUrl;
    const parsedSession = await this.getSession();

    const options = {
      method: 'GET',
      url: `${baseUrl}/market/${marketId}/informationextended`,
      headers: {
        'Content-Type': 'application/json',
        UserName: parsedSession['username'],
        Session: parsedSession['sessionKey']
      }
    };
    const body = await rp(options);

    return JSON.parse(body);
  },

  async getMarginInfo() {
    const baseUrl = browser.params.tradingApiUrl;
    const parsedSession = await this.getSession();

    const options = {
      method: 'GET',
      url: `${baseUrl}/margin/ClientAccountMargin`,
      headers: {
        'Content-Type': 'application/json',
        UserName: parsedSession['username'],
        Session: parsedSession['sessionKey']
      }
    };
    const body = await rp(options);

    return JSON.parse(body);
  },

  async getSimulateInformation(marketId: number, direction: string, quantity: number) {
    const baseUrl = browser.params.tradingApiUrl;
    const parsedSession = await this.getSession();

    const marketTypeId = (await this.getMarketExtendedInfo(marketId)).MarketInformation.MarketSettingsTypeId;

    const parsedAccount = await this.getAccount();
    const accPosition = marketTypeId === 1 ? 1 : 0;

    lightstreamer.subscribe(marketId);

    const options = {
      method: 'POST',
      url: `${baseUrl}/order/simulate/newtradeorder`,
      headers: {
        'Content-Type': 'application/json',
        UserName: parsedSession['username'],
        Session: parsedSession['sessionKey']
      },
      body: JSON.stringify({
        BidPrice: await lightstreamer.addListener('Bid'),
        Direction: direction,
        IfDone: [],
        MarketId: marketId,
        OfferPrice: await lightstreamer.addListener('Offer'),
        PositionMethodId: 1,
        Quantity: quantity,
        TradingAccountId: parsedAccount.TradingAccounts[accPosition].TradingAccountId
      })
    };
    const body = await rp(options);

    return JSON.parse(body);
  },

  getMarketsNamesByTagName(tagName, num) {
    const baseUrl = browser.params.tradingApiUrl;
    let parsedSession;

    return Promise.resolve()
      .then(() => this.getSession())
      .then((ps) => {
        parsedSession = ps;
        const options = {
          method: 'GET',
          url: `${baseUrl}/market/taglookup`,
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
      .then((body) => {
        const bodyObj = JSON.parse(body);
        const popMarketId = bodyObj.Tags.filter((tag) => {
          return tag.Name === tagName;
        })[0].MarketTagId;
        const options2 = {
          method: 'GET',
          url: `${baseUrl}/market/fullsearchwithtags?tagId=${popMarketId}&maxResults=${num}&` +
          `query=&spreadProductType=true&cfdProductType=true&includeOptions=true`,
          headers: {
            'Content-Type': 'application/json',
            UserName: parsedSession['username'],
            Session: parsedSession['sessionKey']
          }
        };

        return rp(options2);
      })
      .then((body) => {
        const bodyObj = JSON.parse(body);

        return bodyObj.MarketInformation.map((market) => {
          return market.Name;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getMarketsParametersByTagId(tagId, num, parameter = 'Name') {
    const baseUrl = browser.params.tradingApiUrl;

    return Promise.resolve()
      .then(() => this.getSession())
      .then((parsedSession) => {
        const options = {
          method: 'GET',
          url: `${baseUrl}/market/fullsearchwithtags?tagId=${tagId}&maxResults=${num}&` +
          `query=&spreadProductType=true&cfdProductType=true&includeOptions=true`,
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
      .then((body) => {
        const bodyObj = JSON.parse(body);

        return bodyObj.MarketInformation.map((market) => {
          return market[parameter];
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  async getMarketsNamesByQuery(tagId, num, query, spread, cfd, includeOptions) {
    const baseUrl = browser.params.tradingApiUrl;
    let body;
    const parsedSession = await this.getSession();
    const options = {
      method: 'GET',
      url: `${baseUrl}/market/fullsearchwithtags?query=${query}&tagId=${tagId}&maxResults=${num}&` +
      `searchByMarketCode=true&searchByMarketName=true&spreadProductType=${spread}&cfdProductType=${cfd}&` +
      `quebinaryProductTypery=true&includeOptions=${includeOptions}&useMobileShortName=false`,

      headers: {
        'Content-Type': 'application/json',
        UserName: parsedSession['username'],
        Session: parsedSession['sessionKey']
      }
    };

    if (parsedSession) {
      body = await rp(options);
    }
    try {
      const bodyObj = JSON.parse(body);

      return bodyObj.MarketInformation;
    } catch (err) {
      console.log(err);

      return;
    }
  },

  getMarketsInformation(tagId, num, includeOptions = 'false') {
    const baseUrl = browser.params.tradingApiUrl;

    return Promise.resolve()
      .then(() => this.getSession())
      .then((parsedSession) => {
        const options = {
          method: 'GET',
          url: `${baseUrl}/market/fullsearchwithtags?tagId=${tagId}&maxResults=${num}&` +
          `query=&spreadProductType=true&cfdProductType=true&includeOptions=${includeOptions}`,
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
      .then((body) => {
        const bodyObj = JSON.parse(body);

        return bodyObj.MarketInformation;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  async getMarketsNews(tagId) {
    const baseUrl = browser.params.tradingApiUrl;
    let body;
    const parsedSession = await this.getSession();
    const options = {
      method: 'GET',
      url: `${baseUrl}/news/marketreportheadlines?marketId=${tagId}&cultureId=69&maxResults=50`,
      headers: {
        'Content-Type': 'application/json',
        UserName: parsedSession['username'],
        Session: parsedSession['sessionKey']
      }
    };
    if (parsedSession) {
      body = await rp(options);
    }
    try {
      const bodyObj = JSON.parse(body);

      return bodyObj.Headlines.map((news) => {
        // it's necessary to replace all HTML mnemonics from http-response
        return news['Headline'].trim().replace('amp;', '').replace('&apos;', '\'').split('&quot;').join('\"');
      });
    } catch (err) {
      console.log(err);

      return;
    }
  },

  async getAllWatchlists() {
    const baseUrl = browser.params.tradingApiUrl;
    let body;
    const parsedSession = await this.getSession();
    const options = {
      method: 'GET',
      url: `${baseUrl}/watchlists`,
      headers: {
        'Content-Type': 'application/json',
        UserName: parsedSession['username'],
        Session: parsedSession['sessionKey']
      }
    };
    if (parsedSession) {
      body = await rp(options);
    }
    try {
      const allwatchlists = JSON.parse(body).ClientAccountWatchlists
        .map((watchlist) => watchlist['WatchlistDescription']);
      allwatchlists.push('Popular Markets');

      return allwatchlists;
    } catch (err) {
      console.log(err);

      return;
    }
  },

  async getTagLookup() {
    const baseUrl = browser.params.tradingApiUrl;
    let body;
    const parsedSession = await this.getSession();
    const options = {
      method: 'GET',
      url: `${baseUrl}/market/taglookup`,
      headers: {
        'Content-Type': 'application/json',
        UserName: parsedSession['username'],
        Session: parsedSession['sessionKey']
      }
    };
    if (parsedSession) {
      body = await rp(options);
    }
    try {
      const bodyObj = JSON.parse(body);

      return bodyObj.Tags;
    } catch (err) {
      console.log(err);

      return;
    }
  },

  async deleteWatchlists() {
    const baseUrl = browser.params.tradingApiUrl;
    let parsedSession;

    return Promise.resolve()
      .then(() => this.getSession())
      .then((ps) => {
        parsedSession = ps;
        const options = {
          method: 'GET',
          url: `${baseUrl}/watchlists`,
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
      .then((body) => {
        const arrayPromises = [];
        const bodyObj = JSON.parse(body);

        bodyObj['ClientAccountWatchlists'].forEach((watchlist) => {
          const options = {
            method: 'POST',
            url: `${baseUrl}/watchlist/delete`,
            headers: {
              'Content-Type': 'application/json',
              UserName: parsedSession['username'],
              Session: parsedSession['sessionKey']
            },
            body: `{}`
          };
          options.body = JSON.stringify({
            WatchlistId: watchlist['WatchlistId']
          });

          arrayPromises.push(rp(options));
        });

        return Promise.all(arrayPromises)
          .then(() => bodyObj['ClientAccountWatchlists'].length, (err) => console.log(err.message));
      });
  },

  async deletePositionsByMarketName(marketName) {
    const baseUrl = browser.params.tradingApiUrl;
    const parsedSession = await this.getSession();
    const options = {
      method: 'POST',
      url: null,
      headers: {
        Connection: 'keep-alive',
        'Content-Type': 'application/json',
        UserName: parsedSession['username'],
        Session: parsedSession['sessionKey']
      },
      body: `{}`
    };
    const ordersBodyObj = await this.getActiveOrders();
    const activeOrdersFromBody = ordersBodyObj.ActiveOrders.filter((order) => {
      if (order.TradeOrder) {
        return order.TradeOrder.MarketId === idMatcher.market[marketName];
      }
    });
    let iterator = 0;
    const deleteAllWithChecking = async(activeOrders) => {
      const promises = [];
      const multiplier = parseFloat((Math.random() * 0.02 + 1.00).toFixed(4));

      activeOrders.forEach((order) => {
        let bidPrice;
        let offerPrice;
        if (order.TradeOrder.Direction === 'sell') {
          bidPrice = order.TradeOrder.Price;
          offerPrice = parseFloat((order.TradeOrder.Price * multiplier).toPrecision(6));
        } else {
          bidPrice = parseFloat((order.TradeOrder.Price / multiplier).toPrecision(6));
          offerPrice = order.TradeOrder.Price;
        }
        options.url = `${baseUrl}/order/newtradeorder`;
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
      await Promise.all(promises);
      const ordersBodyObjNew = await this.getActiveOrders();
      const activeOrdersFromBodyNew = ordersBodyObjNew.ActiveOrders.filter((order) => {
        if (order.TradeOrder) {
          return order.TradeOrder.MarketId === idMatcher.market[marketName];
        }
      });
      if (activeOrdersFromBodyNew.length > 0 && iterator < 5) {
        iterator += 1;
        await helper.sleep(3000);
        console.log(`Trying to delete the market attempt ${iterator + 1}`);
        await deleteAllWithChecking(activeOrdersFromBodyNew);
      }
    };
    await deleteAllWithChecking(activeOrdersFromBody);
  },

  async deleteOrdersByMarketName(marketName) {
    const baseUrl = browser.params.tradingApiUrl;
    const parsedSession = await this.getSession();
    const options = {
      method: 'POST',
      url: null,
      headers: {
        Connection: 'keep-alive',
        'Content-Type': 'application/json',
        UserName: parsedSession['username'],
        Session: parsedSession['sessionKey']
      },
      body: `{}`
    };
    const ordersBodyObj = await this.getActiveOrders();
    const activeOrdersFromBody = ordersBodyObj.ActiveOrders.filter((order) => {
      if (order.StopLimitOrder) {
        return order.StopLimitOrder.MarketId === idMatcher.market[marketName];
      }
    });
    for (let i = 0; i < activeOrdersFromBody.length; i += 1) {
      options.url = `${baseUrl}/order/cancel`;
      options.body = JSON.stringify({
        OrderId: activeOrdersFromBody[i].StopLimitOrder.OrderId,
        TradingAccountId: activeOrdersFromBody[i].StopLimitOrder.TradingAccountId
      });
      await Promise.resolve()
        .then(() => rp(options))
        .catch((err) => {
          console.log(`Can't delete order. Error statuse code: ${err}`);
        });
    }
  },

  async getPositionHistory(maxResults: number, accType: string) {
    const parsedSession = await this.getSession();
    const parsedAccount = await this.getAccount();
    const accPosition = accType === 'DFT' ? 1 : 0;

    return Promise.resolve()
      .then(() => {
        const baseUrl = browser.params.tradingApiUrl;
        const tradingAccountId = parsedAccount.TradingAccounts[accPosition].TradingAccountId;
        const options = {
          method: 'GET',
          url: `${baseUrl}/order/tradehistory?TradingAccountId=${tradingAccountId}&MaxResults=${maxResults}`,
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
      .then((data) => JSON.parse(data)['TradeHistory'])
      .catch((error) => {
        console.error(error);
      });
  },

  async getOrderHistory(maxResults: number, accType: string) {
    const parsedSession = await this.getSession();
    const parsedAccount = await this.getAccount();
    const accPosition = accType === 'DFT' ? 1 : 0;

    return Promise.resolve()
      .then(() => {
        const baseUrl = browser.params.tradingApiUrl;
        const tradingAccountId = parsedAccount.TradingAccounts[accPosition].TradingAccountId;
        const options = {
          method: 'GET',
          url: `${baseUrl}/order/stoplimitorderhistory?TradingAccountId=${tradingAccountId}&MaxResults=${maxResults}`,
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
      .then((data) => JSON.parse(data)['StopLimitOrderHistory'])
      .catch((error) => {
        console.error(error);
      });
  },

  async addNewPosition(marketName, direction, quantity, bidPrice, offerPrice, ifDone = []) {
    const baseUrl = browser.params.tradingApiUrl;
    const parsedSession = await this.getSession();
    const parsedAccount = await this.getAccount();
    const tradingAccountId = parsedAccount.TradingAccounts.filter((acc) => {
      if (marketName.indexOf('DFT') !== -1 || marketName.indexOf('Spread') !== -1) {
        return acc.TradingAccountType === 'Spread Betting';
      } else {
        return acc.TradingAccountType === 'CFD';
      }
    })[0].TradingAccountId;
    const options = {
      method: 'POST',
      url: `${baseUrl}/order/newtradeorder`,
      headers: {
        'Content-Type': 'application/json',
        UserName: parsedSession['username'],
        Session: parsedSession['sessionKey']
      },
      body: JSON.stringify({
        MarketId: idMatcher.market[marketName],
        Direction: direction,
        Quantity: quantity,
        BidPrice: parseFloat(bidPrice),
        OfferPrice: parseFloat(offerPrice),
        TradingAccountId: tradingAccountId,
        PositionMethodId: 1,
        IfDone: ifDone
      })
    };
    await rp(options)
      .then((resp) => {
        if (JSON.parse(resp).OrderId === 0) {
          console.log(`Position haven't been created form first attempt. Try again`);

          return helper.sleep(10000)
            .then(() => rp(options));
        }
      });
  },

  async addNewOrder(marketName, direction, orderPrice, quantity, bidPrice, offerPrice, ifDone = []) {
    const baseUrl = browser.params.tradingApiUrl;
    const parsedSession = await this.getSession();
    const parsedAccount = await this.getAccount();
    const tradingAccountId = parsedAccount.TradingAccounts.filter((acc) => {
      if (marketName.indexOf('DFT') !== -1 || marketName.indexOf('Spread') !== -1) {
        return acc.TradingAccountType === 'Spread Betting';
      } else {
        return acc.TradingAccountType === 'CFD';
      }
    })[0].TradingAccountId;
    const options = {
      method: 'POST',
      url: `${baseUrl}/order/newstoplimitorder`,
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
        MarketId: idMatcher.market[marketName],
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
    await rp(options).catch((error) => {
      console.error(error);
    });
  },

  async getBackendMultiDataByName(marketName, param, isPosition: boolean) {
    const orderType = isPosition ? 'TradeOrder' : 'StopLimitOrder';
    const ordersBodyObj = await this.getActiveOrders();
    const activeOrdersFromBody = ordersBodyObj.ActiveOrders.filter((order) => {
      if (order[orderType]) {
        return order[orderType].MarketId === idMatcher.market[marketName];
      }
    });
    const params = activeOrdersFromBody.map((order) => {
      return order[orderType][param];
    });

    return params;
  },

  async clearPositionsAndOrders() {
    const baseUrl = browser.params.tradingApiUrl;
    const parsedSession = await this.getSession();
    const options = {
      method: 'POST',
      url: null,
      headers: {
        Connection: 'keep-alive',
        'Content-Type': 'application/json',
        UserName: parsedSession['username'],
        Session: parsedSession['sessionKey']
      },
      body: `{}`
    };
    const ordersBodyObj = await this.getActiveOrders();

    const tradeOrdersFromBody = ordersBodyObj.ActiveOrders.map((order) => {
      if (order.TradeOrder) {
        return order.TradeOrder;
      }
    }).filter((order) => {
      return !!order;
    });
    const stopLimitOrdersFromBody = ordersBodyObj.ActiveOrders.map((order) => {
      if (order.StopLimitOrder) {
        return order.StopLimitOrder;
      }
    }).filter((order) => {
      return !!order;
    });

    const promises = [];

    tradeOrdersFromBody.forEach(async(trade) => {
      let bidPrice;
      let offerPrice;
      if (trade.Direction === 'sell') {
        bidPrice = trade.Price;
        offerPrice = parseFloat((trade.Price * 1.005).toPrecision(6));
      } else {
        bidPrice = parseFloat((trade.Price / 1.005).toPrecision(6));
        offerPrice = trade.Price;
      }
      options.url = `${baseUrl}/order/newtradeorder`;
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
    });

    stopLimitOrdersFromBody.forEach((order) => {
      options.url = `${baseUrl}/order/cancel`;
      options.body = JSON.stringify({
        OrderId: order.OrderId,
        TradingAccountId: order.TradingAccountId
      });
      promises.push(rp(options));
    });

    await Promise.all(promises)
      .catch((err) => {
        console.error(`Can't delete Position or order. Error status code: ${err}`);
      });
  },

  async deleteSession() {
    const baseUrl = browser.params.tradingApiUrl;
    const parsedSession = await this.getSession();
    const options = {
      method: 'POST',
      url: `${baseUrl}/session/deleteSession`,
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
    await rp(options)
      .then(() => null, (err) => console.log(err.message));
  }
};
