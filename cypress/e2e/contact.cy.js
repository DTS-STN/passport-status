describe('contact page loads', () => {
    beforeEach(() => {
      cy.visit('/contact')
      cy.injectAxe();
    })
  
    it('displays the contact page', () => {
      cy.url().should("contains", "/contact");
    })

    it('should display the button that links to the Contact the Passport Program page',()=>{
        cy.get(`#contactUs`).should('be.visible')
    })

    it('should display the button that links to the Passport service map resource',()=>{
        cy.get(`#findServiceLocation`).should('be.visible')
    })

    it('should display the button that links to appointment booking resource',()=>{
        cy.get(`#bookAppointment`).should('be.visible')
    })
  
    it('App has no detectable a11y violations on load', () => {
      cy.checkA11y()
    })
})
