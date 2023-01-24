/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('/expectations')
  cy.get('#btn-agree').first().click()
  cy.request({url: '/404', failOnStatusCode: false}).its('status').should('equal', 404)
  cy.visit('/404', {failOnStatusCode: false})
})

describe('not found page loads', () => {
  it('displays the not found page', () => {
    cy.location('pathname').should('equal', "/en/404")
  })

  it('should have correct title', () => {
    cy.title().should("eq", "Not Found | Pas trouvé - Canada.ca");
  })

  it('has no detectable a11y violations on load', () => {
    cy.injectAxe();
    cy.wait(500);
    cy.checkA11y()
  })
})
