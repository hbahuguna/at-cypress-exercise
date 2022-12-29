/// <reference types="cypress" />
import {
    signInPositive,
    validateSignIn,
} from '../page-objects/homepage'
import {
    createBase,
    shareBaseAsEditor,
    validateCollaborator,
    startFromScratch,
} from '../page-objects/workspace'
  
  describe('airtable create base tests', () => {
    beforeEach(() => {
        cy.visit('')
        signInPositive()
        validateSignIn()    
    })
  
    it('should be able to create and share the base', () => {
        createBase('test management base 1')
        shareBaseAsEditor(Cypress.env('collaborator'))
        validateCollaborator(Cypress.env('collaborator'))    
    })

    it('should be able to create from scratch and share the base', () => {
        startFromScratch('test management base 2')
        shareBaseAsEditor(Cypress.env('collaborator'))
        validateCollaborator(Cypress.env('collaborator')) 
    })
  })
