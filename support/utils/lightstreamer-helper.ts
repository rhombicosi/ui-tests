import { backendHelper } from './backend-helper';
import { browser } from 'protractor';
import * as ls from 'lightstreamer-client';

const PRICE_ITEM_GROUP = [
  'MarketId',
  'TickDate',
  'Bid',
  'Offer',
  'Price',
  'High',
  'Low',
  'Change',
  'Direction',
  'Status',
  'StatusSummary',
  'PriceEngine',
  'Row_Update_Version',
  'AuditId'
];

const lsAdapter = 'STREAMINGALL';

let lsClient;
let mySubscription;

export async function connectLS() {
  const lsUrl = browser.params.lightStreamerUrl;
  const parsedSession = await backendHelper.getSession();

  const user = parsedSession['username'];
  const token = parsedSession['sessionKey'];

  lsClient = new ls.LightstreamerClient(lsUrl, lsAdapter);
  lsClient.connectionDetails.setUser(user);
  lsClient.connectionDetails.setPassword(token);
  lsClient.connect();
}

export function disconnectLS() {
  lsClient.disconnect();
  console.log(lsClient.se);
}

export function subscribe(marketId) {
  mySubscription = new ls.Subscription('MERGE', `PRICE.${marketId}`, PRICE_ITEM_GROUP);
  mySubscription.setDataAdapter('PRICES');
  console.log(lsClient.se);
  lsClient.subscribe(mySubscription);
}

export function unsubscribe() {
  lsClient.unsubscribe(mySubscription);
}

export async function addListener(item) {
  let marketItem;
  mySubscription.addListener({
    onItemUpdate: function(obj) {
      marketItem = obj.getValue(item);
    }
  });
  await browser.wait(() => marketItem !== undefined, 120000);

  return marketItem;
}
