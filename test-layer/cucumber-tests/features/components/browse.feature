@browse
Feature: Browse Page
  As a user
  I can open browse page
  So all the browse functionality should work as expected

  Background:
    Given I am logged in to the application with default state

  @smoke @browse @browse-page-view-and-main-functionality @wt-705
  Scenario: Browse page view and main functionality
    When I switch to 'Browse markets' workspace tab
    Then 'Browse markets' tab should be active
    And the browse page 'markets' section should contain items:
      | itemName  |
      | tags list |
    And the browse page 'filter tabs' section should contain items:
      | itemName            |
      | tag name            |
      | filters             |
      | product type filter |
    And the browse page 'search' section should contain items:
      | itemName        |
      | markets table   |
      | vertical scroll |
      | search icon     |
    And all markets categories are displayed and ordered by weighting
    And 'Popular' markets category should be active
    And 'markets filter tabs' are displayed
    And 'Popular China' markets filter tab should be active
    And browse page search text input 'placeholder' should be 'Filter markets'
    When I switch to 'Default Workspace' workspace tab
    And I click on Search input
    Then Search modal should be visible
    When I click on 'browse markets' link in search modal
    Then 'Browse markets' tab should be active
    And all markets categories are displayed and ordered by weighting
    And 'Popular' markets category should be active
    When I click 'search input' in browse page search
    And I wait for '1000'
    Then browse page search text input 'placeholder' should be 'Type two or more characters'
    When I select 'Bonds' market category
    Then 'Bonds' markets category should be active
    And 'Bonds' markets category has no children
    And 'markets filter tabs' are hidden
    When I select 'Options' market category
    Then 'Options' markets category should be active
    And 'Options' markets category has children
    And 'markets filter tabs' are displayed
    And 'Options UK 100' markets filter tab should be active
    And 'Options' filters panel contains correct tabs ordered by weighting
    When I select 'Popular' market category
    Then 'Popular' markets category should be active
    And 'Popular' markets category has children
    And 'markets filter tabs' are displayed
    And 'Popular' filters panel contains correct tabs ordered by weighting
    And 'Popular China' markets filter tab should be active
    And 'Popular China' filter tab search list contains correct markets ordered by weighting
    When I fill browse page search text field with value 'u'
    Then 'Popular China' filter tab search list contains correct markets ordered by weighting
    When I fill browse page search text field with value 'us'
    And I wait for browse page markets loading
    Then 'Popular China' filter tab 'us' query returns correct markets ordered by weighting
    When I fill browse page search text field with value '123'
    Then the browse page 'filter tabs' section should contain items:
      | itemName   |
      | no results |
    When I click 'close icon' in browse page search
    And I wait for browse page markets loading
    Then 'Popular China' filter tab search list contains correct markets ordered by weighting
    When I click on 'name' in the 'AUD/USD' market on browse tab
    And I wait for chart loading
    Then the chart on browse tab should be loaded
    When I select 'Popular Australia' filter tab
    Then 'Popular Australia' markets filter tab should be active
    And 'Popular Australia' filter tab search list contains correct markets ordered by weighting
    When I select 'Metals' market category
    And I wait for browse page markets loading
    Then 'Metals' markets category should be active
    And 'Metals' markets category has no children
    And 'Metals' category search list contains correct markets ordered by weighting

  @smoke @browse @market-types-with-subtags @default-resize-window @wt-684 @wt-1321
  Scenario Outline: Market types with subtags
    When I switch to 'Browse markets' workspace tab
    Then 'Browse markets' tab should be active
    And all markets categories are displayed and ordered by weighting
    And 'Popular' markets category should be active
    When I select '<Category>' market category
    Then '<Category>' markets category should be active
    And I wait for browse page markets loading
    And 'markets filter tabs' are displayed
    And '<First Subcategory>' markets filter tab should be active
    When I select '<Subcategory>' filter tab
    Then '<Subcategory>' markets filter tab should be active
    And '<Subcategory>' filter tab search list contains correct markets ordered by weighting
    And browse page '<Market>' market 'bid price' should update according to market status
    And browse page '<Market>' market 'ask price' should update according to market status
    And the browse page 'markets table' section should contain items:
      | itemName    |
      | search icon |
    When I fill browse page search text field with value 'lorem ipsum'
    Then the browse page 'markets table' section should contain items:
      | itemName   |
      | close icon |
      | no results |
    When I click 'close icon' in browse page search
    Then browse page search text input 'placeholder' should be 'Filter markets'
    And browse page search text input 'value' should be ' '
    And I wait for markets loading
    And '<Subcategory>' filter tab search list contains correct markets ordered by weighting
    When I click 'search input' in browse page search
    And I wait for '1000'
    Then browse page search text input 'placeholder' should be 'Type two or more characters'
    When I fill browse page search text field with value 'c'
    Then browse page search text input 'value' should be 'c'
    And '<Subcategory>' filter tab search list contains correct markets ordered by weighting
    When I fill browse page search text field with value 'cf'
    And I wait for browse page markets loading
    Then '<Subcategory>' filter tab 'cf' query returns correct markets ordered by weighting
    When I click 'close icon' in browse page search
    Then browse page search text input 'placeholder' should be 'Filter markets'
    And browse page search text input 'value' should be ' '
    When I fill browse page search text field with value 'cfd'
    And I wait for browse page markets loading
    Then '<Subcategory>' filter tab 'cfd' query returns correct markets ordered by weighting
    When I click 'close icon' in browse page search
    Then browse page search text input 'placeholder' should be 'Filter markets'
    And browse page search text input 'value' should be ' '
    And '<Subcategory>' filter tab search list contains correct markets ordered by weighting
    When I resize window with:
      | height | 1050 |
      | width  | 1000 |
    Then 'markets filter dropdown' is present
    And '<Category>' filters panel contains correct tabs ordered by weighting
    When I resize window with:
      | height | 1050 |
      | width  | 1680 |
    And I click on 'name' in the '<Market>' market on browse tab
    Then 'markets filter dropdown' is present
    And '<Category>' filters panel contains correct tabs ordered by weighting
    When I resize window with:
      | height | 1050 |
      | width  | 1000 |
    Then 'markets filter dropdown' is present
    And '<Category>' filters panel contains correct tabs ordered by weighting
    When I select '<Subcategory more>' subtag from more dropdown
    Then '<Subcategory more>' markets filter tab should be active
    When I wait for browse page markets loading
    Then '<Subcategory more>' filter tab search list contains correct markets ordered by weighting
    When I select '<Subcategory more 2>' subtag from more dropdown
    Then '<Subcategory more 2>' markets filter tab should be active
    When I wait for browse page markets loading
    Then '<Subcategory more 2>' filter tab search list contains correct markets ordered by weighting
    # may fail due to sorting issue https://jira.gaincapital.com/browse/TPDWT-13597
    And '<Category>' more dropdown contains correct tabs ordered by weighting

    Examples:
      | Category    | First Subcategory  | Subcategory       | Market                          | Subcategory more | Subcategory more 2 |
      | FX          | FX ALL-Markets     | FX EUR-Crosses    | EUR/CHF                         | FX NZD-Crosses   | FX JPY-Crosses     |
      # | Popular     | Popular China      | Popular UK        | EUR/CHF                         | Popular Japan    | Popular Spreads    |
      # | Commodities | Commodities Energy | Commodities Soft | London No 7 Cocoa May 18 CFD    |
      | Equities    | Equities UK        | Equities Europe   | Allianz SE CFD                  | Equities Spain   | Equities Hong Kong |
      | Indices     | Indices Asia       | Indices Europe    | Germany 30 CFD                  | Indices US       | Indices UK         |
      | iShares     | iShares Asia       | iShares US        | iShares Dow Jones US Energy CFD | iShares US       | iShares UK         |

  @smoke @browse @market-types-without-subtags
  Scenario Outline: Market types without subtags
    When I switch to 'Browse markets' workspace tab
    Then 'Browse markets' tab should be active
    And all markets categories are displayed and ordered by weighting
    And 'Popular' markets category should be active
    When I select '<Category>' market category
    And I wait for browse page markets loading
    Then '<Category>' markets category should be active
    And 'markets filter tabs' are hidden
    And '<Category>' category search list contains correct markets ordered by weighting
    And browse page '<Market>' market 'bid price' should update according to market status
    And browse page '<Market>' market 'ask price' should update according to market status

    Examples:
      | Category         | Market                           |
      # | Bonds            | Euro Bund (per 0.01) Jun 18 CFD  |
      | Trending Markets | EUR/USD DFT                      |
      | Interest Rates   | Eurodollar (per 0.01) Sep 18 CFD |
      # | Metals           | Gold CFD                         |
      | Popular MT       | EUR/JPY                          |
      # | FX Metals        | XAU/AUD                          |
      | Cryptocurrency   | Bitcoin ($) CFD                  |

  @smoke @browse @default-resize-window @browse-page-options @wt-1278
  Scenario: Options
    When I switch to 'Browse markets' workspace tab
    Then 'Browse markets' tab should be active
    And all markets categories are displayed and ordered by weighting
    And 'Popular' markets category should be active
    And 'Popular China' filter tab search list contains correct markets ordered by weighting
    When I select 'Options' market category
    Then 'Options' markets category should be active
    And 'Options' filters panel contains correct tabs ordered by weighting
    And 'no results' is displayed
    And 'product type filter' is present
    And 'All' product type filter is selected
    When I expand product type dropdown
    Then 'product type dropdown' is displayed
    And product type filters dropdown contains correct items
    And the browse page 'product type dropdown' section should contain items:
      | itemName               |
      | include options toggle |
    And options included toggle is off
    When I click 'include options toggle' in product types dropdown
    Then options included toggle is on
    When I collapse product type dropdown
    And I wait for browse page markets loading
    Then 'Options' filters panel contains correct tabs ordered by weighting
    And 'leftmost' markets filter tab should be active
    And 'leftmost' filter tab search list contains correct markets ordered by weighting
    And browse page 'UK 100 Sep 18 Call 7300 CFD' market 'sell on browse' should update according to market status
    And browse page 'UK 100 Sep 18 Call 7300 CFD' market 'buy on browse' should update according to market status
    When I select 'Options US Crude Oil' filter tab
    And I wait for browse page markets loading
    Then 'Options US Crude Oil' markets filter tab should be active
    And 'Options US Crude Oil' filter tab search list contains correct markets ordered by weighting
    When I resize window with:
      | height | 1050 |
      | width  | 1000 |
    Then 'markets filter dropdown' is present
    And 'Options' filters panel contains correct tabs ordered by weighting
    When I select 'Options US SP 500' subtag from more dropdown
    Then 'Options US SP 500' markets filter tab should be active
    And 'markets filter dropdown' is present
    And 'current' markets filter tab should be displayed on 'last' position
    And markets filter dropdown contains previously the last visible market filter tab
    When I wait for browse page markets loading
    Then 'Options US SP 500' filter tab search list contains correct markets ordered by weighting
    When I select 'Indices' market category
    And I wait for browse page markets loading
    Then 'Indices' markets category should be active
    And 'Indices' filters panel contains correct tabs ordered by weighting
    And 'leftmost' markets filter tab should be active
    And 'leftmost' filter tab search list contains correct markets ordered by weighting
    And 'markets filter dropdown' is present
    When I select 'Options' market category
    And I wait for browse page markets loading
    Then 'Options' markets category should be active
    And 'Options' filters panel contains correct tabs ordered by weighting
    And 'leftmost' markets filter tab should be active
    And 'leftmost' filter tab search list contains correct markets ordered by weighting
    And 'markets filter dropdown' is present
    When I resize window with:
      | height | 1050 |
      | width  | 1680 |
    Then 'Options' filters panel contains correct tabs ordered by weighting
    And 'markets filter dropdown' is not present

  @smoke @browse @open-position-from-browse-tab
  Scenario Outline: Open Position from Browse tab
    When I switch to 'Browse markets' workspace tab
    Then 'Browse markets' tab should be active
    And 'Popular' markets category should be active
    When I select 'Popular UK' filter tab
    And I wait for browse page markets loading
    Then 'Popular UK' markets filter tab should be active
    When I click on '<Direction> on browse' in the '<Market name>' market on browse tab
    Then the 'Deal ticket' panel should be visible
    When I fill 'quantity' with value '<Quantity>'
    And I check 'stop' checkbox
    And I fill the '1'st normal stop linked order 'price' with computed value '<Direction>*<Stop Multiplier>' in the '<Market name>'
    And I check 'limit' checkbox
    And I fill the '2'st limit linked order 'price' with computed value '<Direction>*<Limit Multiplier>' in the '<Market name>'
    And I switch to 'Order' tab
    Then 'order' ticket type should be 'selected'
    When I switch to 'Trade' tab
    Then 'trade' ticket type should be 'selected'
    When I switch to 'Order' tab
    Then 'order' ticket type should be 'selected'
    When I switch to 'Trade' tab
    Then 'trade' ticket type should be 'selected'
    # New Quantity behaviour - from ticket TPDWT-8241
    # test fixture is - all markets quantities are deleted, so in the next step input quantity does not contain any value
    And 'primary area quantity' input should be predefined with ''
    And 'stop price' input should be predefined with ''
    And 'limit price' input should be predefined with ''
    When I close 'Deal ticket' panel
    Then the 'Deal ticket' panel should be invisible
    When I click on '<Direction> on browse' in the '<Market name>' market on browse tab
    Then the 'Deal ticket' panel should be visible
    When I fill 'quantity' with value '<Quantity>'
    And I check 'stop' checkbox
    And I fill the '1'st normal stop linked order 'price' with computed value '<Direction>*<Stop Multiplier>' in the '<Market name>'
    And I check 'limit' checkbox
    And I fill the '2'st limit linked order 'price' with computed value '<Direction>*<Limit Multiplier>' in the '<Market name>'
    And I click on 'submit' button
    Then 'confirmation' element text should be 'Trade executed'
    And 'market name' element text should be '<Market name>'
    # New issue about zeros in confirmation message - TPDWT-13409 - next step CAN fail, if price ends with zero
    #And open <Direction> '<Market name>' trade confirmation message should be correct
    When I click on 'ok' button
    Then the 'Deal ticket' panel should be invisible
    When I navigate back to previous page
    And I switch to 'Default Workspace' workspace tab
    Then 'Default Workspace' tab should be active
    And the 'Positions And Orders' panel should be visible
    And 'Positions' item should be active
    And the 'previously added' market should be present on the list
    And the 'previously added' market 'position' cell should contain '<Direction> <Quantity>' data
    And the 'previously added' market 'opening price' should be correct
    And the 'previously added' market 'stop price' should contain correct data
    And the 'previously added' market 'limit price' should contain correct data

    Examples:
      | Market name | Direction | Quantity | Stop Multiplier | Limit Multiplier |
      | AUD/USD     | buy       | 1000     | 0.99            | 1.01             |
      | EUR/USD DFT | sell      | 0.08     | 1.01            | 0.99             |

  @smoke @browse @create-order-from-browse-tab
  Scenario Outline: Create Order from Browse tab
    When I switch to 'Browse markets' workspace tab
    Then 'Browse markets' tab should be active
    And 'Popular' markets category should be active
    When I select 'Popular UK' filter tab
    And I wait for browse page markets loading
    Then 'Popular UK' markets filter tab should be active
    When I click on '<Direction> on browse' in the '<Market name>' market on browse tab
    Then the 'Deal ticket' panel should be visible
    When I switch to 'order' tab
    Then 'order' ticket type should be 'selected'
    When I fill '<Market name>' main price with value not between current prices on '<Direction>'
    And I fill 'quantity' with value '<Quantity>'
    And I check 'stop' checkbox
    And I fill the '1'st normal stop linked order 'price' with computed value '<Direction>*<Stop Multiplier>' in the '<Market name>'
    And I check 'limit' checkbox
    And I fill the '2'st limit linked order 'price' with computed value '<Direction>*<Limit Multiplier>' in the '<Market name>'
    And I switch to 'Trade' tab
    Then 'trade' ticket type should be 'selected'
    When I switch to 'Order' tab
    Then 'order' ticket type should be 'selected'
    And I switch to 'Trade' tab
    Then 'trade' ticket type should be 'selected'
    When I switch to 'Order' tab
    Then 'order' ticket type should be 'selected'
    # New Quantity behaviour - from ticket TPDWT-8241
    # test fixture is - all markets quantities are deleted, so in the next step input quantity does not contain any value
    And 'primary area quantity' input should be predefined with ''
    And 'stop price' input should be predefined with ''
    And 'limit price' input should be predefined with ''
    When I close 'Deal ticket' panel
    Then the 'Deal ticket' panel should be invisible
    When I click on '<Direction> on browse' in the '<Market name>' market on browse tab
    Then the 'Deal ticket' panel should be visible
    When I switch to 'order' tab
    Then 'order' ticket type should be 'selected'
    When I fill '<Market name>' main price with value not between current prices on '<Direction>'
    And I fill 'quantity' with value '<Quantity>'
    And I check 'stop' checkbox
    And I fill the '1'st normal stop linked order 'price' with computed value '<Direction>*<Stop Multiplier>' in the '<Market name>'
    And I check 'limit' checkbox
    And I fill the '2'st limit linked order 'price' with computed value '<Direction>*<Limit Multiplier>' in the '<Market name>'
    And I click on 'submit' button
    Then 'confirmation' element text should be 'Order placed'
    And 'market name' element text should be '<Market name>'
    # New issue about zeros in confirmation message - TPDWT-13409 - next step CAN fail, if price ends with zero
    #And open <Direction> '<Market name>' order confirmation message should be correct
    When I click on 'ok' button
    Then the 'Deal ticket' panel should be invisible
    When I navigate back to previous page
    And I switch to 'Default Workspace' workspace tab
    Then 'Default Workspace' tab should be active
    And the 'Positions And Orders' panel should be visible
    And 'Positions' item should be active
    When I select 'Orders' list
    Then the 'previously added' order should be present on the list
    And the 'previously added' order 'quantity' cell should contain '<Direction> <Quantity>' data
    And the 'previously added' order 'order price' cell should contain 'correct' data
    And the 'previously added' order 'stop price' cell should contain 'correct' data
    And the 'previously added' order 'limit price' cell should contain 'correct' data

    Examples:
      | Market name | Direction | Quantity | Stop Multiplier | Limit Multiplier |
      | AUD/USD     | buy       | 1000     | 0.99            | 1.01             |
      | EUR/USD DFT | sell      | 0.08     | 1.01            | 0.99             |

  @smoke @browse @chart-buy-sell-buttons-open-trade-ticket
  Scenario: Chart Buy/Sell buttons open Trade ticket
    When I switch to 'Browse markets' workspace tab
    And I select 'Popular UK' filter tab
    And I wait for browse page markets loading
    Then 'Popular UK' markets filter tab should be active
    When I click on 'name' in the 'AUD/USD' market on browse tab
    And I wait for chart loading
    Then the chart on browse tab should be loaded
    And the add icon is visible after mouse hovering
    And the price axis is visible after mouse hovering
    # WT-1152 2, 3, 4 steps are not implemented because Chart component
    And sell button element should be enabled inside chart
    And sell button element should be located inside chart
    And sell button element should be colored in 'red'
    And buy button element should be enabled inside chart
    And buy button element should be located inside chart
    And buy button element should be colored in 'blue'
    # TC WT-1152 contains confusing step with expected result. Amar does not confirm this expected result
    When I refresh current page
    Then the chart on browse tab is not present
    When I select 'Popular UK' filter tab
    And I wait for browse page markets loading
    Then 'Popular UK' markets filter tab should be active
    When I click on 'name' in the 'AUD/USD' market on browse tab
    And I wait for chart loading
    Then the chart on browse tab should be loaded
    # WT-1152: 7 step is partially implemented (moving outside Chart is not implemented)
    When I move sell/buy button inside chart
    Then sell button element should be enabled inside chart
    And sell button element should be located inside chart
    And buy button element should be enabled inside chart
    And buy button element should be located inside chart
    When I click on sell button within Chart
    And I wait for 'Deal ticket' panel loading
    Then the 'Deal ticket' panel should be visible
    When I fill 'quantity' with value '1000'
    And I check 'stop' checkbox
    And I fill the '1'st normal stop linked order 'price' with computed value 'sell*1.1' in the 'AUD/USD'
    And I check 'limit' checkbox
    And I fill the '2'st limit linked order 'price' with computed value 'sell*0.9' in the 'AUD/USD'
    And I click on 'submit' button
    # Next step CAN fail - TPDWT-13736
    And I wait confirmation message is displayed within panel
    Then 'confirmation' element text should be 'Trade executed'
    When I click on 'ok' button
    And I navigate back to previous page
    And I switch to 'Default Workspace' workspace tab
    Then 'Default Workspace' tab should be active
    And the 'Positions And Orders' panel should be visible
    And 'Positions' item should be active
    And the 'previously added' market should be present on the list
    When I switch to 'Browse markets' workspace tab
    And I select 'Popular UK' filter tab
    And I wait for browse page markets loading
    Then 'Popular UK' markets filter tab should be active
    When I click on 'name' in the 'AUD/USD' market on browse tab
    And I wait for chart loading
    And I click on buy button within Chart
    And I wait for 'Deal ticket' panel loading
    Then the 'Deal ticket' panel should be visible
    When I switch to 'order' tab
    Then 'order' ticket type should be 'selected'
    When I fill 'AUD/USD' main price with value not between current prices on 'buy'
    And I fill 'quantity' with value '1000'
    And I check 'stop' checkbox
    And I fill the '1'st normal stop linked order 'price' with computed value 'buy*0.9' in the 'AUD/USD'
    And I check 'limit' checkbox
    And I fill the '2'st limit linked order 'price' with computed value 'buy*1.1' in the 'AUD/USD'
    And I wait for '1000'
    And I click on 'submit' button
    # Next step CAN fail -  TPDWT-13736
    And I wait confirmation message is displayed within panel
    Then 'confirmation' element text should be 'Order placed'
    When I click on 'ok' button
    And I navigate back to previous page
    And I switch to 'Default Workspace' workspace tab
    Then 'Default Workspace' tab should be active
    And the 'Positions And Orders' panel should be visible
    And 'Positions' item should be active
    When I select 'Orders' list
    Then the 'previously added' order should be present on the list

  @smoke @browse @default-resize-window @more-dropdown
  Scenario: More dropdown
    When I switch to 'Browse markets' workspace tab
    Then 'Browse markets' tab should be active
    And 'markets filter tabs' are displayed
    And 'markets filter dropdown' is not present
    And 'Popular China' markets filter tab should be active
    When I resize window with:
      | height | 600   |
      | width  | 1500  |
    Then 'markets filter dropdown' is present
    And not all markets filter items are displayed in markets filter tabs
    When I click 'markets filter dropdown' in markets filter tab
    Then 'drop down content' is present
    And not displayed markets in markets filter tab are present in expanded more dropdown
    When I switch to 'Browse markets' workspace tab
    Then 'Browse markets' tab should be active
    And 'markets filter dropdown' is present
    When I click on 'name' in the 'AUD/USD' market on browse tab
    And I wait for chart loading
    Then the chart on browse tab should be loaded
    And I wait for '5000'
    And 'markets filter dropdown' is present
    When I click 'markets filter dropdown' in markets filter tab
    Then 'drop down content' is present
    When I click 'some market filter' in more dropdown
    And I wait for browse page markets loading
    And I click on 'name' in the 'AUD/USD' market on browse tab
    And I wait for chart loading
    Then the chart on browse tab should be loaded
    And 'markets filter dropdown' is present

  @smoke @browse @more-link-remains
  Scenario: More link remains if the chart is opened and market list is switched
    When I switch to 'Browse markets' workspace tab
    Then 'Browse markets' tab should be active
    And 'markets filter tabs' are displayed
    And 'markets filter dropdown' is not present
    And 'Popular China' markets filter tab should be active
    When I click on 'name' in the 'AUD/USD' market on browse tab
    And I wait for chart loading
    Then the chart on browse tab should be loaded
    And 'markets filter dropdown' is present
    And not all markets filter items are displayed in markets filter tabs
    When I click 'markets filter dropdown' in markets filter tab
    Then 'drop down content' is present
    And not displayed markets in markets filter tab are present in expanded more dropdown
    When I click 'some market filter' in more dropdown
    Then 'markets filter dropdown' is not present
    And 'markets filter tabs' are displayed
    When I click on 'name' in the 'AUD/USD' market on browse tab
    And I wait for chart loading
    Then the chart on browse tab should be loaded
    And 'markets filter dropdown' is present
    And not all markets filter items are displayed in markets filter tabs
    When I click 'markets filter dropdown' in markets filter tab
    Then 'drop down content' is present
    And not displayed markets in markets filter tab are present in expanded more dropdown

  @smoke @browse @product-types-filter @wt-710
  Scenario: Product types filter
    When I switch to 'Browse markets' workspace tab
    Then 'Browse markets' tab should be active
    And 'Popular' markets category should be active
    And 'product type filter' is present
    And 'All' product type filter is selected
    When I expand product type dropdown
    Then 'product type dropdown' is displayed
    And product type filters dropdown contains correct items
    And the browse page 'product type dropdown' section should contain items:
      | itemName               |
      | include options toggle |
    When I select 'Spreads' from product type dropdown
    Then 'Spreads' product type filter is selected
    And 'Spreads' product type filter for 'Popular China' filter tab returns correct markets ordered by weighting
    When I expand product type dropdown
    And I select 'CFDs' from product type dropdown
    Then 'CFDs' product type filter is selected
    And 'CFDs' product type filter for 'Popular China' filter tab returns correct markets ordered by weighting
    When I select 'Options' market category
    And I expand product type dropdown
    And I select 'All' from product type dropdown
    Then 'All' product type filter is selected
    And the browse page 'filter tabs' section should contain items:
      | itemName   |
      | no results |
    When I expand product type dropdown
    Then options included toggle is off
    When I click 'include options toggle' in product types dropdown
    Then options included toggle is on
    When I wait for browse page markets loading
    Then 'All' product type filter for 'Options UK 100' filter tab returns correct markets ordered by weighting
    When I select 'Spreads' from product type dropdown
    Then 'Spreads' product type filter is selected
    And options included toggle is on
    And 'Spreads' product type filter for 'Options UK 100' filter tab returns correct markets ordered by weighting
    When I expand product type dropdown
    Then options included toggle is on
    When I select 'CFDs' from product type dropdown
    Then 'CFDs' product type filter is selected
    And 'CFDs' product type filter for 'Options UK 100' filter tab returns correct markets ordered by weighting


  @smoke @browse @delete-watchlist @browse-market-row-hover
  Scenario: Market Row hover
    When I switch to 'Default Workspace' workspace tab
    Then 'Default Workspace' tab should be active
    When I make 'Watchlist' panel active
    And I create 'test' watchlist
    Then the 'test' watchlist should be visible
    When I switch to 'Browse markets' workspace tab
    Then 'Browse markets' tab should be active
    And 'Popular' markets category should be active
    And 'Popular China' markets filter tab should be active
    # opened issue TPDWT-13402: actual color - rgb(33, 40, 40)
    #And the 'AUD/USD' market on browse tab should be 'black' when it is 'hovered'
    When I click on 'name' in the 'AUD/USD' market on browse tab
    And I wait for chart loading
    Then the chart on browse tab should be loaded
    When I click on 'actions' in the 'AUD/USD' market on browse tab
    Then action menu is visible
    And new watchlist button is present in menu
    And 'test' watchlist is present in menu
    And new watchlist button is present in menu
    When I add new 'Watchlist from Action menu' watchlist
    And I switch to 'Default Workspace' workspace tab
    Then 'Default Workspace' tab should be active
    And I make 'Watchlist' panel active
    Then the 'Watchlist from Action menu' watchlist should be visible
    When I switch to 'Browse markets' workspace tab
    Then 'Browse markets' tab should be active
    And 'Popular' markets category should be active
    And 'Popular China' markets filter tab should be active
    When I click on 'name' in the 'EUR/USD' market on browse tab
    And I wait for chart loading
    And I click on 'actions' in the 'EUR/USD' market on browse tab
    Then action menu is visible
    And 'test' watchlist is present in menu
    And new watchlist button is present in menu
    When I select 'Popular Spreads' filter tab
    And I wait for browse page markets loading
    And I select 'Popular China' filter tab
    And I wait for browse page markets loading
    And I click on 'name' in the 'AUD/USD' market on browse tab
    And I wait for chart loading
    And I click on 'actions' in the 'AUD/USD' market on browse tab
    Then action menu is visible
    And 'test' watchlist is present in menu
    And new watchlist button is present in menu
    When I click on close chart within menu above Chart
    Then the chart on browse tab is not present
    And all markets categories are displayed and ordered by weighting
    And the 'AUD/USD' market on browse tab should not be hightlighted

  @smoke @browse @delete-watchlist @add-market-to-watchlistWorkspace-from-browse-chart
  Scenario: Add market to watchlist/workspace from Browse Chart
    When I add new tab
    And I switch to 'Browse markets' workspace tab
    Then 'Browse markets' tab should be active
    And 'Popular' markets category should be active
    And 'Popular China' markets filter tab should be active
    # opened issue TPDWT-13402: actual color - rgb(33, 40, 40)
    #And the 'AUD/USD' market on browse tab should be 'black' when it is 'hovered'
    When I hover mouse on Sell price in the '1'st market on browse tab
    Then the Sell price should be white in the '1'st market on browse tab
    When I hover mouse on Buy price in the '1'st market on browse tab
    Then the Buy price should be white in the '1'st market on browse tab
    When I click on 'name' in the 'AUD/USD' market on browse tab
    And I wait for chart loading
    Then the chart should be loaded
    When I click on add to workspace within menu above Chart
    Then 'workspace dropdown' is visible
    And workspaces displayed in alphabetical order within dropdown
    When I add current chart to 'Default Workspace' from dropdown
    And I wait 'workspace dropdown' disappear
    Then 'workspace dropdown' is invisible
    When I switch to 'Default Workspace' workspace tab
    Then 'Default Workspace' tab should be active
    And the 'Chart' panel should be visible
    When I make 'Watchlist' panel active
    And I create 'default' watchlist
    Then the 'New Watchlist 1' watchlist should be visible
    When I create 'test' watchlist
    Then the 'test' watchlist should be visible
    When I switch to 'Browse markets' workspace tab
    Then 'Browse markets' tab should be active
    And 'Popular' markets category should be active
    And 'Popular China' markets filter tab should be active
    When I click on 'name' in the 'AUD/USD' market on browse tab
    And I wait for chart loading
    Then the chart should be loaded
    When I click on add to watchlist within menu above Chart
    Then 'watchlist dropdown' is visible
    And watchlists displayed in alphabetical order within dropdown
    When I add current chart to 'New Watchlist 1' from dropdown
    And I switch to 'Default Workspace' workspace tab
    Then 'Default Workspace' tab should be active
    When I make 'Watchlist' panel active
    Then the 'New Watchlist 1' watchlist should be visible
    When I expand 'New Watchlist 1' watchlist
    Then the 'previously added' market is visible
    When I switch to 'Browse markets' workspace tab
    Then 'Browse markets' tab should be active
    And 'Popular' markets category should be active
    And 'Popular China' markets filter tab should be active
    When I click on 'name' in the 'EUR/USD' market on browse tab
    And I wait for chart loading
    Then the chart should be loaded
    When I click on add to watchlist within menu above Chart
    Then 'watchlist dropdown' is visible
    And watchlists displayed in alphabetical order within dropdown
    When I add new 'watchlist from browse tab' watchlist from menu panel
    And I switch to 'Default Workspace' workspace tab
    Then 'Default Workspace' tab should be active
    When I make 'Watchlist' panel active
    Then the 'Watchlist from browse tab' watchlist should be visible
    When I expand 'Watchlist from browse tab' watchlist
    Then the 'previously added' market is visible
    And I switch to 'Browse markets' workspace tab
    Then 'Browse markets' tab should be active
    And 'Popular' markets category should be active
    And 'Popular China' markets filter tab should be active
    When I click on 'name' in the 'AUD/USD' market on browse tab
    And I wait for chart loading
    Then the chart should be loaded
    When I click on market 360 within menu above Chart
    Then 'current market product' tab should be active
    When I switch to 'Browse markets' workspace tab
    Then 'Browse markets' tab should be active
    And 'Popular' markets category should be active
    And 'Popular China' markets filter tab should be active
    When I click on 'name' in the 'AUD/USD' market on browse tab
    And I wait for chart loading
    Then the chart should be loaded
    When I click on price alert within menu above Chart
    Then the 'Deal ticket' panel should be visible
    And 'Set Alert' ticket type should be 'selected'
    When I close panel
    And I click on close chart within menu above Chart
    Then the chart on browse tab is not present
    And all markets categories are displayed and ordered by weighting
    And the 'AUD/USD' market on browse tab should not be hightlighted

  @smoke @browse @browse-market-tab-location
  Scenario: Browser markets tab location
    Then the count of tabs should be '3'
    # From TC 1452: "...Note: Browse should always be the second tab (after Market Search) - Not fixed yet"
    # Then '2'nd tab name should be 'Browse markets'
    Then 'Browse markets' tab should be below 'Header'
    Then 'Browse markets' tab should be to the right of 'Search field'
    Then 'Browse markets' tab should be to the left of 'Default Workspace' tab
    Then 'Browse markets' tab default width should be '150' px

  @smoke @browse @delete-watchlist @quick-add-to-watchlist
  Scenario: Quick add to watchlist
    When I switch to 'Default Workspace' workspace tab
    Then 'Default Workspace' tab should be active
    When I make 'Watchlist' panel active
    And I create 'test' watchlist
    Then the 'test' watchlist should be visible
    When I click on Search input
    Then Search modal should be visible
    When I fill search field with value 'AUD/USD'
    And I wait for markets loading
    And I click on 'actions' in the 'AUD/USD' market on browse tab
    Then action menu is visible
    And watchlists displayed in alphabetical order within dropdown
    When I click on 'test' watchlist
    And I switch to 'Default Workspace' workspace tab
    Then 'Default Workspace' tab should be active
    When I make 'Watchlist' panel active
    Then the 'test' watchlist should be visible
    When I expand 'test' watchlist
    Then the 'previously added' market is visible
    When I click on Search input
    Then Search modal should be visible
    When I fill search field with value 'AUD/USD'
    And I wait for markets loading
    And I click on 'actions' in the 'AUD/USD' market on browse tab
    Then action menu is visible
    And new watchlist button is present in menu
    When I add new 'Watchlist from search input' watchlist
    And I switch to 'Default Workspace' workspace tab
    Then 'Default Workspace' tab should be active
    When I make 'Watchlist' panel active
    Then the 'Watchlist from search input' watchlist should be visible
    When I expand 'Watchlist from search input' watchlist
    Then the 'previously added' market is visible
