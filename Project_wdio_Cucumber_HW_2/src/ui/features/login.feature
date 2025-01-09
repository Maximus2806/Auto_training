Feature: [UI] [Login] [Positive]
  
  Scenario: Sign In with valid credentials
    Given I open Sales Portal
    When I enter "aqacourse@gmail.com" to "Email input" on "Sign In" page
    And I enter "password" to "Password input" on "Sign In" page
    And I click on "Login button" on "Sign In" page
    Then I should see "Welcome label" contains text "Sales Management Portal" on "Home" page
