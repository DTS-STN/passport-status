beforeEach(() => {
  cy.visit('/expectations')
})

describe('expectations page loads', () => {
  it('displays the expectations page', () => {
    cy.location('pathname').should("equal", "/en/expectations")
  })

  it('should have correct title in English', () => {
    cy.get("h1").filter(':visible').invoke('text').then((text) => {
      cy.title().should("eq", `${text} - Canada.ca`);
    });
  })

  it('should have correct title in French', () => {
    cy.get('[data-cy=toggle-language-link]').click()
    cy.wait(200)
    cy.get("h1").filter(':visible').invoke('text').then((text) => {
      cy.title().should("eq", `${text} - Canada.ca`);
    });
  })

  it('should display the button to accept terms', () => {
    cy.get('#btn-agree').should('be.visible')
  })

  it('should redirect to the expectations page if terms have not been accepted yet', () => {
    cy.visit('/landing')
    cy.location('pathname').should("equal", "/en/expectations")
  })

  it('should redirect to the landing page once terms have been accepted', () => {
    cy.get('#btn-agree').first().click()
    cy.location('pathname').should("equal", "/en/landing")
  })

  it('should have a bar in the header with the application name', () => {
    cy.get('#app-bar').should("be.visible")
  })

  it('should redirect you to the expectations page when clicking the text in the application name bar', () => {
    cy.get('#app-bar a').click()
    cy.location('pathname').should("equal", "/en/expectations")
  })

  it('has no detectable a11y violations on load', () => {
    cy.injectAxe()
    cy.wait(500)
    cy.checkA11y()
  })
})