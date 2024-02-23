import {When, Then} from "@badeball/cypress-cucumber-preprocessor";
import HomeDashboardPage from "../page_objects/HomeDashboardPage";
import ActivityLogPage from "../page_objects/ActivityLogPage";
import {dataStore} from "../../support/dataStore";


const homeDashboardPage = new HomeDashboardPage();
const activityLogPage = new ActivityLogPage();


When(/^I delete the first (\d+) items from the activity log$/, function () {
    homeDashboardPage.hoverAndClickSubLink("Reports & Settings", "Activity log");
    activityLogPage.selectCheckboxesAndStoreText(3).then((texts) => {
        dataStore.setValue('selectedTexts', texts);
    });
    activityLogPage.clickActionsAndOptionButton('Actions', 'Delete');
    activityLogPage.interactWithPopupButton();
});

Then(/^the items should be successfully removed$/, function () {
    const selectedTexts = dataStore.getValue('selectedTexts'); // Retrieve the stored texts
    activityLogPage.verifyItemsRemoved(selectedTexts);
});