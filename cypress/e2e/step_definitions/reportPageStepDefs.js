import {When, Then} from "@badeball/cypress-cucumber-preprocessor";
import HomeDashboardPage from "../page_objects/HomeDashboardPage";
import GenericElements from "../page_objects/GenericElements";
import ContactDataPage from "../page_objects/ContactDataPage";
import ReportPage from "../page_objects/ReportPage";



const homeDashboardPage = new HomeDashboardPage();
const contactDataPage = new ContactDataPage();
const reportPage = new ReportPage();
const reusableElements = new GenericElements();


When(/^I run a report$/, function () {
    homeDashboardPage.hoverAndClickSubLink("Reports & Settings", "Reports");
    contactDataPage.setFilterTextValue("Project Profitability");
    reusableElements.clickButtonWithText("Run Report")
});
Then(/^I should see the report results$/, function () {
    reportPage.verifyReportStatuses();
    reportPage.validateCostMetrics();
});