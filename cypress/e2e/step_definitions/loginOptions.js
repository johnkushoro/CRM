const { Given } = require("@badeball/cypress-cucumber-preprocessor");
import LoginPage from "../../e2e/page_objects/LoginPage";
import GenericElements from '../page_objects/GenericElements';
import '../../support/commands';

const reusableElements = new GenericElements();
const loginPage = new LoginPage();

Given(/^I am logged in using "([^"]*)"$/, function (loginMethod) {
    if (loginMethod === 'API') {
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
            const { json_session_id, session_name } = response.body;
            cy.setCookie(session_name, json_session_id);
            cy.visit(Cypress.env('CRM_HOME_PAGE_URL'));
        });
    } else if (loginMethod === 'UI') {
        cy.visit(Cypress.env('CRM_CLOUD_BASE_URL'));
        loginPage.enterDataWithLabelText("User Name", Cypress.env("CRM_LOGIN_USERNAME"));
        loginPage.enterDataWithLabelText("Password", Cypress.env("CRM_LOGIN_PASSWORD"));
        reusableElements.clickButtonWithText("Login");
        loginPage.verifyHomeDashboardText("Home Dashboard");
    } else {
        throw new Error('Invalid login method specified');
    }
});