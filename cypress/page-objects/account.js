/// <reference types="cypress" />
  
export function validateAccount(name, email) {
    cy.visit('/account')
    cy.contains(name).should('be.visible')
    cy.contains(email).should('be.visible')
}