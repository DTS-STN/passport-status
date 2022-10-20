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

    it('has a list containing anchor tags',()=>{
        cy.get(`#contactLinks > section > ul li:first > a`)
    })
  
    it('App has no detectable a11y violations on load', () => {
      cy.checkA11y()
    })
})
