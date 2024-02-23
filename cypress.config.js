
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").default;
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

const environmentVariables = require("./load-env.js"); // Ensure this exports an object directly

async function setupNodeEvents(on, config) {
    await addCucumberPreprocessorPlugin(on, config);
    on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)],
    }));

    allureWriter(on, config);
    config.env = { ...config.env, ...environmentVariables };
    return config;
}

module.exports = defineConfig({
    projectId: '9ui7rv', // Your project ID
    e2e: {
        setupNodeEvents,
        pageLoadTimeout: 120000,
        specPattern: "cypress/e2e/features/*.feature",
        supportFile: "cypress/support/index.js",
        chromeWebSecurity: false,
        video: true,
        screenshots: true,
        env: {
            CYPRESS_DISABLE_UNCAUGHT_EXCEPTION_HANDLER: "true",
            allureReuseAfterSpec: true,
            ...environmentVariables,
        },
        viewportWidth: 1920,
        viewportHeight: 1080,
    },
});
