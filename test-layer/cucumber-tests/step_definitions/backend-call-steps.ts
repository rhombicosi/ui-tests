/* tslint:disable:max-line-length */
import { defineSupportCode } from 'cucumber';
import { browser } from 'protractor';


defineSupportCode(function({ Given, When, Then }) {
  When(/^I delete '(.+)' markets$/, async function(marketName) {
    await this.backendHelper.deletePositionsByMarketName(marketName);
  });

  When(/^I add ([Oo]rder|[Pp]osition) with parameters:$/, async function(type, table) {
    const market = table.rowsHash();
    const marketId = this.idMatcher.market[market.MarketName];
    market.Direction = market.Direction.toLowerCase();
    this.lightstreamer.subscribe(marketId);
    const sell = await this.lightstreamer.addListener('Bid');
    const buy = await this.lightstreamer.addListener('Offer');
    this.memory.marketName = market.MarketName;
    this.memory.prices = {
      sell: sell,
      buy: buy
    };
    this.memory.sell = sell;
    this.memory.buy = buy;
    this.memory.direction = market.Direction;
    this.memory.quantity = market.Quantity;
    this.memory.amalgamatedQty = this.memory.amalgamatedQty ? this.memory.amalgamatedQty : 0;
    this.memory.amalgamatedQty += parseInt(market.Quantity);
    this.memory.qtyArray = this.memory.qtyArray ? this.memory.qtyArray : [];
    this.memory.qtyArray.push(market.Quantity);
    this.memory.price = market.Price;
    this.memory['order price'] = market.Price;
    const ifDone = [];
    const oppositeDirection = market.Direction.match(/[Bb]uy/) ? 'sell' : 'buy';

    if (market.StopPrice || market.LimitPrice) {
      market.StopPrice = market.StopPrice === 'buy' ? this.memory.buy :
                         market.StopPrice === 'sell' ? this.memory.sell :
                         market.StopPrice;
      market.LimitPrice = market.LimitPrice === 'buy' ? this.memory.buy :
                          market.LimitPrice === 'sell' ? this.memory.sell :
                          market.LimitPrice;
      const stopLimitObj = {
        Stop: null,
        Limit: null
      };
      if (market.LimitPrice) {
        stopLimitObj.Limit = {
          OrderId: null,
          Direction: oppositeDirection,
          TrailingDistance: null,
          Quantity: market.LimitQuantity ? market.LimitQuantity : market.Quantity,
          Applicability: 'gtc',
          TriggerPrice: market.LimitPrice,
          Guaranteed: false,
          ExpiryDateTimeUTC: null
        };
      }
      if (market.StopPrice) {
        stopLimitObj.Stop = {
          OrderId: null,
          Direction: oppositeDirection,
          TrailingDistance: null,
          Quantity: market.StopQuantity ? market.StopQuantity : market.Quantity,
          Applicability: 'gtc',
          TriggerPrice: market.StopPrice,
          Guaranteed: false,
          ExpiryDateTimeUTC: null
        };
      }
      ifDone.push(stopLimitObj);
    }
    const orderType = type === 'position' ? 'TradeOrder' : 'StopLimitOrder';

    if (type === 'position') {
      await this.backendHelper.addNewPosition(market.MarketName, market.Direction, market.Quantity, this.memory.sell, this.memory.buy, ifDone);
    } else {
      await this.backendHelper.addNewOrder(market.MarketName, market.Direction, market.Price, market.Quantity, this.memory.sell, this.memory.buy, ifDone);
    }
  });

  When(/^I delete '([Oo]rder|[Pp]osition)' '(.+)'$/, async function(ticketType, marketName) {
    if (ticketType.toLowerCase() === 'position') {
      await this.backendHelper.deletePositionsByMarketName(marketName);
    } else {
      await this.backendHelper.deleteOrdersByMarketName(marketName);
    }
  });

  When(/^I get '([Oo]rder|[Pp]osition)' History for '(DFT|CFD|Spread)'$/, async function(ticketType, accType) {
    accType = accType === 'Spread' ? 'DFT' : accType;
    if (ticketType.toLowerCase() === 'position') {
      await this.backendHelper.getPositionHistory(1, accType).then((data) => {
        this.memory.history = data[0];
      });
    } else {
      await this.backendHelper.getOrderHistory(1, accType).then((data) => {
        this.memory.history = data[0];
      });
    }
  });
});
