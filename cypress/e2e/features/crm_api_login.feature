Feature: Login and Navigate to Index Page

  Scenario: User logs in and navigates to the index page
    Given the user logs in via the API
    Then I should receive a status code of 200


