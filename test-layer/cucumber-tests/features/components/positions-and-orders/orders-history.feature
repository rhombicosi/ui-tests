@order-history
Feature: Order History
  As a user
  I can open Order History panel
  So all functionality of Order history panel should work as described

  Background:
    Given I am logged in to the application with default state

  @quick @smoke @EUR/USD @orders-history-list-main-functionality
  Scenario: Orders history list main functionality
    Then the 'Positions And Orders' panel should be visible
    When I add order with parameters:
      | MarketName | EUR/USD |
      | Direction  | Sell    |
      | Quantity   | 1000    |
      | Price      | 100     |
    And I delete 'Order' 'EUR/USD'
    And I select 'Order History' list
    Then 'Order History' item should be active
    And 'Order History' list should be visible
    Then 'Order History' panel table header should contain:
      | columnName  |
      | DATE/TIME   |
      | ORDER       |
      | ORDER PRICE |
      | GOOD 'TIL   |
      | STATUS      |
      | LAST EDIT   |
    When I hover 'previously added' order
    When I click on 'dropdown arrow' in the 'current' order
    Then the 'current' order dropdown options should be:
      | Past order details                         |
      | Market 360 Chart, news, market information |
      | Buy Trade                                  |
      | Sell Trade                                 |
      | Chart                                      |
    When I select 'Past order details' in dropdown menu in 'current' market
    Then the 'History Detail' panel should be visible
    When I close panel
    Then the 'Positions And Orders' panel should be visible
    And I am on the 'Order History' list
    When I complete 'previously added' market dropdown with value 'Market 360 Chart, news, market information'
    Then tabs count should be '3'
    And 'EUR/USD' tab should be active

  @quick @smoke @EUR/USD @GBP/USD-DFT @order-history-data-check
  Scenario Outline: Order history data check
    Then the 'Positions And Orders' panel should be visible
    And I add order with parameters:
      | MarketName | <Market name> |
      | Direction  | <Direction>   |
      | Quantity   | <Quantity>    |
      | Price      | <Price>       |
    And I delete 'Order' '<Market name>'
    And I select 'Order History' list
    When I get 'Order' History for '<Account type>'
    Then Order History '1'st table row with cell 'name' should contain correct 'MarketName' data
    Then Order History '1'st table row with cell 'date' should contain correct 'CreatedDateTimeUtc' data
    Then Order History '1'st table row with cell 'quantity' should contain correct 'OriginalQuantity' data
    Then Order History '1'st table row with cell 'price' should contain correct 'TriggerPrice' data
    Then Order History '1'st table row with cell 'type' should contain correct 'OrderApplicabilityId' data
    Then Order History '1'st table row with cell 'status' should contain correct 'StatusId' data
    Then Order History '1'st table row with cell 'last-edit' should contain correct 'LastChangedDateTimeUtc' data
    And I complete '1'st market dropdown with value 'Past order details'
    Then the 'History Detail' panel should be visible
    And market name should be 'correct'
    Then 'Order ID' row should contain correct 'OrderId' data form history
    Then 'Currency' row should contain correct 'Currency' data form history
    Then 'Trade price' row should contain correct 'TriggerPrice' data form history

    Examples:
      | Market name    | Direction | Quantity  | Price | Account type |
      | GBP/USD DFT    | Sell      | 1         | 3     | DFT          |
      | EUR/USD        | Buy       | 1000      | 100   | CFD          |

