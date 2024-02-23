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