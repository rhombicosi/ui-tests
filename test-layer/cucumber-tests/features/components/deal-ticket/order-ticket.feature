@orderticket
Feature: Order Ticket panel
  As a user
  I can open order ticket panel
  So all functionality should work fine for the panel

  Background:
    Given I am logged in to the application with default state

  @quick @smoke @USD/JPY @GBP/USD-DFT @order-ticket-standard-view-main-functionality-stop/limit @wt-122
  Scenario Outline: Order Ticket Standard View - main functionality, stop/limit
    When I add new tab
    And I add new 'Watchlist' panel in 'New workspace 2' tab
    And I resize panel with:
      | height | 600  |
      | width  | 1000 |
    And I expand 'Popular Markets' watchlist
    And I click on '<Direction>' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    When I switch to 'order' tab
    Then 'order' ticket type should be 'selected'
    And 'trade label' element text should be 'trade'
    And 'order label' element text should be 'order'
    And 'set alert label' element text should be 'set alert'
    And 'market info' element text should be '<Market name>'
    And '<Opposite direction>' price should change with time
    And '<Direction>' price should change with time
    And '<Market name>' 'quantity' placeholder should be correct
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
    And the '1'st normal stop linked order 'price' element should be disabled
    And the '1'st normal stop linked order 'points' element should be disabled
    And the '1'st normal stop linked order 'p/l' element should be disabled
    And the '2'nd limit linked order 'price' element should be disabled
    And the '2'nd limit linked order 'points' element should be disabled
    And the '2'nd limit linked order 'p/l' element should be disabled
    And the order ticket standard view panel should contain items:
      | itemName             |
      | order price          |
      | quantity             |
      | advanced ticket link |
      | oco link             |
      | good till dropdown   |
    And 'hedging status' element text should be 'Hedging is OFF'
    And 'submit button' element should be disabled
    And 'submit button' element text should be 'Choose quantity'
    When I click on '<Opposite direction>' label
    Then the '<Opposite direction>' button should be '<Opposite color>' when it is clicked
    When I click on '<Direction>' label
    Then the '<Direction>' button should be '<Color>' when it is clicked
    When I fill 'quantity' with value '<Quantity>'
    Then 'submit button' element should be disabled
    And 'submit button' element text should be 'Enter a price'
    When I fill 'order price' with value '<Order price>'
    Then 'submit button' element should be enabled
    And 'submit button' element text should be 'Place Order'
    When I check 'stop' checkbox
    And I fill the '1'st normal stop linked order 'price' with value '<Stop price>'
    Then the '1'st normal stop linked order 'points' input should be autopopulated
    And the '1'st normal stop linked order 'p/l' input should be autopopulated
    When I check 'limit' checkbox
    And I fill the '2'nd limit linked order 'price' with value '<Limit price>'
    Then the '2'nd limit linked order 'points' input should be autopopulated
    And the '2'nd limit linked order 'p/l' input should be autopopulated
    When '<Direction>' price should change with time
    And '<Opposite direction>' price should change with time
    Then the '1'st normal stop linked order 'p/l' input should be autopopulated
    And the '2'nd limit linked order 'p/l' input should be autopopulated
    When I click on 'submit' button
    Then 'confirmation' element text should be 'Order placed'
    And 'market name' element text should be '<Market name>'
    And open <Direction> '<Market name>' order confirmation message should be correct
    When I click on 'ok' button
    And I add new 'Positions And Orders' panel in 'current' tab
    And I resize panel with:
      | height | 600  |
      | width  | 800  |
    And I select 'Orders' list
    Then the 'previously added' market should be present on the list

    Examples:
      | Market name     | Quantity | Order price | Stop price | Limit price | Direction | Opposite direction | Color | Opposite color |
      | USD/JPY         | 1000     | 200         | 190        | 210         | buy       | sell               | blue  | red            |
      | GBP/USD DFT     | 1        | 3           | 4          | 2           | sell      | buy                | red   | blue           |

  @smoke @USD/JPY @order-ticket-advanced-view-add/remove-trailing-stop/limit @wt-865
  Scenario Outline: Order Ticket Advanced View - Add/Remove Trailing Stop/Limit
    Then the 'Watchlist' panel should be visible
    When I expand 'Popular Markets' watchlist
    And I click on '<Direction>' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    When I switch to 'order' tab
    Then 'order' ticket type should be 'selected'
    When I click on 'advancedTicket' link
    Then 'market info' element text should be '<Market name>'
    And 'sell' price should change with time
    And 'buy' price should change with time
    And '<Market name>' 'quantity' placeholder should be correct
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
      | order price                  |
      | quantity                     |
      | good till dropdown           |
      | add stop limit dropdown link |
      | hedging toggle               |
      | hedging info icon            |
      | standard ticket link         |
    When I hover main order 'hedging info icon' element
    Then order ticket 'hedging tooltip' element is visible
    When I expand add stop limit dropdown
    Then the add a stop or limit dropdown options should be:
      | Normal stop   |
      | Trailing stop |
      | Limit         |
    When I select 'Trailing stop' in add stop or limit dropdown
    Then 'standard ticket link' element should be disabled
    And the number of linked orders should be '3'
    And the '3'rd trailing stop order should contain fields:
      | itemName      |
      | trash icon    |
      | dropdown      |
      | quantity      |
      | points away   |
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
    When I remove '4'th limit order
    Then the number of linked orders should be '3'
    When I remove '3'rd trailing stop order
    Then the number of linked orders should be '2'

    Examples:
        | Market name | Direction |
        | USD/JPY     | buy       |
        | GBP/USD DFT | sell      |

  @quick @smoke @GBP/USD-DFT @place-buy/sell-order-/w-multiple-linked-orders-cfd/spread-market
  Scenario Outline: Place buy/sell order with multiple linked orders - CFD/Spread market
    Then the 'Watchlist' panel should be visible
    When I expand 'Popular Markets' watchlist
    And I click on '<Direction>' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    When I switch to 'order' tab
    Then 'order' ticket type should be 'selected'
    When I click on 'advancedTicket' link
    And I expand add stop limit dropdown
    Then the add a stop or limit dropdown options should be:
      | Normal stop   |
      | Trailing stop |
      | Limit         |
    When I select 'Trailing stop' in add stop or limit dropdown
    Then 'standard ticket link' element should be disabled
    And the number of linked orders should be '3'
    And the '3'rd guaranteed stop order should contain fields:
      | itemName      |
      | trash icon    |
      | dropdown      |
      | quantity      |
      | points away   |
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
    When I fill 'Order price' with value '<Order price>'
    And I fill 'Quantity' with value '<Quantity>'
    And I check 'stop' checkbox
    And I fill the '1'st normal stop linked order 'quantity' with value '<1st stop quantity>'
    And I fill the '1'st normal stop linked order 'price' with value '<1st stop price>'
    Then the '1'st normal stop linked order 'points' input should be autopopulated
    And the '1'st normal stop linked order 'p/l' input should be autopopulated
    When I check 'limit' checkbox
    And I fill the '2'nd limit linked order 'quantity' with value '<2nd limit quantity>'
    And I fill the '2'nd limit linked order 'price' with value '<2nd limit price>'
    Then the '2'nd limit linked order 'points' input should be autopopulated
    And the '2'nd limit linked order 'p/l' input should be autopopulated
    When I fill the '3'rd trailing stop linked order 'quantity' with value '<Trailing quantity>'
    And I fill the '3'rd trailing stop linked order 'points away' with value '<Points>'
    And I fill the '4'th limit linked order 'quantity' with value '<4th limit quantity>'
    And I fill the '4'th limit linked order 'price' with value '<4th limit price>'
    Then the '4'th limit linked order 'points' input should be autopopulated
    And the '4'th limit linked order 'p/l' input should be autopopulated
    When I click on 'submit' button
    Then 'confirmation' element text should be 'Order placed'
    And 'market name' element text should be '<Market name>'
    When I click on 'ok' button
    Then the 'Positions And Orders' panel should be visible
    And I select 'Orders' list
    Then the 'previously added' market should be present on the list
    And the 'previously added' market 'stop price' cell should contain 'multiple' word
    And the 'previously added' market 'limit price' cell should contain 'multiple' word

    Examples:
        | Market name | Direction | Order price | Quantity | 1st stop quantity | 1st stop price | 2nd limit quantity | 2nd limit price | Trailing quantity | Points | 4th limit quantity | 4th limit price |
        | USD/JPY     | buy       | 121.514     | 2100     | 1000              | 100            | 1000               | 155.5           | 1100              | 20     | 1000               | 134.7           |
        | GBP/USD DFT | sell      | 1.7         | 20       | 10                | 1.9            | 10                 | 1.1             | 1                 | 10     | 10                 | 1               |

  @smoke @USD/JPY @place-sell-order-/w-multiple-linked-orders-of-different-applicability-spread-market
  Scenario: Place sell order with multiple linked orders of different applicability - Spread market
    Then the 'Watchlist' panel should be visible
    When I expand 'Popular Markets' watchlist
    And I click on 'buy' in the 'USD/JPY' market
    Then the 'Deal ticket' panel should be visible
    When I switch to 'order' tab
    Then 'order' ticket type should be 'selected'
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
    When I fill 'order price' with value '115'
    And I fill 'quantity' with value '2000'
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
    And I fill the '2'nd limit linked order 'time' with value '1010pm'
    And 'submit button' element should be enabled
    When I expand add stop limit dropdown
    And I select 'Trailing stop' in add stop or limit dropdown
    And I fill the '3'rd trailing stop linked order 'quantity' with value '1000'
    And I fill the '3'rd trailing stop linked order 'points away' with value '30'
    And I expand '3'rd applicability dropdown
    And I select 'GTD' option from '3'rd applicability dropdown
    Then 'GTD' option should be selected in '3'rd applicability dropdown
    And 'submit button' element should be enabled
    When I click on 'submit' button
    Then 'confirmation' element text should be 'Order placed'
    When I click on 'ok' button
    Then the 'Positions And Orders' panel should be visible
    When I select 'Orders' list
    Then the 'previously added' market should be present on the list
    When I click on 'stop price' in the 'USD/JPY' market
    Then the 'Deal ticket' panel should be visible
    And 'GTC' option should be selected in '1'st applicability dropdown
    And 'GTT' option should be selected in '2'nd applicability dropdown
    And 'GTD' option should be selected in '3'rd applicability dropdown

  @quick @smoke @USD/JPY @edit-an-order-with-multiple-linked-orders-price/qty-spread/cfd @wt-1058 @wt-1429
  Scenario Outline: Edit an order with multiple linked orders - Price/Quantity - Spread/CFD
    Then the 'Positions And Orders' panel should be visible
    When I add order with parameters:
      | MarketName | <Market name> |
      | Direction  | <Direction>   |
      | Quantity   | <Quantity>    |
      | Price      | <Order price> |
      | StopPrice  | <Stop price>  |
      | LimitPrice | <Limit price> |
    And I select 'Orders' list
    Then the 'previously added' market should be present on the list
    When I click on 'stop price' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'edit order'
    When I click on 'advancedTicket' link
    And I fill 'order price' with value '<Greater price>'
    Then '<Direction>' '<Market name>' main 'default' <Linked order 1> price validation should be correct
    When I fill 'order price' with value '<Less price>'
    Then '<Direction>' '<Market name>' main 'default' <Linked order 2> price validation should be correct
    When I fill 'order price' with value '<Order price>'
    Then the '<Market name>' '1'st normal stop linked order p/l value should be correct
    And the '<Market name>' '2'nd limit linked order p/l value should be correct
    When I expand add stop limit dropdown
    And I select 'Trailing stop' in add stop or limit dropdown
    Then the number of linked orders should be '3'
    And the '3'rd trailing stop order should contain fields:
      | itemName      |
      | trash icon    |
      | dropdown      |
      | quantity      |
      | points away   |
      | applicability |
    When I fill the '1'st normal stop linked order 'quantity' with value '<New stop qty>'
    Then the '<Market name>' '1'st normal stop linked order p/l value should be correct
    When I fill the '2'nd limit linked order 'quantity' with value '<New limit qty>'
    Then the '<Market name>' '2'nd limit linked order p/l value should be correct
    When I fill the '3'rd trailing stop linked order 'quantity' with value '<New trailing stop qty>'
    And I fill the '3'rd trailing stop linked order 'points away' with value '<Points away>'
    And I click on 'submit' button
    And I click on 'ok' button
    Then the 'Deal ticket' panel should be invisible
    When I make 'Positions And Orders' panel active
    And I select 'Orders' list
    Then the 'previously added' market should be present on the list
    And the 'previously added' market 'stop price' cell should contain 'multiple' word
    # skipped due to Adv+ issue
#     And the 'previously added' market 'limit price' cell should contain 'correct' data
    When I click on 'stop price' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'edit order'
    # skipped due to Adv+ issue
#     And the number of linked orders should be '3'

    Examples:
      | Market name | Quantity | New stop qty | New limit qty | New trailing stop qty | Points away | Order price | Stop price | Limit price | Direction | Greater price | Less price | Linked order 1 | Linked order 2 |
      | USD/JPY     | 3000     | 1300         | 1300          | 1500                  | 10          | 200         | 190        | 210         | buy       | 260           | 150        | limit          | stop           |
      | GBP/USD DFT | 3        | 1            | 1             | 2                     | 100         | 3           | 4          | 2           | sell      | 5             | 1          | stop           | limit          |

  @quick @smoke @USD/JPY @edit-an-order-with-multiple-linked-orders-stop/limit-add-linked-order @wt-842 @wt-1432
  Scenario Outline: Edit an order with multiple linked orders - Stop/Limit - Spread/CFD
    Then the 'Positions And Orders' panel should be visible
    When I add order with parameters:
      | MarketName | <Market name> |
      | Direction  | <Direction>   |
      | Quantity   | <Quantity>    |
      | Price      | <Order price> |
      | StopPrice  | <Stop price>  |
      | LimitPrice | <Limit price> |
    And I select 'Orders' list
    Then the 'previously added' market should be present on the list
    When I hover '<Market name>' market
    And I click on 'dropdown arrow' in the 'current' market
    And I select 'Edit Order' in dropdown menu in 'current' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'edit order'
    And 'market info' element text should be '<Market name>'
    And 'sell' price should change with time
    And 'buy' price should change with time
    And 'order price' input should be predefined with '<Order price>'
    And 'quantity' input should be predefined with '<Quantity>'
    And the edit ticket standard view panel should contain items:
      | itemName             |
      | order price          |
      | quantity             |
      | good till dropdown   |
      | advanced ticket link |
      | hedging status       |
      | oco link             |
    And the '1'st normal stop order should contain fields:
      | itemName |
      | checkbox |
      | label    |
      | price    |
      | p/l      |
    And the '2'nd limit order should contain fields:
      | itemName |
      | checkbox |
      | label    |
      | price    |
      | p/l      |
    And the '1'st normal stop linked order 'checkbox input' element should be enabled
    And the '2'nd limit linked order 'checkbox input' element should be enabled
    And the '1'st normal stop linked order 'price' element should be enabled
    And the '2'nd limit linked order 'price' element should be enabled
    And the '1'st normal stop linked order 'p/l' element should be disabled
    And the '2'nd limit linked order 'p/l' element should be disabled
    And 'submit button' element should be disabled
    When I close 'deal ticket' panel
    Then the 'Deal ticket' panel should be invisible
    When I make 'Positions And Orders' panel active
    And I am on the 'Orders' list
    And I hover '<Market name>' market
    And I click on 'stop price' in the 'current' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'edit order'
    When I close 'deal ticket' panel
    Then the 'Deal ticket' panel should be invisible
    When I make 'Positions And Orders' panel active
    And I am on the 'Orders' list
    And I hover '<Market name>' market
    And I click on 'limit price' in the 'current' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'edit order'
    When I fill the '1'st normal stop linked order 'price' with value '<New stop price>'
    Then the '<Market name>' '1'st normal stop linked order p/l value should be correct
    And 'submit button' element should be enabled
    When I fill the '2'nd limit linked order 'price' with value '<New limit price>'
    Then the '<Market name>' '2'nd limit linked order p/l value should be correct
    And 'submit button' element should be enabled
    When I click on 'submit' button
    Then 'confirmation' element text should be 'Order updated'
    And 'market name' element text should be '<Market name>'
    And 'confirmation message' element text should be 'Your order has been updated.'
    When I click on 'ok' button
    Then the 'Deal ticket' panel should be invisible
    When I make 'Positions And Orders' panel active
    And I am on the 'Orders' list
    Then the 'previously added' order 'stop price' should contain correct data
    And the 'previously added' order 'limit price' should contain correct data
    When I hover 'previously added' order
    And I click on 'dropdown arrow' in the 'current' market
    And I select 'Edit Order' in dropdown menu in 'current' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'edit order'
    When I click on 'advancedTicket' link
    And I expand add stop limit dropdown
    And I select 'Normal stop' in add stop or limit dropdown
    Then the number of linked orders should be '3'
    When I expand add stop limit dropdown
    And I select 'Limit' in add stop or limit dropdown
    Then the number of linked orders should be '4'
    When I expand add stop limit dropdown
    And I select 'Trailing stop' in add stop or limit dropdown
    Then the number of linked orders should be '5'
    When I fill the '1'st normal stop linked order 'quantity' with value '<New stop qty>'
    And I fill the '1'st normal stop linked order 'price' with value '<Stop price>'
    And I fill the '2'nd limit linked order 'quantity' with value '<New limit qty>'
    And I fill the '2'nd limit linked order 'price' with value '<Limit price>'
    And I fill the '3'rd normal stop linked order 'quantity' with value '<New stop qty>'
    And I fill the '3'rd normal stop linked order 'price' with value '<Stop price>'
    And I fill the '4'th limit linked order 'quantity' with value '<New limit qty>'
    And I fill the '4'th limit linked order 'price' with value '<Limit price>'
    And I fill the '5'th trailing stop linked order 'quantity' with value '<New trailing stop qty>'
    And I fill the '5'th trailing stop linked order 'points away' with value '<Points away>'
    And I click on 'submit' button
    Then correct confirmation message about adding '3' linked orders should be displayed
    When I click on 'ok' button
    Then the 'Deal ticket' panel should be invisible
    When I make 'Positions And Orders' panel active
    And I am on the 'Orders' list
    Then the 'previously added' market 'stop price' cell should contain 'multiple' word
    And the 'previously added' market 'limit price' cell should contain 'multiple' word
    When I hover '<Market name>' market
    And I click on 'stop price' in the 'current' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'edit order'
    When I fill the '1'st normal stop linked order 'price' with value '<New stop price>'
    And I fill the '2'nd limit linked order 'price' with value '<New limit price>'
    And I fill the '3'rd normal stop linked order 'price' with value '<New stop price>'
    And I fill the '4'th limit linked order 'price' with value '<New limit price>'
    And I fill the '5'th trailing stop linked order 'points away' with value '<New points away>'
    And I click on 'submit' button
    Then 'confirmation' element text should be 'Order updated'
    And 'market name' element text should be '<Market name>'
    And 'confirmation message' element text should be 'Your order has been updated.'
    When I click on 'ok' button
    Then the 'Deal ticket' panel should be invisible
    When I make 'Positions And Orders' panel active
    And I am on the 'Orders' list
    And I hover '<Market name>' market
    And I click on 'limit price' in the 'current' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'edit order'
    When I check 'stop' checkbox
    And I check 'limit' checkbox
    And I remove '5'th trailing stop order
    And I remove '4'th limit order
    And I remove '3'rd normal stop order
    And I click on 'submit' button
    Then 'confirmation' element text should be 'Order updated'
    And 'market name' element text should be '<Market name>'
    And correct confirmation message about removing '5' linked orders should be displayed
    When I click on 'ok' button
    Then the 'Deal ticket' panel should be invisible
    When I make 'Positions And Orders' panel active
    And I am on the 'Orders' list
    Then the 'previously added' market 'stop price' cell should contain 'set' word
    And the 'previously added' market 'limit price' cell should contain 'set' word

    Examples:
      | Market name | Quantity | New stop qty | New limit qty | New trailing stop qty | Points away | New points away | Order price | Stop price | Limit price | Direction | New stop price | New limit price |
      | USD/JPY     | 5000     | 1300         | 1300          | 1500                  | 10          | 20              | 200         | 190        | 210         | buy       | 150            | 250             |
      | GBP/USD DFT | 5        | 1            | 1             | 2                     | 100         | 150             | 3           | 4          | 2           | sell      | 5              | 1               |

  @smoke @USD/JPY @edit-an-order-with-multiple-linked-orders-remove-linked-order
  Scenario Outline: Edit an order with multiple linked orders - Remove linked order
    Then the 'Watchlist' panel should be visible
    And I expand 'Popular Markets' watchlist
    And I click on '<Direction>' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    When I switch to 'order' tab
    Then 'order' ticket type should be 'selected'
    When I click on 'advancedTicket' link
    And I fill 'order price' with value '<Order price>'
    And I fill 'quantity' with value '<Quantity>'
    And I check 'stop' checkbox
    And I fill the '1'st normal stop linked order 'quantity' with value '<New stop qty>'
    And I fill the '1'st normal stop linked order 'price' with value '<Stop price>'
    Then the '1'st normal stop linked order 'points' input should be autopopulated
    And the '1'st normal stop linked order 'p/l' input should be autopopulated
    When I check 'limit' checkbox
    And I fill the '2'nd limit linked order 'quantity' with value '<New limit qty>'
    And I fill the '2'nd limit linked order 'price' with value '<Limit price>'
    Then the '2'nd limit linked order 'points' input should be autopopulated
    And the '2'nd limit linked order 'p/l' input should be autopopulated
    When I expand add stop limit dropdown
    And I select 'Trailing stop' in add stop or limit dropdown
    And I fill the '3'rd trailing stop linked order 'quantity' with value '<New trailing stop qty>'
    And I fill the '3'rd trailing stop linked order 'points away' with value '<Points away>'
    And I click on 'submit' button
    And I click on 'ok' button
    Then the 'Positions And Orders' panel should be visible
    When I select 'Orders' list
    Then the 'previously added' market should be present on the list
    When I click on 'stop price' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'edit order'
    And the number of linked orders should be '3'
    When I remove '3'rd trailing stop order
    Then the '3'rd trailing stop order should contain fields:
    | itemName    |
    | undo button |
    And 'delete message' element text should be 'Changes will take effect once you click "Update Order" below'
    When I click on 'submit' button
    And I click on 'ok' button
    And I make 'Positions And Orders' panel active
    And I select 'Orders' list
    Then the 'previously added' market 'stop price' cell should contain 'correct' data

    Examples:
      | Market name | Quantity | New stop qty | New limit qty | New trailing stop qty | Points away | Order price | Stop price | Limit price | Direction |
      | USD/JPY     | 3000     | 1500         | 1300          | 1300                  | 10          | 200         | 190        | 210         | buy       |
      | GBP/USD DFT | 3        | 2            | 1             | 1                     | 100         | 3           | 4          | 2           | sell      |

  @quick @smoke @buy/sell-delete-order-cfd/spread-market @wt-1059 @wt-1433
  Scenario Outline: Buy/Sell - Delete Order CFD/Spread Market
    Then the 'Positions And Orders' panel should be visible
    When I add order with parameters:
      | MarketName | <Market name> |
      | Direction  | <Direction>   |
      | Quantity   | <Quantity>    |
      | Price      | <Order price> |
      | StopPrice  | <Stop price>  |
      | LimitPrice | <Limit price> |
    And I select 'Orders' list
    Then the 'previously added' order should be present on the list
    When I click on 'delete' in the 'previously added' order
    Then the 'previously added' order 'delete confirm' should be visible
    And the 'previously added' order 'delete cancel' should be visible
    And the 'previously added' order 'stop price' should be not visible
    And the 'previously added' order 'limit price' should be not visible
    When I click on 'delete cancel' in the 'previously added' order
    Then the 'previously added' order 'delete' should be visible
    And the 'previously added' order 'stop price' should be visible
    And the 'previously added' order 'limit price' should be visible
    When I click on 'delete' in the 'previously added' order
    And I click on 'delete confirm' in the 'previously added' order
    And I make 'Positions And Orders' panel active
    And I am on the 'Orders' list
    Then the 'previously added' order should be not present on the list
    When I select 'Order History' list
    And I get 'Order' History for '<Account type>'
    Then Order History '1'st table row with cell 'name' should contain correct 'MarketName' data
    And Order History '1'st table row with cell 'date' should contain correct 'CreatedDateTimeUtc' data
    And Order History '1'st table row with cell 'quantity' should contain correct 'OriginalQuantity' data
    And Order History '1'st table row with cell 'price' should contain correct 'TriggerPrice' data
    And Order History '1'st table row with cell 'type' should contain correct 'OrderApplicabilityId' data
    And Order History '1'st table row with cell 'status' should contain correct 'StatusId' data
    And Order History '1'st table row with cell 'last-edit' should contain correct 'LastChangedDateTimeUtc' data

    Examples:
      | Market name | Quantity | Order price | Stop price | Limit price | Direction | Account type |
      | USD/JPY     | 3000     | 200         | 190        | 210         | buy       | CFD          |
      | GBP/USD DFT | 3        | 3           | 4          | 2           | sell      | Spread       |

  @quick @smoke @trade-button-is-disabled-when-price-isn't-defined @wt-1293
  Scenario: Trade button is disabled when price isn't defined
    When I add new tab
    And I add new 'Watchlist' panel in 'New workspace 2' tab
    Then the panel should be visible
    When I create 'New Watchlist 1' watchlist
    Then the 'New Watchlist 1' watchlist should be visible
    When I expand 'New Watchlist 1' watchlist
    And I type 'Carillion CFD' name of market in 'New Watchlist 1' watchlist
    Then the 'market from dropdown' element should be visible on 'New Watchlist 1' watchlist
    When I add '1'st market from market dropdown
    Then the 'previously added' market is visible
    When I click on 'buy' in the 'Carillion CFD' market
    Then the 'Deal ticket' panel should be visible
    And 'order' ticket type should be 'selected'
    When I fill 'order price' with value '1'
    And I fill 'quantity' with value '50'
    Then 'submit button' element should be disabled

  @quick @smoke @edit-order-ticket-is-closed-if-the-order-is-removed @wt-1308
  Scenario: Edit order ticket is closed if the order is removed
    Then the 'Positions And Orders' panel should be visible
    When I select 'Orders' list
    And I add order with parameters:
      | MarketName | USD/JPY |
      | Direction  | Sell    |
      | Quantity   | 1000    |
      | Price      | 114     |
    Then the 'previously added' order should be present on the list
    When I add order with parameters:
      | MarketName | EUR/CHF |
      | Direction  | Buy     |
      | Quantity   | 1000    |
      | Price      | 1.1     |
    Then the 'previously added' order should be present on the list
    When I add order with parameters:
      | MarketName | USD/CAD |
      | Direction  | Sell    |
      | Quantity   | 1100    |
      | Price      | 1.7     |
    Then the 'previously added' order should be present on the list
    When I add order with parameters:
      | MarketName | EUR/USD DFT |
      | Direction  | Sell        |
      | Quantity   | 3.5         |
      | Price      | 1.9         |
    Then the 'previously added' order should be present on the list
    When I hover 'USD/JPY' market
    And I click on 'dropdown arrow' in the 'current' market
    And I select 'Edit Order' in dropdown menu in 'current' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'edit order'
    When I make 'Positions And Orders' panel active
    And I select 'Orders' list
    And I click on 'delete' in the 'USD/JPY' market
    And I click on 'delete confirm' in the 'USD/JPY' market
    And I make 'Positions And Orders' panel active
    And I am on the 'Orders' list
    Then the 'USD/JPY' market should be not present on the list
    And the 'Deal ticket' panel should be invisible
    When I make 'Positions And Orders' panel active
    And I am on the 'Orders' list
    And I hover 'EUR/CHF' market
    And I click on 'dropdown arrow' in the 'current' market
    And I select 'Edit Order' in dropdown menu in 'current' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'edit order'
    When I delete 'order' 'USD/CAD'
    And I make 'Positions And Orders' panel active
    And I am on the 'Orders' list
    Then the 'USD/CAD' market should be not present on the list
    And the 'Deal ticket' panel should be visible
    When I make 'Positions And Orders' panel active
    And I am on the 'Orders' list
    When I hover 'EUR/USD DFT' market
    And I click on 'dropdown arrow' in the 'current' market
    And I select 'Edit Order' in dropdown menu in 'current' market
    Then the 'Deal ticket' panel should be visible
    And 'ticket label' element text should be 'edit order'
    When I delete 'order' 'EUR/USD DFT'
    And I make 'Positions And Orders' panel active
    And I am on the 'Orders' list
    Then the 'EUR/USD DFT' market should be not present on the list
    And the 'Deal ticket' panel should be invisible

  @quick @smoke @order-details-ticket-is-closed-if-the-order-is-removed @wt-1309
  Scenario: Order details ticket is closed if the order is removed
    Then the 'Positions And Orders' panel should be visible
    When I select 'Orders' list
    And I add order with parameters:
      | MarketName | USD/JPY |
      | Direction  | Sell    |
      | Quantity   | 1000    |
      | Price      | 114     |
    Then the 'previously added' order should be present on the list
    When I add order with parameters:
      | MarketName | EUR/CHF |
      | Direction  | Buy     |
      | Quantity   | 1000    |
      | Price      | 1.1     |
    Then the 'previously added' order should be present on the list
    When I add order with parameters:
      | MarketName | USD/CAD |
      | Direction  | Sell    |
      | Quantity   | 1100    |
      | Price      | 1.7     |
    Then the 'previously added' order should be present on the list
    When I add order with parameters:
      | MarketName | EUR/USD DFT |
      | Direction  | Sell        |
      | Quantity   | 3.5         |
      | Price      | 1.9         |
    Then the 'previously added' order should be present on the list
    When I hover 'USD/JPY' market
    And I click on 'dropdown arrow' in the 'current' market
    And I select 'Order Details' in dropdown menu in 'current' market
    Then the 'details' panel should be visible
    When I make 'Positions And Orders' panel active
    And I select 'Orders' list
    And I click on 'delete' in the 'USD/JPY' market
    And I click on 'delete confirm' in the 'USD/JPY' market
    And I make 'Positions And Orders' panel active
    And I am on the 'Orders' list
    Then the 'USD/JPY' market should be not present on the list
    And the 'details' panel should be invisible
    When I make 'Positions And Orders' panel active
    And I am on the 'Orders' list
    And I hover 'EUR/CHF' market
    And I click on 'dropdown arrow' in the 'current' market
    And I select 'Order Details' in dropdown menu in 'current' market
    Then the 'details' panel should be visible
    When I delete 'order' 'USD/CAD'
    And I make 'Positions And Orders' panel active
    And I am on the 'Orders' list
    Then the 'USD/CAD' market should be not present on the list
    And the 'details' panel should be visible
    When I close panel
    Then the 'details' panel should be invisible
    When I make 'Positions And Orders' panel active
    And I am on the 'Orders' list
    When I hover 'EUR/USD DFT' market
    And I click on 'dropdown arrow' in the 'current' market
    And I select 'Order Details' in dropdown menu in 'current' market
    Then the 'details' panel should be visible
    When I delete 'order' 'EUR/USD DFT'
    And I make 'Positions And Orders' panel active
    And I am on the 'Orders' list
    Then the 'EUR/USD DFT' market should be not present on the list
    And the 'details' panel should be invisible

  @smoke @quick @order-error-handling-missing-price/quantity,invalid-price/quantity-stop/limit-price-buy/sell-cfd/spread
  Scenario Outline: Order Error Handling - Missing Price/Quantity, Invalid Price/Quantity - Stop/Limit Price - Buy/Sell CFD/Spread
    Then the 'Watchlist' panel should be visible
    And I expand 'Popular Markets' watchlist
    And I click on '<Direction>' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    When I switch to 'order' tab
    Then 'order' ticket type should be 'selected'
    And 'submit button' element should be disabled
    And 'submit button' element text should be 'Choose quantity'
    When I fill main 'quantity' with value '<Less than min qty>'
    Then '<Market name>' main order 'min quantity' validation should be correct
    And 'submit button' element text should be 'Quantity too low'
    When I fill main 'quantity' with value '<Greater than max qty>'
    Then '<Market name>' main order 'max quantity' validation should be correct
    And 'submit button' element text should be 'Quantity too high'
    When I clear 'quantity' field
    Then 'submit button' element should be disabled
    And 'submit button' element text should be 'Choose quantity'
    When I fill main 'quantity' with value '<Quantity>'
    Then 'submit button' element should be disabled
    And 'submit button' element text should be 'Enter a price'
    When I fill '<Market name>' main price with value between current prices
    Then '<Market name>' main order 'between price' validation should be correct
    And 'submit button' element should be disabled
    And 'submit button' element text should be 'Enter valid order price'
    When I fill main 'order price' with value '<Order price>'
    Then 'submit button' element should be enabled
    And 'submit button' element text should be 'Place Order'
    When I check 'stop' checkbox
    Then 'submit button' element should be disabled
    And 'submit button' element text should be 'Choose stop and limit levels'
    When I fill the '1'st normal stop linked order 'price' with value '<Stop price>'
    Then '<Direction>' '<Market name>' main '1'st stop price validation should be correct
    And 'submit button' element should be disabled
    And 'submit button' element text should be '<Submit btn Stop txt>'
    When I uncheck 'stop' checkbox
    And I check 'limit' checkbox
    Then 'submit button' element should be disabled
    And 'submit button' element text should be 'Choose stop and limit levels'
    When I fill the '2'nd limit linked order 'price' with value '<Limit price>'
    Then '<Direction>' '<Market name>' main '2'nd limit price validation should be correct
    And 'submit button' element should be disabled
    And 'submit button' element text should be '<Submit btn Limit txt>'

    Examples:
      | Market name | Direction | Quantity | Order price | Less than min qty | Greater than max qty | Stop price | Limit price | Submit btn Stop txt | Submit btn Limit txt |
      | USD/JPY     | buy       | 1010     | 200         | 900               | 50000002             | 250        | 90          | stop level too high | limit level too low  |
      | GBP/USD DFT | sell      | 2        | 3           | 0.05              | 6370                 | 1          | 5           | stop level too low  | limit level too high |

  @smoke @quick @validation @order-error-handling-multiple-stop/limit-quantity-buy/sell-cfd/spread
  Scenario Outline: Order Error Handling - Multiple - Stop/Limit Quantity - Buy/Sell CFD/Spread
    Then the 'Watchlist' panel should be visible
    And I expand 'Popular Markets' watchlist
    And I click on '<Direction>' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    When I switch to 'order' tab
    Then 'order' ticket type should be 'selected'
    And 'submit button' element should be disabled
    And 'submit button' element text should be 'Choose quantity'
    When I fill main 'quantity' with value '<Quantity>'
    Then 'submit button' element should be disabled
    And 'submit button' element text should be 'Enter a price'
    When I fill main 'order price' with value '<Order price>'
    Then 'submit button' element should be enabled
    And 'submit button' element text should be 'Place Order'
    When I click on 'advancedTicket' link
    And I check 'stop' checkbox
    Then 'submit button' element should be disabled
    And 'submit button' element text should be 'Choose stop and limit levels'
    When I fill the main '1'st normal stop linked order 'quantity' with value '<1st stop quantity>'
    And I check 'limit' checkbox
    And I fill the main '2'nd limit linked order 'quantity' with value '<2nd limit quantity>'
    When I expand add stop limit dropdown
    And I select 'Normal stop' in add stop or limit dropdown
    And I fill the main '3'rd normal stop linked order 'quantity' with value '<3rd stop quantity>'
    Then the main '3'rd stop max quantity validation should be correct
    When I expand add stop limit dropdown
    And I select 'Limit' in add stop or limit dropdown
    And I fill the main '4'th limit linked order 'quantity' with value '<4th limit quantity>'
    Then the main '4'th limit max quantity validation should be correct

    Examples:
      | Market name | Direction | Quantity | Order price | 1st stop quantity | 2nd limit quantity | 3rd stop quantity | 4th limit quantity |
      | USD/JPY     | buy       | 2500     | 130         | 1000              | 1100               | 1600              | 1700               |
      | GBP/USD DFT | sell      | 10       | 2           | 3                 | 4                  | 8                 | 10                 |

  @smoke @bug @points-away-precision
  Scenario: Points Away precision
    Then the 'Watchlist' panel should be visible
    When I expand 'Popular Markets' watchlist
    And I click on 'sell' in the 'UK 100 DFT' market
    Then the 'Deal ticket' panel should be visible
    When I switch to 'order' tab
    And I click on 'advancedTicket' link
    And I expand add stop limit dropdown
    And I select 'Trailing stop' in add stop or limit dropdown
    And I fill the '3'rd trailing stop linked order 'quantity' with value '2'
    And I fill the '3'rd trailing stop linked order 'points away' with value '1234.4444'
    Then the '3'rd trailing stop linked order 'points away' input should be '1234.4'

  @smoke @USD/JPY @UK-100-DFT @order-auto-populated-fields @wt-154
  Scenario Outline: Order auto-populated fields
    Then the 'Watchlist' panel should be visible
    When I expand 'Popular Markets' watchlist
    And I click on '<Direction>' in the '<Market name>' market
    Then the 'Deal ticket' panel should be visible
    When I switch to 'order' tab
    And I fill main 'quantity' with value '<Quantity>'
    And I fill main 'order price' with value '<Order price>'
    And I check 'stop' checkbox
    And I fill the main '1'st normal stop linked order 'points' with value '<Points>'
    Then the <Direction> '<Market name>' main '1'st stop linked order 'price' input should be calculated from 'points'
    And the <Direction> '<Market name>' main '1'st stop linked order 'p/l' input should be calculated from 'points'
    When I clear the main '1'st normal stop linked order 'points' input field
    Then the main '1'st normal stop linked order 'points' input should be blank
    And the main '1'st normal stop linked order 'price' input should be blank
    And the main '1'st normal stop linked order 'p/l' input should be blank
    When I fill the main '1'st normal stop linked order 'price' with value '<Stop price>'
    Then the <Direction> '<Market name>' main '1'st stop linked order 'points' input should be calculated from 'price'
    And the <Direction> '<Market name>' main '1'st stop linked order 'p/l' input should be calculated from 'price'
    When I clear the main '1'st normal stop linked order 'price' input field
    Then the main '1'st normal stop linked order 'points' input should be blank
    And the main '1'st normal stop linked order 'price' input should be blank
    And the main '1'st normal stop linked order 'p/l' input should be blank
    When I fill the main '1'st normal stop linked order 'p/l' with value '<Loss>'
    Then the <Direction> '<Market name>' main '1'st stop linked order 'points' input should be calculated from 'p/l'
    And the <Direction> '<Market name>' main '1'st stop linked order 'price' input should be calculated from 'p/l'
    When I check 'limit' checkbox
    And I fill the main '2'nd limit linked order 'points' with value '<Points>'
    Then the <Direction> '<Market name>' main '2'nd limit linked order 'price' input should be calculated from 'points'
    And the <Direction> '<Market name>' main '2'nd limit linked order 'p/l' input should be calculated from 'points'
    When I clear the main '2'nd limit linked order 'points' input field
    Then the main '2'nd limit linked order 'points' input should be blank
    And the main '2'nd limit linked order 'price' input should be blank
    And the main '2'nd limit linked order 'p/l' input should be blank
    When I fill the main '2'nd limit linked order 'price' with value '<Limit price>'
    Then the <Direction> '<Market name>' main '2'nd limit linked order 'points' input should be calculated from 'price'
    And the <Direction> '<Market name>' main '2'nd limit linked order 'p/l' input should be calculated from 'price'
    When I clear the main '2'nd limit linked order 'price' input field
    Then the main '2'nd limit linked order 'points' input should be blank
    And the main '2'nd limit linked order 'price' input should be blank
    And the main '2'nd limit linked order 'p/l' input should be blank
    When I fill the main '2'nd limit linked order 'p/l' with value '<Profit>'
    Then the <Direction> '<Market name>' main '2'nd limit linked order 'points' input should be calculated from 'p/l'
    And the <Direction> '<Market name>' main '2'nd limit linked order 'price' input should be calculated from 'p/l'
    When I fill main 'quantity' with value '<Quantity 2>'
    Then the <Direction> '<Market name>' main '1'st stop linked order 'p/l' input should be calculated from 'points'
    And the <Direction> '<Market name>' main '2'nd limit linked order 'p/l' input should be calculated from 'points'

    Examples:
      | Market name | Quantity | Direction | Points | Stop price | Limit price | Loss  | Profit | Quantity 2 | Order price |
      | USD/JPY     | 1000     | buy       | 100    | 90         | 120         | -1000 | 1000   | 2000       | 100         |
      | UK 100 DFT  | 3        | sell      | 100    | 8000       | 6000        | -300  | 300    | 6          | 7000        |
