describe('expectations page loads', () => {
    beforeEach(() => {
        cy.visit('/expectations')
      })

    it('displays the expectations page', () => {
        cy.location('pathname').should("equal", "/en/expectations");
    })

    it('should display the button to accept terms', () => {
        cy.get('#btn-agree').should('be.visible')
    })

    it('should redirect to the expectations page if terms have not been accepted yet', () => {
        cy.visit('/landing')
        cy.location('pathname').should("equal", "/en/expectations");
    })

    it('should redirect to the landing page once terms have been accepted', () => {
        cy.get('#btn-agree').first().click()
        cy.location('pathname').should("equal", "/en/landing");
    })

    it('has no detectable a11y violations on load', () => {
        cy.injectAxe();
        cy.wait(500);
        cy.checkA11y()
      })
})