/// <reference types="cypress" />
  
  export function signUpForFree() {
    cy.findAllByText(/Sign up for free/i).first().click()
  }
  
  export function signInPositive() {
    cy.findByText(/Sign in/i).click()
    cy.get('input[id="emailLogin"]').click().type(Cypress.env('username')+'{enter}')
    // don't log password
    cy.get('input[id="passwordLogin"]').click().type(Cypress.env('password')+'{enter}', { log: false })
  }

  export function emailHint() {
    cy.findByText(/Sign in/i).click()
    cy.get('input[id="emailLogin"]').click().type('aaaaa')
    cy.findByText('Invalid email').should('be.visible').then(($value)=>{
      expect($value).to.exist
    })
  }

  export function invalidPassword() {
    cy.findByText(/Sign in/i).click()
    cy.get('input[id="emailLogin"]').click().type(Cypress.env('username')+'{enter}')
    cy.get('input[id="passwordLogin"]').click().type(Cypress.env('invalidPassword')+'{enter}', { log: false })
    cy.findByText(/Invalid password/i).should('be.visible')
  }

  export function validateSignIn() {
    cy.get('#homeScreen',{timeout: 10000}).should('be.visible').then(()=>{
      cy.get('.userIcon').should('be.visible').then(()=>{
        cy.findAllByAltText('Cypress Test').each(($value)=>{
          expect($value).to.exist
        })
      })  
    })
  }

  export function createUser(fullName, email) {
    cy.contains('email').type(email)
    cy.findByText(/Continue/i).click()
    cy.get('input[name="fullName"]').click().type(fullName)
    cy.get('input[name="password"]').click().type(Cypress.env('password'), { log: false })
    cy.findByText(/Continue/i).click()
  }

  export function skipOnboarding() {
    cy.findByText(/Skip/i).should('be.visible').click()
    cy.wait(500)
    cy.findByText(/Skip/i).should('be.visible').click()
    cy.wait(500)
    cy.findByText(/Skip/i).should('be.visible').click()
    cy.wait(500)
    cy.findByText(/Go to workspace/i).click()
  }

  export function letsGetSetup() {
    cy.contains('Marketing').should('be.visible').click()
    cy.contains('Continue').should('be.visible').click()
    cy.contains('Skip').should('be.visible').click()
    cy.wait(500)
    cy.contains('Skip').should('be.visible').click()
    cy.wait(500)
    cy.contains('Start building').click()
    cy.wait(1000)
  }

  export function startBuilding(base) {
    cy.get('input[id="onboarding-wizard-application-name"]').click().type(base + '{enter}')
    cy.contains('Projects').should('be.visible').click()
    cy.contains('Continue').should('be.visible').click()
    cy.contains('Status').should('be.visible').click()
    cy.contains('Continue').should('be.visible').click()
    cy.contains('When a record is updated in Projects, send a Slack message').should('be.visible').click()
    cy.contains('Continue').should('be.visible').click()
    cy.contains('Kanban').should('be.visible').click()
    cy.contains('Continue').should('be.visible').click()
    cy.contains(base).should('be.visible')

  }
