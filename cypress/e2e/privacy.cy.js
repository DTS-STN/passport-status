describe('privacy page loads', () => {
    beforeEach(() => {
      cy.visit('/privacy')
      cy.injectAxe();
    })
  
    it('displays the privacy page', () => {
      cy.url().should("contains", "/privacy");
    })

    it('displays the terms content',()=>{
        cy.get(`#terms`).should('be.visible')
    })

  
    it('App has no detectable a11y violations on load', () => {
      cy.checkA11y()
    })
})

describe('User agrees to the term',()=>{
    it('hide the terms and display the privacy',()=>{
        cy.visit('/privacy')
        cy.get('#termsBtnGrp button').first().click()
        cy.get('#privacy').should('be.visible')
    })
})

describe('User agree to terms and privay',()=>{
  it('should redirect to the consent page',()=>{
        cy.visit('/privacy')
        cy.get('#termsBtnGrp button').first().click()
        cy.get('#privacyBtnGrp a').first().click()
        cy.url().should('contain','/consent')
  })
})
