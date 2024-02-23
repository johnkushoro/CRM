import GenericElements from "./GenericElements";

export default class HomeDashboardPage {

    hoverAndClickSubLink(linkText, subLinkText) {
        cy.get(GenericElements.LINK_WITH_TEXT).contains(linkText, {matchCase: false}).trigger('mouseover');

        cy.contains(subLinkText, {matchCase: false}).click({force: true});
    }

}