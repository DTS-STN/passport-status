/// <reference types="cypress" />

describe('email page loads', () => {
    beforeEach(() => {
      cy.visit('/email')
      cy.injectAxe();
    })
  
    it('displays the status page', () => {
      cy.url().should("contains", "/email");
    })
  
    it('displays the language link to change to French', () => {
      cy.url().should("contains", "/email");
      cy.get('[data-cy=toggle-language-link]').should('contain.text', 'Français');
  
    })
  
    it('displays the language link to change to English', () => {
      cy.get('[data-cy=toggle-language-link]').click()
      cy.url().should("contains", "/fr/email");
      cy.get('[data-cy=toggle-language-link]').should('contain.text', 'English');
  
    })
  
    it('Status page has no detectable a11y violations on load', () => {
      cy.checkA11y()
    })
})
