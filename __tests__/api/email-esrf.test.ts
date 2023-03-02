import { faker } from '@faker-js/faker'
import { IncomingHttpHeaders } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import { createMocks, createRequest, createResponse } from 'node-mocks-http'

import { EmailEsrfApiRequestBody } from '../../src/lib/types'
import handler from '../../src/pages/api/email-esrf'

/**
 * NextApiRequest, NextApiResponse and node-mocks-http createResponse, createResponse types union
 * @see: https://github.com/howardabrams/node-mocks-http/issues/255#issuecomment-1136674043
 */
type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>

describe('api/email-esrf', () => {
  const env = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env }
    process.env.PASSPORT_STATUS_API_BASE_URI = 'http://localhost:8080'
  })

  afterEach(() => {
    process.env = env
  })

  it('returns an accepted result', async () => {
    // arrange
    const fetchMock = jest.fn().mockImplementationOnce(
      async () =>
        ({
          status: 202,
        } as Response)
    )
    global.fetch = fetchMock

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

    const body: EmailEsrfApiRequestBody = {
      dateOfBirth: `${year}-${month}-${day}`,
      email,
      givenName,
      locale: 'en',
      surname,
    }
    const headers: IncomingHttpHeaders = {
      'content-type': 'application/json',
    }
    const method = 'POST'
    const url = 'api/email-esrf'

    const { req, res } = createMocks<ApiRequest, ApiResponse>({
      body,
      headers,
      method,
      url,
    })

    // act
    await handler(req, res)

    // assert
    expect(res._getStatusCode()).toBe(202)
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8080/api/v1/esrf-requests',
      {
        body: `{"Client":{"BirthDate":{"Date":"${body.dateOfBirth}"},"PersonContactInformation":{"ContactEmailID":"${body.email}"},"PersonName":{"PersonGivenName":["${body.givenName}"],"PersonSurName":"${body.surname}"},"PersonPreferredLanguage":{"LanguageName":"ENGLISH"}}}`,
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      }
    )

    fetchMock.mockClear()
  })

  it('returns a method not allowed', async () => {
    const url = 'api/email-esrf'

    const { req, res } = createMocks<ApiRequest, ApiResponse>({
      url,
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(405)
  })

  it('returns an unsupported media type', async () => {
    const method = 'POST'
    const url = 'api/email-esrf'

    const { req, res } = createMocks<ApiRequest, ApiResponse>({
      method,
      url,
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(415)
  })
})
