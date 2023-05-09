import { faker } from '@faker-js/faker'

beforeEach(() => {
  cy.visit('/expectations')
  cy.get('#btn-agree').first().click()
  cy.visit('/email')
})

describe('email page loads', () => {
  it('displays the status page', () => {
    cy.location('pathname').should('equal', '/en/email')
  })

  it('should have correct title in English', () => {
    cy.get('h1')
      .filter(':visible')
      .invoke('text')
      .then((text) => {
        cy.title().should(
          'eq',
          `${text} - Passport Application Status Checker - Canada.ca`
        )
      })
  })

  it('should have correct title in French', () => {
    cy.get('[data-cy=toggle-language-link]').click()
    cy.wait(200)
    cy.get('h1')
      .filter(':visible')
      .invoke('text')
      .then((text) => {
        cy.title().should(
          'eq',
          `${text} - Vérificateur de l'état d'une demande de passeport - Canada.ca`
        )
      })
  })

  it('displays the language link to change to French', () => {
    cy.location('pathname').should('equal', '/en/email')
    cy.get('[data-cy=toggle-language-link]').should('contain.text', 'Français')
  })

  it('displays the language link to change to English', () => {
    cy.get('[data-cy=toggle-language-link]').click()
    cy.wait(200)
    cy.location('pathname').should('equal', '/fr/email')
    cy.get('[data-cy=toggle-language-link]').should('contain.text', 'English')
  })

  it('should have a bar in the header with the application name', () => {
    cy.get('#app-bar').should('be.visible')
  })

  it('should redirect you to the expectations page when clicking the text in the application name bar', () => {
    cy.get('#app-bar a').click()
    cy.location('pathname').should('equal', '/en/expectations')
  })

  it('has no detectable a11y violations on load', () => {
    cy.injectAxe()
    cy.wait(500)
    cy.checkA11y()
  })
})

describe('responses', () => {
  beforeEach(() => {
    const givenName = faker.name.firstName()
    const surname = faker.name.lastName()
    const email = faker.internet.email(
      givenName,
      surname,
      'example.fakerjs.dev'
    )
    const dateOfBirth = faker.date.past()
    const year = dateOfBirth.getFullYear().toString().padStart(4, '0')
    const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0')
    const day = dateOfBirth.getDate().toString().padStart(2, '0')

    cy.intercept(
      {
        method: 'POST',
        pathname: '/api/email-esrf',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      {
        statusCode: 202,
        body: 'Email sent if found',
      }
    ).as('email-esrf')

    cy.get('#email').type(email)
    cy.get('#givenName').type(givenName)
    cy.get('#surname').type(surname)
    cy.get('#dateOfBirth-year').select(year)
    cy.get('#dateOfBirth-month').select(month)
    cy.get('#dateOfBirth-day').select(day)
    cy.get('#btn-submit').click()

    cy.wait('@email-esrf').then((interception) => {
      cy.wrap(interception.response.statusCode).should('eq', 202)
      cy.wrap(interception.request.body.email).should('eq', email)
      cy.wrap(interception.request.body.givenName).should('eq', givenName)
      cy.wrap(interception.request.body.surname).should('eq', surname)
      cy.wrap(interception.request.body.dateOfBirth).should(
        'eq',
        `${year}-${month}-${day}`
      )
      cy.wrap(interception.request.body.locale).should('eq', 'en')
    })
  })

  it('loads result', () => {
    cy.get('#response-result').should('exist')
  })

  it('loads result has no detectable a11y violations', () => {
    cy.injectAxe()
    cy.wait(500)
    cy.checkA11y()
  })

  it('loads result click get another file number button should reset form', () => {
    cy.get('#response-result').should('exist')
    cy.get('button#get-another-file-number').click()
    cy.wait(200)
    cy.get('#email').invoke('val').should('be.empty')
    cy.get('#givenName').invoke('val').should('be.empty')
    cy.get('#surname').invoke('val').should('be.empty')
    cy.get('#dateOfBirth-year').invoke('val').should('be.null')
    cy.get('#dateOfBirth-month').invoke('val').should('be.null')
    cy.get('#dateOfBirth-day').invoke('val').should('be.null')
  })
})

describe('cancel email esrf', () => {
  beforeEach(() => {
    cy.get('#btn-cancel').click()
  })

  it('cancel email esrf should loads dialog', () => {
    cy.get('dialog[open]').should('exist')
  })

  it('cancel email esrf should redirects to landing page', () => {
    cy.get('button').contains('Yes').should('exist').click()
    cy.location('pathname').should('equal', '/en/landing')
  })

  it('cancel email esrf dialog has no detectable a11y violations', () => {
    cy.injectAxe()
    cy.wait(500)
    cy.checkA11y()
  })
})
