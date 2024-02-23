import ContactCreationPage from "./ContactCreationPage";
import 'cypress-wait-until';
import Utilities from "../../support/Utilities";

const utilities = new Utilities();

export default class ContactDataPage {

    static CONTACT_DATA_PAGE_SEARCH_FIELD = '#filter_text';
    static SUMMARY_HEADER_H3_SELECTOR = '.summary-header h3';
    // static H3_WITH_TEXT_CONTAINS_TEXT = (text) => `h3:contains("${text}")`;
    static LI_WITH_TEXT_LABEL = 'li.withLabel';

    static BUSINESS_ROLE_CONTAINER = '.form-entry.label-left';
    static BUSINESS_ROLE_LABEL = '.form-label';
    static BUSINESS_ROLE_VALUE = '.form-value';


    setFilterTextValue(inputText) {
        utilities.waitForAjax();
        cy.get(ContactDataPage.CONTACT_DATA_PAGE_SEARCH_FIELD).trigger('mouseover');
        cy.get(ContactDataPage.CONTACT_DATA_PAGE_SEARCH_FIELD).type(inputText);
        cy.contains(ContactCreationPage.MENU_OPTION_SELECTOR, inputText).should('be.visible').click({force: true});
        utilities.waitForAjax();
    }

    assertH3ContainsText(expectedText) {
        utilities.waitForAjax();
        cy.get(ContactDataPage.SUMMARY_HEADER_H3_SELECTOR).invoke('text').then((actualText) => {
            const trimmedText = actualText.trim();
            expect(trimmedText).to.include(expectedText);
        });
    }

    assertLiContainsCategories(expectedCategoriesString) {
        utilities.waitForAjax();
        cy.get(ContactDataPage.LI_WITH_TEXT_LABEL).invoke('text').then((actualText) => {
            const categoriesRegex = /Category: (.*?)Created:/;
            const categoriesMatch = actualText.match(categoriesRegex);

            if (!categoriesMatch || !categoriesMatch[1]) {
                throw new Error('Unable to extract categories from the element\'s text.');
            }
            const actualCategories = categoriesMatch[1].split(',').map(cat => cat.trim()).sort();
            const expectedCategories = expectedCategoriesString.split(',').map(cat => cat.trim()).sort();
            expect(actualCategories).to.deep.equal(expectedCategories, 'The categories should match regardless of order.');
        });
    }


    assertBusinessRoleIs(expectedText) {
        cy.get(ContactDataPage.BUSINESS_ROLE_CONTAINER).contains(ContactDataPage.BUSINESS_ROLE_LABEL, 'Business Role')
            .parent().find(ContactDataPage.BUSINESS_ROLE_VALUE).should('have.text', expectedText);
    }
}
