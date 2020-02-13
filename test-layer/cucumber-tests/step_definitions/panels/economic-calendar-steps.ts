import { defineSupportCode } from 'cucumber';


defineSupportCode(function({ Given, When, Then }) {
  When(/^I switch '(.+)' filter within economic calendar$/, async function(filterName) {
    this.memory.filterName = filterName;
    await this.basePage.currentBoard.tabBody.currentPanel.switchFilter(filterName);
  });

  Then(/^all the panels parts should be loaded$/, async function() {
    const isHeaderVisible = await this.basePage.currentBoard.tabBody.currentPanel.isHeaderVisible();
    const isBodyVisible = await this.basePage.currentBoard.tabBody.currentPanel.isBodyVisible();

    this.expect(isHeaderVisible).to.equal(true);
    this.expect(isBodyVisible).to.equal(true);
  });
});
