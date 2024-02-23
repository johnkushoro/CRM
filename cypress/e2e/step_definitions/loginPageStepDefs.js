import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import GenericElements from '../page_objects/GenericElements';
import '../../support/commands';
import LoginPage from "../../e2e/page_objects/LoginPage";

const reusableElements = new GenericElements();
const loginPage = new LoginPage();

Given(/^I navigate to the website "([^"]*)"$/, function (urlParameter) {
    const baseUrl = Cypress.env(urlParameter);
    if (!baseUrl) {
        throw new Error(`The ${urlParameter} environment variable is not set.`);
    }
    cy.visit(baseUrl);
});

When(/^I successfully logged in$/, function () {
    const username = Cypress.env("CRM_LOGIN_USERNAME");
    const password = Cypress.env("CRM_LOGIN_PASSWORD");

    loginPage.enterDataWithLabelText("User Name", username);
    loginPage.enterDataWithLabelText("Password", password);

    reusableElements.clickButtonWithText("Login");
    loginPage.closePopUp();
    loginPage.verifyHomeDashboardText("Home Dashboard");
});


