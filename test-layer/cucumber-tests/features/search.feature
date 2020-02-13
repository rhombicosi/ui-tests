@search
Feature: Search
  As a user
  I can open Search Modal Dialogue and manage searching
  So all Search functionality should work fine

  Background:
    Given I am logged in to the application with default state

  @quick @smoke @search-main-functionality
  Scenario: Search main functionality
    When I click on Search input
    Then Search modal should be visible
    When I wait for markets loading
    Then Search modal element 'result header' should be visible
    And Search modal element 'result header' text should be 'POPULAR MARKETS'
    And Default displayed markets should be first '10' from Popular Markets
    And the '1'st found market 'bid price' should contain 'number'
    And the '1'st found market 'ask price' should contain 'number'
    And the '1'st found market 'change' should contain 'number'
    When I fill search field with value 'abirvalg'
    And I wait for markets loading
    Then markets count should be equal to '0'
    When I fill search field with value 'EUR'
    And I wait for markets loading
    Then Search modal element 'result header' should be visible
    And Search modal element 'result header' text should be 'SEARCH RESULTS'
    And markets count should be more than '0'
    And all markets should contain 'EUR'
    When I click on 'bid price' in the '1'st found market
    Then the 'Deal ticket' panel should be visible
    And trade direction should be 'sell'
    And Search modal should be not visible
    When I click on Search input
    Then Search modal should be visible
    When I click on 'ask price' in the '1'st found market
    Then the 'Deal ticket' panel should be visible
    And trade direction should be 'buy'
    And Search modal should be not visible
    When I click on Search input
    Then Search modal should be visible
    When I click on 'browse markets' link in search modal
    Then 'Browse markets' tab should be active

  @quick @smoke @delete-watchlist @search-quick-actions
  Scenario: Search quick actions
    When I add new tab
    And I add new 'Watchlist' panel in 'New workspace 2' tab
    Then the panel should be visible
    When I resize panel with:
      | height | 600   |
      | width  | 600   |
    And I move panel to the 'top-right' corner
    When I click on Search input
    Then Search modal should be visible
    When I wait for markets loading
    And I click on 'actions' in the '1'st found market
    Then action menu is visible
    When I add new 'test' watchlist
    Then 'test' watchlist is present in menu
    When I click on 'test' watchlist
    Then 'test' watchlist is present in menu
    And confirmation icon is visible in 'test' watchlist
    And the 'Watchlist' panel should be visible
    When I collapse 'Popular Markets' watchlist
    And I expand 'test' watchlist
    Then the current watchlist should contain 'previously added' market
    When I click on Search input
    Then Search modal should be visible
    When I wait for markets loading
    And I click on 'actions' in the '1'st found market
    Then action menu is visible
    Then 'test' watchlist is present in menu
    And confirmation icon is visible in 'test' watchlist
    And the 'Watchlist' panel should be visible
    Then 'test' watchlist should be expanded
    And the current watchlist should contain 'previously added' market
    When I complete 'current' market dropdown with value 'Remove from watch list'
    And I click on Search input
    Then Search modal should be visible
    When I wait for markets loading
    And I click on 'actions' in the '1'st found market
    Then action menu is visible
    And 'test' watchlist is present in menu
    And confirmation icon is not visible in 'test' watchlist

  @quick @smoke @search-results-filtering
  Scenario: Search results filtering
    When I click on Search input
    Then Search modal should be visible
    When I wait for markets loading
    And I fill search field with value 'USD'
    And I wait for markets loading
    Then Search modal element 'product type list' text should be 'All'
    When I close Search input
    And I click on Search input
    Then Search modal element 'product type list' text should be 'All'
    And search modal dialogue header should be colored in 'gray'
    And all markets should contain 'USD'
    When I select 'ProductType' filter with value 'Spreads'
    And I wait for markets loading
    Then Search modal element 'product type list' text should be 'Spreads'
    When I close Search input
    And I click on Search input
    Then Search modal element 'product type list' text should be 'Spreads'
    And search modal dialogue header should be colored in 'black'
    And all markets should contain 'USD and (DFT or Spread)'
    When I select 'ProductType' filter with value 'CFDs'
    And I wait for markets loading
    Then Search modal element 'product type list' text should be 'CFDs'
    When I close Search input
    And I click on Search input
    Then Search modal element 'product type list' text should be 'CFDs'
    And search modal dialogue header should be colored in 'black'
    And all markets should contain 'USD and (CFD or match/^[A-Z]{3}/[A-Z]{3}$/)'
    When I fill search field with value 'call'
    And I select 'ProductType' filter with value 'All'
    And I wait for markets loading
    And I remember found markets number
    Then all markets should contain 'Callaway  Golf Co and (CFD or DFT or Spread)'
    When I switch on 'Include options' toggle
    And I wait for markets loading
    Then markets count should be more than 'remembered'
    When I fill search field with value 'Index'
    And I select 'Market' filter with value 'indices'
    And I wait for markets loading
    Then all markets should contain 'Index'
    When I fill search field with value 'shares'
    And I select 'Market' filter with value 'shares'
    And I wait for markets loading
    Then all markets should contain 'shares'
    When I select 'Market' filter with value 'forex'
    And I wait for markets loading
    Then markets count should be equal to '0'
    When I fill search field with value 'USD'
    And I select 'Market' filter with value 'all'
    And I wait for markets loading
    Then all markets should contain 'USD'
    When I select 'Market' filter with value 'indices'
    And I wait for markets loading
    Then markets count should be equal to '0'
    When I select 'Market' filter with value 'shares'
    And I wait for markets loading
    Then markets count should be more than '0'
    When I select 'Market' filter with value 'forex'
    And I wait for markets loading
    Then all markets should contain 'USD and match/[A-Z]{3}/[A-Z]{3}/'

  @smoke @browse @market-search
  Scenario: Market search
    Then 'Default Workspace' tab should be active
    And 'search input' default width should be '190' px
    When I switch to 'Browse markets' workspace tab
    Then 'Browse markets' tab should be active
    And 'markets filter tabs' are displayed
    And the search text input 'placeholder' should be 'Search markets'
    When I click on Search input
    Then Search modal should be visible
    And the search text input 'placeholder' should be 'Type two or more characters'
    And 'Browse markets' tab should be not active
    And 'markets filter tabs' are displayed
    # Manual test case wt-1335: steps 3-14 are not required in accordance with ticket TPDWT-12693
    # Manual test case wt-1335: step 15 next
    When I complete '1'st found market dropdown with value 'Chart'
    Then the 'chart in search modal' panel should be visible
    And the header of 'chart in search modal' panel is 'current market'
    When I click on close chart within menu above Chart
    Then the chart on search modal is not present
    When I complete '1'st found market dropdown with value 'Set price alert'
    Then the 'Deal ticket' panel should be visible
    And 'market info' element text should be 'current market'
    And Search modal should be not visible
    And 'Set Alert' ticket type should be 'selected'
    When I close panel
    Then the 'Deal ticket' panel should be invisible
    When I click on Search input
    Then Search modal should be visible
    When I wait for markets loading
    And I complete '1'st found market dropdown with value 'Buy Trade'
    Then the 'Deal ticket' panel should be visible
    And Search modal should be not visible
    And 'trade' ticket type should be 'selected'
    And trade direction should be 'buy'
    And cursor is placed in the 'quantity' field
    When I close panel
    Then the 'Deal ticket' panel should be invisible
    When I click on Search input
    Then Search modal should be visible
    When I wait for markets loading
    And I complete '1'st found market dropdown with value 'Sell Trade'
    Then the 'Deal ticket' panel should be visible
    And Search modal should be not visible
    And 'trade' ticket type should be 'selected'
    And trade direction should be 'sell'
    And cursor is placed in the 'quantity' field
    When I close panel
    Then the 'Deal ticket' panel should be invisible
    When I click on Search input
    Then Search modal should be visible
    When I wait for markets loading
    And I click on 'name' in the '1'st found market
    And I wait for chart loading
    Then the 'chart in search modal' panel should be visible
    And the header of 'chart in search modal' panel is 'current market'
    And sell button element should be enabled inside chart
    And sell button element should be located inside chart
    And sell button element should be colored in 'red'
    And buy button element should be enabled inside chart
    And buy button element should be located inside chart
    And buy button element should be colored in 'blue'
    When I click on sell button within Chart
    # Deal ticket panel loading CAN take much time
    Then the 'Deal ticket' panel should be visible
    And 'trade' ticket type should be 'selected'
    And trade direction should be 'sell'
    And cursor is placed in the 'quantity' field
    When I close panel
    Then the 'Deal ticket' panel should be invisible
    When I click on Search input
    Then Search modal should be visible
    When I wait for markets loading
    And I click on 'name' in the '1'st found market
    And I wait for chart loading
    Then the 'chart in search modal' panel should be visible
    When I click on buy button within Chart
    # Deal ticket panel loading CAN take much time
    Then the 'Deal ticket' panel should be visible
    And 'trade' ticket type should be 'selected'
    And trade direction should be 'buy'
    And cursor is placed in the 'quantity' field
    When I close panel
    Then the 'Deal ticket' panel should be invisible

#    TODO: add new Scenario "Chart" after charts feature implementation
