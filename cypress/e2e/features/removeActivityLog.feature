Feature: Activity Log Event Removal
  Ensure users can successfully remove events from the activity log to maintain relevant and concise log entries.

  Background:
    Given I navigate to the website "CRM_CLOUD_BASE_URL"
    And I successfully logged in

  Scenario: Delete first 3 items from the activity log
    When I delete the first 3 items from the activity log
    Then the items should be successfully removed