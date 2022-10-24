describe('landing page loads', () => {
    beforeEach(() => {
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

describe('user has ESRF number',()=>{
    it('should redirect to the consent page',()=>{
        cy.visit('/landing')
        cy.get('#without-esrf').click()
        cy.url().should('contain','/consent')
    })
})

describe('user does not have ESRF number',()=>{
  it('should redirect to the form',()=>{
      cy.visit('/landing')
      cy.get('#with-esrf').click()
      cy.url().should('contain','/status')
  })
})
