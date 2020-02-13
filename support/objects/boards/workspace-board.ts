import { browser, by, element, protractor } from 'protractor';
import { WatchlistPanel } from '../panels/watchlist-panel';
import { PositionsAndOrdersPanel } from '../panels/positions-and-orders-panel';
import { DealTicketPanel } from '../panels/deal-ticket-panel';
import { DetailsPanel } from '../panels/details-panel';
import { NewsPanel } from '../panels/news-panel';
import { EconomicCalendarPanel } from '../panels/economic-calendar-panel';
import { ChartPanel } from '../panels/chart-panel';
import { WatchlistContainer } from '../no-panels-component/watchlist-container';
import { MarketContainer } from '../no-panels-component/market-container';
import { MarketInformation } from '../no-panels-component/market-information';
import { BrowseTab } from './browse-tab';
import { MyAccount } from './account-tab';
import { helper } from '../../utils/helper';


const constructors = {
  watchlist: WatchlistPanel,
  'positions and orders': PositionsAndOrdersPanel,
  'deal ticket': DealTicketPanel,
  details: DetailsPanel,
  'history detail': DetailsPanel,
  'news feed': NewsPanel,
  'economic calendar': EconomicCalendarPanel,
  chart: ChartPanel,
  'watchlist container': WatchlistContainer,
  'market container': MarketContainer,
  'market information': MarketInformation
};


export class WorkspaceBoard {
  private currentPan;
  private browseTab;
  private myAccountItem;
  private data = {
    header: {
      root: by.tagName('app-workspace-header'),
      tabs: {
        root: by.css('.workspace__item'),
        closeButton: by.css('.icon-close'),
        name: by.css('.workspace-name'),
        tabMenuBtn: by.css('.icon-dots-vertical'),
        tabMenu: {
          root: by.css('.dropdown__content'),
          buttons: by.css('.components-list__item'),
          count: by.css('.item-count'),
          buttonTitle: by.css('.item-title'),
          clearWorkspace: by.css('.clear-workspace'),
          deleteWorkspace: by.css('.remove-workspace'),
          showMeButton: by.css('.at-workspace-components-state__link'),
          containerOpenedComponents: by.css('.components'),
          openedComponent: by.css('.components__item'),
          closeComponentButton: by.css('.icon-close'),
          iconForRename: by.css('.icon-edit'),
          inputForRename: by.css('.workspace-info > input'),
        }
      },
      iconCreateNewWorkspace: by.css('.create-new-workspace > .icon-plus'),
      plusBtn: by.css('.create-new-workspace')
    },
    tabBody: {
      root: by.css('.panel-container'),
      panels: by.tagName('app-workspace-panel'),
      noPanelComponent: {
        news: by.css('.news-economic'),
        watchlistContainer: by.tagName('app-product-page-watchlist'),
        // marketsContainer: by.css('.markets-list-container'),
        marketsContainer: by.tagName('app-markets-list'),
        marketInformation: by.tagName('app-ci-market-information'),
        chart: by.css('.chart-placeholder'),
        economicCalendar: by.css('.news-economic')
      }
    },
    productPage: {
      root: by.tagName('app-full-screen-panel')
    },
    balance: {
      root: by.css('.balance-bar')
    }
  };

  get header() {
    const self = this;

    return {

      async addNewTab() {
        let tabsCount = 0;
        const el = await element(self.data.header.plusBtn).waitReady(3000);
        await browser.wait(() => {
          return this.getTabsNumber()
            .then((num) => {
              tabsCount = num;

              return el.click()
                .then(() => null, () => {
                  console.log('plusBtn is not attached to the DOM');
                });
            })
            .then(() => this.getTabsNumber())
            .then((num) => helper.sleepIfFalse(num > tabsCount, 300));
        }, 10000);
      },

      getTabsNumber() {
        return element.all(self.data.header.tabs.root).count();
      },

      isCreateNewWorkspaceVisible() {
        return element(self.data.header.iconCreateNewWorkspace).waitReady(2000)
          .then(() => true, () => false);
      },

      getTab(nameOrNumber) {
        let tab;
        if (typeof nameOrNumber === 'number') {
          tab = element.all(self.data.header.tabs.root).get(nameOrNumber);
        } else {
          tab = element.all(self.data.header.tabs.root).filter((t) => {
            return t.element(self.data.header.tabs.name).getText()
              .then((text) => {
                return text.trim() === nameOrNumber;
              });
          }).first();
        }

        return {

          async getName() {
            return tab.element(self.data.header.tabs.name).getText()
              .then((text) => text.trim(), () => {
                return helper.sleep(500)
                  .then(() => {
                    return tab.element(self.data.header.tabs.name).getText();
                  })
                  .then((text) => text.trim());
              });
          },

          async getLocation() {
            return tab.getLocation();
          },

          async getSize() {
            return tab.getSize();
          },

          async getButtonName(nameOrNum) {
            let button;
            if (typeof nameOrNum === 'number') {
              button = element.all(self.data.header.tabs.tabMenu.buttons).get(nameOrNum);
            } else {
              button = element.all(self.data.header.tabs.tabMenu.buttons).filter((verifiableButton) => {
                return verifiableButton.element(self.data.header.tabs.tabMenu.buttonTitle).getText()
                  .then((text) => {
                    return text.toLowerCase().trim().includes(nameOrNum.toLowerCase());
                  });
              }).first();
            }

            return (await button.getText()).trim();
          },

          clickButton(nameOrNum) {
            let button;
            if (typeof nameOrNum === 'number') {
              button = element.all(self.data.header.tabs.tabMenu.buttons).get(nameOrNum);
            } else {
              button = element.all(self.data.header.tabs.tabMenu.buttons).filter((verifiableButton) => {
                return verifiableButton.element(self.data.header.tabs.tabMenu.buttonTitle).getText()
                  .then((text) => {
                    return text.toLowerCase().trim().includes(nameOrNum.toLowerCase());
                  });
              }).first();
            }

            return button.click();
          },

          async getChartsNumber() {
            try {
              const button = element.all(self.data.header.tabs.tabMenu.buttons).filter((verifiableButton) => {
                return verifiableButton.element(self.data.header.tabs.tabMenu.buttonTitle).getText()
                  .then((text) => {
                    return text.toLowerCase().trim().includes('chart');
                  });
              }).first();
              const numStr = (await button.element(self.data.header.tabs.tabMenu.count).getText()).trim();

              return parseInt(numStr);
            } catch (err) {
              if (err.name === 'NoSuchElementError') {
                return 0;
              } else {
                throw err;
              }
            }
          },

          async closeTab() {
            await this.expandDropdown();
            await tab.element(self.data.header.tabs.tabMenu.deleteWorkspace).click();
          },

          async expandDropdown() {
            await tab.element(self.data.header.tabs.tabMenuBtn).waitReady(3000);
            await tab.element(self.data.header.tabs.tabMenuBtn).click();
            const isMenuVisible = await tab.element(self.data.header.tabs.tabMenu.root).waitReady(2000)
              .then(() => true, () => false);
            if (!isMenuVisible) {
              await tab.element(self.data.header.tabs.tabMenuBtn).click();
              await tab.element(self.data.header.tabs.tabMenu.root).waitReady(2000);
            }
          },

          async clickClearButton() {
            await tab.element(self.data.header.tabs.tabMenu.clearWorkspace).waitReady(2000);
            await tab.element(self.data.header.tabs.tabMenu.clearWorkspace).click();
            await browser.wait(() => {
              return tab.element(self.data.header.tabs.tabMenu.clearWorkspace).getAttribute('disabled')
                .then((is) => helper.sleepIfFalse(is));
            }, 2000, 'element was not disabled after timeout');
          },

          async clickShowMeButton() {
            await tab.element(self.data.header.tabs.tabMenu.showMeButton).waitReady(2000);
            await tab.element(self.data.header.tabs.tabMenu.showMeButton).click();
            await tab.element(self.data.header.tabs.tabMenu.containerOpenedComponents).waitReady(2000);
          },

          async clickEditIcon() {
            await tab.element(self.data.header.tabs.tabMenu.iconForRename).waitReady(3000);
            await tab.element(self.data.header.tabs.tabMenu.iconForRename).click()
              .then(null, () => {
                return helper.sleep(100)
                  .then(() => tab.element(self.data.header.tabs.tabMenu.iconForRename).click());
              });
          },

          async typeAndSaveWorkspaceName(name: string) {
            await tab.element(self.data.header.tabs.tabMenu.inputForRename).clear();
            await tab.element(self.data.header.tabs.tabMenu.inputForRename).sendKeys(name);
            await browser.actions().sendKeys(protractor.Key.ENTER).perform();
          },

          async clickCloseComponentButton() {
            await tab.element(self.data.header.tabs.tabMenu.containerOpenedComponents).waitReady(2000);
            const countStoreComponents = await tab.all(self.data.header.tabs.tabMenu.openedComponent).count();
            await tab.all(self.data.header.tabs.tabMenu.openedComponent)
              .all(self.data.header.tabs.tabMenu.closeComponentButton).get(0).click();
            await browser.wait(() => tab.all(self.data.header.tabs.tabMenu.openedComponent).count()
              .then((count) => helper.sleepIfFalse(countStoreComponents !== count)), 2000);
          },

          async switchTo() {
            await tab.element(self.data.header.tabs.name).waitReady(5000);
            const cls = await tab.getAttribute('class')
              .then(null, () => {
                return helper.sleep(500)
                  .then(() => tab.getAttribute('class'));
              });
            if (!cls.includes('active')) {
              await tab.element(self.data.header.tabs.name).click()
                .then(() => {}, () => {
                  return helper.sleep(100)
                    .then(() => {
                      return tab.element(self.data.header.tabs.name).click();
                    });
                });
            }
            await tab.element(self.data.header.tabs.tabMenuBtn).waitReady(2000)
              .then(null, (err) => {
                return tab.element(self.data.header.tabs.name).click();
              });
          },

          isActive() {
            return browser.wait(() => {
              return tab.getAttribute('class')
                .then((cls) => {
                  return cls.includes('active');
                })
                .then((is) => is, () => false)
                .then((is) => helper.sleepIfFalse(is));
            }, 2000)
              .then(() => true, () => false);
          },

          async addNewPan(nameOrNum) {
            await tab.element(self.data.header.tabs.tabMenuBtn).waitReady(5000);
            await browser.wait(() => {
              return tab.element(self.data.header.tabs.tabMenu.root).isDisplayed()
                .then((is) => {
                  if (!is) {
                    return tab.element(self.data.header.tabs.tabMenuBtn).click()
                      .then(() => tab.element(self.data.header.tabs.tabMenuBtn).waitReady(2000))
                      .then(() => is);
                  } else {
                    return is;
                  }
                });
            }, 10000);
            let button;
            if (typeof nameOrNum === 'number') {
              button = element.all(self.data.header.tabs.tabMenu.buttons).get(nameOrNum);
            } else {
              button = element.all(self.data.header.tabs.tabMenu.buttons).filter((verifiableButton) => {
                return verifiableButton.element(self.data.header.tabs.tabMenu.buttonTitle).getText()
                  .then((text) => {
                    return text.toLowerCase().trim().includes(nameOrNum.toLowerCase());
                  });
              }).first();
            }
            await button.click();
            await tab.element(self.data.header.tabs.tabMenuBtn).click();
          },

          async isPanelActive(nameOrNum) {
            await tab.element(self.data.header.tabs.tabMenuBtn).waitReady(5000);
            const is = await tab.element(self.data.header.tabs.tabMenu.root).isDisplayed();
            if (!is) {
              await tab.element(self.data.header.tabs.tabMenuBtn).click();
            }
            let button;
            if (typeof nameOrNum === 'number') {
              button = element.all(self.data.header.tabs.tabMenu.buttons).get(nameOrNum);
            } else {
              button = element.all(self.data.header.tabs.tabMenu.buttons).filter((verifiableButton) => {
                return verifiableButton.element(self.data.header.tabs.tabMenu.buttonTitle).getText()
                  .then((text) => {
                    return text.toLowerCase().trim() === nameOrNum.toLowerCase();
                  });
              }).first();
            }

            return button.getAttribute('class').then((cls) => !cls.includes('all-components-used'));
          },

          isVisible(elem: string) {
            elem = elem.toLowerCase();
            const tabMenu = tab.element(self.data.header.tabs.tabMenu.root);

            const elements = {
              'delete workspace': tabMenu.element(self.data.header.tabs.tabMenu.deleteWorkspace),
              'list of components': tabMenu.element(self.data.header.tabs.tabMenu.buttons),
              'grid view component': tabMenu.all(self.data.header.tabs.tabMenu.openedComponent).get(0),
              'icon for rename': tabMenu.element(self.data.header.tabs.tabMenu.iconForRename),
              'input icon for input': tabMenu.element(self.data.header.tabs.tabMenu.inputForRename),
            };

            return elements[elem].waitReady(2000)
              .then(() => true, () => false);
          },

        };
      }
    };
  }

  get tabBody() {
    const self = this;

    return {

      get browse() {
        if (!self.browseTab) {
          self.browseTab = new BrowseTab();
        }

        return self.browseTab;
      },

      get myAccount() {
        if (!self.myAccountItem) {
          self.myAccountItem = new MyAccount();
        }

        return self.myAccountItem;
      },

      getCountSamePanel(type) {
        type = type.toLocaleLowerCase();
        let typeName = type;
        if (type.includes('position')) {
          typeName = 'position';
        } else if (type.includes('news')) {
          typeName = 'news';
        } else if (type === 'deal ticket') {
          typeName = '';
        } else if (type === 'chart') {
          typeName = /chart|dft|cfd|\//;
        }
        if (type.includes('detail')) {
          typeName = 'detail';
        }

        return element.all(self.data.tabBody.panels).filter((pan) => {
          return pan.element(by.css('.workspace-panel-header__title')).getText()
            .then((text) => {
              if (type === 'chart') {
                return !!text.toLowerCase().trim().match(typeName);
              } else if (typeName) {
                return text.toLowerCase().trim().includes(typeName);
              } else {
                return text.trim() === typeName;
              }
            });
        }).count();
      },

      getPanel(type) {
        type = type.toLocaleLowerCase();
        let typeN = type;
        if (type.includes('position')) {
          typeN = 'position';
        } else if (type.includes('news')) {
          typeN = 'news';
        } else if (type === 'deal ticket') {
          typeN = '';
        } else if (type === 'chart') {
          typeN = /chart|dft|cfd|\//;
        }
        if (type.includes('detail')) {
          typeN = 'detail';
        }

        const rootEl = element.all(self.data.tabBody.panels).filter((pan) => {
          return pan.element(by.css('.workspace-panel-header__title')).getText()
            .then((text) => {
              if (type === 'chart') {
                return !!text.toLowerCase().trim().match(typeN);
              } else if (typeN) {
                return text.toLowerCase().trim().includes(typeN);
              } else {
                return text.trim() === typeN;
              }
            });
        }).first();
        if (self.currentPan) {
          if (self.currentPan.name.toLowerCase() === type) {
            return self.currentPan;
          }
        }
        self.currentPan = new constructors[type](rootEl);

        return self.currentPan;
      },

      get currentPanel() {
        return self.currentPan;
      },

      set currentPanel(panel) {
        self.currentPan = panel;
      },

      getNoPanelComponent(type) {
        type = type.toLocaleLowerCase();

        const componentSelector = {
          'news feed': self.data.tabBody.noPanelComponent.news,
          'watchlist container': self.data.tabBody.noPanelComponent.watchlistContainer,
          'market container': self.data.tabBody.noPanelComponent.marketsContainer,
          'market information': self.data.tabBody.noPanelComponent.marketInformation,
          chart: self.data.tabBody.noPanelComponent.chart,
          'economic calendar': self.data.tabBody.noPanelComponent.economicCalendar
        };

        const rootEl = element(componentSelector[type]);
        self.currentPan = new constructors[type](rootEl);

        return self.currentPan;
      },

      getElementLocation(elemToCompare) {
        elemToCompare = elemToCompare.toLowerCase();

        const workspaceBoardElements = {
          'news feed': element(self.data.tabBody.noPanelComponent.news),
          'watchlist container': element(self.data.tabBody.noPanelComponent.watchlistContainer),
          'market container': element(self.data.tabBody.noPanelComponent.marketsContainer),
          'market information': element(self.data.tabBody.noPanelComponent.marketInformation),
          chart: element(self.data.tabBody.noPanelComponent.chart),
          'economic calendar': element(self.data.tabBody.noPanelComponent.economicCalendar)
        };

        return workspaceBoardElements[elemToCompare].getLocation();
      }

    };
  }
}
