@tradeticket
Feature: Trade Ticket panel
  As a user
  I can open trade ticket panel
  So all functionality should work fine for the panel

  Background:
    Given I am logged in to the application with default state

  @quick @smoke @USD/JPY @GBP/USD-DFT @trade-ticket-standard-view-open-buy/sell-position-with-stop-and-limit-cfd/spread-market @wt-142 @wt-115
  Scenario Outline: Trade Ticket Standard View - Open Buy/Sell position with stop and limit - CFD/Spread market
    When I add new tab
    And I add new 'Watchlist' panel in 'New workspace 2' tab
    And I resize panel with:
      | height | 600  |
      | width  | 1000 |
    And I expand 'Popular Markets' watchlist
    And I click on '<Direction>' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    When I close panel
    Then the 'Deal ticket' panel should be invisible
    When I add new 'Watchlist' panel in 'New workspace 2' tab
    And I expand 'Popular Markets' watchlist
    And I click on '<Direction>' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    And 'trade' ticket type should be 'selected'
    And 'trade label' element text should be 'trade'
    And 'order label' element text should be 'order'
    And 'set alert label' element text should be 'set alert'
    And 'market info' element text should be '<Market name>'
    And the number of decimal places in <Direction> price button is correct for '<Market name>'
    And the number of decimal places in <Opposite direction> price button is correct for '<Market name>'
    And '<Opposite direction>' price should change with time
    And '<Direction>' price should change with time
    And the number of decimal places in <Direction> price button is correct for '<Market name>'
    And the number of decimal places in <Opposite direction> price button is correct for '<Market name>'
    And '<Market name>' 'quantity' placeholder should be correct
    And cursor is placed in the 'quantity' field
    And the '1'st normal stop linked order 'price' placeholder should be correct
    And the '1'st normal stop linked order 'points' placeholder should be correct
    And the '1'st normal stop linked order 'p/l' placeholder should be correct
    And the '<Market name>' '1'st normal stop linked order p/l currency sign should be correct
    And the '1'st normal stop order should contain fields:
      | itemName |
      | checkbox |
      | dropdown |
      | price    |
      | points   |
      | p/l      |
    And the '2'nd limit order should contain fields:
      | itemName |
      | checkbox |
      | label    |
      | price    |
      | points   |
      | p/l      |
    And the trade ticket standard view panel should contain items:
      | itemName             |
      | advanced ticket link |
    And 'hedging status' element text should be 'Hedging is OFF'
    And 'submit button' element should be disabled
    And 'submit button' element text should be 'Choose quantity'
    When I click on '<Opposite direction>' label
    Then the '<Opposite direction>' button should be '<Opposite color>' when it is clicked
    When I click on '<Direction>' label
    Then the '<Direction>' button should be '<Color>' when it is clicked
    When I fill 'quantity' with value '<Quantity>'
    Then 'submit button' element should be enabled
    And 'submit button' element text should be 'Place Trade'
    When I check 'stop' checkbox
    And I fill the '1'st normal stop linked order 'price' with value '<Stop price>'
    Then the '1'st normal stop linked order 'points' input should be autopopulated
    And the '1'st normal stop linked order 'p/l' input should be autopopulated
    And the '1'st normal stop linked order 'p/l' value should change with time
    And the '1'st normal stop linked order 'p/l' input should be autopopulated
    When I clear the '1'st normal stop linked order 'points' input field
    Then the '1'st normal stop linked order 'points' input should be blank
    And the '1'st normal stop linked order 'price' input should be blank
    And the '1'st normal stop linked order 'p/l' input should be blank
    And 'quantity' input value is 'correct'
    When I check 'limit' checkbox
    And I fill the '2'nd limit linked order 'price' with value '<Limit price>'
    Then the '2'nd limit linked order 'points' input should be autopopulated
    And the '2'nd limit linked order 'p/l' input should be autopopulated
    And the '2'nd limit linked order 'p/l' value should change with time
    And the '2'nd limit linked order 'p/l' input should be autopopulated
    When I clear the '2'nd limit linked order 'points' input field
    Then the '2'nd limit linked order 'points' input should be blank
    And the '2'nd limit linked order 'price' input should be blank
    And the '2'nd limit linked order 'p/l' input should be blank
    And 'quantity' input value is 'correct'
    When I fill the '1'st normal stop linked order 'price' with value '<Stop price>'
    And I fill the '2'nd limit linked order 'price' with value '<Limit price>'
    And I click on 'submit' button
    Then 'confirmation' element text should be 'Trade executed'
    And 'market name' element text should be '<Market name>'
    And open <Direction> '<Market name>' trade confirmation message should be correct
    When I click on 'ok' button
    And I add new 'Positions And Orders' panel in 'current' tab
    And I resize panel with:
      | height | 600  |
      | width  | 800  |
    Then the 'previously added' market should be present on the list

    Examples:
      | Market name | Quantity | Stop price | Limit price | Direction | Opposite direction | Color | Opposite color |
      | USD/JPY     | 1000     | 90         | 140         | buy       | sell               | blue  | red            |
      | GBP/USD DFT | 2        | 1.8        | 1           | sell      | buy                | red   | blue           |

  @quick @smoke @USD/JPY @GBP/USD-DFT @partially-close-buy/sell-position-cfd/spread-market
  Scenario Outline: Partially Close Buy/Sell Position - CFD/Spread market
    And I add position with parameters:
      | MarketName | <Market name> |
      | Direction  | <Direction>   |
      | Quantity   | <Quantity>    |
    Then the 'Positions And Orders' panel should be visible
    Then the 'previously added' market should be present on the list
    When I click on 'close' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'amend position'
    And 'market info' element text should be '<Market name>'
    And 'sell' price should change with time
    And 'buy' price should change with time
    And current simple position information should be correct
    And 'close' radiobutton should be 'selected'
    And 'close quantity' input should be predefined with '<Quantity>'
    And close info message should be correct
    And 'submit button' element should be enabled
    When I fill 'close quantity' with value '<Close quantity>'
    Then partially close info message should be correct
    When I click on 'submit' button
    Then 'confirmation' element text should be 'Trade Executed'
    And 'market name' element text should be '<Market name>'
    And partially close confirmation message should be correct
    When I make 'Positions And Orders' panel active
    Then the 'previously added' market 'position' cell should contain 'updated' data

    Examples:
      | Market name | Quantity | Close quantity | Direction |
      | USD/JPY     | 2000     | 1000           | buy       |
      | GBP/USD DFT | 2        | 1              | sell      |

  @quick @smoke @USD/JPY @GBP/USD-DFT @amend-buy/sell-position-cfd/spread-market @wt-116
  Scenario Outline: Amend Buy/Sell Position - CFD/Spread Market
    And I add position with parameters:
      | MarketName | <Market name> |
      | Direction  | <Direction>   |
      | Quantity   | <Quantity>    |
      | StopPrice  | <Stop price>  |
      | LimitPrice | <Limit price> |
    Then the 'Positions And Orders' panel should be visible
    Then the '<Market name>' market should be present on the list
    When I hover 'Previously added' market
    And I click on 'dropdown arrow' in the '<Market name>' market
    And I select 'Amend Position' in dropdown menu in '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'amend position'
    And 'close' radiobutton should be 'selected'
    When I click on 'editRadio' button
    Then 'edit' radiobutton should be 'selected'
    When I fill the '1'st normal stop linked order 'price' with value '<New stop price>'
    Then the '1'st normal stop linked order 'p/l' input should be autopopulated
    And '<Opposite direction>' price should change with time
    And '<Direction>' price should change with time
    And the '1'st normal stop linked order 'p/l' input should be autopopulated
    When I fill the '2'nd limit linked order 'price' with value '<New limit price>'
    Then the '2'nd limit linked order 'p/l' input should be autopopulated
    And '<Opposite direction>' price should change with time
    And '<Direction>' price should change with time
    And the '2'nd limit linked order 'p/l' input should be autopopulated
    When I click on 'submit' button
    Then 'confirmation' element text should be 'Position updated'
    And 'market name' element text should be '<Market name>'
    And 'confirmation message' element text should be 'Your order has been updated.'
    When I click on 'ok' button
    And I make 'Positions And Orders' panel active
    Then the 'previously added' market 'stop price' should contain correct data
    And the 'previously added' market 'limit price' should contain correct data

    Examples:
      | Market name | Quantity | Stop price | Limit price | New stop price | New limit price | Direction | Opposite direction |
      | USD/JPY     | 1000     | 90         | 140         | 85             | 145             | buy       | sell               |
      | GBP/USD DFT | 2        | 1.8        | 1           | 1.9            | 0.9             | sell      | buy                |

  @quick @smoke @USD/JPY @GBP/USD-DFT @fully-close-buy/sell-position-cfd/spread-market
  Scenario Outline: Fully Close Buy/Sell Position - CFD/Spread Market
    And I add position with parameters:
      | MarketName | <Market name> |
      | Direction  | <Direction>   |
      | Quantity   | <Quantity>    |
    Then the 'Positions And Orders' panel should be visible
    Then the 'previously added' market should be present on the list
    When I click on 'delete' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'amend position'
    And 'market info' element text should be '<Market name>'
    And 'sell' price should change with time
    And 'buy' price should change with time
    And current simple position information should be correct
    And 'close' radiobutton should be 'selected'
    And 'close quantity' input should be predefined with '<Quantity>'
    And close info message should be correct
    And 'submit button' element should be enabled
    And close info message should be correct
    When I click on 'submit' button
    Then 'confirmation' element text should be 'Trade Executed'
    And 'market name' element text should be '<Market name>'
    And confirmation message should be correct
    When I make 'Positions And Orders' panel active
    Then the 'previously added' market should be not present on the list

    Examples:
      | Market name | Quantity | Direction |
      | USD/JPY     | 1000     | buy       |
      | GBP/USD DFT | 2        | sell      |

  @smoke @Japan-225-CFD @close-buy/sell-position-with-qty-lower-than-the-market-minimum-size @wt-1279 @wt-1281
  Scenario Outline: Close Buy/Sell Position with QTY LOWER than the market minimum size
    And I add position with parameters:
      | MarketName    | <Market name>    |
      | Direction     | <Direction>      |
      | Quantity      | <Quantity>       |
      | StopPrice     | <Stop price>     |
      | LimitPrice    | <Limit price>    |
      | StopQuantity  | <Stop quantity>  |
      | LimitQuantity | <Limit quantity> |
    Then the 'Positions And Orders' panel should be visible
    And the '<Market name>' market should be present on the list
    And I wait for '1000'
    And the 'previously added' market 'position' cell should contain '<Direction> <Left quantity>' data
    When I click on 'delete' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'amend position'
    And 'close quantity' element should be disabled
    And 'submit button' element should be enabled
    When I click on 'submit' button
    And I make 'Positions And Orders' panel active
    Then the 'previously added' market should be not present on the list
    When I add position with parameters:
      | MarketName | <Market name>   |
      | Direction  | <Direction>     |
      | Quantity   | <Stop quantity> |
    Then the 'Positions And Orders' panel should be visible
    And the '<Market name>' market should be present on the list
    And I wait for '1000'
    And the 'previously added' market 'position' cell should contain '<Direction> <Stop quantity>' data
    When I click on 'delete' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'amend position'
    And 'close quantity' element should be enabled
    And 'submit button' element should be enabled
    When I click on 'submit' button
    And I make 'Positions And Orders' panel active
    Then the 'previously added' market should be not present on the list
    When I add position with parameters:
      | MarketName | <Market name> |
      | Direction  | <Direction>   |
      | Quantity   | <Quantity>    |
    Then the 'Positions And Orders' panel should be visible
    And the '<Market name>' market should be present on the list
    And I wait for '1000'
    And the 'previously added' market 'position' cell should contain '<Direction> <Quantity>' data
    When I click on 'delete' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'amend position'
    And 'close quantity' element should be enabled
    And 'submit button' element should be enabled
    When I click on 'submit' button
    And I make 'Positions And Orders' panel active
    Then the 'previously added' market should be not present on the list

    Examples:
      | Market name      | Quantity | Stop quantity | Limit quantity | Left quantity | Stop price | Limit price | Direction |
      | Japan 225 CFD    | 100      | 70            | 70             | 30            | sell       | buy         | buy       |
      | Japan 225 CFD    | 100      | 70            | 70             | 30            | buy        | sell        | sell      |
      # | Ethereum ($) DFT | 0.4      | 0.39          | 0.39           | 0.01          | sell       | buy         | buy       |
      # | Ethereum ($) DFT | 0.4      | 0.39          | 0.39           | 0.01          | buy        | sell        | sell      |

  @smoke @amend-position-ticket-is-closed-if-the-position-is-removed @wt-1310
  Scenario Outline: Amend position ticket is closed if the position is removed
    And I add position with parameters:
      | MarketName | <Market name> |
      | Direction  | <Direction>   |
      | Quantity   | <Quantity>    |
    Then the 'Positions And Orders' panel should be visible
    And the '<Market name>' market should be present on the list
    When I click on 'delete' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'amend position'
    When I delete 'position' '<Market name>'
    Then the 'Deal ticket' panel should be invisible

    Examples:
      | Market name | Quantity | Direction |
      | USD/JPY     | 1000     | buy       |
      | GBP/USD DFT | 2        | sell      |

  @smoke @position-details-tickets-are-closed-if-the-position-is-removed @wt-1310
  Scenario Outline: Position details ticket is closed if the position is removed
    And I add position with parameters:
      | MarketName | <Market name> |
      | Direction  | <Direction>   |
      | Quantity   | <Quantity>    |
    Then the 'Positions And Orders' panel should be visible
    And the '<Market name>' market should be present on the list
    When I hover '1'st market
    Then the 'current' market 'dropdown arrow' should be visible
    When I click on 'dropdown arrow' in the 'current' market
    And I select 'Position details' in dropdown menu in 'current' market
    Then the 'details' panel should be visible
    When I delete 'position' '<Market name>'
    Then the 'details' panel should be invisible

    Examples:
      | Market name | Quantity | Direction |
      | USD/JPY     | 1000     | buy       |
      | GBP/USD DFT | 2        | sell      |

  @smoke @USD/JPY @UK-100-DFT @trade-auto-populated-fields @wt-154 @wip
  Scenario Outline: Trade auto-populated fields
    Then the 'Watchlist' panel should be visible
    When I expand 'Popular Markets' watchlist
    And I click on '<Direction>' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    When I fill 'quantity' with value '<Quantity>'
    And I check 'stop' checkbox
    And I fill the '1'st normal stop linked order 'points' with value '<Points>'
    Then the <Direction> '<Market name>' '1'st stop linked order 'price' input should be calculated from 'points'
    And the <Direction> '<Market name>' '1'st stop linked order 'p/l' input should be calculated from 'points'
    When I clear the '1'st normal stop linked order 'points' input field
    Then the '1'st normal stop linked order 'points' input should be blank
    And the '1'st normal stop linked order 'price' input should be blank
    And the '1'st normal stop linked order 'p/l' input should be blank
    When I fill the '1'st normal stop linked order 'price' with value '<Stop price>'
    Then the <Direction> '<Market name>' '1'st stop linked order 'points' input should be calculated from 'price'
    And the <Direction> '<Market name>' '1'st stop linked order 'p/l' input should be calculated from 'price'
    When I clear the '1'st normal stop linked order 'price' input field
    Then the '1'st normal stop linked order 'points' input should be blank
    And the '1'st normal stop linked order 'price' input should be blank
    And the '1'st normal stop linked order 'p/l' input should be blank
    When I fill the '1'st normal stop linked order 'p/l' with value '<Loss>'
    Then the <Direction> '<Market name>' '1'st stop linked order 'points' input should be calculated from 'p/l'
    And the <Direction> '<Market name>' '1'st stop linked order 'price' input should be calculated from 'p/l'
    When I check 'limit' checkbox
    And I fill the '2'nd limit linked order 'points' with value '<Points>'
    Then the <Direction> '<Market name>' '2'nd limit linked order 'price' input should be calculated from 'points'
    And the <Direction> '<Market name>' '2'nd limit linked order 'p/l' input should be calculated from 'points'
    When I clear the '2'nd limit linked order 'points' input field
    Then the '2'nd limit linked order 'points' input should be blank
    And the '2'nd limit linked order 'price' input should be blank
    And the '2'nd limit linked order 'p/l' input should be blank
    When I fill the '2'nd limit linked order 'price' with value '<Limit price>'
    Then the <Direction> '<Market name>' '2'nd limit linked order 'points' input should be calculated from 'price'
    And the <Direction> '<Market name>' '2'nd limit linked order 'p/l' input should be calculated from 'price'
    When I clear the '2'nd limit linked order 'price' input field
    Then the '2'nd limit linked order 'points' input should be blank
    And the '2'nd limit linked order 'price' input should be blank
    And the '2'nd limit linked order 'p/l' input should be blank
    When I fill the '2'nd limit linked order 'p/l' with value '<Profit>'
    Then the <Direction> '<Market name>' '2'nd limit linked order 'points' input should be calculated from 'p/l'
    And the <Direction> '<Market name>' '2'nd limit linked order 'price' input should be calculated from 'p/l'
    When I fill 'quantity' with value '<Quantity 2>'
    Then the <Direction> '<Market name>' '1'st stop linked order 'p/l' input should be calculated from 'points'
    And the <Direction> '<Market name>' '2'nd limit linked order 'p/l' input should be calculated from 'points'
    When I fill 'quantity' with value '<Quantity>'
    And I expand '1'st linked order types dropdown
    And I select '1'st linked order 'trailing' stop type
    And I fill the '1'st normal stop linked order 'points away' with value '<Points>'
    And I uncheck 'limit' checkbox
    And I click on 'submit' button
    # fails due to https://jira.gaincapital.com/browse/TPDWT-14555
    Then open '<Market name>' <Direction> attached stop order confirmation message should display correct p/l
    # INFO: guaranteed stop fields calculation is blocked by https://jira.gaincapital.com/browse/TPDWT-13915
    # Will be added after fix

    Examples:
      | Market name    | Quantity | Direction | Points | Stop price | Limit price | Loss  | Profit | Quantity 2 |
      | USD/JPY        | 1000     | buy       | 100    | 90         | 120         | -1000 | 1000   | 2000       |
      | Germany 30 DFT | 1        | sell      | 100    | 13000      | 12000       | -300  | 300    | 2          |

  @smoke @USD/JPY @trade-ticket-advanced-view @wt-865
  Scenario: Trade Ticket Advanced View
    Then the 'Watchlist' panel should be visible
    When I expand 'Popular Markets' watchlist
    And I click on 'buy' in the 'USD/JPY' market
    Then the 'Deal ticket' panel should be visible
    And the trade ticket standard view panel should contain items:
      |itemName            |
      |advanced ticket link|
    When I click on 'advancedTicket' link
    Then 'market info' element text should be 'USD/JPY'
    And 'sell' price should change with time
    And 'buy' price should change with time
    And 'USD/JPY' 'quantity' placeholder should be correct
    And the '1'st normal stop order should contain fields:
      | itemName      |
      | checkbox      |
      | dropdown      |
      | quantity      |
      | price         |
      | points        |
      | p/l           |
      | applicability |
    And the '2'nd limit order should contain fields:
      | itemName      |
      | checkbox      |
      | label         |
      | quantity      |
      | price         |
      | points        |
      | p/l           |
      | applicability |
    And the order ticket advanced view panel should contain items:
      | itemName                     |
      | quantity                     |
      | add stop limit dropdown link |
      | hedging toggle               |
      | hedging info icon            |
      | standard ticket link         |
    When I hover main order 'hedging info icon' element
    Then trade ticket 'hedging tooltip' element is visible
    When I click on 'standardTicket' link
    Then the trade ticket standard view panel should not contain items:
      | itemName                     |
      | add stop limit dropdown link |
      | hedging toggle               |
      | hedging info icon            |
      | standard ticket link         |
    When I check 'stop' checkbox
    And I check 'limit' checkbox
    And I click on 'advancedTicket' link
    Then the 'stop' checkbox is checked
    And the 'limit' checkbox is checked
    When I fill the '1'st normal stop linked order 'quantity' with value '1000'
    Then 'standard ticket link' element should be disabled
    When I clear the '1'st normal stop linked order 'quantity' input field
    Then 'standard ticket link' element should be enabled
    When I fill the '2'nd limit linked order 'quantity' with value '1000'
    Then 'standard ticket link' element should be disabled
    When I clear the '2'nd limit linked order 'quantity' input field
    Then 'standard ticket link' element should be enabled
    When I expand '1'st applicability dropdown
    And I select 'GTD' option from '1'st applicability dropdown
    Then 'standard ticket link' element should be disabled
    When I expand '1'st applicability dropdown
    And I select 'GTT' option from '1'st applicability dropdown
    Then 'standard ticket link' element should be disabled
    When I expand '1'st applicability dropdown
    And I select 'GTC' option from '1'st applicability dropdown
    Then 'standard ticket link' element should be enabled

  @smoke @quick @add/remove-stop/limit @wt-160
  Scenario: Add/Remove Stop/Limit
    Then the 'Watchlist' panel should be visible
    When I expand 'Popular Markets' watchlist
    And I click on 'sell' in the 'GBP/USD DFT' market
    Then the 'Deal ticket' panel should be visible
    When I fill 'quantity' with value '3'
    And I check 'stop' checkbox
    And I check 'limit' checkbox
    When I fill the '1'st normal stop linked order 'price' with value '1.6'
    Then the '1'st normal stop linked order 'points' input should be autopopulated
    And the '1'st normal stop linked order 'p/l' input should be autopopulated
    When I fill the '2'nd limit linked order 'price' with value '1.01'
    Then the '2'nd limit linked order 'points' input should be autopopulated
    And the '2'nd limit linked order 'p/l' input should be autopopulated
    When I click on 'advancedTicket' link
    Then the '1'st normal stop order should contain fields:
      | itemName      |
      | checkbox      |
      | dropdown      |
      | quantity      |
      | price         |
      | points        |
      | p/l           |
      | applicability |
    And the '2'nd limit order should contain fields:
      | itemName      |
      | checkbox      |
      | label         |
      | quantity      |
      | price         |
      | points        |
      | p/l           |
      | applicability |
    When I expand add stop limit dropdown
    Then the add a stop or limit dropdown options should be:
      | Normal stop   |
      | Trailing stop |
      | Guaranteed stop If triggered, charge is 4 times the quantity |
      | Limit         |
    When I select 'Normal stop' in add stop or limit dropdown
    Then the number of linked orders should be '3'
    And the '3'rd normal stop order should contain fields:
      | itemName      |
      | trash icon    |
      | dropdown      |
      | quantity      |
      | price         |
      | points        |
      | p/l           |
      | applicability |
    When I expand add stop limit dropdown
    And I select 'Limit' in add stop or limit dropdown
    Then the number of linked orders should be '4'
    And the '4'th limit order should contain fields:
      | itemName      |
      | trash icon    |
      | label         |
      | quantity      |
      | price         |
      | points        |
      | p/l           |
      | applicability |
    When I expand add stop limit dropdown
    And I select 'Trailing stop' in add stop or limit dropdown
    Then the number of linked orders should be '5'
    And the '5'th trailing stop order should contain fields:
      | itemName      |
      | trash icon    |
      | dropdown      |
      | quantity      |
      | points away   |
      | applicability |
    When I expand add stop limit dropdown
    And I select 'Guaranteed stop' in add stop or limit dropdown
    Then the number of linked orders should be '6'
    And the '6'th guaranteed stop order should contain fields:
      | itemName      |
      | trash icon    |
      | dropdown      |
      | quantity      |
      | price         |
      | points        |
      | p/l           |
      | applicability |
    When I uncheck 'stop' checkbox
    Then the '1'st normal stop linked order 'quantity' input should be autopopulated
    And the '1'st normal stop linked order 'price' input should be autopopulated
    And the '1'st normal stop linked order 'points' input should be autopopulated
    And the '1'st normal stop linked order 'p/l' input should be autopopulated
    When I uncheck 'limit' checkbox
    Then the '2'nd limit linked order 'quantity' input should be autopopulated
    And the '2'nd limit linked order 'price' input should be autopopulated
    And the '2'nd limit linked order 'points' input should be autopopulated
    And the '2'nd limit linked order 'p/l' input should be autopopulated
    When I remove '6'th guaranteed stop order
    Then the number of linked orders should be '5'
    When I remove '5'th trailing stop order
    Then the number of linked orders should be '4'
    When I remove '4'th limit order
    Then the number of linked orders should be '3'
    When I remove '3'rd normal stop order
    Then the number of linked orders should be '2'

  @quick @smoke @GBP/USD-DFT @place-sell-trade-with-multiple-linked-orders-spread-market
  Scenario: Place sell trade with multiple linked orders - Spread market
    Then the 'Watchlist' panel should be visible
    When I expand 'Popular Markets' watchlist
    And I click on 'sell' in the 'GBP/USD DFT' market
    Then the 'Deal ticket' panel should be visible
    When I click on 'advancedTicket' link
    And I expand add stop limit dropdown
    Then the add a stop or limit dropdown options should be:
      | Normal stop   |
      | Trailing stop |
      | Guaranteed stop If triggered, charge is 4 times the quantity |
      | Limit         |
    When I select 'Guaranteed stop' in add stop or limit dropdown
    Then 'standard ticket link' element should be disabled
    And the number of linked orders should be '3'
    And the '3'rd guaranteed stop order should contain fields:
      | itemName      |
      | trash icon    |
      | dropdown      |
      | quantity      |
      | price         |
      | points        |
      | p/l           |
      | applicability |
    When I expand add stop limit dropdown
    And I select 'Limit' in add stop or limit dropdown
    Then the number of linked orders should be '4'
    And the '4'th limit order should contain fields:
      | itemName      |
      | trash icon    |
      | label         |
      | quantity      |
      | price         |
      | points        |
      | p/l           |
      | applicability |
    When I fill 'quantity' with value '20'
    And I check 'stop' checkbox
    And I fill the '1'st normal stop linked order 'quantity' with value '0.05'
    Then 'stop validation' element text should be 'Too low. Minimum 0.08'
    And 'submit button' element should be disabled
    And 'submit button' element text should be 'Quantity too low'
    When I fill the '1'st normal stop linked order 'quantity' with value '10'
    And I fill the '1'st normal stop linked order 'price' with value '1.5'
    Then the '1'st normal stop linked order 'points' input should be autopopulated
    And the '1'st normal stop linked order 'p/l' input should be autopopulated
    When I check 'limit' checkbox
    And I fill the '2'nd limit linked order 'quantity' with value '0.05'
    Then 'limit validation' element text should be 'Too low. Minimum 0.08'
    And 'submit button' element should be disabled
    And 'submit button' element text should be 'Quantity too low'
    And I fill the '2'nd limit linked order 'quantity' with value '10'
    And I fill the '2'nd limit linked order 'price' with value '1.1'
    Then the '2'nd limit linked order 'points' input should be autopopulated
    And the '2'nd limit linked order 'p/l' input should be autopopulated
    When I fill the '3'rd guaranteed stop linked order 'quantity' with value '1'
    And I fill the '3'rd guaranteed stop linked order 'price' with value '2.5'
    Then the '3'rd guaranteed stop linked order 'points' input should be autopopulated
    And the '3'rd guaranteed stop linked order 'p/l' input should be autopopulated
    When I fill the '4'th limit linked order 'quantity' with value '10'
    And I fill the '4'th limit linked order 'price' with value '1'
    Then the '4'th limit linked order 'points' input should be autopopulated
    And the '4'th limit linked order 'p/l' input should be autopopulated
    When I click on 'submit' button
    Then 'confirmation' element text should be 'Trade executed'
    And 'market name' element text should be 'GBP/USD DFT'
    When I click on 'ok' button
    Then the 'Positions And Orders' panel should be visible
    Then the 'previously added' market should be present on the list
    And the 'previously added' market 'stop price' cell should contain 'multiple' word
    And the 'previously added' market 'limit price' cell should contain 'multiple' word

  @quick @smoke @USD/JPY @GBP/USD-DFT @trade-ticket-advanced-view-hedging-trades
  Scenario Outline: Trade Ticket Advanced View - Hedging trades
    And I add position with parameters:
      | MarketName | <Market name> |
      | Direction  | <Direction>   |
      | Quantity   | <Quantity>    |
    Then the 'Positions And Orders' panel should be visible
    Then the 'previously added' market should be present on the list
    And the 'previously added' market 'position' cell should contain '<Direction> <Quantity>' data
    And I add position with parameters:
      | MarketName | <Market name>        |
      | Direction  | <Opposite direction> |
      | Quantity   | <Second quantity>    |
    And I wait for '500'
    Then the 'previously added' market 'position' cell should contain '<Direction> <Left quantity>' data
    Then the 'Watchlist' panel should be visible
    And I expand 'Popular Markets' watchlist
    And I click on '<Opposite direction>' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    When I click on 'advancedTicket' link
    And I click on 'hedgingToggle' button
    Then 'hedge toggle' element should be enabled
    When I fill 'quantity' with value '<Second quantity>'
    And I click on 'submit' button
    And I click on 'ok' button
    And I make 'Positions And Orders' panel active
    Then the 'previously added' market should be present on the list
    And I make 'Positions And Orders' panel active
    And the 'previously added' market 'position' cell should contain '<Direction> <Left quantity>' data
    And the '2'nd market 'position' cell should contain '<Opposite direction> <Second quantity>' data
    And I add position with parameters:
      | MarketName | <Market name>        |
      | Direction  | <Opposite direction> |
      | Quantity   | <Third quantity>     |
    And I wait for '500'
    Then the 'previously added' market 'position' cell should contain '<Direction> <Second left quantity>' data
    When I make 'Watchlist' panel active
    And I expand 'Popular Markets' watchlist
    And I click on '<Opposite direction>' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    When I click on 'advancedTicket' link
    And I click on 'hedgingToggle' button
    Then 'hedge toggle' element should be enabled
    When I fill 'quantity' with value '<Third quantity>'
    And I click on 'submit' button
    And I click on 'ok' button
    And I make 'Positions And Orders' panel active
    Then the 'previously added' market 'position' cell should contain '<Direction> <Second left quantity>' data
    And the '2'nd market 'position' cell should contain '<Opposite direction> <Amalgamated quantity>' data
    When I expand '2'nd multi-market
    Then the '2'nd market's sub-markets count should be '2'

    Examples:
      | Market name | Quantity | Second quantity | Third quantity | Left quantity | Second left quantity | Amalgamated quantity| Direction | Opposite direction |
      | USD/JPY     | 3000     | 1000            | 1000           | 2000          | 1000                 | 2000                | sell      | buy                |
      | GBP/USD DFT | 3        | 1               | 1              | 2             | 1                    | 2                   | buy       | sell               |

  @smoke @USD/JPY @trade-ticket-advanced-view-multiple-stops-limits-applicability
  Scenario: Trade Ticket Advanced View - Multiple Stops Limits - Applicability
    Then the 'Watchlist' panel should be visible
    When I expand 'Popular Markets' watchlist
    And I click on 'buy' in the 'USD/JPY' market
    Then the 'Deal ticket' panel should be visible
    When I click on 'advancedTicket' link
    And I check 'stop' checkbox
    Then 'GTC' option should be selected in '1'st applicability dropdown
    When I expand '1'st applicability dropdown
    Then '1'st applicability dropdown options should be:
      |Good 'till canceled (GTC)|
      |Good 'till end of day (GTD)|
      |Good 'till time (GTT) Select a specific date and time|
    And 'submit button' element should be disabled
    And 'submit button' element text should be 'Choose quantity'
    When I fill 'quantity' with value '2000'
    And I fill the '1'st normal stop linked order 'quantity' with value '1000'
    Then 'submit button' element should be disabled
    And 'submit button' element text should be 'Choose stop and limit levels'
    When I fill the '1'st normal stop linked order 'price' with value '100'
    Then the '1'st normal stop linked order 'points' input should be autopopulated
    And the '1'st normal stop linked order 'p/l' input should be autopopulated
    And 'submit button' element should be enabled
    When I check 'limit' checkbox
    Then 'submit button' element should be disabled
    And 'submit button' element text should be 'Choose quantity'
    When I expand '2'nd applicability dropdown
    And I select 'GTT' option from '2'nd applicability dropdown
    Then 'GTT' option should be selected in '2'nd applicability dropdown
    And the '2'nd limit order should contain fields:
      | itemName      |
      | date picker   |
      | calendar icon |
      | time picker   |
    When I fill the '2'nd limit linked order 'quantity' with value '1000'
    Then 'submit button' element should be disabled
    And 'submit button' element text should be 'Choose stop and limit levels'
    When I fill the '2'nd limit linked order 'price' with value '120'
    Then the '2'nd limit linked order 'points' input should be autopopulated
    And the '2'nd limit linked order 'p/l' input should be autopopulated
    And 'submit button' element should be disabled
    And 'submit button' element text should be 'Enter date'
    When I enter current date in '2'nd limit linked order
    Then 'submit button' element should be disabled
    And 'submit button' element text should be 'Enter time'
    When I fill the '2'nd limit linked order 'time' with value '1111pm'
    Then 'submit button' element should be enabled
    When I expand add stop limit dropdown
    And I select 'Trailing stop' in add stop or limit dropdown
    And I fill the '3'rd trailing stop linked order 'quantity' with value '1000'
    And I fill the '3'rd trailing stop linked order 'points away' with value '30'
    And I expand '3'rd applicability dropdown
    And I select 'GTD' option from '3'rd applicability dropdown
    Then 'GTD' option should be selected in '3'rd applicability dropdown
    And 'submit button' element should be enabled
    When I click on 'submit' button
    Then 'confirmation' element text should be 'Trade executed'
    When I click on 'ok' button
    Then the 'Positions And Orders' panel should be visible
    Then the 'previously added' market should be present on the list
    When I click on 'stop price' in the 'USD/JPY' market
    Then the 'Deal ticket' panel should be visible
    And 'GTC' option should be selected in '1'st applicability dropdown
    And 'GTT' option should be selected in '2'nd applicability dropdown
    And 'GTD' option should be selected in '3'rd applicability dropdown

  @smoke @quick @trade-error-handling-missing-quantity-invalid-quantity-stop/limit-price-buy/sell-cfd/spread
  Scenario Outline: Trade Error Handling - Missing Quantity, Invalid Quantity - Stop/Limit Price - Buy/Sell CFD/Spread
    Then the 'Watchlist' panel should be visible
    And I expand 'Popular Markets' watchlist
    And I click on '<Direction>' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    And 'submit button' element should be disabled
    And 'submit button' element text should be 'Choose quantity'
    When I fill 'quantity' with value '<Quantity>'
    Then 'submit button' element should be enabled
    And 'submit button' element text should be 'Place Trade'
    When I clear 'quantity' field
    Then 'submit button' element should be disabled
    And 'submit button' element text should be 'Choose quantity'
    When I fill 'quantity' with value '<Less than min qty>'
    Then '<Market name>' order 'min quantity' validation should be correct
    And 'submit button' element text should be 'Quantity too low'
    When I fill 'quantity' with value '<Greater than max qty>'
    Then '<Market name>' order 'max quantity' validation should be correct
    And 'submit button' element text should be 'Quantity too high'
    When I fill 'quantity' with value '<Quantity>'
    And I check 'stop' checkbox
    Then 'submit button' element should be disabled
    And 'submit button' element text should be 'Choose stop and limit levels'
    When I fill the '1'st normal stop linked order 'price' with value '<Stop price>'
    Then '<Direction>' '<Market name>' '1'st stop price validation should be correct
    And 'submit button' element should be disabled
    And 'submit button' element text should be '<Submit btn Stop txt>'
    When I uncheck 'stop' checkbox
    And I check 'limit' checkbox
    Then 'submit button' element should be disabled
    And 'submit button' element text should be 'Choose stop and limit levels'
    When I fill the '2'nd limit linked order 'price' with value '<Limit price>'
    Then '<Direction>' '<Market name>' '2'nd limit price validation should be correct
    And 'submit button' element should be disabled
    And 'submit button' element text should be '<Submit btn Limit txt>'

    Examples:
      | Market name | Direction | Quantity | Less than min qty | Greater than max qty | Stop price | Limit price | Submit btn Stop txt | Submit btn Limit txt |
      | USD/JPY     | buy       | 1010     | 900               | 5000002              | 150        | 90          | stop level too high | limit level too low  |
      | GBP/USD DFT | sell      | 2        | 0.05              | 637                  | 1          | 5           | stop level too low  | limit level too high |

  @smoke @quick @validation @trade-error-handling-multiple-stop/limit-quantity-buy/sell-cfd/spread
  Scenario Outline: Trade Error Handling - Multiple Stop/Limit Quantity - Buy/Sell CFD/Spread
    Then the 'Watchlist' panel should be visible
    And I expand 'Popular Markets' watchlist
    And I click on '<Direction>' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    And 'submit button' element should be disabled
    And 'submit button' element text should be 'Choose quantity'
    When I fill 'quantity' with value '<Quantity>'
    Then 'submit button' element should be enabled
    And 'submit button' element text should be 'Place Trade'
    When I click on 'advancedTicket' link
    And I check 'stop' checkbox
    Then 'submit button' element should be disabled
    And 'submit button' element text should be 'Choose stop and limit levels'
    When I fill the '1'st normal stop linked order 'quantity' with value '<1st stop quantity>'
    And I check 'limit' checkbox
    And I fill the '2'nd limit linked order 'quantity' with value '<2nd limit quantity>'
    When I expand add stop limit dropdown
    And I select 'Normal stop' in add stop or limit dropdown
    And I fill the '3'rd normal stop linked order 'quantity' with value '<3rd stop quantity>'
    Then the '3'rd stop max quantity validation should be correct
    When I expand add stop limit dropdown
    And I select 'Limit' in add stop or limit dropdown
    And I fill the '4'th limit linked order 'quantity' with value '<4th limit quantity>'
    Then the '4'th limit max quantity validation should be correct

    Examples:
      | Market name | Direction | Quantity | 1st stop quantity | 2nd limit quantity | 3rd stop quantity | 4th limit quantity |
      | USD/JPY     | buy       | 2500     | 1000              | 1100               | 1600              | 1700               |
      | GBP/USD DFT | sell      | 10       | 3                 | 4                  | 8                 | 10                 |

  @smoke @validation @stop/limit-fields-border-validation @wt-1254
  Scenario: Stop/Limit fields border validation
    Then the 'Watchlist' panel should be visible
    When I expand 'Popular Markets' watchlist
    And I click on 'buy' in the 'GBP/USD DFT' market
    Then the 'Deal ticket' panel should be visible
    When I click on 'advancedTicket' link
    And I check 'stop' checkbox
    Then the '1'st normal stop order 'quantity' field should have red color
    When I check 'limit' checkbox
    Then the '2'nd limit order 'quantity' field should have red color
    When I fill 'quantity' with value '505'
    Then 'GBP/USD DFT' order 'max quantity' validation should be correct
    # fails due to TPDWT-13826
    # And the order 'quantity' field should have red color
    When I fill the '1'st normal stop linked order 'quantity' with value '505'
    And I fill 'quantity' with value '5'
    Then the order 'quantity' field should have no color
    And the '1'st normal stop order 'quantity' field should have red color
    And the '1'st stop max quantity validation should be correct
    When I fill the '1'st normal stop linked order 'price' with value '3'
    Then the '1'st normal stop order 'quantity' field should have red color
    And the '1'st normal stop order 'price border' element should have red color
    And the '1'st normal stop order 'points border' element should have red color
    And the '1'st normal stop order 'p/l border' element should have red color
    And the '1'st stop max quantity validation should be correct
    When I fill the '1'st normal stop linked order 'quantity' with value '1'
    Then the '1'st normal stop order 'price border' element should have red color
    And the '1'st normal stop order 'points border' element should have red color
    And the '1'st normal stop order 'p/l border' element should have red color
    And 'buy' 'GBP/USD DFT' '1'st stop price validation should be correct
    When I fill 'quantity' with value '505'
    Then 'GBP/USD DFT' order 'max quantity' validation should be correct
    When I fill the '2'nd limit linked order 'quantity' with value '505'
    And I fill 'quantity' with value '5'
    Then the order 'quantity' field should have no color
    And the '2'nd limit order 'quantity' field should have red color
    And the '2'nd limit max quantity validation should be correct
    When I fill the '2'nd limit linked order 'price' with value '0.8'
    Then the '2'nd limit order 'quantity' field should have red color
    And the '2'nd limit order 'price border' element should have red color
    And the '2'nd limit order 'points border' element should have red color
    And the '2'nd limit order 'p/l border' element should have red color
    And the '2'nd limit max quantity validation should be correct
    When I fill the '2'nd limit linked order 'quantity' with value '2'
    Then the '2'nd limit order 'price border' element should have red color
    And the '2'nd limit order 'points border' element should have red color
    And the '2'nd limit order 'p/l border' element should have red color
    And 'buy' 'GBP/USD DFT' '2'nd limit price validation should be correct
    # works on stg and live but not on local and ppe due to g-dtop issue
    When I expand add stop limit dropdown
    And I select 'Guaranteed stop' in add stop or limit dropdown
    And I fill the '3'rd guaranteed stop linked order 'quantity' with value '7'
    Then the '3'rd guaranteed stop order 'quantity' field should have red color
    And the '3'rd stop max quantity validation should be correct
    When I fill the '3'rd guaranteed stop linked order 'price' with value '3'
    Then the '3'rd guaranteed stop order 'quantity' field should have red color
    And the '3'rd guaranteed stop order 'price border' element should have red color
    And the '3'rd guaranteed stop order 'points border' element should have red color
    And the '3'rd guaranteed stop order 'p/l border' element should have red color
    And the '3'rd stop max quantity validation should be correct
    When I fill the '3'rd guaranteed stop linked order 'quantity' with value '1'
    Then the '3'rd guaranteed stop order 'price border' element should have red color
    And the '3'rd guaranteed stop order 'points border' element should have red color
    And the '3'rd guaranteed stop order 'p/l border' element should have red color
    And buy 'GBP/USD DFT' '3'rd guaranteed stop price validation should be correct
    When I expand add stop limit dropdown
    And I select 'Limit' in add stop or limit dropdown
    And I fill the '4'th limit linked order 'quantity' with value '5'
    Then the '4'th limit max quantity validation should be correct
    When I fill the '4'th limit linked order 'price' with value '0.8'
    Then the '4'th limit order 'quantity' field should have red color
    And the '4'th limit order 'price border' element should have red color
    And the '4'th limit order 'points border' element should have red color
    And the '4'th limit order 'p/l border' element should have red color
    And the '4'th limit max quantity validation should be correct
    When I fill the '4'th limit linked order 'quantity' with value '1'
    Then the '4'th limit order 'price border' element should have red color
    And the '4'th limit order 'points border' element should have red color
    And the '4'th limit order 'p/l border' element should have red color
    And 'buy' 'GBP/USD DFT' '4'th limit price validation should be correct

  @smoke @quick @risking-and-margin-calculator-removing-with-incorrect-quantity
  Scenario Outline: Risking and Margin calculator, removing with incorrect quantity
    Then the 'Watchlist' panel should be visible
    When I expand 'Popular Markets' watchlist
    And I click on '<Direction>' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    When I fill 'quantity' with value '<Correct qty>'
    When I wait for '300'
    Then 'submit button' element text should be 'Place Trade'
    And margin calculator should contain correct information
    When I fill 'quantity' with value '0'
    Then 'submit button' element text should be 'Quantity too low'
    And margin calculator should contain nothing
    When I fill 'quantity' with value '<More then max qty>'
    Then 'submit button' element text should be 'Quantity too high'
    And margin calculator should contain nothing

    Examples:
      | Market name | Direction | Correct qty | More then max qty |
      | USD/JPY     | buy       | 1500        | 10000000          |
      | GBP/USD DFT | sell      | 10          | 3500              |

  @smoke @bug @decimal-places-restriction
  Scenario: Decimal places restriction can't be bypassed in price and points fields
    Then the 'Watchlist' panel should be visible
    When I expand 'Popular Markets' watchlist
    And I click on 'sell' in the 'UK 100 DFT' market
    Then the 'Deal ticket' panel should be visible
    When I check 'Stop' checkbox
    And I fill the '1'st normal stop linked order 'price' with value '8555.666'
    Then the '1'st normal stop linked order 'price' input should be '8555.6'
    When I check 'Limit' checkbox
    And I fill the '2'nd limit linked order 'points' with value '1000.555'
    Then the '2'st limit linked order 'points' input should be '1000.5'

  @quick @smoke @edit-amalgamated-buy-position @wt-1022
  Scenario: Edit Amalgamated Buy Position
    And I add position with parameters:
      | MarketName | USD/JPY (per 0.01) CFD |
      | Direction  | buy                    |
      | Quantity   | 500                    |
    And I add position with parameters:
      | MarketName | USD/JPY (per 0.01) CFD |
      | Direction  | buy                    |
      | Quantity   | 400                    |
    And I add position with parameters:
      | MarketName | USD/JPY (per 0.01) CFD |
      | Direction  | buy                    |
      | Quantity   | 300                    |
    And I add position with parameters:
      | MarketName | USD/JPY (per 0.01) CFD |
      | Direction  | buy                    |
      | Quantity   | 200                    |
    And I add position with parameters:
      | MarketName | USD/JPY (per 0.01) CFD |
      | Direction  | buy                    |
      | Quantity   | 100                    |
    And I wait for '500'
    Then the 'Positions And Orders' panel should be visible
    And the 'previously added' market should be present on the list
    And the 'previously added' market should be displayed as 'multi'
    And the 'previously added' market 'position' cell should contain 'buy 1500' data
    When I click on 'delete' in the 'USD/JPY (per 0.01) CFD' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'close positions'
    And cursor is placed in the 'close quantity' field
    And the trade ticket standard view panel should contain items:
      | itemName      |
      | close section |
    And 'close label' element text should be 'close'
    And the trade ticket standard view panel should not contain items:
      | itemName     |
      | edit section |
    And amalgamated position close info message should be correct
    And 'submit button' element text should be 'Close Multiple Positions'
    When I fill 'quantity' with value '600'
    Then amalgamated position close info message should be correct
    When I click on 'submit' button
    Then '2' confirmation messages about close amalgamated positions should be displayed
    When I click on 'ok' button
    Then the 'Deal ticket' panel should be invisible
    And the 'Positions And Orders' panel should be visible
    When I expand 'previously added' multi-market
    Then the 'previously added' multi-market should be 'expanded'
    And the 'previously added' market's sub-markets count should be '4'
    And the 'previously added' market's sub-market 1 'unrealised' cell should contain 'GBP' data
    And the 'previously added' market's sub-market 1 'position' cell should contain 'buy 300' data
    And the 'previously added' market's sub-market 2 'position' cell should contain 'buy 300' data
    And the 'previously added' market's sub-market 3 'position' cell should contain 'buy 200' data
    And the 'previously added' market's sub-market 4 'position' cell should contain 'buy 100' data

  @quick @smoke @close-amalgamated-buy-position @wt-1316
  Scenario: Close Amalgamated Buy Position
    And I add position with parameters:
      | MarketName | USD/JPY (per 0.01) CFD |
      | Direction  | buy                    |
      | Quantity   | 600                    |
    And I add position with parameters:
      | MarketName | USD/JPY (per 0.01) CFD |
      | Direction  | buy                    |
      | Quantity   | 200                    |
    And I add position with parameters:
      | MarketName | USD/JPY (per 0.01) CFD |
      | Direction  | buy                    |
      | Quantity   | 100                    |
    And I wait for '500'
    Then the 'Positions And Orders' panel should be visible
    And the 'previously added' market should be present on the list
    And the 'previously added' market should be displayed as 'multi'
    When I click on 'delete' in the 'USD/JPY (per 0.01) CFD' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'close positions'
    And cursor is placed in the 'close quantity' field
    And current amalgamated position information should be correct
    And 'close quantity' input should be predefined with '900'
    And amalgamated position close info message should be correct
    And 'submit button' element text should be 'Close Multiple Positions'
    When I fill 'quantity' with value '300'
    Then amalgamated position close info message should be correct
    When I click on 'submit' button
    Then '1' confirmation messages about close amalgamated positions should be displayed
    When I click on 'ok' button
    Then the 'Deal ticket' panel should be invisible
    And the 'Positions And Orders' panel should be visible
    When I expand 'previously added' multi-market
    Then the 'previously added' multi-market should be 'expanded'
    And the 'previously added' market's sub-markets count should be '3'
    And the 'previously added' market's sub-market 1 'unrealised' cell should contain 'GBP' data
    And the 'previously added' market's sub-market 1 'position' cell should contain 'buy 300' data
    And the 'previously added' market's sub-market 2 'position' cell should contain 'buy 200' data
    And the 'previously added' market's sub-market 3 'position' cell should contain 'buy 100' data
    When I click on 'delete' in the 'USD/JPY (per 0.01) CFD' market
    Then the 'Deal ticket' panel should be visible
    When I fill 'quantity' with value '125'
    Then amalgamated position close info message should be correct
    When I click on 'submit' button
    Then '1' confirmation messages about close amalgamated positions should be displayed
    When I click on 'ok' button
    Then the 'Deal ticket' panel should be invisible
    And the 'Positions And Orders' panel should be visible
    And the 'previously added' market's sub-markets count should be '3'
    And the 'previously added' market's sub-market 1 'unrealised' cell should contain 'GBP' data
    And the 'previously added' market's sub-market 1 'position' cell should contain 'buy 175' data
    And the 'previously added' market's sub-market 2 'position' cell should contain 'buy 200' data
    And the 'previously added' market's sub-market 3 'position' cell should contain 'buy 100' data
    When I click on 'delete' in the 'USD/JPY (per 0.01) CFD' market
    Then the 'Deal ticket' panel should be visible
    When I fill 'quantity' with value '500'
    Then 'submit button' element text should be 'Quantity too high'
    And 'submit button' element should be disabled
    When I fill 'quantity' with value '450'
    And I click on 'submit' button
    Then 'ticket failure' element text should be 'Trade not filled'
    And 'error message' element text should be 'The Quantity entered is below the minimum allowed for the market.'
    When I click on 'ok' button
    And I close 'Deal ticket' panel
    Then the 'Deal ticket' panel should be invisible
    And the 'Positions And Orders' panel should be visible
    And the 'previously added' market's sub-markets count should be '3'
    And the 'previously added' market's sub-market 1 'unrealised' cell should contain 'GBP' data
    And the 'previously added' market's sub-market 1 'position' cell should contain 'buy 175' data
    And the 'previously added' market's sub-market 2 'position' cell should contain 'buy 200' data
    And the 'previously added' market's sub-market 3 'position' cell should contain 'buy 100' data
    When I click on 'delete' in the 'USD/JPY (per 0.01) CFD' market
    Then the 'Deal ticket' panel should be visible
    When I fill 'quantity' with value '475'
    And I click on 'submit' button
    Then '3' confirmation messages about close amalgamated positions should be displayed
    When I click on 'ok' button
    Then the 'Deal ticket' panel should be invisible
    And the 'Positions And Orders' panel should be visible
    And the 'previously added' market should be not present on the list

  @smoke @Apple-Inc-CFD @last-0-digits-are-shown-in-confirmation-modal
  Scenario: Last 0 digits are shown in confirmation modal
    Then the 'Watchlist' panel should be visible
    When I expand 'Popular Markets' watchlist
    And I click on 'sell' in the 'Apple Inc CFD' market
    Then the 'Deal ticket' panel should be visible
    When I fill 'quantity' with value '1000'
    And I wait for 'sell' price has trailing zeros
    And I click on 'submit' button
    Then open sell confirmation message should display correct price





