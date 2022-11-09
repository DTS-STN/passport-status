describe('landing page loads', () => {
    beforeEach(() => {
      cy.visit('/expectations')
      cy.get('#confirmBtn button').first().click()
      cy.visit('/landing')
      cy.injectAxe();
    })
  
    it('displays the landing page', () => {
      cy.url().should("contains", "/landing");
    })

    it('should display the button for no ESRF',()=>{
        cy.get(`#without-esrf`).should('be.visible')
    })

    it('should display the button for has ESRF',()=>{
        cy.get(`#with-esrf`).should('be.visible')
    })
  
    it('App has no detectable a11y violations on load', () => {
      cy.checkA11y()
    })
})

describe('user does not ESRF number',()=>{
    it('should redirect to the email page',()=>{
      cy.visit('/expectations')
      cy.get('#confirmBtn button').first().click()
        cy.visit('/landing')
        cy.get('#without-esrf').click()
        cy.url().should('contain','/email')
    })
})

describe('user does have ESRF number',()=>{
  it('should redirect to the form',()=>{
    cy.visit('/expectations')
    cy.get('#confirmBtn button').first().click()
      cy.visit('/landing')
      cy.get('#with-esrf').click()
      cy.url().should('contain','/status')
  })
})
