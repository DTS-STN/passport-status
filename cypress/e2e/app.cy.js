/// <reference types="cypress" />

describe('app page loads', () => {
  beforeEach(() => {
    cy.visit('/')
  })

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

  it('has no detectable a11y violations on load', () => {
    cy.injectAxe();
    cy.wait(500);
    cy.checkA11y()
  })
})
