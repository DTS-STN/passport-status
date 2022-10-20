describe('contact page loads', () => {
    beforeEach(() => {
      cy.visit('/contact')
      cy.injectAxe();
    })
  
    it('displays the contact page', () => {
      cy.url().should("contains", "/contact");
    })

  
    it('displays the language link to change to French', () => {
      cy.url().should("contains", "/contact");
      cy.get('[data-cy=toggle-language-link]').should('contain.text', 'Français');
  
    })
  
    it('displays the language link to change to English', () => {
      cy.get('[data-cy=toggle-language-link]').click()
      cy.url().should("contains", "/fr/contact");
      cy.get('[data-cy=toggle-language-link]').should('contain.text', 'English');
  
    })

    it('should display a list of links',()=>{
        cy.get(`#contactLinks`).contains("Contact the Passport Program")
        cy.get(`#contactLinks`).contains("Find a passport service location near you")
        cy.get(`#contactLinks`).contains("Appointment booking")
    })
  
    it('App has no detectable a11y violations on load', () => {
      cy.checkA11y()
    })
})
