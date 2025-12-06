const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // This is your local frontend
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});