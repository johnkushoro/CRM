Feature: Verify Successful Contact Creation

  Background:
    Given I navigate to the website "CRM_CLOUD_BASE_URL"
    And I successfully logged in

  Scenario Outline: Creating a new contact
    When I create a new contact with the following details:
      | Salutation   | Firstname   | Lastname   | Categories   | Role   |
      | <Salutation> | <Firstname> | <Lastname> | <Categories> | <Role> |

    Then the created contact data matches the entered data

    Examples:
      | Salutation | Firstname   | Lastname    | Categories          | Role |
      | Mr.        | Placeholder | Placeholder | Suppliers, Business | CEO  |
