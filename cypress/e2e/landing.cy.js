describe('landing page loads', () => {
    beforeEach(() => {
      cy.visit('/landing')
      cy.injectAxe();
    })
  
    it('displays the landing page', () => {
      cy.url().should("contains", "/landing");
    })

    it('should display the button for no ESRF',()=>{
        cy.contains(`I don't have my file number (ESRF)`).should('be.visible')
    })

    it('should display the button for has ESRF',()=>{
        cy.contains(`I have my file number (ESRF)`).should('be.visible')
    })
  
    it('App has no detectable a11y violations on load', () => {
      cy.checkA11y()
    })
})

describe('user has ESRF number',()=>{

    it('should redirect to the form',()=>{
        cy.visit('/landing')
        cy.contains(`I have my file number (ESRF)`).click()
        cy.url().should('contain','/status')
    })

})