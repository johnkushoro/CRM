import 'cypress-wait-until';
import Utilities from "../../support/Utilities";

const utilities = new Utilities();
export default class ContactCreationPage {

    static FORM_PAGE_SAVE_BUTTON = ('#DetailForm_save2-label');
    static INPUT_FIELD_BY_ARIA_LABEL = (labelText) => `input[aria-label="${labelText}"]`;
    static DROPDOWN_OPTION_BY_TITLE = (title) => `div.input-field[title="${title}"]`;
    static ariaLabelSelector = (labelText) => `[aria-label="${labelText}"]`;
    static SALUTATION_DROPDOWN_SELECTOR = 'div.input-field[aria-label="salutation"][title="(none)"]';

    static MENU_OPTION_SELECTOR = '.menu-option.single';

    static LABEL_LOCATOR = '.form-label';


    contactDetailsInputField(labelText, inputText) {
        const inputSelector = ContactCreationPage.INPUT_FIELD_BY_ARIA_LABEL(labelText);
        cy.get(inputSelector).should('exist').should('be.visible').type(inputText);
    }

    selectDropdownOptionByText(optionText) {
        const dropdownSelector = ContactCreationPage.DROPDOWN_OPTION_BY_TITLE(optionText);
        cy.get(dropdownSelector).should('be.visible').click();
    }

    selectOptionFromDropdownBySalutation(salutation) {
        cy.get(ContactCreationPage.SALUTATION_DROPDOWN_SELECTOR).should('be.visible').click({ force: true });
        cy.contains(ContactCreationPage.MENU_OPTION_SELECTOR, salutation).should('be.visible').click({ force: true });
    }

    enterCategoryOptionIntoInputField(categories) {
         categories.forEach((category) => {
            utilities.waitForAjax();
            cy.get('#DetailFormcategories-input').trigger('mouseover').click({force: true});
            cy.get('#DetailFormcategories-input-search-text > input').should('be.visible').clear().type(category);
            cy.contains('.menu-option.single .option-cell.input-label', category).should('be.visible').click();
            cy.wait(500); // Adding a brief delay to ensure the UI updates; adjust as needed
        });
    }

    selectContactInformationByLabelText(labelText, optionText) {
        utilities.waitForAjax();
        cy.contains(ContactCreationPage.LABEL_LOCATOR, labelText).click();
        cy.get(ContactCreationPage.ariaLabelSelector(labelText)).should('be.visible').click();
        cy.contains(ContactCreationPage.MENU_OPTION_SELECTOR, optionText).should('be.visible').click({ force: true });
    }

    clickFormPageSaveButton() {
        cy.get(ContactCreationPage.FORM_PAGE_SAVE_BUTTON).click();
        utilities.waitForAjax();
    }
}
