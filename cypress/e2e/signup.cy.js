/// <reference types="cypress" />
import {
  createUser,
  signUpForFree,
  skipOnboarding,
  letsGetSetup,
  startBuilding,
} from '../page-objects/homepage'
import {
  validateAccount,
} from '../page-objects/account'
describe('Airtable signup test', () => {
    beforeEach(() => {
      cy.visit('')
      signUpForFree()  
    })
  
    it('should be able to sign up for free and validate user', () => {
      var now = Date.now().toString();
      var name = 'uname_' + now
      var email = name + '@mymail.com'
      createUser(name, email)
      skipOnboarding()
      //account should have been created
      validateAccount(name, email)
    })

    it('should be able to sign up for free, create base and validate user', () => {
      var now = Date.now().toString();
      var name = 'uname_' + now
      var email = name + '@mymail.com'
      createUser(name, email)
      letsGetSetup()
      startBuilding('testing scenario base')
      validateAccount(name, email)
    })
})   


