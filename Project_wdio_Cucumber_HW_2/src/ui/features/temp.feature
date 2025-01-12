@run
Feature: [UI] [E2E test]

Scenario: e2e test
    Given I open Sales Portal
    And I create product via API
    And I login as Admin
    And I open "Products" page
    When I open "Product details" modal on "Products" page
    Then I verify "name" of the product on "Details modal" page
    And I verify "amount" of the product on "Details modal" page
    And I verify "price" of the product on "Details modal" page
    And I verify "manufacturer" of the product on "Details modal" page
    And I verify "notes" of the product on "Details modal" page
    And I click on "Close button" of "Details modal" page
    When I open "Edit product" page for createdproduct on "Products" page    
    And I update product data with following values:
    | amount       | 5       |
    | price        | 200     |
    | manufacturer | Samsung |    
    And I wait for "3" seconds    
    Then I verify all data of the product on "Details modal" page
    And I click on "Close button" of "Details modal" page
