## Setup and Run Tests 

Ideally we should be able to run the test using the following command:

`docker-compose -f docker-compose.yml up`

passwords are kept in a hidden file .env which is exposed as an environment variable using CYPRESS_password environment variable

Tests are failing when running in headless mode with the following error : 
**AssertionError: Timed out retrying after 4000ms: Expected to find element: input[id="emailLogin"]**

further investigation shows that airtable would not let the app login since it suspects unusual traffic (pfa screenshot in `cypress/screenshots` folder)
this is hard to tackle with automation test since those systems are specifically designed for preventing automation

So in order to verify the test, we would need to run it manually using command: 
- `npx cypress open`
- Select E2E testing
- Select Chrome v102 > Start E2E Testing in Chrome
- 3 specs should be detected by Cypress: `createbase.cy.js`, `signin.cy.js`, `signup.cy.js`
- Select each spec to run tests

