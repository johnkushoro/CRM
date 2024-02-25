import 'cypress-wait-until';
import 'cypress-real-events/support';
import Utilities from "../../support/Utilities";

const utilities = new Utilities();
export default class ActivityLogPage {

    static CHECKBOX_ELEMENT_LOCATOR = "td[class^='listViewTd'] > div > input";
    static INPUT_LABEL_SELECTOR = "span[class='input-label'], div[class$='input-label ']";
    static CARD_BODY_MENU = '.card-body.menu-outer.input-scroll';
    static TEXT_ELEMENT_LOCATOR = "span.detailLink";

    selectCheckboxesAndStoreText(numberOfCheckboxesToSelect) {
        const selectedTexts = {};
        utilities.waitForAjax();
        return cy.get(ActivityLogPage.CHECKBOX_ELEMENT_LOCATOR).then(($checkboxes) => {
            const actualCount = $checkboxes.length;
            const limit = Math.min(numberOfCheckboxesToSelect, actualCount);

            for (let i = 0; i < limit; i++) {
                const checkbox = $checkboxes[i];
                cy.wrap(checkbox).click({force: true}).then(() => {
                    cy.wrap(checkbox).closest('tr').find(ActivityLogPage.TEXT_ELEMENT_LOCATOR).should('be.visible').then(($text) => {
                        const identifier = $text.find('a').attr('href');
                        selectedTexts[identifier] = $text.text().trim();
                    });
                });
            }
        }).then(() => {
            return selectedTexts;
        });
    }

    clickActionsAndOptionButton(actionsButtonLabel, optionLabel) {
        cy.contains(ActivityLogPage.INPUT_LABEL_SELECTOR, actionsButtonLabel).trigger('mouseover').click({force: true});

        utilities.waitForAjax();
        cy.get(ActivityLogPage.CARD_BODY_MENU).should('be.visible');

        cy.contains(ActivityLogPage.INPUT_LABEL_SELECTOR, optionLabel).trigger('mouseover').click({force: true});
    }

    interactWithPopupButton() {
        cy.on('window:confirm', () => true);
    }

    verifyItemsRemoved(selectedTexts) {
        utilities.waitForAjax();
        Object.entries(selectedTexts).forEach(([identifier, text]) => {
            cy.get('.parent-container-of-items', {timeout: 10000}).should(($container) => {
                console.log(`Verifying removal of item with text: "${text}" and identifier: "${identifier}"`);
                expect($container.find(`a[href='${identifier}']`).length, `Item with identifier ${identifier} (${text}) should be removed.`).to.equal(0);
            });
        });
    }

}
