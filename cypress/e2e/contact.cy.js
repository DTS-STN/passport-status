describe('contact page loads', () => {
    beforeEach(() => {
      cy.visit('/expectations')
      cy.get('#confirmBtn button').first().click()
      cy.visit('/contact')
    })

    it('displays the contact page', () => {
      cy.location('pathname').should("equal", "/en/contact");
    })

    it('displays the language link to change to French', () => {
      cy.location('pathname').should("equal", "/en/contact");
      cy.get('[data-cy=toggle-language-link]').should('contain.text', 'Français');
    })

    it('displays the language link to change to English', () => {
      cy.get('[data-cy=toggle-language-link]').click()
      cy.location('pathname').should("equal", "/fr/contact");
      cy.get('[data-cy=toggle-language-link]').should('contain.text', 'English');
    })

    it('has a list containing anchor tags',()=>{
        cy.get(`#contact-links > section > ul li:first > a`)
    })

    it('has no detectable a11y violations on load', () => {
      cy.injectAxe();
      cy.wait(500);
      cy.checkA11y()
    })
})
