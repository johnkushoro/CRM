import 'cypress-wait-until';
import Utilities from "../../support/Utilities";

const utilities = new Utilities();
export default class GenericElements {

    static BUTTON_WITH_TEXT = 'button';
    static LINK_WITH_TEXT = "a";
    static H1_WITH_TEXT = "h1";
    static H3_WITH_TEXT = "h3";

    clickButtonWithText(buttonText) {
        cy.get(GenericElements.BUTTON_WITH_TEXT).contains(buttonText, {matchCase: false})
            .click({force: true});
    }

    clickLinkWithText(linkText) {
        utilities.waitForAjax();
        cy.get(GenericElements.LINK_WITH_TEXT).contains(linkText, {matchCase: false})
            .click({force: true});
    }

    getH1PageTitle(expectedMessage) {
        return cy.get(GenericElements.H1_WITH_TEXT).invoke('text').should('eq', expectedMessage);
    }

}

