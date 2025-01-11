Feature: [UI] [Login] [Negative]

  Scenario Outline: Sign In with invalid data
    Given I open Sales Portal
    When I enter "<username>" to "Email input" on "Sign In" page
    And I enter "<password>" to "Password input" on "Sign In" page
    And I click on "Login button" on "Sign In" page
    Then I should see notification with text "<message>" on "Sign In" page

    Examples:
      | username            | password  | message               |
      | aaa@aaa.com         | password  | Incorrect credentials |
      | aqacourse@gmail.com | aaaaaaaa! | Incorrect credentials |
