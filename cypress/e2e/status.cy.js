/// <reference types="cypress" />

describe('status page loads', () => {
  beforeEach(() => {
    cy.visit('/status')
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

  it('Status page has no detectable a11y violations on load', () => {
    cy.injectAxe();
    cy.checkA11y()
  })
})

describe('ESRF field validation', ()=>{
  beforeEach(() => {
    cy.visit('/status')
  })

  it('validates valid ESRF',()=>{
    cy.get('#esrf').type('A5934S87')
    cy.get('#button-get-status > button').click()
    cy.get('#input-esrf > span').should('not.exist')
  })

  it('validates empty ESRF error',()=>{
    cy.get('#button-get-status > button').click()
    cy.get('#input-esrf > span').should('exist')
  })

  it('validates invalid length for ESRF', ()=>{
    cy.get('#esrf').type('1234')
    cy.get('#button-get-status > button').click()
    cy.get('#input-esrf > span').should('exist')
  })
})

describe('givenName field validation', ()=>{
  beforeEach(() => {
    cy.visit('/status')
  })

  it('validates valid givenName',()=>{
    cy.get('#givenName').type('Clara')
    cy.get('#button-get-status > button').click()
    cy.get('#input-givenName > span').should('not.exist')
  })

  it('validates empty givenName error',()=>{
    cy.get('#button-get-status > button').click()
    cy.get('#input-givenName > span').should('exist')
  })
})

describe('surname field validation', ()=>{
  beforeEach(() => {
    cy.visit('/status')
  })

  it('validates valid surname',()=>{
    cy.get('#surname').type('Renard')
    cy.get('#button-get-status > button').click()
    cy.get('#input-surname > span').should('not.exist')
  })

  it('validates empty surname error',()=>{
    cy.get('#button-get-status > button').click()
    cy.get('#input-surname > span').should('exist')
  })
})


describe('Date of Birth field validation', ()=>{
  beforeEach(() => {
    cy.visit('/status')
  })

  it('validates valid dateOfBirth',()=>{
    cy.get('#dateOfBirth').type('1982-12-08')
    cy.get('#button-get-status > button').click()
    cy.get('#input-dateOfBirth > span').should('not.exist')
  })

  it('validates empty dateOfBirth error',()=>{
    cy.get('#button-get-status > button').click()
    cy.get('#input-dateOfBirth > span').should('exist')
  })

  it('validates Date of Birth in the future',()=>{
    const yearPlus1 = new Date(new Date().getFullYear()+1,1,1)
    const testDate = [yearPlus1.getFullYear(),'01','01'].join('-')
    cy.get('#dateOfBirth').type(testDate)
    cy.get('#button-get-status > button').click()
    cy.get('#input-dateOfBirth > span').should('exist')
  })
})

describe('responses', ()=>{
  it('loads result', ()=>{
    cy.visit('/status')
    cy.get('#esrf').type('A02D85ED')
    cy.get('#givenName').type('Yanis')
    cy.get('#surname').type('Piérre')
    cy.get('#dateOfBirth').type('1972-07-29')
    cy.get('#button-get-status > button').click()
    cy.get('#response-status').should('exist')
  })

  it('loads result is acessable', ()=>{
    cy.injectAxe();
    cy.checkA11y()
  })

  it('loads no result', ()=>{
    cy.visit('/status')
    cy.get('#esrf').type('A1234567')
    cy.get('#givenName').type('John')
    cy.get('#surname').type('Doe')
    cy.get('#dateOfBirth').type('1990-12-01')
    cy.get('#button-get-status > button').click()
    cy.get('#reponse-no-result').should('exist')
  })

  it('no result is acessable', ()=>{
    cy.injectAxe();
    cy.checkA11y()
  })
})
