import {When} from "@badeball/cypress-cucumber-preprocessor";
import ContactCreationPage from "../../e2e/page_objects/ContactCreationPage";
import HomeDashboardPage from "../page_objects/HomeDashboardPage";
import Utilities from "../../support/Utilities";
import GenericElements from "../page_objects/GenericElements";
import {dataStore} from "../../support/dataStore";


const utilities = new Utilities();
const homeDashboardPage = new HomeDashboardPage();
const contactCreationPage = new ContactCreationPage();
const reusableElements = new GenericElements();


When(/^I create a new contact with the following details:$/, function (dataTable) {
    homeDashboardPage.hoverAndClickSubLink("Sales & Marketing", "Contacts");
    reusableElements.clickLinkWithText("Create Contact");

    const data = dataTable.hashes()[0];
    const randomFirstName = utilities.getRandomFirstName();
    const randomLastName = utilities.getRandomLastName();

    dataStore.setValue("storedSalutation", data.Salutation);
    dataStore.setValue("storedFirstName", randomFirstName);
    dataStore.setValue("storedLastName", randomLastName);

    contactCreationPage.selectOptionFromDropdownBySalutation(data.Salutation);
    contactCreationPage.contactDetailsInputField("First Name", randomFirstName);
    contactCreationPage.contactDetailsInputField("Last Name", randomLastName);

    const selectedCategory = data.Categories;
    dataStore.setValue("storedCategory", selectedCategory);
    let selectedCategoryOptions = selectedCategory.split(',').map(category => category.trim());
    contactCreationPage.enterCategoryOptionIntoInputField(selectedCategoryOptions);


    const selectedBusinessRole = data.Role;
    dataStore.setValue("storedBusinessRole", selectedBusinessRole);
    contactCreationPage.selectContactInformationByLabelText("Business Role", selectedBusinessRole);
    contactCreationPage.clickFormPageSaveButton();
});
