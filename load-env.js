const dotenv = require("dotenv");

// Adjust the path to your .env file
dotenv.config({ path: "/Applications/CRMDemo/.env" });

module.exports = {
    ...process.env, // Load all environment variables from process.env
};


