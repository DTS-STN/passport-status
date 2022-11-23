/// <reference types="cypress" />

describe('email page loads', () => {
    beforeEach(() => {
      cy.visit('/expectations')
      cy.get('#confirmBtn button').first().click()
      cy.visit('/email')
    })

    it('displays the status page', () => {
      cy.location('pathname').should("equal", "/en/email");
    })

    it('displays the language link to change to French', () => {
      cy.location('pathname').should("equal", "/en/email");
      cy.get('[data-cy=toggle-language-link]').should('contain.text', 'Français');
    })

    it('displays the language link to change to English', () => {
      cy.get('[data-cy=toggle-language-link]').click()
      cy.location('pathname').should("equal", "/fr/email");
      cy.get('[data-cy=toggle-language-link]').should('contain.text', 'English');
    })

    it('has no detectable a11y violations on load', () => {
      cy.injectAxe();
      cy.wait(500);
      cy.checkA11y()
    })
})
