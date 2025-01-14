Feature: [UI] [Products] [Create]
  @smoke
  Scenario: Create product with valid data
    Given I open Sales Portal
    And I login as Admin
    And I open "Products" page
    And I open "Add New Product" page
    When I enter "Smartphone X10" to "Name input" on "Add New Product" page
    And I select "Apple" from "Manufacturer dropdown" on "Add New Product" page
    And I enter "999" to "Price input" on "Add New Product" page
    And I enter "50" to "Amount input" on "Add New Product" page
    And I enter "Latest model with advanced features" to "Notes textarea" on "Add New Product" page
    And I click on "Save Product button" on "Add New Product" page
    Then I should see notification with text "Product was successfully created" on "Sign In" page
    And I should see product with name "Smartphone X10" in table on "Products" page
