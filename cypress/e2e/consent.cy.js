describe('consent page loads', () => {
    beforeEach(() => {
      cy.visit('/consent')
      cy.injectAxe();
    })
  
    it('displays the consent page', () => {
      cy.url().should("contains", "/consent");
    })

    it('should display the button for agreeing to give consent',()=>{
        cy.get(`#yesButton`).should('be.visible')
    })

    it('should display the button for not giving consent',()=>{
        cy.get(`#noButton`).should('be.visible')
    })
  
    it('App has no detectable a11y violations on load', () => {
      cy.checkA11y()
    })
})

describe('user gives consent',()=>{
    it('should redirect to the email page',()=>{
        cy.visit('/consent')
        cy.get('#yesButton').click()
        cy.url().should('contain','/email')
    })
})

describe('user does not give consent',()=>{
  it('should redirect to the contact page',()=>{
      cy.visit('/consent')
      cy.get('#noButton').click()
      cy.url().should('contain','/contact')
  })
})
