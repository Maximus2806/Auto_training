@create
Feature: [UI] [Create product] [Positive]
  
  Background:
    Given I open Sales Portal
    Then I wait that "Sign In" page is loaded
    When I enter "aqacourse@gmail.com" to "Email input" on "Sign In" page
    And I enter "password" to "Password input" on "Sign In" page
    And I click on "Login button" on "Sign In" page
    Then I wait that "Home" page is loaded
    And I should see "Logged User label" contains text "AQA " on "Home" page 
    
Scenario Outline: Create Product with boundary values
    When I click on Menu "Products" on "Home" page
    Then I wait that "Products" page is loaded
    When I click on "Add New Product" on "Products" page
    Then I wait that "Add New Product" page is loaded
    When I enter "<product name>" to "Name input" on "Add New Product" page
    And I select "<manufacturer>" in "Manufacturer dropdown" on "Add New Product" page
    And I enter "<price>" to "Price input" on "Add New Product" page 
    And I enter "<amount>" to "Amount input" on "Add New Product" page 
    And I enter "<notes>" to "Notes textarea" on "Add New Product" page
    And I click on "Save Product button" on "Add New Product" page
    Then I wait that "Products" page is loaded
    And I should see notification contains text "Product was successfully created" on "Products" page
    Then I logout from "Products" page   

    Examples:
      | product name            | manufacturer  | price   | amount |   notes   |
      | Smartphone              | Apple         | 1       | 0      |  A        | 
      | Laptop                  | Samsung       | 99999   | 999    |  Fsaffasdfsdfadsfsd2sdfsdfasdf $dsafdafasdfasdf #dsafsdafsadf fdsafdfasdfsad ffdsadfdsfsdf dsfsdfdfdsf dsaffasdfsdfadsfsdfasdfsdfasdf fdsafdafasdfasdf fdsafsdafsadf fdsafdfasdfsad ffdsadfdsfsdf dsfsdfdfdsfdsaffasdfsdfadsfsdfasdfsdfasdf fdsafddfd rewe  |