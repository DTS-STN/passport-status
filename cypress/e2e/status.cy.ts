import { faker } from '@faker-js/faker'

import { CheckStatusApiResponse, StatusCode } from '../../lib/types'

beforeEach(() => {
  cy.visit('/expectations')
  cy.get('#btn-agree').first().click()
  cy.visit('/status')
})

describe('status page loads', () => {
  it('displays the status page', () => {
    cy.location('pathname').should('equal', '/en/status')
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
    cy.location('pathname').should('equal', '/en/status')
    cy.get('[data-cy=toggle-language-link]').should('contain.text', 'Français')
  })

  it('displays the language link to change to English', () => {
    cy.get('[data-cy=toggle-language-link]').click()
    cy.wait(200)
    cy.location('pathname').should('equal', '/fr/status')
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

describe('ESRF field validation', () => {
  it('validates valid ESRF', () => {
    cy.get('#esrf').type(faker.helpers.replaceSymbols('?#######'))
    cy.get('#btn-submit').click()
    cy.get('#input-esrf-error').should('not.exist')
  })

  it('validates empty ESRF error', () => {
    cy.get('#btn-submit').click()
    cy.get('#input-esrf-error').should('exist')
  })
})

describe('givenName field validation', () => {
  it('validates valid givenName', () => {
    cy.get('#givenName').type(faker.name.firstName())
    cy.get('#btn-submit').click()
    cy.get('#input-givenName-error').should('not.exist')
  })

  it('validates empty givenName error', () => {
    cy.get('#btn-submit').click()
    cy.get('#input-givenName-error').should('exist')
  })
})

describe('surname field validation', () => {
  it('validates valid surname', () => {
    cy.get('#surname').type(faker.name.lastName())
    cy.get('#btn-submit').click()
    cy.get('#input-surname-error').should('not.exist')
  })

  it('validates empty surname error', () => {
    cy.get('#btn-submit').click()
    cy.get('#input-surname-error').should('exist')
  })
})

describe('dateOfBirth field validation', () => {
  it('validates valid dateOfBirth', () => {
    const dateOfBirth = faker.date.past()
    const year = dateOfBirth.getFullYear().toString().padStart(4, '0')
    const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0')
    const day = dateOfBirth.getDate().toString().padStart(2, '0')
    cy.get('#dateOfBirth-year').select(year)
    cy.get('#dateOfBirth-month').select(month)
    cy.get('#dateOfBirth-day').select(day)
    cy.get('#btn-submit').click()
    cy.get('#date-select-dateOfBirth-error').should('not.exist')
  })

  it('validates dateOfBirth in the future', () => {
    const dateOfBirth = new Date()
    dateOfBirth.setDate(dateOfBirth.getDate() + 1)
    const year = dateOfBirth.getFullYear().toString().padStart(4, '0')
    const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0')
    const day = dateOfBirth.getDate().toString().padStart(2, '0')
    cy.get('#dateOfBirth-year').select(year)
    cy.get('#dateOfBirth-month').select(month)
    cy.get('#dateOfBirth-day').select(day)
    cy.get('#btn-submit').click()
    cy.get('#date-select-dateOfBirth-error').should('exist')
  })

  it('validates empty dateOfBirth error', () => {
    cy.get('#btn-submit').click()
    cy.get('#date-select-dateOfBirth-error').should('exist')
  })
})

const statusCodes: ReadonlyArray<CheckStatusApiResponse> = [
  { status: StatusCode.APPLICATION_NO_LONGER_MEETS_CRITERIA },
  { status: StatusCode.FILE_BEING_PROCESSED },
  { status: StatusCode.NOT_ACCEPTABLE_FOR_PROCESSING },
  { status: StatusCode.PASSPORT_ISSUED_READY_FOR_PICKUP },
  {
    status: StatusCode.PASSPORT_ISSUED_SHIPPING_CANADA_POST,
    manifestNumber: faker.helpers.replaceSymbols('################'),
  },
  {
    status: StatusCode.PASSPORT_ISSUED_SHIPPING_FEDEX,
    manifestNumber: faker.helpers.replaceSymbols('######################'),
  },
]
statusCodes.forEach((response) => {
  describe(`responses- loads result - '${response.status}'`, () => {
    beforeEach(() => {
      const esrf = faker.helpers.replaceSymbols('?#######')
      const givenName = faker.name.firstName()
      const surname = faker.name.lastName()
      const dateOfBirth = faker.date.past()
      const year = dateOfBirth.getFullYear().toString().padStart(4, '0')
      const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0')
      const day = dateOfBirth.getDate().toString().padStart(2, '0')

      cy.intercept(
        {
          method: 'GET',
          pathname: '/api/check-status',
          query: {
            dateOfBirth: `${year}-${month}-${day}`,
            esrf: esrf,
            givenName: givenName,
            surname: surname,
          },
        },
        {
          statusCode: 200,
          body: response,
        }
      ).as('check-status')

      cy.get('#esrf').type(esrf)
      cy.get('#givenName').type(givenName)
      cy.get('#surname').type(surname)
      cy.get('#dateOfBirth-year').select(year)
      cy.get('#dateOfBirth-month').select(month)
      cy.get('#dateOfBirth-day').select(day)
      cy.get('#btn-submit').click()

      cy.wait('@check-status').its('response.statusCode').should('eq', 200)
    })

    it(`loads result for status '${response.status}'`, () => {
      cy.get('#response-result').should('exist')
      cy.focused().should('have.prop', 'tagName').should('eq', 'H1')
    })

    it(`loads result for status '${response.status}' has no detectable a11y violations`, () => {
      cy.injectAxe()
      cy.wait(500)
      cy.checkA11y()
    })
  })
})

describe('responses - loads no result', () => {
  beforeEach(() => {
    const esrf = faker.helpers.replaceSymbols('?#######')
    const givenName = faker.name.firstName()
    const surname = faker.name.lastName()
    const dateOfBirth = faker.date.past()
    const year = dateOfBirth.getFullYear().toString().padStart(4, '0')
    const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0')
    const day = dateOfBirth.getDate().toString().padStart(2, '0')

    cy.intercept(
      {
        method: 'GET',
        pathname: '/api/check-status',
        query: {
          dateOfBirth: `${year}-${month}-${day}`,
          esrf: esrf,
          givenName: givenName,
          surname: surname,
        },
      },
      {
        statusCode: 404,
        body: 'Passport Status Not Found',
      }
    ).as('check-status')

    cy.get('#esrf').type(esrf)
    cy.get('#givenName').type(givenName)
    cy.get('#surname').type(surname)
    cy.get('#dateOfBirth-year').select(year)
    cy.get('#dateOfBirth-month').select(month)
    cy.get('#dateOfBirth-day').select(day)
    cy.get('#btn-submit').click()

    cy.wait('@check-status').its('response.statusCode').should('eq', 404)
  })

  it('loads no result', () => {
    cy.get('#response-no-result').should('exist')
    cy.focused().should('have.prop', 'tagName').should('eq', 'H1')
  })

  it('no result has no detectable a11y violations', () => {
    cy.injectAxe()
    cy.wait(500)
    cy.checkA11y()
  })
})

describe('cancel check status', () => {
  beforeEach(() => {
    cy.get('#btn-cancel').click()
  })

  it('cancel check status should loads dialog', () => {
    cy.get('dialog[open]').should('exist')
  })

  it('cancel check status should redirects to landing page', () => {
    cy.get('button').contains('Yes').should('exist').click()
    cy.location('pathname').should('equal', '/en/landing')
  })

  it('cancel check status dialog has no detectable a11y violations', () => {
    cy.injectAxe()
    cy.wait(500)
    cy.checkA11y()
  })
})
