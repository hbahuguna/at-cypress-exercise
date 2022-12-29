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



## Below are some main points of this submission: 
1. I'm trying to use testing library's findByText/findAllByText as much as possible but it is not as robust as Cypress' contains method. [this document](https://docs.cypress.io/guides/references/best-practices) says contains is better strategy than other selectors so it's better to use contains or findByText/findAllByText wherever possible.
2. `cypress.config.js` contains [baseUrl](https://www.airtable.com) to be used by all tests.
3. `cypress.config.js` contains env variables which can be used by more than one tests.
4. password is used as an environment variable to not expose it in code and logs, by setting: `{ log: false }`
5. using `testing-library` for querying and asserting dom elements.
6. `page-object` files for homepage, workspace and account pages.
7. functions created for any smallest unit of work that can be logically placed together and then they can be used in the test to make them readable and easier to understand. 
8. 3 separate specs for `signup`, `sign in` and `create base` testing.
9. data-* selectors are not present in web elements for app, so contains/findByText/findAllByText is used as the main selector strategy preceded by css selectors which might be brittle. 
10. `Dockerfile` is provided to run tests. Use cmd `docker-compose -f docker-compose.yml up` to build and run tests on docker. However, it's not able to pass tests because airtable is asking to verify user when running from docker.


## Test Cases:

1. Create a new account through the sign up flow
2. Start from the homepage, airtable.com
3. Go through the sign up flow using the “Sign up for free” button
4. Verify that user has successfully signed up


- For this scneario, I have used homepage page-object for reusable code. Username and password are stored in the `cypress.config.js` file. There are 2 main sign up flows, which are grouped together in the tests using describe function.
- In the first flow, user can sign up with a unique username and password, and then skip the onboarding altogether. We use /account path to validate that the user was created with the same name and email that was provided during the sign up process.  
- In the second flow, user can sign up with a unique username and password, however user selects some of the onboarding features and creates the base during onboarding. This enables user to have a base as part of the onboarding. In the end we validate that the user account contains the same email and first name that was used during the sign up process. 


5. Sign into an existing account, create a new base, invite a new user as an Editor
6. Start from the homepage, airtable.com
7. Go through the sign in flow using the “Sign in” button
8. Create a new base
9. Share the base with a new collaborator using the “Invite by email” flow
10. Set the permission level for the invitee to “Editor”
11. Verify the newly added collaborator’s email is shown under “Base Collaborators”
12. Verify the collaborator has the “Editor” role shown under “Base Collaborators”

- For this scenario, I am using an existing account with user name `airtablecypresstest@mymail.com` to sign in. Sign in is divided into 2 separate tests. Sign in is also validated after a successful sign in. A new base can be created in 2 ways. One is using Start from scratch flow, and another one is using create new base flow. So there are 2 main scenarios. The code is designed modularly in such a way that most of the same functions can be used in both scenarios.

- I was facing an issue with share base just after creating it. Looks like, if the base's Grid View is not loaded, Share button click will throw an error and app asks you to refresh the page. This might be a race condition bug, but for the sake of the submission, I have added a check for Grid View load and increased Grid View load time out to 10 seconds, since Grid View is very slow to load.

- I added some additional checks for shareButtonLabel because of the app error, until I realized it was actually Grid View. So I have kept those checks there since it does not cause any harm. 

## Improvements
1. Add network request waits: cy.route("/200?**").as("fakeNetworkRequest"); cy.wait("@fakeNetworkRequest");
2. Turn common actions into commands
3. Programmatic Login using jwt tokens
4. Log browser warnings and errors on terminal
5. Integrate with CI server and run tests in parallel
6. Use sorry-cypress instead of cypress dashboard
7. Add more debugging support for remote execution
8. Rest state or a way to remove randomly generated users for testing
9. Removing unnecessary waiting
10. 
