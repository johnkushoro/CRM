Feature: Activity Log Event Removal
  Ensure users can successfully remove events from the activity log to maintain relevant and concise log entries.

  Background:
    Given I am logged in using "API"

  Scenario: Delete first 3 items from the activity log
    When I delete the first 3 items from the activity log
    Then the items should be successfully removed