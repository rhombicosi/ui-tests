/* tslint:disable:max-line-length */

import { browser, element, by, ElementFinder, protractor } from 'protractor';
import { Panel } from './panel';
import { LinkedOrder } from '../elements/linked-order';
import { helper } from '../../utils/helper';


export class DealTicketPanel extends Panel {
  private data = {
    mainLabels: by.css('.ticket-type label'),
    market: by.css('.market-information'),
    directions: by.css('.market-prices label'),
    marketName: by.css('.market-information__market-name'),
    sellLabel: by.css('.sell'),
    buyLabel: by.css('.buy'),
    marketSpread: by.css('.market-prices__spread'),
    ticketFormClarification: by.css('.ticket-form__clarification'),
    main: by.css('[formgroupname=mainOrder] .market-prices'),
    oco: by.css('[formgroupname=ocoOrder] .market-prices'),
    mainOrderArea: by.css('.main-order'),
    ocoOrderArea: by.css('.oco-order'),
    primaryArea: {
      root: by.css('.order-primary-area'),
      rows: by.css('.row'),
      quantityInput: by.css('[formcontrolname=quantity] input'),
      orderPriceInput: by.css('[formcontrolname=price] input'),
      goodTillDropdown: by.css('.row__expiry'),
      validation: by.css('.row__validations')
    },
    addStopLimitLink: by.css('.linked-orders-controls__add-order'),
    addStopLimitDropdown: by.css('.dropdown__content'),
    hedgingToggleBtn: by.css('.slide-toggle--status'),
    hedgeInfoIcon: by.css('.icon-info'),
    hedgeTooltip: by.tagName('app-tooltip'),
    hedgingStatus: by.css('.order-controls__hedging-status'),
    positionInformation: by.css('.edit-form__position-info'),
    advancedTicketLink: by.css('.order-controls__mode-toggler--advanced'),
    standardTicketLink: by.css('.order-controls__mode-toggler--standard'),
    ocoLink: by.css('.oco-toggle'),
    marginCalculator: {
      root: by.css('.margin-calculator'),
      risks: by.css('.margin-calculator__calculated-risks'),
      margin: by.css('.margin-calculator__calculated-margin'),
      details: by.css('.margin-calculator__calculated-margin-details')
    },
    editLabel: by.css('.edit-form__collapse-header .at-edit-stops-and-limits-rb'),
    closeSection: {
      radioButton: by.css('.at-close-rb'),
      quantityInput: by.css('.at-close-quantity-input>input'),
      info: by.css('.edit-form__close-info'),
      label: by.css('.edit-form__collapse-header .at-close-rb')
    },
    confirmationSection: {
      confirmation: by.css('.at-confirmation-bot'),
      header: by.css('.ticket-confirmation-item__header'),
      message: by.css('.ticket-confirmation-item__body'),
      'ticket failure': by.css('.ticket-failure'),
      error: by.css('.ticket-confirmation-list__error-message'),
      'attached order confirmation': by.css('.body__row--attached-order')
    },
    marketStatus: {
      root: by.tagName('app-market-status'),
      closedMarketIcon: by.css('.icon-closedmarket'),
      callToTradeMarketIcon: by.css('.icon-calltotrade'),
      title: by.css('.market-status__title'),
      description: by.css('.market-status__description'),
      createAnOrderLink: by.css('.market-status__order-link')
    },
    orders: by.css('.linked-orders'),
    controls: by.css('.linked-orders-controls'),
    closeRadioBtn: by.css('.at-close-rb'),
    editRadioBtn: by.css('.at-edit-stops-and-limits-rb'),
    submitBtn: by.css('.ticket-footer__submit'),
    okBtn: by.css('.submit-button')
  };

  constructor(panelRoot: ElementFinder) {
    super(panelRoot);
    this.name = 'Deal Ticket';
  }

  isRadiobuttonSelected(name) {
    const self = this;
    name = name.toLowerCase();
    const radiobuttons = {
      close: self.data.closeSection.radioButton,
      edit : self.data.editRadioBtn
    };

    return this.container.element(radiobuttons[name]).element(by.tagName('input')).isSelected();
  }

  async isTypeSelected(type) {
    type = type.toLowerCase();
    const label = this.container.all(this.data.mainLabels).filter((lab) => {
      return lab.getText()
        .then((text) => {
          return text.toLowerCase().trim().includes(type.toLowerCase());
        });
    }).first();
    await label.waitReady(3000);
    const cls = await label.getAttribute('class');

    return cls.includes('selected');
  }

  async getDirection() {
    await this.container.element(this.data.buyLabel).waitReady(15000);
    const clsExt = await this.container.all(this.data.directions).filter((direction) => {
      return direction.getAttribute('class')
        .then((cls) => cls.includes('selected'));
    }).first().getAttribute('class');
    const arr = clsExt.split(' ');

    return arr[0];
  }

  getLinkedOrder(num) {
    const linkedOrderRoot = this.container.all(by.css('.linked-orders > li')).get(num);

    return new LinkedOrder(linkedOrderRoot);
  }

  getMainLinkedOrder(num) {
    const linkedOrderRoot = this.container.element(this.data.mainOrderArea).all(by.css('.linked-orders > li')).get(num);

    return new LinkedOrder(linkedOrderRoot);
  }

  getOCOLinkedOrder(num) {
    const linkedOrderRoot = this.container.element(this.data.ocoOrderArea).all(by.css('.linked-orders > li')).get(num);

    return new LinkedOrder(linkedOrderRoot);
  }

  getAnyLinkedOrder(ticketType, orderNumber) {
    const value = ticketType === 'main' ? this.getMainLinkedOrder(orderNumber) :
                  ticketType === 'oco' ? this.getOCOLinkedOrder(orderNumber) :
                                        this.getLinkedOrder(orderNumber);

    return value;
  }

  getInputValue(name) {
    name = name.toLowerCase();
    const self = this;
    const inputs = {
      'order price': self.container.all(self.data.primaryArea.orderPriceInput).get(0),
      quantity: self.container.all(self.data.primaryArea.quantityInput).get(0),
      'close quantity': self.container.element(self.data.closeSection.quantityInput),
      'primary area quantity': self.container.element(self.data.primaryArea.quantityInput),
      'stop price': self.container.all(self.data.primaryArea.orderPriceInput).get(0),
      'limit price': self.container.all(self.data.primaryArea.orderPriceInput).get(1)
    };

    return inputs[name].getAttribute('value');
  }

  async getElementText(elementName) {
    elementName = elementName.toLowerCase();
    const self = this;
    const stopOrder = self.getLinkedOrder(0);
    const limitOrder = self.getLinkedOrder(1);
    const linkedOrder = self.getLinkedOrder(2);
    const elements = {
      'trade label': self.container.all(self.data.mainLabels).get(0),
      'order label': self.container.all(self.data.mainLabels).get(1),
      'set alert label': self.container.all(self.data.mainLabels).get(2),
      'ticket label': self.container.element(self.data.mainLabels),
      'market info': self.container.element(self.data.marketName),
      'position info': self.container.element(self.data.positionInformation),
      'submit button': self.container.element(self.data.submitBtn),
      'close label': self.container.element(self.data.closeSection.label),
      'close info': self.container.element(self.data.closeSection.info),
      confirmation: self.container.element(self.data.confirmationSection.confirmation),
      'market name': self.container.element(self.data.confirmationSection.header),
      'hedging status': self.container.element(self.data.hedgingStatus),
      'margin calculator': self.container.element(self.data.marginCalculator.root),
      'confirmation message': self.container.element(self.data.confirmationSection.message),
      'confirmation message 1': self.container.all(self.data.confirmationSection.message).get(0),
      'confirmation message 2': self.container.all(self.data.confirmationSection.message).get(1),
      'confirmation message 3': self.container.all(self.data.confirmationSection.message).get(2),
      'delete message': linkedOrder.getField('delitionMessage'),
      'stop validation': stopOrder.getField('validation'),
      'limit validation': limitOrder.getField('validation'),
      'oco link': self.container.element(self.data.ocoLink),
      'ticket form clarification': self.container.element(self.data.ticketFormClarification),
      'main good till dropdown': self.container.element(self.data.mainOrderArea).element(self.data.primaryArea.goodTillDropdown),
      'oco good till dropdown': self.container.element(self.data.ocoOrderArea).element(self.data.primaryArea.goodTillDropdown),
      'market status title': self.container.element(self.data.marketStatus.title),
      'ticket failure': self.container.element(self.data.confirmationSection['ticket failure']),
      'error message': self.container.element(self.data.confirmationSection.error),
      'attached order confirmation': self.container.element(self.data.confirmationSection['attached order confirmation'])
    };

    const el = await elements[elementName].waitReady(6000);

    return (await el.getText()).trim();
  }

  async clearField(name: string) {
    name = name.toLowerCase();
    const self = this;
    let inputs;
    inputs = {
      quantity: self.container.element(self.data.primaryArea.quantityInput),
    };
    const el = await inputs[name].waitReady(1000);
    // workaround, since clear() method doesn't update angular model
    process.env.npm_config_browser === 'safari' ? await el.clear() :
    await el.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));
  }

  async fillInputWithValue(name: string, value, type = '') {
    name = name.toLowerCase();
    const self = this;
    let inputs;
    const order = type === '' ? self.container : self.container.element(self.data[`${type}OrderArea`]);

    inputs = {
      'order price': order.all(self.data.primaryArea.orderPriceInput).get(0),
      quantity: order.all(self.data.primaryArea.quantityInput).get(0),
      'close quantity': order.element(self.data.closeSection.quantityInput)
    };

    const el = await inputs[name].waitReady(1000);
    await el.clear();
    await el.sendKeys(value);
  }

  async isElementActive(name: string, type = '') {
    name = name.toLowerCase();
    const self = this;
    const order = type === '' ? self.container : self.container.element(self.data[`${type}OrderArea`]);

    const elements = {
      'order price': order.all(self.data.primaryArea.orderPriceInput).get(0),
      quantity: order.all(self.data.primaryArea.quantityInput).get(0),
      'close quantity': order.element(self.data.closeSection.quantityInput)
    };

    const el = await elements[name].waitReady(1000);
    const activeEl = await browser.driver.switchTo().activeElement();
    const elHtml = await browser.executeScript('return arguments[0].outerHTML;', el.getWebElement());
    const activeHtml = await browser.executeScript('return arguments[0].outerHTML;', activeEl);

    return elHtml === activeHtml;
  }

  async selectItemType(type) {
    type = type.toLowerCase();
    const label = this.container.all(this.data.mainLabels).filter((lab) => {
      return lab.getText()
        .then((text) => {
          return text.toLowerCase().trim().includes(type);
        });
    }).first();

    await label.waitReady(10000);
    await label.click();
    const cls = await label.getAttribute('class');
    if (!cls.includes('selected')) {
      await helper.sleep(1000);
      await label.click();
    }
  }

  async submit() {
    const prices = { sell: null, buy: null };
    const cls = await this.container.element(this.data.submitBtn).getAttribute('class');
    if (cls.includes('invalid')) {
      throw new Error(' Submit button is not active! ');
    } else {
      await this.container.element(this.data.submitBtn).click();
    }
    const button = await this.container.element(this.data.okBtn).waitReady(3000);
    await helper.sleep(50);
    prices.sell = (await this.container.element(this.data.sellLabel).element(by.css('.price__value')).getText()).trim();
    prices.buy = (await this.container.element(this.data.buyLabel).element(by.css('.price__value')).getText()).trim();
    await button.click();
    await this.container.waitMissing();

    return prices;
  }

  async getPrice(type, ticketType = '') {
    const price = ticketType === '' ?
      (await this.container.element(this.data[`${type}Label`]).element(by.css('.price__value')).getText()).trim()
    : (await this.container.all(this.data[ticketType]).get(0).element(this.data[`${type}Label`]).element(by.css('.price__value')).getText()).trim();

    return price;
  }

  async clickOnButton(buttonName) {
    const el = await this.container.element(this.data[`${buttonName}Btn`]).waitReady(2000);
    await el.click();
  }

  async clickOnLabel(labelName) {
    const el = await this.container.element(this.data[`${labelName}Label`]).waitReady(2000);
    await el.click();
  }

  async clickOnLink(linkName, type = '') {
    const self = this;
    const order = type === '' ? self.container : self.container.element(self.data[`${type}OrderArea`]);
    const el = await order.element(this.data[`${linkName}Link`]).waitReady(2000);
    await el.click();
  }

  clickAddStopLimit(ticketType = 'main') {
    ticketType = ticketType === '' ? 'main' : ticketType;
    const order = ticketType === '' ? this.container : this.container.element(this.data[`${ticketType}OrderArea`]);

    return order.element(this.data.addStopLimitLink).click();
  }

  async clickOnElement(elementName) {
    const mainOrder = this.container.element(this.data.mainOrderArea);
    const ocoOrder = this.container.element(this.data.ocoOrderArea);
    const main = this.container.all(this.data.main).get(0);
    const oco = this.container.all(this.data.oco).get(0);
    const elements = {
      'main advanced ticket link': mainOrder.element(this.data.advancedTicketLink),
      'main sell label': main.element(this.data.sellLabel),
      'main buy label': main.element(this.data.buyLabel),
      'oco advanced ticket link': ocoOrder.element(this.data.advancedTicketLink),
      'oco sell label': oco.element(this.data.sellLabel),
      'oco buy label': oco.element(this.data.buyLabel),
      'create an order link': mainOrder.element(this.data.marketStatus.createAnOrderLink)
    };

    const el = await elements[elementName].waitReady(2000);
    await el.click();
  }

  async hover(elementName, ticketType = 'main') {
    elementName = elementName.toLowerCase();
    const self = this;

    ticketType = ticketType === '' ? 'main' : ticketType;
    const order = ticketType === '' ? self.container : self.container.element(self.data[`${ticketType}OrderArea`]);
    const elements = {
      'hedging info icon': order.element(self.data.hedgeInfoIcon)
    };
    await elements[elementName].waitPresent(5000);
    await elements[elementName].scrollIntoView();
    await elements[elementName].hover();
  }

  async isControlDisabled(name) {
    const self = this;
    const control = {
      'submit button':  self.container.element(self.data.submitBtn),
      'standard ticket link': self.container.element(self.data.standardTicketLink),
      'hedge toggle': self.container.element(self.data.hedgingToggleBtn),
      'main good till dropdown': self.container.element(self.data.mainOrderArea).element(self.data.primaryArea.goodTillDropdown),
      'oco good till dropdown': self.container.element(self.data.ocoOrderArea).element(self.data.primaryArea.goodTillDropdown),
      'close quantity': self.container.element(self.data.primaryArea.quantityInput)
    };

    const el = await control[name].waitReady(3000);
    const cls = await el.getAttribute('class');

    switch (name) {
      case 'hedge toggle':
        return cls.includes('off');
      case 'close quantity':
        const attribute = await el.getAttribute('disabled');

        return attribute === 'true';
      default:
        return cls.includes('disabled');
    }
  }

  getPlaceholder(name) {
    const self = this;
    const field = {
      quantity: self.container.all(self.data.primaryArea.quantityInput).get(0),
      'close quantity': self.container.element(self.data.closeSection.quantityInput)
    };

    return field[name].getAttribute('placeholder');
  }

  getLabelColor(labelName) {
    return this.container.element(this.data[`${labelName}Label`]).getCssValue('background-color');
  }

  async isElementPresent(elementName, ticketType = 'main', state = true) {
    elementName = elementName.toLowerCase();
    const self = this;

    ticketType = ticketType === '' ? 'main' : ticketType;
    const order = ticketType === '' ? self.container : self.container.element(self.data[`${ticketType}OrderArea`]);

    const elements = {
      'sell label': self.container.all(self.data[ticketType]).get(0).element(self.data.sellLabel),
      'buy label': self.container.all(self.data[ticketType]).get(0).element(self.data.buyLabel),
      'ticket form clarification': self.container.element(self.data.ticketFormClarification),
      'order price': order.all(self.data.primaryArea.orderPriceInput).get(0),
      quantity: order.all(self.data.primaryArea.quantityInput).get(0),
      'standard ticket link': order.element(self.data.standardTicketLink),
      'advanced ticket link': order.element(self.data.advancedTicketLink),
      'oco link': self.container.element(self.data.ocoLink),
      'add stop limit dropdown link': order.element(self.data.addStopLimitLink),
      'hedging toggle': order.element(self.data.hedgingToggleBtn),
      'hedging info icon': order.element(self.data.hedgeInfoIcon),
      'hedging status': order.element(self.data.hedgingStatus),
      'good till dropdown': order.element(self.data.primaryArea.goodTillDropdown),
      'closed icon': self.container.element(self.data.marketStatus.closedMarketIcon),
      'call to trade': self.container.element(self.data.marketStatus.callToTradeMarketIcon),
      'status description': self.container.element(self.data.marketStatus.description),
      'create an order link': self.container.element(self.data.marketStatus.createAnOrderLink),
      'close section': self.container.element(self.data.closeSection.label),
      'edit section': self.container.element(self.data.editLabel)
    };
    await elements[elementName].waitReady(4000)
      .then(() => null, () => null);

    if (state) {
      return elements[elementName].isDisplayed();
    } else {
      return elements[elementName].isPresent();
    }
  }

  async getStopLimitDropdownOptions() {
    const textArr: any = await this.container.element(this.data.controls).element(this.data.addStopLimitDropdown)
                         .element(by.tagName('ul')).all(by.tagName('li')).getText();

    return textArr.map(t => t.trim());
  }

  selectStopLimitDropdownOption(nameOrNumber) {
    let option;
    if (typeof nameOrNumber === 'number') {
      option = this.container.element(this.data.controls).element(this.data.addStopLimitDropdown)
                             .element(by.tagName('ul')).all(by.tagName('li')).get(nameOrNumber);
    } else {
      option = this.container.element(this.data.controls).element(this.data.addStopLimitDropdown)
                             .element(by.tagName('ul')).all(by.tagName('li')).filter((opt) => {
        return opt.getText()
          .then((text) => {
            return text.toLowerCase().trim().includes(nameOrNumber.toLowerCase());
          });
      }).first();
    }

    return option.click();
  }

  getNumberOfLinkedOrders() {
    return this.container.all(by.css('.linked-orders > li')).count();
  }

  isElementVisible(ticketType, elem) {
    elem = elem.toLowerCase();
    const self = this;
    let input;
    switch (ticketType) {
      case 'main': {
        const mainOrder = self.container.element(self.data.mainOrderArea);
        input = {
          'order price': mainOrder.element(self.data.primaryArea.orderPriceInput),
          'hedging tooltip': mainOrder.element(self.data.hedgeTooltip),
          quantity: mainOrder.element(self.data.primaryArea.quantityInput)
        };
        break;
      }
      case 'oco': {
        const ocoOrder = self.container.element(self.data.mainOrderArea);
        input = {
          'order price': ocoOrder.element(self.data.primaryArea.orderPriceInput),
          'hedging tooltip': ocoOrder.element(self.data.hedgeTooltip),
          quantity: ocoOrder.element(self.data.primaryArea.quantityInput)
        };
        break;
      }
      default: {
        input = {
          'ticket form clarification': self.container.element(self.data.ticketFormClarification),
          'hedging tooltip': self.container.element(self.data.hedgeTooltip)
        };
      }
    }

    return input[elem].waitReady(2000)
      .then(() => true, () => false);
  }

  getValidationMessage(ticketType, field) {
    const orderValidations = ticketType === '' ? this.container.all(this.data.primaryArea.validation)
      : this.container.element(this.data[`${ticketType}OrderArea`]).all(this.data.primaryArea.validation);

    if (ticketType === '' && field === 'quantity') {
      return orderValidations.get(0).getText()
        .then((text) => text.trim());
    } else {
      if (field === 'price') {
        return browser.wait(() => {
          return orderValidations.count()
            .then((count) => helper.sleepIfFalse(count > 0));
        }, 3000)
          .then(() => orderValidations.get(0).getText())
          .then((text) => text.trim());
      } else if (field === 'quantity') {
        return browser.wait(() => {
          return orderValidations.count()
            .then((count) => helper.sleepIfFalse(count > 1));
        }, 3000)
          .then(() => orderValidations.get(1).getText())
          .then((text) => text.trim());
      }
    }
  }

  expandApplicabilityDropdown() {
    return this.container.element(this.data.mainOrderArea).element(this.data.primaryArea.goodTillDropdown).click();
  }

  async getApplicabilityDropdownOptions() {
    const textArr: any = await this.container.element(this.data.mainOrderArea).element(this.data.primaryArea.goodTillDropdown)
            .all(by.css('.dropdown__content > ul > li')).getText();

    return textArr.map(t => t.trim());
  }

  selectApplicability(nameOrNumber) {
    let applicability;
    const self = this;
    if (typeof nameOrNumber === 'number') {
      applicability = self.container.element(this.data.mainOrderArea).element(self.data.primaryArea.goodTillDropdown)
      .all(by.css('.dropdown__content > ul > li')).get(nameOrNumber);
    } else {
      applicability = self.container.element(this.data.mainOrderArea).element(self.data.primaryArea.goodTillDropdown)
                                    .element(by.cssContainingText('.dropdown__content > ul > li', nameOrNumber.toUpperCase()));
    }

    return applicability.click();
  }

  async getMarginCalcText() {
    return (await this.container.element(this.data.marginCalculator.root).getText()).trim();
  }

  async waitForConfirmationMessage(timeout = 2000) {
    await this.container.element(this.data.confirmationSection.header).waitReady(timeout);
  }

  async getCssValue(name: string, ticketType, cssProperty) {
    name = name.toLowerCase();
    const self = this;

    ticketType = ticketType === '' ? 'main' : ticketType;
    const order = ticketType === '' ? self.container : self.container.element(self.data[`${ticketType}OrderArea`]);

    const elements = {
      quantity: order.all(self.data.primaryArea.quantityInput).get(0),
    };

    return (await elements[name].getCssValue(cssProperty)).trim();
  }

}

