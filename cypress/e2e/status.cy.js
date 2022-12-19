/// <reference types="cypress" />

describe('status page loads', () => {
  beforeEach(() => {
    cy.visit('/expectations')
    cy.get('#btn-agree').first().click()
    cy.visit('/status')
  })

  it('displays the status page', () => {
    cy.location('pathname').should("equal", "/en/status");
  })

  it('displays the language link to change to French', () => {
    cy.location('pathname').should("equal", "/en/status");
    cy.get('[data-cy=toggle-language-link]').should('contain.text', 'Français');
  })

  it('displays the language link to change to English', () => {
    cy.get('[data-cy=toggle-language-link]').click()
    cy.location('pathname').should("equal", "/fr/status");
    cy.get('[data-cy=toggle-language-link]').should('contain.text', 'English');
  })

  it('has no detectable a11y violations on load', () => {
    cy.injectAxe();
    cy.wait(500);
    cy.checkA11y()
  })
})

describe('ESRF field validation', ()=>{
  beforeEach(() => {
    cy.visit('/expectations')
    cy.get('#btn-agree').first().click()
    cy.visit('/status')
  })

  it('validates valid ESRF',()=>{
    cy.get('#esrf').type('A5934S87')
    cy.get('#btn-submit').click()
    cy.get('#input-esrf-error').should('not.exist')
  })

  it('validates empty ESRF error',()=>{
    cy.get('#btn-submit').click()
    cy.get('#input-esrf-error').should('exist')
  })
})

describe('givenName field validation', ()=>{
  beforeEach(() => {
    cy.visit('/expectations')
    cy.get('#btn-agree').first().click()
    cy.visit('/status')
  })

  it('validates valid givenName',()=>{
    cy.get('#givenName').type('Clara')
    cy.get('#btn-submit').click()
    cy.get('#input-givenName-error').should('not.exist')
  })

  it('validates empty givenName error',()=>{
    cy.get('#btn-submit').click()
    cy.get('#input-givenName-error').should('exist')
  })
})

describe('surname field validation', ()=>{
  beforeEach(() => {
    cy.visit('/expectations')
    cy.get('#btn-agree').first().click()
    cy.visit('/status')
  })

  it('validates valid surname',()=>{
    cy.get('#surname').type('Renard')
    cy.get('#btn-submit').click()
    cy.get('#input-surname-error').should('not.exist')
  })

  it('validates empty surname error',()=>{
    cy.get('#btn-submit').click()
    cy.get('#input-surname-error').should('exist')
  })
})

describe('Date of Birth field validation', ()=>{
  beforeEach(() => {
    cy.visit('/expectations')
    cy.get('#btn-agree').first().click()
    cy.visit('/status')
  })

  it('validates valid dateOfBirth',()=>{
    cy.get('#dateOfBirth').type('1982-12-08')
    cy.get('#btn-submit').click()
    cy.get('#input-dateOfBirth-error').should('not.exist')
  })

  it('validates empty dateOfBirth error',()=>{
    cy.get('#btn-submit').click()
    cy.get('#input-dateOfBirth-error').should('exist')
  })

  it('validates Date of Birth in the future',()=>{
    const yearPlus1 = new Date(new Date().getFullYear()+1,1,1)
    const testDate = [yearPlus1.getFullYear(),'01','01'].join('-')
    cy.get('#dateOfBirth').type(testDate)
    cy.get('#btn-submit').click()
    cy.get('#input-dateOfBirth-error').should('exist')
  })
})

describe('responses', ()=>{
  it('loads result', ()=>{
    cy.visit('/expectations')
    cy.get('#btn-agree').first().click()
    cy.visit('/status')
    cy.get('#esrf').type('A02D85ED')
    cy.get('#givenName').type('Yanis')
    cy.get('#surname').type('Piérre')
    cy.get('#dateOfBirth').type('1972-07-29')
    cy.get('#btn-submit').click()
    cy.get('#response-result').should('exist')
    cy.focused().should('have.prop', 'tagName' ).should('eq', 'H1')
  })

  it('loads result has no detectable a11y violations', ()=>{
    cy.injectAxe();
    cy.wait(500);
    cy.checkA11y()
  })

  it('loads no result', ()=>{
    cy.visit('/expectations')
    cy.get('#btn-agree').first().click()
    cy.visit('/status')
    cy.get('#esrf').type('A1234567')
    cy.get('#givenName').type('John')
    cy.get('#surname').type('Doe')
    cy.get('#dateOfBirth').type('1990-12-01')
    cy.get('#btn-submit').click()
    cy.get('#response-no-result').should('exist')
    cy.focused().should('have.prop', 'tagName' ).should('eq', 'H1')
  })

  it('no result has no detectable a11y violations', ()=>{
    cy.injectAxe();
    cy.wait(500);
    cy.checkA11y()
  })
})

describe('cancel check status', ()=>{
  it('loads dialog', ()=>{
    cy.visit('/expectations')
    cy.get('#btn-agree').first().click()
    cy.visit('/status')
    cy.get('#btn-cancel').click()
    cy.get('[role="dialog"]').should('exist')
  })

  it.skip('cancel check status has no detectable a11y violations', ()=>{
    cy.injectAxe();
    cy.wait(500);
    cy.checkA11y()
  })
})
