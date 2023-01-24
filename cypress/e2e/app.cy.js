/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('/')
})

describe('app page loads', () => {
  it('displays the index page', () => {
    cy.location('pathname').should('equal', "/")
  })

  it('redirects to / when accessing /en', () => {
    cy.visit('/en')
    cy.location('pathname').should('equal', "/")
  })

  it('redirects to / when accessing /fr', () => {
    cy.visit('/fr')
    cy.location('pathname').should('equal', "/")
  })

  it('should have correct title', () => {
    cy.title().should("eq", "Passport application status checker | Outil de vérification de l'état de la demande de passeport - Canada.ca");
  })

  it('has no detectable a11y violations on load', () => {
    cy.injectAxe();
    cy.wait(500);
    cy.checkA11y()
  })
})
