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

  it('Status page has no detectable a11y violations on load', () => {
    cy.checkA11y()
  })
})

describe('ESRF field validation', ()=>{
  beforeEach(() => {
    cy.visit('/status')
  })

  it('validates valid ESRF',()=>{
    cy.get('#esrf').type('35934S87')
    cy.get('#form-get-status > button').click()
    cy.get('#input-esrf > span').should('not.exist')
  })

  it('validates empty ESRF error',()=>{
    cy.get('#form-get-status > button').click()
    cy.get('#input-esrf > span').should('exist')
  })

  it('validates invalid length for ESRF', ()=>{
    cy.get('#esrf').type('1234')
    cy.get('#form-get-status > button').click()
    cy.get('#input-esrf > span').should('exist')
  })
})

describe('givenName field validation', ()=>{
  beforeEach(() => {
    cy.visit('/status')
  })

  it('validates valid givenName',()=>{
    cy.get('#givenName').type('Clara')
    cy.get('#form-get-status > button').click()
    cy.get('#input-givenName > span').should('not.exist')
  })

  it('validates empty givenName error',()=>{
    cy.get('#form-get-status > button').click()
    cy.get('#input-givenName > span').should('exist')
  })
})

describe('surname field validation', ()=>{
  beforeEach(() => {
    cy.visit('/status')
  })

  it('validates valid surname',()=>{
    cy.get('#surname').type('Renard')
    cy.get('#form-get-status > button').click()
    cy.get('#input-surname > span').should('not.exist')
  })

  it('validates empty surname error',()=>{
    cy.get('#form-get-status > button').click()
    cy.get('#input-surname > span').should('exist')
  })
})


describe('Date of Birth field validation', ()=>{
  beforeEach(() => {
    cy.visit('/status')
  })

  it('validates valid birthdate',()=>{
    cy.get('#birthDate').type('1982-12-08')
    cy.get('#form-get-status > button').click()
    cy.get('#input-birthDate > span').should('not.exist')
  })

  it('validates empty givenName error',()=>{
    cy.get('#form-get-status > button').click()
    cy.get('#input-birthDate > span').should('exist')
  })

  it('validates Date of Birth in the future',()=>{
    const yearPlus1 = new Date(new Date().getFullYear()+1,1,1)
    const testDate = [yearPlus1.getFullYear(),'01','01'].join('-')
    cy.get('#birthDate').type(testDate)
    cy.get('#form-get-status > button').click()
    cy.get('#input-birthDate > span').should('exist')
  })
})