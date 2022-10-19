describe('landing page loads', () => {
    beforeEach(() => {
      cy.visit('/landing')
      cy.injectAxe();
    })
  
    it('displays the landing page', () => {
      cy.url().should("contains", "/landing");
    })

    it('should display the button for no ESRF',()=>{
        cy.get(`#withoutESRF`).should('be.visible')
    })

    it('should display the button for has ESRF',()=>{
        cy.get(`#withESRF`).should('be.visible')
    })
  
    it('App has no detectable a11y violations on load', () => {
      cy.checkA11y()
    })
})

describe('user has ESRF number',()=>{
    it('should redirect to the form',()=>{
        cy.visit('/landing')
        cy.get('#withoutESRF').click()
        cy.url().should('contain','/email')
    })
})

describe('user does not have ESRF number',()=>{
  it('should redirect to the form',()=>{
      cy.visit('/landing')
      cy.get('#withESRF').click()
      cy.url().should('contain','/status')
  })
})
