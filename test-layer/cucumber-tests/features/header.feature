@header
Feature: Header
  As a user
  I can see all header items displayed correctly
  So all navigation between items should work fine for the header

  Background:
    Given I am logged in to the application with default state

  @quick @smoke @header-components-visibility
  Scenario: Header components visibility
    Then the 'header' should contain items:
      | itemName          |
      | logo              |
      | notifications     |
      | balance bar       |
      | add funds button  |
      | help button       |
      | feedbackBtn       |
      | user account      |
    When I click on 'user account' header element
    Then the 'userMenu' should contain items:
      | itemName   |
      | myAccLink  |
      | logOutLink |
    When I click on 'user account' header element
    And I click on 'userIcon' header element
    Then the 'userMenu' should contain items:
      | itemName   |
      | myAccLink  |
      | logOutLink |
    When I click on 'myAccLink' userMenu element
    Then Account board should be active

  @smoke @search-field
  Scenario: Search field
    Then the search text input 'placeholder' should be 'Search markets'
    When I click on Search input
    Then Search modal should be visible
    And the search text input 'placeholder' should be 'Type two or more characters'
    When I close search input
    Then Search modal should be not visible
    And the search text input 'placeholder' should be 'Search markets'
    When I click on Search input
    And I fill search field with value 'us'
    Then the search text input 'value' should be 'us'
    When I wait for markets loading
    Then markets count should be more than '0'
    And all markets should contain 'US'
    When I clear search input field
    Then the search text input 'placeholder' should be 'Type two or more characters'

  #TODO feedback form controlled using KVPs https://jira.gaincapital.com/browse/TPDAP-4071
  @smoke @customer-feedback-form
  Scenario: Customer feedback form
    When I click on 'feedbackBtn' header element
    Then the 'feedbackModal' should contain items:
      | itemName           |
      | contact us         |
      | client management  |
      | phone              |
      | live chat          |
      | feedback text area |
      | submit button      |
    And the submit button should be disabled
    And 'contact us' element in feedback modal dialogue should contain text 'Contact us'
    And 'contact us' feedback link should lead us to 'https://www.cityindex.co.uk/contact-us/'
    When I obtain 'contact us' url from kvp
    And I redirect to 'contact us'
    Then link redirects to the correct 'contact us' url
    When I close current browser tab
    And I switch to '1' browser tab
    Then 'client management' element in feedback modal dialogue should contain text 'client-management@cityindex.co.uk'
    And 'client management' feedback link should lead us to 'mailto:client-management@cityindex.co.uk'
    And 'phone' element in feedback modal dialogue should contain text '0845 355 0801'
    And 'phone' feedback link should lead us to 'tel:08453550801'
    When I obtain 'AP_Online_Chat_URL' url from kvp
    And I redirect to 'live chat'
    Then link redirects to the correct 'AP_Online_Chat_URL' url
    When I close current browser tab
    And I switch to '1' browser tab
    And I fill feedback text field with value 't'
    Then the submit button should be disabled
    When I fill feedback text field with value 'te'
    Then the submit button should be disabled
    When I fill feedback text field with value 'test feedback'
    Then the submit button should be enabled
    When I click on 'submitBtn' feedbackModal element
    Then 'feedback message' element in feedback modal dialogue should contain text 'Thank you for your feedback'
    And 'submit button' element in feedback modal dialogue should be invisible

  @smoke @balance-bar
  Scenario: Balance Bar
  Then balance bar displays items in the correct order:
    | Available to trade |
    | Net Equity         |
    | Cash               |
    | Unrealised P&L     |
    | Total Margin       |
    | Margin Indicator   |
  And 'Available to trade' is displayed on balance bar with correct text and value
  And 'Net Equity' is displayed on balance bar with correct text and value
  And 'Cash' is displayed on balance bar with correct text and value
  And 'Unrealised P&L' is displayed on balance bar with correct text and value
  And 'Total Margin' is displayed on balance bar with correct text and value
  And 'Margin Indicator' is displayed on balance bar with correct text and value
  When I add position with parameters:
    | MarketName | USD/JPY (per 0.01) CFD |
    | Direction  | buy                    |
    | Quantity   | 100                    |
  And I wait for '500'
  Then the 'Positions And Orders' panel should be visible
  And the 'previously added' market should be present on the list
  And 'Available to trade' is displayed on balance bar with correct text and value
  And 'Net Equity' is displayed on balance bar with correct text and value
  And 'Cash' is displayed on balance bar with correct text and value
  And 'Unrealised P&L' is displayed on balance bar with correct text and value
  And 'Total Margin' is displayed on balance bar with correct text and value
  And 'Margin Indicator' is displayed on balance bar with correct text and value
  When I add order with parameters:
    | MarketName | USD/JPY |
    | Direction  | sell    |
    | Quantity   | 1000    |
    | Price      | 97      |
  Then the 'Positions And Orders' panel should be visible
  When I select 'Orders' list
  Then the 'previously added' market should be present on the list
  And 'Available to trade' is displayed on balance bar with correct text and value
  And 'Net Equity' is displayed on balance bar with correct text and value
  And 'Cash' is displayed on balance bar with correct text and value
  And 'Unrealised P&L' is displayed on balance bar with correct text and value
  And 'Total Margin' is displayed on balance bar with correct text and value
  And 'Margin Indicator' is displayed on balance bar with correct text and value
  When I delete 'position' 'USD/JPY (per 0.01) CFD'
  And I wait for '500'
  Then 'Available to trade' is displayed on balance bar with correct text and value
  And 'Net Equity' is displayed on balance bar with correct text and value
  And 'Cash' is displayed on balance bar with correct text and value
  And 'Unrealised P&L' is displayed on balance bar with correct text and value
  And 'Total Margin' is displayed on balance bar with correct text and value
  And 'Margin Indicator' is displayed on balance bar with correct text and value





