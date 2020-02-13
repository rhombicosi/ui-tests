@workspace
Feature: Workspace
  As a user
  I can open open all panels
  So all panels functionality should work fine

  Background:
    Given I am logged in to the application with default state

  @smoke @dropdown @close @default-workspace-functionality
  Scenario: Default Workspace functionality
    Then the count of tabs should be '3'
    And 'Browse markets' tab should be not active
    And 'Default Workspace' tab should be active
    And the 'Watchlist' panel should be visible
    And 'Popular Markets' watchlist should be expanded
    And the 'News feed' panel should be visible
    And the 'Positions And Orders' panel should be visible
    And the 'Chart' panel should be visible
    When I expand dropdown in 'Default Workspace' tab
    Then the 'List of components' element is visible in 'Default Workspace' tab
    When I click 'Clear workspace' button in 'Default Workspace' tab
    Then the 'Watchlist' panel should be invisible
    And the 'Chart' panel should be invisible
    And the 'News feed' panel should be invisible
    And the 'Economic Calendar' panel should be invisible
    And the 'Positions And Orders' panel should be invisible
    When I add new 'Watchlist' panel in 'Default Workspace' tab
    Then the 'Watchlist' panel should be visible
    When I add new 'Chart' panel in 'Default Workspace' tab
    Then the 'Chart' panel should be visible
    When I add new 'News feed' panel in 'Default Workspace' tab
    Then the 'News feed' panel should be visible
    When I add new 'Economic Calendar' panel in 'Default Workspace' tab
    Then the 'Economic Calendar' panel should be visible
    When I add new 'Positions And Orders' panel in 'Default Workspace' tab
    Then the 'Positions And Orders' panel should be visible
    When I expand dropdown in 'Default Workspace' tab
    And I click 'Show me' button in 'Default Workspace' tab
    Then the 'Delete workspace' element is visible in 'Default Workspace' tab
    And the 'Grid view component' element is visible in 'Default Workspace' tab
    When I click 'Grid view component' button in 'Default Workspace' tab
    Then the 'Watchlist' panel should be invisible
    And the 'Icon for rename' element is visible in 'Default Workspace' tab

  @quick @smoke @new-workspace-functionality
  Scenario: New Workspace functionality
    When I add new tab
    And I expand dropdown in 'New workspace 2' tab
    And I click 'Edit icon' button in 'New workspace 2' tab
    Then the 'Input icon for input' element is visible in 'New workspace 2' tab
    When I type 'test' name workspace and save
    Then 'test' tab should be active
    When I add new 'Watchlist' panel in 'test' tab
    Then 'Watchlist' panel is disabled in 'test' tab
    And the 'Watchlist' panel should be visible
    When I add new 'News feed' panel in 'test' tab
    Then 'News feed' panel is disabled in 'test' tab
    And the 'News feed' panel should be visible
    When I add new 'Economic Calendar' panel in 'test' tab
    Then 'Economic Calendar' panel is disabled in 'test' tab
    And the 'Economic Calendar' panel should be visible
    When I expand dropdown in 'current' tab
    Then Charts number should be 'empty'
    When I add '10' Chart panels
    Then 'Chart' button is disabled in 'test' tab
    And Charts number should be '10'
    And count of 'Chart' panels should be '10'
    When I add new 'Positions And Orders' panel in 'test' tab
    Then 'Positions And Orders' panel is disabled in 'test' tab
    And the 'Positions And Orders' panel should be visible
    When I click 'Clear workspace' button in 'test' tab
    Then the 'Watchlist' panel should be invisible
    And the 'Chart' panel should be invisible
    And the 'News feed' panel should be invisible
    And the 'Economic Calendar' panel should be invisible
    And the 'Positions And Orders' panel should be invisible
    When I add new tab
    And I add new tab
    And I add new tab
    And I add new tab
    And I add new tab
    And I add new tab
    And I add new tab
    And I add new tab
    Then the icon create new workspace is invisible
    When I close '12'th tab
    Then the count of tabs should be '11'

  @smoke @delete-watchlist @product-page
  Scenario: Product Page
    Then the 'Watchlist' panel should be visible
    And I collapse 'Popular Markets' watchlist
    And I create 'test1' watchlist
    And the 'test1' watchlist should be visible
    When I type 'Germany' name of market
    Then the 'market from dropdown' element should be visible on '1'nd watchlist
    When I add '1'st market from market dropdown
    And I expand 'test1' watchlist
    And I complete 'current' market dropdown with value 'Market 360 chart, news, market information'
    Then tabs count should be '3'
    When I am on the 'Watchlist container'
    Then the 'dropdown' should be visible in product page
    When I am on the 'Market container'
    Then the correct market display to the right '1'st position
    When I switch to '2'nd workspace tab
    And I make 'Watchlist' panel active
    And I create 'test2' watchlist
    Then the 'test2' watchlist should be visible
    When I type 'Spread' name of market
    Then the 'market from dropdown' element should be visible on 'test2' watchlist
    When I add '1'st market from market dropdown
    And I complete 'current' market dropdown with value 'Market 360 chart, news, market information'
    And I am on the 'Market container'
    Then the correct market display to the right '1'st position
    When I am on the 'Market information'
    Then the correct market display in market information
    When I am on the 'Chart'
    Then 'Spread' market should be opened on the chart
    When I am on the 'News feed' component
    Then the 'News feed' no panel component should be visible
    When I switch to 'Economic Calendar'
    Then I am on the 'Economic Calendar' component
    And all the panels parts should be loaded
