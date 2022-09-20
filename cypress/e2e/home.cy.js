/// <reference types="cypress" />

describe('home page loads', () => {
  beforeEach(() => {
    cy.visit('/home')
    cy.injectAxe();
  })

  it('displays the index page', () => {
    cy.url().should("contains", "/home");
  })

  it('displays the language link to change to French', () => {
    cy.url().should("contains", "/home");
    cy.get('[data-cy=toggle-language-link]').should('contain.text', 'Français');

  })

  it('displays the language link to change to English', () => {
    cy.get('[data-cy=toggle-language-link]').click()
    cy.url().should("contains", "/fr/home");
    cy.get('[data-cy=toggle-language-link]').should('contain.text', 'English');

  })


  it('Home page has no detectable a11y violations on load', () => {
    cy.checkA11y()
  })
})
