import { faker } from '@faker-js/faker'
import { NextApiRequest, NextApiResponse } from 'next'
import { createMocks, createRequest, createResponse } from 'node-mocks-http'

import { CheckStatusApiRequestQuery } from '../../src/lib/types'
import handler from '../../src/pages/api/check-status'

/**
 * NextApiRequest, NextApiResponse and node-mocks-http createResponse, createResponse types union
 * @see: https://github.com/howardabrams/node-mocks-http/issues/255#issuecomment-1136674043
 */
type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>

const getUrl = (checkStatusApiRequestQuery: CheckStatusApiRequestQuery) =>
  'api/check-status?' +
  new URLSearchParams({ ...checkStatusApiRequestQuery }).toString()

describe('api/check-status', () => {
  const env = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env }
    process.env.PASSPORT_STATUS_API_BASE_URI = 'http://localhost:8080'
  })

  afterEach(() => {
    process.env = env
  })

  it('returns a result', async () => {
    // arrange
    const fetchMock = jest.fn().mockImplementationOnce(
      async () =>
        ({
          status: 200,
        } as Response)
    )
    global.fetch = fetchMock

    const esrf = faker.helpers.replaceSymbols('?#######')
    const givenName = faker.name.firstName()
    const surname = faker.name.lastName()
    const dateOfBirth = faker.date.past()
    const year = dateOfBirth.getFullYear().toString().padStart(4, '0')
    const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0')
    const day = dateOfBirth.getDate().toString().padStart(2, '0')
    const checkStatusApiRequestQuery = {
      esrf,
      givenName,
      surname,
      dateOfBirth: `${year}-${month}-${day}`,
    }
    const url = getUrl(checkStatusApiRequestQuery)

    const { req, res } = createMocks<ApiRequest, ApiResponse>({ url })

    // act
    await handler(req, res)

    // assert
    expect(res._getStatusCode()).toBe(200)
    const apiSearchQuery = new URLSearchParams({
      dateOfBirth: checkStatusApiRequestQuery.dateOfBirth,
      fileNumber: checkStatusApiRequestQuery.esrf,
      givenName: checkStatusApiRequestQuery.givenName,
      surname: checkStatusApiRequestQuery.surname,
    }).toString()
    expect(fetchMock).toHaveBeenCalledWith(
      `http://localhost:8080/api/v1/passport-statuses/_search?${apiSearchQuery}`
    )

    fetchMock.mockClear()
  })

  it('returns a not found', async () => {
    // arrange
    const fetchMock = jest.fn().mockImplementationOnce(
      async () =>
        ({
          status: 404,
        } as Response)
    )
    global.fetch = fetchMock

    const esrf = faker.helpers.replaceSymbols('?#######')
    const givenName = faker.name.firstName()
    const surname = faker.name.lastName()
    const dateOfBirth = faker.date.past()
    const year = dateOfBirth.getFullYear().toString().padStart(4, '0')
    const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0')
    const day = dateOfBirth.getDate().toString().padStart(2, '0')
    const checkStatusApiRequestQuery = {
      esrf,
      givenName,
      surname,
      dateOfBirth: `${year}-${month}-${day}`,
    }
    const url = getUrl(checkStatusApiRequestQuery)

    const { req, res } = createMocks<ApiRequest, ApiResponse>({ url })

    // act
    await handler(req, res)

    // assert
    expect(res._getStatusCode()).toBe(404)
    const apiSearchQuery = new URLSearchParams({
      dateOfBirth: checkStatusApiRequestQuery.dateOfBirth,
      fileNumber: checkStatusApiRequestQuery.esrf,
      givenName: checkStatusApiRequestQuery.givenName,
      surname: checkStatusApiRequestQuery.surname,
    }).toString()
    expect(fetchMock).toHaveBeenCalledWith(
      `http://localhost:8080/api/v1/passport-statuses/_search?${apiSearchQuery}`
    )

    fetchMock.mockClear()
  })

  it('returns a method not allowed', async () => {
    const method = 'POST'
    const url = getUrl({
      esrf: '',
      givenName: '',
      surname: '',
      dateOfBirth: '',
    })

    const { req, res } = createMocks<ApiRequest, ApiResponse>({
      method,
      url,
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(405)
  })
})
