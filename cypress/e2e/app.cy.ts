beforeEach(() => {
  cy.visit('/')
})

describe('app page loads', () => {
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

  it('should have correct title', () => {
    cy.title().should("eq", "Passport Application Status Checker | Vérificateur de l'état d'une demande de passeport - Canada.ca");
  })

  it('has no detectable a11y violations on load', () => {
    cy.injectAxe();
    cy.wait(500);
    cy.checkA11y()
  })
})
