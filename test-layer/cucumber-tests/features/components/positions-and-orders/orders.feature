@orders
Feature: Orders
  As a user
  I can open Positions And Orders panel and manage Orders list
  So all functionality of Orders list should work fine

  Background:
    Given I am logged in to the application with default state

  @quick @smoke @GBP/USD @active-orders
  Scenario: Active orders
    Then the 'Positions And Orders' panel should be visible
    When I select 'Orders' list
    Then 'Orders' item should be active
    When I add order with parameters:
      | MarketName | GBP/USD |
      | Direction  | Buy     |
      | Quantity   | 1000    |
      | Price      | 100     |
    Then the 'previously added' order should be present on the list
    And the 'previously added' order 'quantity' cell should contain 'correct' data
    And the 'previously added' order 'order price' cell should contain 'correct' data
    And the 'previously added' order current price cell should change with time
    And the 'previously added' order 'stop price' cell should contain 'set' word
    And the 'previously added' order 'limit price' cell should contain 'set' word
    And the 'previously added' order 'delete' cell should contain 'Delete' word
    When I close 'Positions And Orders' panel
    And I add new 'Positions And Orders' panel in 'Default Workspace' tab
    And I select 'Orders' list
    Then the 'previously added' order should be present on the list
    And the 'previously added' order 'quantity' cell should contain 'correct' data
    And the 'previously added' order 'order price' cell should contain 'correct' data
    When I click on 'stop price' in the 'previously added' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'edit order'
    When I close 'Deal ticket' panel
    And I make 'Positions And Orders' panel active
    Then I am on the 'Orders' list
    When I click on 'limit price' in the 'previously added' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'edit order'
    When I close 'Deal ticket' panel
    And I make 'Positions And Orders' panel active
    Then I am on the 'Orders' list
    When I click on 'edit icon' in the 'previously added' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'edit order'
    When I close 'Deal ticket' panel
    And I make 'Positions And Orders' panel active
    Then I am on the 'Orders' list
    When I click on 'order price' in the 'previously added' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'edit order'
    When I close 'Deal ticket' panel
    And I make 'Positions And Orders' panel active
    Then I am on the 'Orders' list
    When I click on 'dropdown arrow' in the 'previously added' market
    Then the 'current' market dropdown options should be:
      | Set Price Alert                            |
      | Edit Order                                 |
      | Order details                              |
      | Market 360 Chart, news, market information |
      | Buy Trade                                  |
      | Sell Trade                                 |
      | Chart                                      |
    When I select 'Set price alert' in dropdown menu in 'previously added' market
    Then the 'Deal ticket' panel should be visible
    And 'set alert' ticket type should be 'selected'
    When I close 'Deal ticket' panel
    And I make 'Positions And Orders' panel active
    Then I am on the 'Orders' list
    When I complete 'previously added' market dropdown with value 'Edit Order'
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'edit order'
    When I close 'Deal ticket' panel
    And I make 'Positions And Orders' panel active
    Then I am on the 'Orders' list
    When I complete 'previously added' market dropdown with value 'Order details'
    Then the 'Details' panel should be visible
    And market name should be 'correct'
    And 'Stop' row should contain 'Set' word
    And 'Limit' row should contain 'Set' word
    And 'Good 'til' row should contain 'Cancelled' word
    And 'Date changed' row should contain correct date
    And 'Order ID' row should contain correct ID
    And 'Status' row should contain 'Accepted' word
    And 'Currency' row should contain 'USD' word
    When I close 'Details' panel
    And I make 'Positions And Orders' panel active
    Then I am on the 'Orders' list
    When I complete 'previously added' market dropdown with value 'Market 360 chart, news, market information'
    Then 'GBP/USD' tab should be active
    When I switch to 'Default Workspace' workspace tab
    Then 'Default Workspace' tab should be active
    And the 'Positions And Orders' panel should be visible
    And I am on the 'Orders' list
    When I complete 'previously added' market dropdown with value 'Buy Trade'
    Then the 'Deal ticket' panel should be visible
    And 'trade' ticket type should be 'selected'
    And trade direction should be 'buy'
    And 'quantity' input should be active
    When I close 'Deal ticket' panel
    And I make 'Positions And Orders' panel active
    Then I am on the 'Orders' list
    When I complete 'previously added' market dropdown with value 'Sell Trade'
    Then the 'Deal ticket' panel should be visible
    And 'trade' ticket type should be 'selected'
    And trade direction should be 'sell'
    And 'quantity' input should be active
    When I close 'Deal ticket' panel
    And I close 'Chart' panel
    And I make 'Positions And Orders' panel active
    Then I am on the 'Orders' list
    When I complete 'previously added' market dropdown with value 'Chart'
    Then the 'Chart' panel should be visible
    And the header of 'Chart' panel is 'GBP/USD'
    When I close 'Chart' panel
    And I make 'Positions And Orders' panel active
    Then I am on the 'Orders' list
    And '1' 'previously added' order should be on the list
    When I add order with parameters:
      | MarketName | GBP/USD |
      | Direction  | Buy     |
      | Quantity   | 1000    |
      | Price      | 100     |
    Then '2' 'previously added' orders should be on the list
    When I add order with parameters:
      | MarketName | GBP/USD |
      | Direction  | Sell    |
      | Quantity   | 1000    |
      | Price      | 100     |
    Then '3' 'previously added' orders should be on the list
    When I add order with parameters:
      | MarketName | GBP/USD |
      | Direction  | Sell    |
      | Quantity   | 1000    |
      | Price      | 100     |
    Then '4' 'previously added' orders should be on the list
    When I click on 'delete' in the '1'st order
    And I click on 'delete cancel' in the '1'st order
    Then '4' 'previously added' orders should be on the list
    When I click on 'delete' in the '1'st order
    And I click on 'delete confirm' in the '1'st order
    Then '3' 'previously added' orders should be on the list
    # OCO order for the market tested in Place Sell/Buy OCO order with stop/limit - CFD/Spread markets

  @EUR/USD @orders-list-main-functionality
  Scenario: Orders list main functionality
    When I add new tab
    And I add new 'Positions And Orders' panel in 'New workspace 2' tab
    And I resize panel with:
      | height | 600 |
      | width  | 800 |
    And I select 'Orders' list
    And I add order with parameters:
      | MarketName | EUR/USD |
      | Direction  | Sell    |
      | Quantity   | 1000    |
      | Price      | 100     |
    Then the 'previously added' order should be present on the list
    And the 'previously added' order should be 'black' when it is 'hovered'
    And the 'previously added' order should be 'white' when it is 'not hovered'
    And the 'previously added' order should be colored correctly
    And the 'previously added' order 'quantity' cell should contain 'correct' data
    And the 'previously added' order 'order price' cell should contain 'correct' data
    And the 'previously added' order current price cell should change with time
    And the 'previously added' order 'stop price' cell should contain 'set' word
    And the 'previously added' order 'limit price' cell should contain 'set' word
    When I hover 'previously added' order
    Then the 'current' order 'dropdown arrow' should be visible
    When I click on 'dropdown arrow' in the 'current' order
    Then the 'current' order dropdown options should be:
      | Edit Order                                 |
      | Set price alert                            |
      | Order details                              |
      | Market 360 Chart, news, market information |
    When I click on 'dropdown arrow' in the 'current' order
    When I complete 'previously added' order dropdown with value 'edit order'
    Then the 'Deal ticket' panel should be visible
    When I close panel
    And I make 'Positions And Orders' panel active
    Then I am on the 'Orders' list
    When I click on 'delete' in the 'previously added' order
    And I click on 'delete confirm' in the 'previously added' order
    And I make 'Positions And Orders' panel active
    And I am on the 'Orders' list
    Then the 'previously added' order should be not present on the list

  @GBP/USD @orders-details-panel
  Scenario: Orders details panel
    Then the 'Positions And Orders' panel should be visible
    When I select 'Orders' list
    And I add order with parameters:
      | MarketName | GBP/USD |
      | Direction  | Buy     |
      | Quantity   | 1000    |
      | Price      | 100     |
    Then the 'previously added' order should be present on the list
    When I complete 'previously added' market dropdown with value 'order details'
    Then the 'Details' panel should be visible
    And market name should be 'correct'
    And 'Stop' row should contain 'Set' word
    And 'Limit' row should contain 'Set' word
    And 'Good 'til' row should contain 'Cancelled' word
    And 'Date changed' row should contain correct date
    And 'Order ID' row should contain correct ID
    And 'Status' row should contain 'Accepted' word
    And 'Currency' row should contain 'USD' word
    When I click on the value of 'Stop' row
    Then the 'Deal ticket' panel should be visible
    When I close panel
    Then the 'Details' panel should be visible
    When I click on the value of 'Limit' row
    Then the 'Deal ticket' panel should be visible


  @EUR/USD @orders-stop/limit-functionality
  Scenario: Orders Stop/Limit functionality
    Then the 'Positions And Orders' panel should be visible
    And I select 'Orders' list
    And I add order with parameters:
      | MarketName | EUR/USD |
      | Direction  | Buy    |
      | Quantity   | 1000    |
      | Price      | 100     |
    Then the 'previously added' order should be present on the list
    When I click on 'stop price' in the 'previously added' market
    Then the 'Deal ticket' panel should be visible
    When I check 'Stop' checkbox
    And I fill the '1'st normal stop linked order 'price' with value 'sell*1.01'
    And I submit the form
    Then the 'Positions And Orders' panel should be visible
    And I am on the 'Orders' list
    And the 'previously added' market 'stop price' should contain correct data
    And the 'previously added' market 'limit price' cell should contain 'set' word
    When I click on 'limit price' in the 'previously added' market
    Then the 'Deal ticket' panel should be visible
    When I check 'Limit' checkbox
    And I uncheck 'Stop' checkbox
    And I fill the '2'nd limit linked order 'price' with value '101'
    And I submit the form
    Then the 'Positions And Orders' panel should be visible
    And I am on the 'Orders' list
    And the 'previously added' market 'stop price' cell should contain 'set' word
    And the 'previously added' market 'limit price' should contain correct data

  @EUR/CHF @amalgamated-orders
  Scenario: Amalgamated orders
    Then the 'Positions And Orders' panel should be visible
    And I select 'Orders' list
    And I add order with parameters:
      | MarketName | EUR/CHF |
      | Direction  | Buy     |
      | Quantity   | 1000    |
      | Price      | 100     |
    And I add order with parameters:
      | MarketName | EUR/CHF |
      | Direction  | Buy     |
      | Quantity   | 2000    |
      | Price      | 120     |
    And I wait for '500'
    Then the 'previously added' order should be present on the list
    And the 'previously added' market should be displayed as 'multi'
    When I expand 'previously added' multi-market
    Then the 'previously added' multi-market should be 'expanded'
    And the 'previously added' market's sub-markets count should be '2'
    And the 'previously added' market 'quantity' cell should contain 'buy 3000' data
    And the 'previously added' market 'stop price' cell should contain 'multiple' word
    And the 'previously added' market 'limit price' cell should contain 'multiple' word
    And the 'previously added' market's sub-market 1 'quantity' cell should contain 'buy 1000' data
    And the 'previously added' market's sub-market 2 'quantity' cell should contain 'buy 2000' data
    And the 'previously added' market's sub-market 1 'order price' cell should contain '100' data
    And the 'previously added' market's sub-market 2 'order price' cell should contain '120' data
    And the 'previously added' market's sub-market 1 'stop price' cell should contain 'Set' word
    And the 'previously added' market's sub-market 1 'limit price' cell should contain 'Set' word
    And the 'previously added' market's sub-market 2 'stop price' cell should contain 'Set' word
    And the 'previously added' market's sub-market 2 'limit price' cell should contain 'Set' word
    And I add order with parameters:
      | MarketName | EUR/CHF |
      | Direction  | Buy     |
      | Quantity   | 3000    |
      | Price      | 150     |
    And I wait for '500'
    Then the 'previously added' multi-market should be 'expanded'
    And the 'previously added' market's sub-markets count should be '3'
    And the 'previously added' market's sub-market 3 'quantity' cell should contain 'buy 3000' data
    And the 'previously added' market's sub-market 3 'order price' cell should contain '150' data
    And I add order with parameters:
      | MarketName | EUR/CHF |
      | Direction  | Sell    |
      | Quantity   | 4000    |
      | Price      | 160     |
    And I wait for '500'
    Then the 'previously added' multi-market should be 'expanded'
    And the 'previously added' market's sub-markets count should be '4'
    And the 'previously added' market's sub-market 4 'quantity' cell should contain 'sell 4000' data
    And the 'previously added' market's sub-market 4 'order price' cell should contain '160' data
    And the 'previously added' market 'quantity' cell should contain 'buy 2000' data
