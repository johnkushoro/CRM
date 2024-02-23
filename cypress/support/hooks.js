import { Before, After } from "@badeball/cypress-cucumber-preprocessor";

const customLog = (message) => {
    console.log(message);
};

let startTime;

Before((scenario) => {
    customLog(`Before hook executed for scenario: ${scenario.pickle.name}`);
    startTime = new Date();
    customLog(`Scenario ${scenario.pickle.name} started at: ${startTime}`);
    Cypress.env('currentScenario', scenario.pickle.name);
    Cypress.env('scenarioStatus', 'passed'); // Initialize as 'passed'
});

After((scenario) => {
    customLog(`After hook executed for scenario: ${scenario.pickle.name}`);
    const endTime = new Date();
    const duration = endTime - startTime;
    const scenarioName = Cypress.env('currentScenario');
    const scenarioStatus = Cypress.env('scenarioStatus');

    customLog(`Scenario ${scenarioName} ended at: ${endTime}`);
    customLog(`Scenario ${scenarioName} duration: ${duration} milliseconds`);

    if (scenarioStatus === 'failed') {
        customLog(`Scenario ${scenarioName} FAILED`);
    } else {
        customLog(`Scenario ${scenarioName} PASSED`);
    }
});


After((scenario) => {
    if (Cypress.env('scenarioStatus') === 'passed') {
        // Example cleanup code; adjust based on your application's API
        const contactId = Cypress.env('createdContactId'); // Ensure you set this environment variable after creating a contact
        if (contactId) {
            cy.request('DELETE', `/api/contacts/${contactId}`).then((response) => {
                expect(response.status).to.eq(200);
                Cypress.log({name: 'cleanup', message: `Deleted contact ${contactId}`});
            });
        }
    }
});


After((scenario) => {
    if (Cypress.env('scenarioStatus') === 'failed') {
        cy.screenshot({ capture: 'runner', name: `Failure-${scenario.pickle.name}-${Date.now()}` });
    }
});
