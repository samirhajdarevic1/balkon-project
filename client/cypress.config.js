const { defineConfig } = require('cypress');

module.exports = defineConfig({
  env: {
    serverUrl: 'http://localhost:3001/',
    razrediUrl: 'http://localhost:3000/razredi',
  },
  e2e: {
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
