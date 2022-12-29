module.exports = {
  e2e: {
    "baseUrl": "https://www.airtable.com",
    "env": {
      "username": "airtablecypresstest@gmail.com",
      "password": "}A[,Fb}wMDj/cYMU1NZ\"Uz8G#",
      "invalidPassword": "invalidpw",
      "collaborator": "airtablecypresstest2@gmail.com",
      "base":"my first base",
    },
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
}
