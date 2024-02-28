Feature: Verify Successful Contact Creation

  Background:
    Given I am logged in using "API"

  Scenario Outline: Creating a new contact
    When I create a new contact with the following details:
      | Salutation   | Firstname   | Lastname   | Categories   | Role   |
      | <Salutation> | <Firstname> | <Lastname> | <Categories> | <Role> |

    Then the created contact data should match the entered data

    Examples:
      | Salutation | Firstname   | Lastname    | Categories          | Role |
      | Mr.        | Placeholder | Placeholder | Suppliers, Business | CEO  |
