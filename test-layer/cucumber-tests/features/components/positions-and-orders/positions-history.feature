@positions-history
Feature: Positions History
  As a user
  I can open Positions History panel
  So all functionality of Positions History panel should work as described

  Background:
    Given I am logged in to the application with default state

  @quick @smoke @EUR/USD @positions-history-list-main-functionality
  Scenario: Positions history list main functionality
    Then the 'Positions And Orders' panel should be visible
    When I add position with parameters:
      | MarketName | EUR/USD |
      | Direction  | Sell    |
      | Quantity   | 1000    |
    And I delete 'Position' 'EUR/USD'
    And I select 'Position History' list
    Then 'Position History' item should be active
    And 'Position History' list should be visible
    And 'Position History' panel table header should contain:
      | columnName     |
      | DATE/TIME      |
      | POSITION       |
      | POSITION PRICE |
      | REALISED P&L   |
    When I hover 'previously added' position
    And I click on 'dropdown arrow' in the 'current' position
    Then the 'current' position dropdown options should be:
      | Past position details                      |
      | Market 360 Chart, news, market information |
      | Buy Trade                                  |
      | Sell Trade                                 |
      | Chart                                      |
    When I select 'Past position details' in dropdown menu in 'current' market
    Then the 'History Detail' panel should be visible
    When I close panel
    Then the 'Positions And Orders' panel should be visible
    And I am on the 'Position History' list
    When I complete 'previously added' market dropdown with value 'Market 360 Chart, news, market information'
    Then tabs count should be '3'
    And 'EUR/USD' tab should be active

  @quick @smoke @EUR/USD @GBP/USD-DFT @position-history-data-check
  Scenario Outline: Position history data check
    Then the 'Positions And Orders' panel should be visible
    When I add position with parameters:
      | MarketName | <Market name> |
      | Direction  | <Direction>   |
      | Quantity   | <Quantity>    |
    And I delete 'Position' '<Market name>'
    And I select 'Position History' list
    And I get 'Position' History for '<Account type>'
    Then Position History '1'st table row with cell 'name' should contain correct 'MarketName' data
    And Position History '1'st table row with cell 'date' should contain correct 'ExecutedDateTimeUtc' data
    And Position History '1'st table row with cell 'quantity' should contain correct 'OriginalQuantity' data
    And Position History '1'st table row with cell 'price' should contain correct 'Price' data
    And Position History '1'st table row with cell 'realised profit/loss' should contain correct 'RealisedPnl' data
    When I complete '1'st market dropdown with value 'Past position details'
    Then the 'History Detail' panel should be visible
    And market name should be 'correct'
    And 'Order ID' row should contain correct 'OrderId' data form history
    And 'Currency' row should contain correct 'Currency' data form history
    And 'Date entered' row should contain correct 'ExecutedDateTimeUtc' data form history
    And 'Status' history row should contain 'Closed' word

    Examples:
      | Market name     | Direction | Quantity  | Account type |
      | EUR/USD         | Buy       | 1000      | CFD          |
      | GBP/USD DFT     | Sell      | 1         | DFT          |
