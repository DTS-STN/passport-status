/// <reference types="cypress" />

describe('home page loads', () => {
  beforeEach(() => {
    cy.visit('/status')
    cy.injectAxe();
  })

  it('displays the status page', () => {
    cy.url().should("contains", "/status");
  })

  it('displays the language link to change to French', () => {
    cy.url().should("contains", "/status");
    cy.get('[data-cy=toggle-language-link]').should('contain.text', 'Français');

  })

  it('displays the language link to change to English', () => {
    cy.get('[data-cy=toggle-language-link]').click()
    cy.url().should("contains", "/fr/status");
    cy.get('[data-cy=toggle-language-link]').should('contain.text', 'English');

  })

  it('validates required feilds', () => {
    cy.get('#form-get-status > button').click()
    cy.get('#input-esrf > span').should('contain.text', 'required')
    cy.get('#input-givenName > span').should('contain.text', 'required')
    cy.get('#input-surname > span').should('contain.text', 'required')
    cy.get('#input-birthDate > span').should('contain.text', 'required')
  })

  it('Status page has no detectable a11y violations on load', () => {
    cy.checkA11y()
  })
})
