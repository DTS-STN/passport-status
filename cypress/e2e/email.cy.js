/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('/expectations')
  cy.get('#btn-agree').first().click()
  cy.visit('/email')
})

describe('email page loads', () => {
  it('displays the status page', () => {
    cy.location('pathname').should("equal", "/en/email")
  })

  it('should have correct title in English', () => {
    cy.get("h1").filter(':visible').invoke('text').then((text) => {
      cy.title().should("eq", `${text} - Passport Application Status Checker - Canada.ca`);
    });
  })

  it('should have correct title in French', () => {
    cy.get('[data-cy=toggle-language-link]').click()
    cy.wait(200)
    cy.get("h1").filter(':visible').invoke('text').then((text) => {
      cy.title().should("eq", `${text} - Vérificateur de l'état d'une demande de passeport - Canada.ca`);
    });
  })

  it('displays the language link to change to French', () => {
    cy.location('pathname').should("equal", "/en/email")
    cy.get('[data-cy=toggle-language-link]').should('contain.text', 'Français')
  })

  it('displays the language link to change to English', () => {
    cy.get('[data-cy=toggle-language-link]').click()
    cy.wait(200)
    cy.location('pathname').should("equal", "/fr/email")
    cy.get('[data-cy=toggle-language-link]').should('contain.text', 'English')
  })

  it('has no detectable a11y violations on load', () => {
    cy.injectAxe()
    cy.wait(500)
    cy.checkA11y()
  })
})

describe('responses', ()=>{
  beforeEach(() => {
    cy.get('#email').type('yanis.pierre@example.com')
    cy.get('#givenName').type('Yanis')
    cy.get('#surname').type('Piérre')
    cy.get('#dateOfBirth').select('1972')
    cy.get('#dateOfBirth-month').select('07')
    cy.get('#dateOfBirth-day').select('29')
    cy.get('#btn-submit').click()
  })

  it('loads result', ()=>{
    cy.get('#response-result').should('exist')
    cy.focused().should('have.prop', 'tagName' ).should('eq', 'H1')
  })

  it('loads result has no detectable a11y violations', ()=>{
    cy.injectAxe()
    cy.wait(500)
    cy.checkA11y()
  })
})

describe('cancel email esrf', ()=>{
  beforeEach(() => {
    cy.get('#btn-cancel').click()
  })

  it('loads dialog', ()=>{
    cy.get('dialog[open]').should('exist')
  })

  it('cancel email esrf has no detectable a11y violations', ()=>{
    cy.injectAxe()
    cy.wait(500)
    cy.checkA11y()
  })
})

