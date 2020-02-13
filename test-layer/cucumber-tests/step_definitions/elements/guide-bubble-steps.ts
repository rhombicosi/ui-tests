import { defineSupportCode } from 'cucumber';
import { browser, element, by, ExpectedConditions } from 'protractor';


defineSupportCode(function({Given, When, Then}) {

  When(/^I click on '(.+)' in the guide bubble$/, async function(elementName) {
    await this.basePage.guideBubble.clickElement(elementName);
  });

  Then(/^guide bubble (?:'(.+)'|) ?should be (visible|invisible)$/, async function(elementName, visibility) {
    const expectedState = visibility === 'visible';
    let actualState: boolean;
    if (elementName) {
      actualState = await this.basePage.guideBubble.isElementVisible(elementName);
    } else {
      actualState = await this.basePage.guideBubble.isVisible();
    }
    this.expect(actualState).to.equal(expectedState);
  });

  Then(/^guide bubble '(.+)' text should be '(.+)'$/, async function(elementName, expectedText) {
    const actualText = await this.basePage.guideBubble.getElementText(elementName);
    this.expect(actualText.toLowerCase()).to.equal(expectedText.toLowerCase());
  });

  Then(/^other elements should be inactive$/, async function() {
    try {
      await this.basePage.header.click('help button')
        .then(() => {
          this.expect(`can't interact with elements outside guide bubble`).to.equal(`can interact with elements outside guide bubble`);
        });
    } catch (err) {
      this.expect(err.message).to.include('Other element would receive the click');
    }
  });

});
