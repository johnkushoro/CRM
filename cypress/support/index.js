Cypress.on('uncaught:exception', (err, runnable) => {
    // return false to prevent Cypress from failing the test
    if (err.message.includes('missing drag target') || err.message.includes('missing draggable element')) {
        return false;
    }
});

Cypress.on('uncaught:exception', (err, runnable) => {
    // return false to prevent Cypress from failing the test
    if (err.message.includes('Cannot read properties of null (reading \'getList\')')) {
        return false;
    }
});
