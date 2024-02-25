class LoginPage {
    constructor() {
        this.labelElementSelector = 'label';
    }

    static homeDashboardText = "#main-title-module";

    static CLOSE_BUTTON_POPUP_SELECTOR = '.uii.uii-cancel.uii-lg.active-icon.dialog-close';

    enterDataWithLabelText(labelText, inputText) {
        cy.contains(this.labelElementSelector, labelText).should('have.attr', 'for').then((forAttribute) => {
            const inputSelector = `input#${forAttribute}`;
            cy.get(inputSelector).should('exist').should('be.visible').type(inputText);
        });
    }

    verifyHomeDashboardText(expectedMessage) {
        cy.get(LoginPage.homeDashboardText).invoke('text').then((actualText) => {
            expect(actualText.trim().toUpperCase()).to.equal(expectedMessage.trim().toUpperCase());
        });
    }

    closePopUp() {
        cy.get('body').then(body => {
            body.find(LoginPage.CLOSE_BUTTON_POPUP_SELECTOR).length > 0
                ? cy.get(LoginPage.CLOSE_BUTTON_POPUP_SELECTOR).click()
                : cy.log('Popup dialog did not appear, proceeding with the test.');
        });
    }
}
export default LoginPage;

