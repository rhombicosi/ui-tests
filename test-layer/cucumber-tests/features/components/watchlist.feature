@watchlist
Feature: Watchlist panel
  As a user
  I can open watchlist panel
  So all functionality should work fine for the panel

  Background:
    Given I am logged in to the application with default state

  @quick @smoke @delete-watchlist @watchlist-panel-main-functionality
  Scenario: Watchlist panel main functionality
    When I add new tab
    And I add new 'Watchlist' panel in 'New workspace 2' tab
    Then the panel should be visible
    When I resize panel with:
      | height | 600   |
      | width  | 1000  |
    Then the header of 'Watchlist' panel is 'Watchlists'
    Then text of 'create watchlist button' in watchlist panel should be 'Create new'
    Then close button is available
    Then watchlist panel table header should contain:
      | columnName |
      | Sell       |
      | Buy        |
      | Change     |
      | High       |
      | Low        |
      | Spread     |
    Then the 'Popular Markets' watchlist should be on the 'top' position
    When I collapse 'Popular Markets' watchlist
    Then markets of 'Popular Markets' watchlist should be invisible
    When I expand 'Popular Markets' watchlist
    Then markets of 'Popular Markets' watchlist should be visible
    When I create 'default' watchlist
    Then the 'New Watchlist 1' watchlist should be visible
    Then the 'New Watchlist 1' watchlist should be on the 'top' position
    Then 'New Watchlist 1' watchlist should be expanded
    Then 'New Watchlist 1' watchlist should be empty and contain text 'This watchlist is empty. To add an instrument, use the 'Add to watchlist' feature.'
    When I change the name of 'New Watchlist 1' watchlist to 'aa' through 'key enter'
    Then the 'aa' watchlist should be visible
    When I change the name of 'aa' watchlist to 'z' through 'key enter'
    Then the 'z' watchlist should be visible
    When I change the name of 'z' watchlist to 'Lorem ipsum dolor sit amet, usu ei aliquid reprimique' through 'key enter'
    Then the 'Lorem ipsum dolor sit amet, usu ei aliquid reprimique' watchlist should be visible
    When I change the name of 'Lorem ipsum dolor sit amet, usu ei aliquid reprimique' watchlist to 'abc' through 'key enter'
    Then the 'abc' watchlist should be visible
    Then the 'abc' watchlist should be on the 'top' position
    When I create 'de' watchlist
    Then the 'de' watchlist should be visible
    Then the 'de' watchlist should be on the 'top' position
    When I create 'g' watchlist
    Then the 'g' watchlist should be visible
    Then the 'g' watchlist should be on the 'top' position
    When I create 'Lorem ipsum dolor sit amet, usu ei aliquid reprimique' watchlist
    Then the 'Lorem ipsum dolor sit amet, usu ei aliquid reprimique' watchlist should be visible
    Then the 'Lorem ipsum dolor sit amet, usu ei aliquid reprimique' watchlist should be on the 'top' position
    And I delete 'Lorem ipsum dolor sit amet, usu ei aliquid reprimique' watchlist
    When I wait for '5000'
    And the 'edit button' element should be invisible on 'abc' watchlist
    When I hover mouse on 'abc' watchlist
    And the 'edit button' element should be visible on 'abc' watchlist
    When I change the name of 'abc' watchlist to 'cba' through 'key enter'
    Then the 'abc' watchlist should be invisible
    Then the 'cba' watchlist should be visible
    When I change the name of 'cba' watchlist to 'abc' through 'click away from the field'
    Then the 'cba' watchlist should be invisible
    Then the 'abc' watchlist should be visible
    When I change the name of 'abc' watchlist to '' through 'key enter'
    Then the 'abc' watchlist should be visible
    And I hover mouse on '2'nd watchlist
    And I start to edit '2'nd watchlist
    And I hover mouse on '3'rd watchlist
    And I start to edit '3'rd watchlist
    Then the 'edit input' element should be visible on '3'rd watchlist
    And the 'edit input' element should be invisible on '2'nd watchlist
    When I end to edit '3' watchlist
    Then watchlists count should be '4'
    And I delete 'g' watchlist
    And the 'undo icon' element should be visible on '1'st watchlist
    Then watchlists count should be '3'
    When I delete 'abc' watchlist
    And I undo '2'nd watchlist removal
    And I wait for '5000'
    Then the 'abc' watchlist should be visible
    When I expand 'abc' watchlist
    Then the 'add to watch list text field' element should be visible on 'abc' watchlist
    And the 'trash icon' element should be visible on 'abc' watchlist
    When I collapse 'abc' watchlist
    When I hover mouse on 'de' watchlist
    Then the 'add to watch list text field' element should be invisible on 'abc' watchlist
    And the 'trash icon' element should be invisible on 'abc' watchlist
    When I hover mouse on 'abc' watchlist
    Then the 'add to watch list text field' element should be visible on 'abc' watchlist
    And the 'trash icon' element should be visible on 'abc' watchlist
    When I expand 'abc' watchlist
    When I type 'U' name of market in 'abc' watchlist
    Then the 'market from dropdown' element should be invisible on 'abc' watchlist
    When I type 'US' name of market in 'abc' watchlist
    Then the 'market from dropdown' element should be invisible on 'abc' watchlist
    When I type 'USD' name of market in 'abc' watchlist
    Then the 'market from dropdown' element should be visible on 'abc' watchlist
    When I add '1'st market from market dropdown
    Then the 'previously added' market is visible
    Then the '1'st market should be 'black' when it is 'hovered'
    When I hover mouse on Sell price in the '1'st market
    Then the Sell price should be white in the '1'st market
    When I hover mouse on Buy price in the '1'st market
    Then the Buy price should be white in the '1'st market
    Then the 'current' market 'change' should be visible
    Then the 'current' market 'low' should be visible
    Then the 'current' market 'spread' should be visible
    When I click on 'sell' in the 'current' market
    Then the 'Deal ticket' panel should be visible
    Then trade direction should be 'sell'
    When I make 'Watchlist' panel active
    Then 'abc' watchlist should be expanded
    When I click on 'buy' in the 'current' market
    Then the 'Deal ticket' panel should be visible
    Then trade direction should be 'buy'
    When I make 'Watchlist' panel active
    When I create 'default' watchlist
    Then the 'New Watchlist 3' watchlist should be on the 'top' position
    When I create 'default' watchlist
    Then the 'New Watchlist 4' watchlist should be on the 'top' position
    When I create 'default' watchlist
    Then the 'New Watchlist 5' watchlist should be on the 'top' position

  @quick @smoke @delete-watchlist @watchlist-panel-main-functionality
  Scenario: Watchlist panel dropdown menu
    When I add new tab
    And I add new 'Watchlist' panel in 'New workspace 2' tab
    Then the panel should be visible
    When I resize panel with:
      | height | 600   |
      | width  | 1000  |
    When I expand 'Popular Markets' watchlist
    Then markets of 'Popular Markets' watchlist should be visible
    When I click on 'dropdown arrow' in the '1'st market
    Then the 'current' market dropdown options should be:
      | Market 360 Chart, news, market information |
      | Chart                                      |
      | Set Price Alert                            |
      | Buy Trade                                  |
      | Sell Trade                                 |
    When I select 'Market 360 Chart, news, market information' in dropdown menu in '1'st market
    Then 'current market product' tab should be active
    When I switch to 'New workspace 2' workspace tab
    Then the 'Watchlist' panel should be visible
    Then markets of 'Popular Markets' watchlist should be visible
    And I complete '1'st market dropdown with value 'Chart'
    Then the 'Chart' panel should be visible
    Then the header of 'Chart' panel is 'current market'
    When I close 'Chart' panel
    When I make 'Watchlist' panel active
    Then markets of 'Popular Markets' watchlist should be visible
    And I complete '1'st market dropdown with value 'Set price alert'
    Then the 'Deal ticket' panel should be visible
    And 'Set Alert' ticket type should be 'selected'
    When I close panel
    When I make 'Watchlist' panel active
    When I create 'abc' watchlist
    Then the 'abc' watchlist should be visible
    When I type 'USD' name of market in 'abc' watchlist
    When I add '1'st market from market dropdown
    Then the 'previously added' market is visible
    When I click on 'dropdown arrow' in the 'current' market
    Then the 'current' market dropdown options should be:
      | Market 360 Chart, news, market information |
      | Chart                                      |
      | Set Price Alert                            |
      | Remove from watch list                     |
      | Buy Trade                                  |
      | Sell Trade                                 |
    When I select 'Market 360 Chart, news, market information' in dropdown menu in 'current' market
    Then 'current market product' tab should be active
    When I switch to 'New workspace 2' workspace tab
    Then the 'Watchlist' panel should be visible
    When I expand 'abc' watchlist
    Then the 'previously added' market is visible
    And I complete 'current' market dropdown with value 'Chart'
    Then the 'Chart' panel should be visible
    Then the header of 'Chart' panel is 'current market'
    When I make 'Watchlist' panel active
    Then markets of 'abc' watchlist should be visible
    And I complete 'current' market dropdown with value 'Set price alert'
    Then the 'Deal ticket' panel should be visible
    And 'Set Alert' ticket type should be 'selected'
    When I make 'Watchlist' panel active
    Then markets of 'abc' watchlist should be visible
    And I complete 'current' market dropdown with value 'Remove from watch list'
    Then the 'current' market is invisible


  @quick @smoke @delete-watchlist @watchlist-panel-reorder
  Scenario: Watchlist panel reorder
    Then the 'Watchlist' panel should be visible
    Then markets of 'Popular Markets' watchlist should be visible
    When I remember 'AUD/USD' market position
    And I drag and drop 'AUD/USD' market from 'Popular Markets' watchlist to 'EUR/JPY' market in the 'Popular Markets' watchlist
    Then the 'AUD/USD' market should be on 'same' position in the 'Popular Markets' watchlist
    When I create 'abc' watchlist
    When I type 'USD' name of market in 'abc' watchlist
    When I add '1'st market from market dropdown
    Then the 'previously added' market is visible
    And the 'USD' market should be on '1' position in the 'abc' watchlist
    When I type 'EUR' name of market in 'abc' watchlist
    When I add '1'st market from market dropdown
    Then the 'previously added' market is visible
    And the 'EUR' market should be on '2' position in the 'abc' watchlist
    When I type 'Spread' name of market in 'abc' watchlist
    When I add '1'st market from market dropdown
    Then the 'previously added' market is visible
    And the 'Spread' market should be on '3' position in the 'abc' watchlist
    When I drag and drop '1'st market from 'abc' watchlist to '3' market in the 'abc' watchlist
    Then the 'USD' market should be on '3' position in the 'abc' watchlist
    And the 'Spread' market should be on '2' position in the 'abc' watchlist
    And the 'EUR' market should be on '1' position in the 'abc' watchlist
    When I create 'def' watchlist
    Then the 'def' watchlist should be visible
    When I type 'GBP' name of market in 'def' watchlist
    When I add '1'st market from market dropdown
    Then the 'previously added' market is visible
    When I drag and drop '1'st market from 'abc' watchlist to '1' market in the 'def' watchlist
    Then the 'EUR' market should be on '1' position in the 'def' watchlist
    And the 'Spread' market should be on '1' position in the 'abc' watchlist
    When I drag and drop '1'st market from 'abc' watchlist to '1' market in the 'Popular Markets' watchlist
    And the 'Spread' market should be on '1' position in the 'abc' watchlist
    When I collapse 'def' watchlist
    When I collapse 'abc' watchlist
    When I collapse 'Popular Markets' watchlist
    Then the 'def' watchlist should be on the '1'st position
    Then the 'abc' watchlist should be on the '2'nd position
    Then the 'Popular Markets' watchlist should be on the '3'rd position
    When I drag 'Popular Markets' watchlist and drop to 'def' watchlist
    Then the 'Popular Markets' watchlist should be on the '1'st position
    Then the 'def' watchlist should be on the '2'nd position
    Then the 'abc' watchlist should be on the '3'rd position
    When I drag 'Popular Markets' watchlist and drop to 'def' watchlist
    Then the 'def' watchlist should be on the '1'st position
    Then the 'Popular Markets' watchlist should be on the '2'nd position
    Then the 'abc' watchlist should be on the '3'rd position
    When I create 'empty' watchlist
    When I collapse 'empty' watchlist
    Then the 'empty' watchlist should be on the '1'st position
    When I drag 'empty' watchlist and drop to 'Popular Markets' watchlist
    Then the 'empty' watchlist should be on the '3'rd position
    When I drag 'empty' watchlist and drop to 'abc' watchlist
    Then the 'empty' watchlist should be on the '4'th position
    When I expand 'def' watchlist
    When I drag and drop '1'st market from 'def' watchlist to 'outside' of the 'panel' watchlist
    Then the 'EUR' market should be on '1' position in the 'def' watchlist
#    When I drag and drop '1'st market from 'def' watchlist to 'root' of the 'abc' watchlist
#    Then 'abc' watchlist should be expanded
#    And the 'EUR' market should be on '1'st position in the 'abc' watchlist
#    will be uncomment after implementation

  @quick @smoke @watchlist-popular-markets
  Scenario: Watchlist Popular Markets
    Then the 'Watchlist' panel should be visible
    Then markets of 'Popular Markets' watchlist should be visible
    Then 'Popular Markets' watchlist should be expanded
    When I hover mouse on 'Popular Markets' watchlist
    Then the 'trash icon' element should be invisible on 'Popular Markets' watchlist
    And the 'edit button' element should be invisible on 'Popular Markets' watchlist
    And the 'Popular Markets' watchlist should return the same markets as backend request
    And the PopularMarkets watchlist's markets should be ordered by 'Weighting'
    When I collapse 'Popular Markets' watchlist
    Then 'Popular Markets' watchlist should be collapsed
    Then markets of 'Popular Markets' watchlist should be invisible
    When I expand 'Popular Markets' watchlist
    Then 'Popular Markets' watchlist should be expanded
    Then markets of 'Popular Markets' watchlist should be visible
    Then the '1'st market 'sell' should be visible
    Then the '1'st market 'buy' should be visible
    Then the '1'st market 'change' should be visible
    Then the '1'st market 'low' should be visible
    Then the '1'st market 'spread' should be visible
    When I click on 'sell' in the '1'st market
    Then the 'Deal ticket' panel should be visible
    Then trade direction should be 'sell'
    When I make 'Watchlist' panel active
    Then markets of 'Popular Markets' watchlist should be visible
    When I click on 'buy' in the '1'st market
    Then the 'Deal ticket' panel should be visible
    Then trade direction should be 'buy'
    When I make 'Watchlist' panel active
    Then markets of 'Popular Markets' watchlist should be visible
    When I find market with 'closed' status
    When I click on 'sell' in the 'closed' market
    Then the 'Deal ticket' panel should be visible
    Then trade direction should be 'sell'
    And 'order' ticket type should be 'selected'

  @quick @smoke @delete-watchlist @watchlist-state-persisted
  Scenario: Watchlist state persisted
    Then the 'Watchlist' panel should be visible
    When I collapse 'Popular Markets' watchlist
    When I create 'abc' watchlist
    When I collapse 'abc' watchlist
    When I create 'def' watchlist
    When I collapse 'def' watchlist
    When I create 'ghi' watchlist
    Then 'ghi' watchlist should be expanded
    Then the 'ghi' watchlist should be on the '1'st position
    Then the 'def' watchlist should be on the '2'nd position
    Then the 'abc' watchlist should be on the '3'rd position
    Then the 'Popular Markets' watchlist should be on the '4'th position
    When I relogin to the application
    Then the 'Watchlist' panel should be visible
    Then 'ghi' watchlist should be expanded
    Then 'def' watchlist should be collapsed
    Then 'abc' watchlist should be collapsed
    Then 'Popular Markets' watchlist should be collapsed
    Then the 'ghi' watchlist should be on the '1'st position
    Then the 'def' watchlist should be on the '2'nd position
    Then the 'abc' watchlist should be on the '3'rd position
    Then the 'Popular Markets' watchlist should be on the '4'th position



