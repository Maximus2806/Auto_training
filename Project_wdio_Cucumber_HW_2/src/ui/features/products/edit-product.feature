# @smoke @regression @run
Feature: [UI] [Products] [Edit]

  Scenario: Create product with valid data
    Given I create product via API
    And I open Sales Portal
    And I login as Admin
    And I open "Products" page
    And I open "Edit Product" page for created product on "Products" page
    When I fill product inputs on "Edit Product" page with following values:
      | name         | a1b2c3                |
      | manufacturer | Tesla                 |
      | price        | 150                   |
      | amount       | 500                   |
      | Notes        | Test Notes from Table |
# When Test cucumber table with values:
#   | name         | a1b2c3                |
#   | manufacturer | Tesla                 |
#   | price        | 150                   |
#   | amount       | 500                   |
#   | Notes        | Test Notes from Table |
# And I open "Add New Product" page
# When I create new product on "Add New Product" page
# Then I should see notification with text "Product was successfully created" on "Sign In" page
# And I should see created product in table on "Products" page
