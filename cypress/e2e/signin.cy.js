/// <reference types="cypress" />
import {
    signInPositive,
    validateSignIn,
    invalidPassword,
  } from '../page-objects/homepage'
  
  describe('airtable sign in tests', () => {
    beforeEach(() => {
        cy.visit('')
    })
  
    it('should be able to sign in to airtable', () => {
        signInPositive()
        validateSignIn()
    })


    it('should show invalid password', () => {
      invalidPassword()
    })

  })