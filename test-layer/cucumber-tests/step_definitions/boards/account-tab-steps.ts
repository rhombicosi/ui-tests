/* tslint:disable:max-line-length */
import { defineSupportCode } from 'cucumber';
import { browser } from 'protractor';
import { timezones } from '../../../../support/emuns/timezones';
import * as moment from 'moment';


defineSupportCode(function({ Given, When, Then }) {
  When(/^I go to '(.+)' section$/, async function(section) {
    await this.basePage.currentBoard.tabBody.myAccount.click(section);
  });

  When(/^I click '(.+)' in (?:platform settings|account details|account funding|statements and contracts) section$/, async function(elementName) {
    if (elementName === 'update now button') {this.memory['password changed'] = true; }
    if (elementName === 'update email button') {
      const currmail = await this.basePage.currentBoard.tabBody.myAccount.getElementText('current email');
      this.memory['previous email'] = currmail[1];
    }
    await this.basePage.currentBoard.tabBody.myAccount.click(elementName);
  });

  When(/^I select '(.+)' option from '(.+)' dropdown in '(.+)' section$/, async function(optionName, dropdownName, sectionName) {
    if (dropdownName === 'date format') {
      this.memory['date format description'] = await this.basePage.currentBoard.tabBody.myAccount.getDescription(dropdownName);
    }
    await this.basePage.currentBoard.tabBody.myAccount.click(dropdownName);
    await this.basePage.currentBoard.tabBody.myAccount.selectDropdownOption(sectionName, dropdownName, optionName);
  });

  When(/^I select (from|to) date '(.+)' in the date picker$/, async function(datePicker, date) {
    date = new Date(date);
    const dateValue = await this.basePage.currentBoard.tabBody.myAccount.getDatePickerValue(datePicker);
    const month = date.getMonth();
    const day = date.getDate().toString();
    const curdate = dateValue === '' ? new Date() : moment(dateValue, 'DD/MM/YYYY').toDate();
    const curmonth = curdate.getMonth();
    const clicks = curmonth - month;

    this.memory[datePicker] = date;

    await this.basePage.currentBoard.tabBody.myAccount.click(datePicker);

    for (let i = 0; i < Math.abs(clicks); i++) {
      clicks > 0 ? await this.basePage.currentBoard.tabBody.myAccount.click('previous month')
        : await this.basePage.currentBoard.tabBody.myAccount.click('next month');
    }

    await this.basePage.currentBoard.tabBody.myAccount.selectDate(day);
  });

  When(/^I enter '(.+)' into '(.+)' text input field$/, async function(text, input) {
    if (text === 'old password') {
        text = 'password';
    } else if (text === 'new password') {
        text = '12345678';
    }
    this.memory[input] = text;
    await this.basePage.currentBoard.tabBody.myAccount.enterText(input, text);
  });

  When(/^I clear '(.+)' text input field$/, async function(input) {
    await this.basePage.currentBoard.tabBody.myAccount.clearText(input);
  });

  When(/^I select '(.+)'(?:st|th|nd|rd|) month from the list$/, async function(month) {
    if ( parseInt(month) ) {
      month -= 1;
    }
    this.memory.month = month;
    await this.basePage.currentBoard.tabBody.myAccount.selectMonth(month);
  });

  Then(/^the (funding|statements|settings|details) section should be active$/, async function(section) {
    const state = await this.basePage.currentBoard.tabBody.myAccount.isSectionActive(section);
    this.expect(state).to.equal(true);
  });

  Then(/^the (?:funding|statements|settings|details) section (should|should not) contain items:$/, async function(state, table) {
    const itemNames = table.raw().map((el) => {
        return el[0];
    });

    for (let i = 0; i < itemNames.length; i++) {
        const actualItem = await this.basePage.currentBoard.tabBody.myAccount.isElementPresentAndVisible(itemNames[i], state);
        state === 'should' ? this.expect(actualItem).to.equal(true) : this.expect(actualItem).to.equal(false);
    }
  });

  Then(/^'(.+)' (should|should not) be visible within account tab$/, async function(elementName, state) {
    const actualState = await this.basePage.currentBoard.tabBody.myAccount.isElementPresentAndVisible(elementName, state);
    const expectedState = state === 'should';
    if (elementName === 'email') {
      this.memory['new email'] = this.memory.clientInfo['PersonalEmailAddress'];
    }
    this.expect(actualState).to.equal(expectedState);
  });

  Then(/^'(.+)' option is selected in '(.+)' dropdown$/, async function(option, dropdown) {
    this.memory[dropdown] = option;
    const actualOption = await this.basePage.currentBoard.tabBody.myAccount.getSelectedOption(dropdown);
    this.expect(actualOption).to.equal(option);
  });

  Then(/^'(.+)' dropdown in '(.+)' section contains correct items$/, async function(dropdown, section) {
    const actualOptions = await this.basePage.currentBoard.tabBody.myAccount.getElementText(dropdown);
    let expectedOptions;

    if (dropdown === 'session timeout') {
        expectedOptions = [ '1 hour', '2 hours', '4 hours', '8 hours', '24 hours' ];
    } else if (dropdown === 'time zone') {
        expectedOptions = timezones.map(t => t.text);
    } else {
        expectedOptions = [ 'DD/MM/YYYY', 'MM/DD/YYYY' ];
    }

    this.expect(actualOptions).to.deep.equal(expectedOptions);
  });

  Then(/^(time zone|date format|account funding) description is correct$/, async function(description) {
    const actualDescription = await this.basePage.currentBoard.tabBody.myAccount.getDescription(description);
    let expectedDescription;

    if (description === 'time zone') {
      expectedDescription = this.memory['time zone'];
    } else if (description === 'date format') {
      expectedDescription = `Today ${moment(new Date()).format(this.memory['date format'])}`;
    } else if (description === 'account funding') {
      expectedDescription = 'You can fund your account by Debit and Credit card, BACS, CHAPS or cheque. For compliance purposes, client refunds will only be returned to the original funding source.';
    }

    this.expect(actualDescription).to.equal(expectedDescription);
  });

  Then(/^the hedge is (on|off)$/, async function(state) {
    await this.basePage.waitLoading();
    const actualState = await this.basePage.currentBoard.tabBody.myAccount.isHedgeOn();
    const expectedState = state === 'on';
    this.expect(actualState).to.equal(expectedState);
  });

  Then(/^the '(.+)' section route is correct$/, async function(section) {
    const actualRoute = await browser.getCurrentUrl();
    const expectedRoute = `${browser.baseUrl}account/${section}`;
    this.expect(actualRoute).to.equal(expectedRoute);
  });

  Then(/^'(.+)' should be (enabled|disabled)$/, async function(elementName, state) {
    const actualState = await this.basePage.currentBoard.tabBody.myAccount.isElementActive(elementName);
    state === 'enabled' ? this.expect(actualState).to.equal(true) : this.expect(actualState).to.equal(false);
  });

  Then(/^'(.+)' text is '(.+)'$/, async function(elementName, text) {
    if (text === 'correct') {
      const expectedClientInfo = {
        'full username': this.memory.clientInfo['LogonUserName'],
        'logged username': `Username: ${this.memory.clientInfo['TradingAccounts'][0]['TradingAccountCode']}`
      };
      text = expectedClientInfo[elementName];
    }
    const actualText = await this.basePage.currentBoard.tabBody.myAccount.getDescription(elementName);
    this.expect(actualText).to.equal(text);
  });

  Then(/^'(.+)' is updated$/, async function(elementName) {
    const oldText = elementName === 'current email' ? this.memory['previous email'] : this.memory['date format description'];
    const state = await browser.wait(() => {
      if (elementName === 'current email') {
        return this.basePage.currentBoard.tabBody.myAccount.getElementText(elementName)
          .then((text) => this.helper.sleepIfFalse(text[1] !== oldText, 500));
      } else {
        return this.basePage.currentBoard.tabBody.myAccount.getDescription(elementName)
          .then((text) => this.helper.sleepIfFalse(text[1] !== oldText, 500));
      }
    }, 10000)
        .then(() => true, () => false);
    this.expect(state).to.equal(true);
  });

  Then(/^'(.+)' text should be (fully displayed|with three dots in the name|with three dots in the domain name|with three dots in the name and domain name)$/,
  async function(elementName, text) {
    let actualText = await this.basePage.currentBoard.tabBody.myAccount.getElementText(elementName);
    if (elementName === 'current email') {
        actualText = actualText[1];
    } else if (elementName === 'email') {
        actualText = actualText[0];
    }
    let expectedText = this.memory['new email'];
    const name = expectedText.split('@')[0];
    const domain = expectedText.split('@')[1].split('.')[0];
    const top = expectedText.split('@')[1].split('.')[1];

    if (text === 'with three dots in the name') {
        expectedText = `${name.slice(0, 3)}...${name.slice(-3)}@${domain}.${top}`;
    } else if (text === 'with three dots in the domain name') {
        expectedText = `${name}@${domain.slice(0, 3)}...${domain.slice(-3)}.${top}`;
    } else if (text === 'with three dots in the name and domain name') {
        expectedText = `${name.slice(0, 3)}...${name.slice(-3)}@${domain.slice(0, 3)}...${domain.slice(-3)}.${top}`;
    }

    this.expect(actualText).to.equal(expectedText);
  });

  Then(/^email tooltip should be correct$/, async function() {
    const actualTooltip = await this.basePage.currentBoard.tabBody.myAccount.getTooltip();
    const expectedTooltip = this.memory['new email'];
    this.expect(actualTooltip).to.equal(expectedTooltip);
  });

  Then(/^password is changed successfully$/, async function() {
    const isChanged = await this.backendHelper.changePassword(this.memory['new password'], this.memory['old password']);
    const oldPassword =  this.memory['new password'];
    this.memory['new password'] = this.memory['old password'];
    this.memory['old password'] = oldPassword;
    this.expect(isChanged).to.equal(true);
  });

  Then(/^'(.+)' redirects to the correct url$/, async function(link) {
    let expectedUrl;
    let actualUrl: string;
    if (link === 'add funds link') {
      expectedUrl = process.env.npm_config_env === 'ppe' ? 'https://qappitp.cityindex.co.uk/funding.webui/'
        : 'https://trade.loginandtrade.com/funding.webui/';
    } else if (link === 'withdraw funds link') {
      expectedUrl = process.env.npm_config_env === 'ppe' ? 'https://qappitp.cityindex.co.uk/funding.webui/Funding/WithdrawFunds'
        : 'https://account.cityindex.co.uk/funding/withdrawal/cards';
    } else if (link === 'add payment method link') {
      expectedUrl = process.env.npm_config_env === 'ppe' ? 'https://qappitp.cityindex.co.uk/funding.webui/Funding/AddCard'
        : 'https://account.cityindex.co.uk/funding/deposit/cards';
    } else {
      expectedUrl = process.env.npm_config_env === 'ppe' ? 'https://qappitp.cityindex.co.uk/funding.webui/Funding/RemoveCard'
        : 'https://trade.loginandtrade.com/funding.webui/Funding/RemoveCard';
    }

    await browser.wait(() => {
      return browser.getCurrentUrl()
        .then((url) => {
          actualUrl = url;

          return this.helper.sleepIfFalse(url.includes(expectedUrl), 500);
        });
    }, 10000)
      .then(() => null, () => null);

    this.expect(actualUrl).to.equal(expectedUrl);
  });

  Then(/^'(.+)' option is (selected|not selected)$/, async function(elementName, state) {
    const actualState = await this.basePage.currentBoard.tabBody.myAccount.isElementSelected(elementName);
    const expectedState = state === 'selected' ? true : false;
    this.expect(actualState).to.equal(expectedState);
  });

  Then(/^'(.+)'(?:st|th|nd|rd|) month is selected in the list$/, async function(month) {
    if (parseInt(month)) {
        month -= 1;
    }
    const actualState = await this.basePage.currentBoard.tabBody.myAccount.isMonthSelected(month);

    this.expect(actualState).to.equal(true);
  });

  Then(/^the list of statements and contracts (?:of|for) the correct '(month|date range)' is displayed$/, async function(itemName) {
    const data = await this.basePage.currentBoard.tabBody.myAccount.getStatementsData('date');
    const date = data.map((s) => {
      return moment(s, 'DD/MM/YYYY');
    });
    let expectedValue;
    if (itemName === 'month') {
      expectedValue = this.memory.month.split(' ')[0];

      return date.map((m) => {
          this.expect(m.format('MMMM') === expectedValue).to.equal(true);
        });
    } else {
      const startDate = moment(this.memory.from, 'DD/MM/YYYY');
      const endDate = moment(this.memory.to, 'DD/MM/YYYY');

      return date.map((d) => {
          this.expect(d.isBetween(startDate, endDate)).to.equal(true);
        });
    }

  });
});
