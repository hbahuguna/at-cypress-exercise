/// <reference types="cypress" />
  
export function createBase(base) {
    //click create base button
    cy.findByText(/Add a base/i).click()
    cy.contains('Untitled Base').should('be.visible').then(()=>{
        cy.contains('Untitled Base').click()
        cy.get('input[value="Untitled Base"]').click().type(base + '{enter}')
    })  
    //looks like there is a race condition where if Grid View is not loaded, share button click would cause an error
    // and app asks to refresh the page, so we must wait for Grid View to load
    // However Grid View is slow to load many times, so it's required to increase the timeout
    cy.findAllByText('Grid view',{timeout: 10000}).first().should('be.visible')
}

export function startFromScratch(base) {
    //click create base button
    cy.findByText(/Start from scratch/).click()
    cy.contains('Untitled Base').should('be.visible').then(()=>{
        cy.contains('Untitled Base').click()
        cy.get('input[value="Untitled Base"]').click().type(base + '{enter}')
    })
    // explained this above
    cy.findAllByText('Grid view',{timeout: 10000}).first().should('be.visible')
}


export function shareBaseAsEditor(email) {
    cy.get('.shareButtonLabel').should('be.visible').then(()=>{
        cy.get('.shareButtonLabel').should('not.be.disabled').then(()=>{
            cy.get('.shareButtonLabel').click()
            cy.get('input[placeholder="Invite by email..."').type(email)
            cy.findByText(/Creator/gi).click().then(()=>{
                cy.findByText(/Editor/gi).click()
            })
            //select editor permission
            //cy.get(':nth-child(2) > .selectMenu > .focus-container > .items-center').click().then(()=>{
            //    cy.get('.hdropdown > :nth-child(2)').click()
            //})
            cy.contains('Invite').click()
        })
    }) 
}

export function validateCollaborator(email) {
    cy.contains('Manage').should('be.visible').then(()=>{
        cy.contains('Manage').click()
        // Pending invite tab is slow to load many times
        cy.contains('Pending invite (1)',{timeout: 10000}).click()
        cy.findAllByTitle(email).each(($value)=>{
          expect($value, 'text content').to.have.text(email)  
      })
      var emailregex = new RegExp(email, "gi");
      cy.findByText(emailregex).should('be.visible')
      // It is valid to check Editor permission becasue there should be only one email in pending
      // since base was created just now and the only email in the table should be Editor
      cy.findByText(/Editor/gi).should('be.visible')

      //alternative assertion based on nested selectors
      /*loop across all the section and check if its collabrator and then assert
      cy.get('div[role="rowgroup"]').each((item, index)=>{
            cy.getByText(/airtablecypresstest2@gmail\.com/i).should('be.visible')
                var getCurrentCollab = cy.get('div[role="rowgroup"] >  div[role="row"]  >:nth-child(2) > .flex > .ml1 > .strong').value
                var getCurrentRights = cy.get('div[role="rowgroup"] > div[role="row"] > :nth-child(3)  > div > .hover-container  > .flex > .flex-auto > .flex > .flex-auto').value
                if(email === getCurrentCollab){
                    expect(getCurrentCollab).equals(email)
                    expect(getCurrentCollab).equals("Editor")
                }
          })*/
    }) 
}
