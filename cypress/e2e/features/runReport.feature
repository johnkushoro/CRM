Feature: Verify Run Report Functionality

  Background:
    Given I am logged in using "API"

  Scenario: Running Report
    When I run a report
    Then I should see the report results
