/// <reference types="cypress" />

describe('email page loads', () => {
    beforeEach(() => {
      cy.visit('/expectations')
      cy.get('#btn-agree').first().click()
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

describe('responses', ()=>{
  it('loads result', ()=>{
    cy.visit('/expectations')
    cy.get('#btn-agree').first().click()
    cy.visit('/email')
    cy.get('#email').type('yanis.pierre@example.com')
    cy.get('#givenName').type('Yanis')
    cy.get('#surname').type('Piérre')
    cy.get('#date-select-dateOfBirth-year').select('1972')
    cy.get('#date-select-dateOfBirth-month').select('07')
    cy.get('#date-select-dateOfBirth-day').select('29')
    cy.get('#btn-submit').click()
    cy.get('#response-result').should('exist')
    cy.focused().should('have.prop', 'tagName' ).should('eq', 'H1')
  })

  it('loads result has no detectable a11y violations', ()=>{
    cy.injectAxe();
    cy.wait(500);
    cy.checkA11y()
  })
})

describe('cancel email esrf', ()=>{
  it('loads dialog', ()=>{
    cy.visit('/expectations')
    cy.get('#btn-agree').first().click()
    cy.visit('/email')
    cy.get('#btn-cancel').click()
    cy.get('dialog[open]').should('exist')
  })

  it('cancel email esrf has no detectable a11y violations', ()=>{
    cy.injectAxe();
    cy.wait(500);
    cy.checkA11y()
  })
})

