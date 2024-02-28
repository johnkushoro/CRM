import {Then} from "@badeball/cypress-cucumber-preprocessor";
import ContactDataPage from "../page_objects/ContactDataPage";
import GenericElements from "../page_objects/GenericElements";
import {dataStore} from "../../support/dataStore";

const reusableElements = new GenericElements();
const contactDataPage = new ContactDataPage();

Then(/^the created contact data should match the entered data$/, function () {
    reusableElements.clickLinkWithText("Contacts");

    const storedSalutation = dataStore.getValue('storedSalutation');
    const storedFirstName = dataStore.getValue('storedFirstName');
    const storedLastName = dataStore.getValue('storedLastName');
    const storedCategory = dataStore.getValue('storedCategory');
    const storedBusinessRole = dataStore.getValue('storedBusinessRole');

    const fullName = `${storedSalutation} ${storedFirstName} ${storedLastName}`;
    const firstAndLastName = `${storedFirstName} ${storedLastName}`;
    contactDataPage.setFilterTextValue(firstAndLastName);

    contactDataPage.assertH3ContainsText(fullName);
    contactDataPage.assertLiContainsCategories(storedCategory)
    contactDataPage.assertBusinessRoleIs(storedBusinessRole)
    reusableElements.clickButtonWithText("Delete")
});
