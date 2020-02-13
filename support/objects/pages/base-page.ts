import { browser, element, by, ElementFinder, protractor } from 'protractor';
import { WorkspaceBoard } from '../boards/workspace-board';
import { BrowseTab } from '../boards/browse-tab';
import { SearchModal } from '../modal-dialogues/search-modal';
import { MyAccount } from '../boards/account-tab';
import { HelpModal } from '../modal-dialogues/help-modal';
import { NotificationModal } from '../modal-dialogues/notification-modal';
import { GuideBubble } from '../elements/guide-bubble';

const constructors = {
  browse: BrowseTab,
  workspace: WorkspaceBoard,
  myaccount: MyAccount
};

export class BasePage {
  private curBoard = new WorkspaceBoard();
  private searchModalItem = null;
  private helpModalItem = null;
  private notificationModalItem = null;
  private guideBubbleItem = null;
  private data = {
    version: by.css('.version'),
    'loading spinner': by.css('.loader-overlay .spinner'),
    'loading overlay': by.css('.loader-overlay'),
    header: {
      root: by.tagName('app-header'),
      logo: by.css('.logo-container'),
      'balance bar': by.css('.balance-bar'),
      'add funds button': by.tagName('app-add-funds'),
      searchDiv: by.css('.market-search__button'),
      searchInput: by.css('.market-search__search-input'),
      searchIcon: by.css('.market-search__search-icon'),
      feedbackBtn: by.css('.feedback'),
      'help button': by.css('.toggle-help'),
      userPan: by.tagName('app-user-menu'),
      'user account': by.css('.user-menu'),
      userIcon: by.css('.icon-user-black,.icon-user-white'),
      notifications: by.css('.toggle-notifications'),
      logoutLogo: by.css('.utility-nav__logo')
    },
    balanceBar: {
      root: by.css('.balance-bar'),
      balanceItem: by.css('.balance-bar__item'),
      'available to trade': by.css('.balance-bar__item--available-to-trade'),
      'net equity': by.css('.balance-bar__item--net-equity'),
      cash: by.css('.balance-bar__item--cash'),
      'unrealised p&l': by.css('.balance-bar__item--unrealised'),
      'total margin': by.css('.balance-bar__item--margin'),
      'margin indicator': by.css('.balance-bar__item--margin-indicator'),
      balanceNumber: by.css('.balance-bar__item-number'),
      balanceCurrency: by.css('.balance-bar__item-number--account-currency')
    },
    searchModel: by.css('.market-search-modal'),
    userMenu: {
      root: by.css('user-menu__dropdown'),
      myAccLink: by.css('.link--my-account'),
      logOutLink: by.css('.link--log-out>a')
    },
    feedback: {
      root: by.css('.feedback-panel'),
      feedbackLink: by.css('.feedback-panel__link'),
      feedbackList: by.css('.feedback-panel__list'),
      feedbackItem: by.css('.feedback-panel__item-link'),
      feedbackText: by.css('.feedback-panel__textarea'),
      feedbackMessage: by.css('.feedback-panel__message'),
      submitBtn: by.css('.feedback-panel__submit')
    }
  };

  get currentBoard() {
    return this.curBoard;
  }

  getVersion() {
    return browser.executeScript(`return $(arguments[0]).text();`, element(this.data.version).getWebElement());
  }

  async waitLoading() {
    await element(this.data['loading spinner']).waitMissing(20000);
    await element(this.data['loading overlay']).waitMissing(5000);
    await this.header.logo.waitReady(10000);
  }

  get header() {
    const self = this;
    const root = element(self.data.header.root);

    return {

      get logo(): ElementFinder {
        return element(self.data.header.logo);
      },

      get userIcon(): ElementFinder {
        return element(self.data.header.userIcon);
      },

      async selectBoard(board: string) {
        board = board.toLowerCase();
        const targetBoard = element(self.data.header[board]);
        const strClass = await targetBoard.getAttribute('class');
        if (!strClass.includes('mode-toggle-container--active')) {
          await targetBoard.click();
        } else {
          console.log('Board has been already selected');
        }
        self.curBoard = new constructors[board]();

        return self.curBoard;
      },

      isBoardActive(board: string) {
        board = board.toLowerCase();
        const targetBoard = element(self.data.header[board]);

        return browser.wait(() => {
          return targetBoard.getAttribute('class')
            .then((strClass) => strClass.includes('mode-toggle-container--active'));
        }, 3000)
          .then(() => true, () => false);
      },

      async clickSearch() {
        const el = await element(self.data.header.searchInput).waitReady(2000);
        process.env.npm_config_browser.includes('safari') ? await el.click() :
        await browser.wait(() => {
          return browser.actions().mouseMove(el).mouseDown().mouseUp().perform()
            .then(() => null, () => console.log('actions error'))
            .then(() => element(self.data.searchModel).waitReady(1000))
            .then(() => true, () => false);
        }, 3000);
      },

      async clickLogo() {
        const el = await element(self.data.header.logo).waitReady(2000);
        await el.click();
      },

      async addSearchValue(value: string) {
        const el = await element(self.data.header.searchInput).waitReady(2000);
        await el.clear();
        await el.sendKeys(value);
      },

      async getSearchText(textType: string) {
        const el = await element(self.data.header.searchInput).waitReady(2000);

        return el.getAttribute(textType);
      },

      async clearSearchInput() {
        const el = await element(self.data.header.searchInput).waitReady(2000);
        await el.clear();
      },

      async isElementPresent(elementName: string) {
        const el = await element(self.data.header[elementName]).waitReady(5000);

        return el.isDisplayed();
      },

      async getSize(elementName: string) {
        const el = await element(self.data.header[elementName]).waitReady(5000);

        return el.getSize();
      },

      async click(elementName: string) {
        const el = await element(self.data.header[elementName]).waitReady(5000);
        await el.click();
      },

      async getElementLocation(elemToCompare) {
        elemToCompare = elemToCompare.toLowerCase();
        const locators = {
          header: self.data.header.root,
          'search field': self.data.header.searchInput
        };

        return element(locators[elemToCompare]).getLocation();
      }
    };
  }

  get balanceBar() {
    const self = this;
    const root = element(self.data.header.root);

    return {
      async getElementText(elementName: string) {
        return element(self.data.balanceBar[elementName]).getText();
      }
    };
  }

  get searchModal() {
    if (!this.searchModalItem) {
      this.searchModalItem = new SearchModal();
    }

    return this.searchModalItem;
  }

  get helpModal() {
    if (!this.helpModalItem) {
      this.helpModalItem = new HelpModal();
    }

    return this.helpModalItem;
  }

  get notificationModal() {
    if (!this.notificationModalItem) {
      this.notificationModalItem = new NotificationModal();
    }

    return this.notificationModalItem;
  }

  get guideBubble() {
    if (!this.guideBubbleItem) {
      this.guideBubbleItem = new GuideBubble();
    }

    return this.guideBubbleItem;
  }

  get feedbackModal() {
    const self = this;

    return {
      get feedbackLink() {
        return element(self.data.feedback.feedbackLink);
      },

      async redirect(to) {
        const elements = {
          'contact us': element(self.data.feedback.feedbackLink),
          'client management': element.all(self.data.feedback.feedbackItem).get(0),
          phone: element.all(self.data.feedback.feedbackItem).get(1),
          'live chat': element.all(self.data.feedback.feedbackItem).get(2)
        };
        await elements[to].click();

        function windowCount(count) {
          return () => {
              return browser.getAllWindowHandles().then((tabs) => {
                return tabs.length === count;
              });
          };
        }
        await browser.wait(windowCount(2), 10000);

        const handles = await browser.getAllWindowHandles();
        const newWindowHandle = process.env.npm_config_browser.includes('safari') ? handles[0] : handles[1];
        await browser.switchTo().window(newWindowHandle);
        await browser.waitForAngularEnabled(false);
      },

      async isElementPresent(elementName: string) {
        const elements = {
          'contact us': element(self.data.feedback.feedbackLink),
          'client management': element.all(self.data.feedback.feedbackItem).get(0),
          phone: element.all(self.data.feedback.feedbackItem).get(1),
          'live chat': element.all(self.data.feedback.feedbackItem).get(2),
          'feedback text area': element(self.data.feedback.feedbackText),
          'submit button': element(self.data.feedback.submitBtn)
        };

        return elements[elementName].waitReady(2000)
          .then(() => true, () => false);
      },

      async getElementHref(elementName: string) {
        const elements = {
          'contact us': element(self.data.feedback.feedbackLink),
          'client management': element.all(self.data.feedback.feedbackItem).get(0),
          phone: element.all(self.data.feedback.feedbackItem).get(1),
          'live chat': element.all(self.data.feedback.feedbackItem).get(2)
        };
        const el = await elements[elementName].waitReady(2000);

        return (await el.getAttribute('href')).trim();
      },

      async getElementText(elementName: string) {
        const elements = {
          'contact us': element(self.data.feedback.feedbackLink),
          'client management': element.all(self.data.feedback.feedbackItem).get(0),
          phone: element.all(self.data.feedback.feedbackItem).get(1),
          'live chat': element.all(self.data.feedback.feedbackItem).get(2),
          'feedback message': element(self.data.feedback.feedbackMessage)
        };
        const el = await elements[elementName].waitReady(2000);

        return (await el.getText()).trim();
      },

      async isSubmitActive() {
        const el = await element(self.data.feedback.submitBtn).waitReady(2000);
        const cls = await el.getAttribute('class');

        return cls.includes('disabled');
      },

      async fillInputWithValue(value) {
        const input = await element(self.data.feedback.feedbackText).waitReady(2000);
        await input.clear();
        await input.sendKeys(value);
      },

      async click(elementName: string) {
        const el = await element(self.data.feedback[elementName]).waitReady(5000);
        await el.click();
      }
    };
  }

  get userMenu() {
    const self = this;

    return {

      get logOutLink() {
        return element(self.data.userMenu.logOutLink);
      },

      get myAccLink() {
        return element(self.data.userMenu.myAccLink);
      },

      isAccountActive() {
        return browser.wait(() => {
          return element(self.data.userMenu.myAccLink).getAttribute('class')
            .then((strClass) => strClass.includes('link--active'));
        }, 10000)
          .then(() => true, () => false);
      },

      isElementPresent(elementName: string) {
        return element(self.data.userMenu[elementName]).waitReady(3000)
          .then(() => true, () => false);
      },

      async click(elementName: string) {
        const el = await element(self.data.userMenu[elementName]).waitReady(2000);
        await el.click();
      }
    };
  }

  async logOut() {
    await this.header.userIcon.click();
    await this.userMenu.logOutLink.click();
  }
}

