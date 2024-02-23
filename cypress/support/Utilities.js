import DataStore from "../../cypress/support/dataStore";


const dataStore = new DataStore();
Cypress.env('dataStore', dataStore);

const faker = require('faker');

class Utilities {
    generateRandomProductName() {
        const randomSuffix = Math.floor(Math.random() * 10000);
        const now = new Date();
        const formattedDateTime = now.toISOString().replace(/[-T:.]/g, '').slice(0, 14);
        const computerName = `${randomSuffix}${formattedDateTime}`;

        // Use dataStore from Cypress.env
        Cypress.env('dataStore').setValue('computerName', computerName);
        return computerName;
    }

    getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    getAlertMessagePattern(actionType) {
        const actionPatterns = {
            "Delete": /Computer\s[\w\/-]+\shas been deleted/,
            "Create": /Computer\s[\w\/-]+\shas been created/,
            "Update": /Computer\s[\w\/-]+\shas been updated/
        };

        if (!(actionType in actionPatterns)) {
            throw new Error(`Unexpected actionType: ${actionType}`);
        }

        return actionPatterns[actionType];
    }

    getNewTabTitle() {
        return cy.window().then((win) => {
            return win.document.title;
        });
    }

     switchToTabByTitle(tabTitle) {
        cy.window().then((win) => {
            const windows = win.parent.window.frames;
            let found = false;
            for (let i = 0; i < windows.length; i++) {
                const windowTitle = windows[i].document.title;
                if (windowTitle === tabTitle) {
                    win.parent.postMessage({ tab: i }, '*');
                    found = true;
                    break;
                }
            }
            if (!found) {
                cy.log(`Tab with title "${tabTitle}" not found.`);
            }
        });
    }

    getRandomFirstName() {
        return faker.name.firstName();
    }

    getRandomLastName() {
        return faker.name.lastName();
    }

    waitForAjax() {
        cy.waitUntil(() =>
                cy.get('#ajaxStatusDiv').invoke('text').then((text) =>
                    text === ''),
            {
                errorMsg: "was expecting some other Value but got: ",
                timeout: 5000,
                interval: 500
            }
        );
    }
}

export default Utilities;
