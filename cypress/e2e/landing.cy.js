describe('landing page loads', () => {
    beforeEach(() => {
      cy.visit('/expectations')
      cy.get('#confirmBtn button').first().click()
      cy.visit('/landing')
    })

    it('displays the landing page', () => {
      cy.location('pathname').should("equal", "/en/landing");
    })

    it('should display the button for no ESRF',()=>{
        cy.get(`#without-esrf`).should('be.visible')
    })

    it('should display the button for has ESRF',()=>{
        cy.get(`#with-esrf`).should('be.visible')
    })

    it('has no detectable a11y violations on load', () => {
      cy.injectAxe();
      cy.wait(500);
      cy.checkA11y()
    })
})

describe('user does not ESRF number',()=>{
    it('should redirect to the email page',()=>{
      cy.visit('/expectations')
      cy.get('#confirmBtn button').first().click()
      cy.visit('/landing')
      cy.get('#without-esrf').click()
      cy.location('pathname').should("equal", "/en/email");
    })
})

describe('user does have ESRF number',()=>{
  it('should redirect to the form',()=>{
    cy.visit('/expectations')
    cy.get('#confirmBtn button').first().click()
    cy.visit('/landing')
    cy.get('#with-esrf').click()
    cy.location('pathname').should("equal", "/en/status");
  })
})
