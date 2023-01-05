/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('/expectations')
  cy.get('#btn-agree').first().click()
  cy.visit('/status')
})

describe('status page loads', () => {
  it('displays the status page', () => {
    cy.location('pathname').should("equal", "/en/status")
  })

  it('displays the language link to change to French', () => {
    cy.location('pathname').should("equal", "/en/status")
    cy.get('[data-cy=toggle-language-link]').should('contain.text', 'Français')
  })

  it('displays the language link to change to English', () => {
    cy.get('[data-cy=toggle-language-link]').click()
    cy.location('pathname').should("equal", "/fr/status")
    cy.get('[data-cy=toggle-language-link]').should('contain.text', 'English')
  })

  it('has no detectable a11y violations on load', () => {
    cy.injectAxe()
    cy.wait(500)
    cy.checkA11y()
  })
})

describe('ESRF field validation', ()=>{
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
  it('validates valid dateOfBirth',()=>{
    cy.get('#date-select-dateOfBirth-year').select('1982')
    cy.get('#date-select-dateOfBirth-month').select('12')
    cy.get('#date-select-dateOfBirth-day').select('08')
    cy.get('#btn-submit').click()
    cy.get('#date-select-dateOfBirth-error').should('not.exist')
  })

  it('validates empty dateOfBirth error',()=>{
    cy.get('#btn-submit').click()
    cy.get('#date-select-dateOfBirth-error').should('exist')
  })

  it('validates Date of Birth in the future',()=>{
    const futureDate = new Date()
    futureDate.setDate( futureDate.getDate() + 1)
    cy.get('#date-select-dateOfBirth-year').select(futureDate.getFullYear().toString())
    cy.get('#date-select-dateOfBirth-month').select((futureDate.getMonth() + 1).toString().padStart(2, '0'))
    cy.get('#date-select-dateOfBirth-day').select(futureDate.getDate().toString().padStart(2, '0'))
    cy.get('#btn-submit').click()
    cy.get('#date-select-dateOfBirth-error').should('exist')
  })
})

describe('responses - loads result', ()=>{
  beforeEach(() => {
    cy.get('#esrf').type('A02D85ED')
    cy.get('#givenName').type('Yanis')
    cy.get('#surname').type('Piérre')
    cy.get('#date-select-dateOfBirth-year').select('1972')
    cy.get('#date-select-dateOfBirth-month').select('07')
    cy.get('#date-select-dateOfBirth-day').select('29')
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

describe('responses - loads no result', ()=>{
  beforeEach(() => {
    cy.get('#esrf').type('A1234567')
    cy.get('#givenName').type('John')
    cy.get('#surname').type('Doe')
    cy.get('#date-select-dateOfBirth-year').select('1990')
    cy.get('#date-select-dateOfBirth-month').select('12')
    cy.get('#date-select-dateOfBirth-day').select('01')
    cy.get('#btn-submit').click()
  })

  it('loads no result', ()=>{
    cy.get('#response-no-result').should('exist')
    cy.focused().should('have.prop', 'tagName' ).should('eq', 'H1')
  })

  it('no result has no detectable a11y violations', ()=>{
    cy.injectAxe()
    cy.wait(500)
    cy.checkA11y()
  })
})

describe('cancel check status', ()=>{
  beforeEach(() => {
    cy.get('#btn-cancel').click()
  })

  it('loads dialog', ()=>{
    cy.get('dialog[open]').should('exist')
  })

  it('cancel check status has no detectable a11y violations', ()=>{
    cy.injectAxe()
    cy.wait(500)
    cy.checkA11y()
  })
})
