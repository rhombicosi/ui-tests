import { browser, by, element, ElementFinder } from 'protractor';

import { Panel } from './panel';


export class EconomicCalendarPanel extends Panel {
  private data = {
    iframeRoot: by.tagName('iframe'),
    parts: {
      header: by.id('fxst_filter'),
      body: by.id('fxst_grid'),
      bodyContent: {
        dateRow: by.css('.fxst-dateRow>td'),
        eventRow: by.css('.fxit-eventrow'),
        eventDetailRow: by.css('.fxst-eventDetails')
      }
    },
    elementToSwitch: by.css('.news-economic__toggle')
  };

  constructor(panelRoot: ElementFinder) {
    super(panelRoot);
    this.name = 'Economic Calendar';
  }

  async isHeaderVisible() {
    await this.container.element(this.data.iframeRoot).waitReady(10000);
    await browser.switchTo().frame(this.container.element(this.data.iframeRoot).getWebElement());
    await element(this.data.parts.header).waitReady(20000);
    const state = await element(this.data.parts.header).isPresent();
    await browser.switchTo().defaultContent();

    return state;
  }

  async isBodyVisible() {
    await this.container.element(this.data.iframeRoot).waitReady(15000);
    await browser.switchTo().frame(this.container.element(this.data.iframeRoot).getWebElement());
    await element(this.data.parts.body).waitReady(20000);
    const state = await element(this.data.parts.body).isPresent();
    await browser.switchTo().defaultContent();

    return state;
  }

  switchToEconomicCalendar() {
    return element.all(this.data.elementToSwitch).get(1).click();
  }

  async switchFilter(filterName: string) {
    await this.container.element(this.data.iframeRoot).waitReady(15000);
    await browser.switchTo().frame(this.container.element(this.data.iframeRoot).getWebElement());

    const filterButton = element(by.id('fxst-calendar-filter-dateshortcuts')).all(by.tagName('a'))
      .filter((opt) => {
        return opt.getText()
          .then((text) => {
            return text.toLowerCase().trim().includes(filterName.toLowerCase());
          });
      }).first();

    await filterButton.waitReady(2000);
    await filterButton.click();
    await browser.switchTo().defaultContent();
  }

  async getEventDates() {
    await this.container.element(this.data.iframeRoot).waitReady(15000);
    await browser.switchTo().frame(this.container.element(this.data.iframeRoot).getWebElement());
    const textArr: any = await element.all(this.data.parts.bodyContent.dateRow).getText();
    await browser.switchTo().defaultContent();

    return textArr.map(t => t.trim());
  }
}
