export let environment = {
  ppe: {
    tradingApiUrl: 'https://ciapipreprod.cityindextest9.co.uk/tradingapi',
    lightStreamerUrl: 'https://pushpreprod.cityindextest9.co.uk',
    statementsUrl: 'https://ciapipreprod.cityindextest9.co.uk/ClientDocumentsProxy/ClientProxy.asmx',
    statementsDownloadUrl: 'https://trade-ppe.loginandtrade.com/',
    streamingUrl: 'https://pushpreprod.cityindextest9.co.uk',
    logOutRedirectUrl: 'https://www.cityindex.co.uk/',
    baseUrl: 'https://trade-ppe.loginandtrade.com/webtrader/beta/',
    login: 'GB100063e5',
    password: 'password'
  },
  local: {
    accountCreationUrl: 'https://www1.applyforanaccount.com',
    tradingApiUrl: 'https://ciapi.cityindex.com/TradingAPI',
    lightStreamerUrl: 'https://push.cityindex.com',
    resolveTokenUrl: 'http://pkh-dev-merc1.cityindex.co.uk/logingateway/api/login/getAuthorizationInfo',
    logOutRedirectUrl: 'https://www.cityindex.co.uk/',
    baseUrl: 'http://localhost:4200/',
    login: 'DM535050',
    password: 'password'
  },
  dev: {
    accountCreationUrl: 'https://www1.applyforanaccount.com',
    tradingApiUrl: 'https://ciapi.cityindex.com/TradingAPI',
    lightStreamerUrl: 'https://push.cityindex.com',
    resolveTokenUrl: 'http://pkh-dev-merc1.cityindex.co.uk/logingateway/api/login/getAuthorizationInfo',
    logOutRedirectUrl: 'https://www.cityindex.co.uk/',
    baseUrl: 'http://maz-dev-merc02.northeurope.cloudapp.azure.com:5559/webtrader/beta/',
    login: 'DM535050',
    password: 'password'
  },
  stg: {
    accountCreationUrl: 'https://www1.applyforanaccount.com',
    tradingApiUrl: 'https://ciapi.cityindex.com/TradingAPI',
    lightStreamerUrl: 'https://push.cityindex.com',
    logOutRedirectUrl: 'https://www.cityindex.co.uk/',
    baseUrl: 'https://trade-stg.loginandtrade.com/webtrader/beta/',
    login: 'DM535050',
    password: 'password'
  },
  live: {
    accountCreationUrl: 'https://www1.applyforanaccount.com',
    tradingApiUrl: 'https://ciapi.cityindex.com/TradingAPI',
    lightStreamerUrl: 'https://push.cityindex.com',
    logOutRedirectUrl: 'https://www.cityindex.co.uk/',
    // baseUrl: 'https://trade.loginandtrade.com/webtrader/beta/',
    baseUrl: 'https://trade.loginandtrade.com/cityindex/#/',
    login: 'DM535050',
    password: 'password'
  },
  qat: {
    tradingApiUrl: 'https://ciapiqat.cityindextest9.co.uk/tradingapi',
    lightStreamerUrl: 'https://pushqat.cityindextest9.co.uk',
    logOutRedirectUrl: 'https://www.cityindex.co.uk/',
    baseUrl: 'https://trade-qat.loginandtrade.com/webtrader/beta/',
    login: 'DM348630',
    password: 'password'
  }
};
