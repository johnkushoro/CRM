Feature: Verify Run Report Functionality

  Background:
    Given I navigate to the website "CRM_CLOUD_BASE_URL"
    And I successfully logged in

  Scenario: Running Report
    When I run a report
    Then I should see the report results