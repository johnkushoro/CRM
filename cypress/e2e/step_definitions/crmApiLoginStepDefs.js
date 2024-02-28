const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor");
import { dataStore } from "../../support/dataStore";

Given('the user logs in via the API', () => {
    cy.request({
        method: 'POST',
        url: Cypress.env('CRM_API_LOGIN_ENDPOINT'),
        form: true,
        body: {
            username: Cypress.env('CRM_LOGIN_USERNAME'),
            password: Cypress.env('CRM_LOGIN_PASSWORD'),
        },
    }).then((response) => {
        expect(response.status).to.eq(200);
        dataStore.setValue('login_response', response);
        const { json_session_id, session_name } = response.body;
        cy.setCookie(session_name, json_session_id);
        dataStore.setValue('session_name', session_name);
        cy.visit(Cypress.env('CRM_HOME_PAGE_URL'));
        cy.url().should('eq', Cypress.env('CRM_HOME_PAGE_URL'));
    });
});

Then('I should receive a status code of {int}', function (statusCode) {
    const response = dataStore.getValue('login_response');
    expect(response.status).to.eq(statusCode);
});

