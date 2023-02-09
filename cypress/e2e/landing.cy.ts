beforeEach(() => {
  cy.visit('/expectations')
  cy.get('#btn-agree').first().click()
  cy.visit('/landing')
})

describe('landing page loads', () => {
  it('displays the landing page', () => {
    cy.location('pathname').should("equal", "/en/landing")
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

  it('should display the button for no ESRF',()=>{
      cy.get(`#without-esrf`).should('be.visible')
  })

  it('should display the button for has ESRF',()=>{
      cy.get(`#with-esrf`).should('be.visible')
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

describe('user does not ESRF number',()=>{
  it('should redirect to the email page',()=>{
    cy.get('#without-esrf').click()
    cy.location('pathname').should("equal", "/en/email")
  })
})

describe('user does have ESRF number',()=>{
  it('should redirect to the form',()=>{
    cy.get('#with-esrf').click()
    cy.location('pathname').should("equal", "/en/status")
  })
})
