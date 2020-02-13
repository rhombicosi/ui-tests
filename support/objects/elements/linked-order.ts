import { browser, element, by, ElementFinder, protractor } from 'protractor';


export class LinkedOrder {
  protected container: ElementFinder;
  protected data = {
    rows: {
      root: by.css('.row'),
      checkbox: by.css('.custom-checkbox'),
      'checkbox input': by.css('.custom-checkbox__input'),
      'trash icon': by.css('.icon-trash-can'),
      label: by.css('.row__label'),
      dropdown: by.css('.linked-order__available-types'),
      'linked order types': by.css('.icon-triangle-down'),
      link: by.css('.link'),
      price: by.css('[placeholder="price"]'),
      'price border': by.css('.at-lo-price-input'),
      ccy: by.css('.currency-label'),
      applicability: by.css('.applicability-dropdown'),
      'p/l': by.css('[placeholder="P/L"]'),
      'p/l border': by.css('.at-lo-profit-loss__input'),
      points: by.css('[placeholder="points"]'),
      'points border':  by.css('[formcontrolname="points"]'),
      'points away': by.css('[placeholder="points away"]'),
      quantity: by.css('[placeholder="quantity"]'),
      'date picker': by.css('my-date-picker'),
      'calendar icon': by.css('.icon-mydpcalendar'),
      currentDayBtn: by.css('.markcurrday'),
      'time picker': by.css('app-timepicker'),
      time: by.css('.time-picker'),
      'undo button': by.css('.linked-orders__undo-button'),
      delitionMessage: by.css('.linked-orders__deletion-message'),
      // validation: by.css('.row__validations')
      validation: by.css('app-show-errors > ul > li')
    }
  };

  constructor(container: ElementFinder) {
    this.container = container;
  }

  async getInputValue(name: string) {
    name = name.toLowerCase();

    if (name === 'applicability') {
      return (await this.container.element(by.css('.applicability-dropdown>.dropdown>span')).getText()).trim();
    } else if (name === 'ccy') {
      return (await this.container.element(this.data.rows[name]).getText()).trim();
    }

    return (await this.container.element(this.data.rows[name]).getAttribute('value')).trim();
  }

  async getBorderColor(name: string) {
    name = name.toLowerCase();

    return (await this.container.element(this.data.rows[name]).getCssValue('border-color')).trim();
  }

  async getCssValue(name: string, cssProperty) {
    name = name.toLowerCase();

    return (await this.container.element(this.data.rows[name]).getCssValue(cssProperty)).trim();
  }

  async fillInputWithValue(name: string, value) {
    name = name.toLowerCase();
    const val = this.container.element(this.data.rows[name]);

    if (name === 'time') {
      await val.waitReady(2000);
      await val.sendKeys(value);
    } else {
      await val.waitReady(2000);
      await val.clear();
      await val.sendKeys(value);
    }
  }

  async clearField(name: string) {
    name = name.toLowerCase();
    const el = await this.container.element(this.data.rows[name]).waitReady(1000);
    // workaround, since clear() method doesn't update angular model
    await el.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));
  }

  isElementPresent(elementName) {
    elementName = elementName.toLowerCase();
    const webElement = this.container.element(this.data.rows[elementName]);

    return webElement.isPresent();
  }

  async isElementEnabled(elementName) {
    const el = await this.container.element(this.data.rows[elementName]).waitReady(5000);
    return el.isEnabled();
  }

  removeLinkedOrder() {
    return this.container.element(this.data.rows['trash icon']).click();
  }

  expandApplicabilityDropdown() {
    return this.container.element(this.data.rows.applicability).click();
  }

  async expandDropdown(dropdownName) {
    const el = await this.container.element(this.data.rows[dropdownName]).waitReady(5000);
    return el.click();
  }

  async selectStopType(type) {
    const stop = this.container.all(this.data.rows.link).filter((l) => {
      return l.getText()
        .then((text) => {
          return text.toLowerCase().trim().includes(type);
        });
    }).first();

    await stop.waitReady(10000);
    await stop.click();
  }

  async getApplicabilityDropdownOptions() {
    const textArr: any = await this.container.element(this.data.rows.applicability).all(by.css('.dropdown__content > ul > li')).getText();

    return textArr.map(t => t.trim().replace(/\s+/g, ' '));
  }

  selectApplicability(nameOrNumber) {
    let applicability;
    const self = this;
    if (typeof nameOrNumber === 'number') {
      applicability = self.container.element(self.data.rows.applicability).all(by.css('.dropdown__content > ul > li')).get(nameOrNumber);
    } else {
      applicability = self.container.element(self.data.rows.applicability)
                                    .element(by.cssContainingText('.dropdown__content > ul > li', nameOrNumber.toUpperCase()));
    }

    return applicability.click();
  }

  async selectCurrentDate() {
    await this.container.element(this.data.rows['calendar icon']).click();
    await this.container.element(this.data.rows.currentDayBtn).click();
  }

  getField(fieldName): ElementFinder {
    return this.container.element(this.data.rows[fieldName]);
  }

  checkCheckbox() {
    return this.container.element(this.data.rows.checkbox).click();
  }

  async isChecked() {
    const is = await this.container.element(this.data.rows['checkbox input']).getAttribute('checked');
      if (is) {
        return true;
      } else {
        return false;
      }
  }

  async getValidationMessage() {
    const el = await this.container.element(this.data.rows.validation).waitReady(5000);

    return (await el.getText()).trim();
  }

  getPlaceholder(name) {
    return this.container.element(this.data.rows[name]).getAttribute('placeholder');
  }
}

