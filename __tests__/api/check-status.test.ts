import { NextApiRequest, NextApiResponse } from 'next'
import { createMocks, createRequest, createResponse } from 'node-mocks-http'

import { CheckStatusApiRequestQuery } from '../../lib/types'
import handler from '../../pages/api/check-status'

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

    const url = getUrl({
      esrf: 'A02D85ED',
      givenName: 'Yanis',
      surname: 'Piérre',
      dateOfBirth: '1972-07-29',
    })

    const { req, res } = createMocks<ApiRequest, ApiResponse>({ url })

    // act
    await handler(req, res)

    // assert
    expect(res._getStatusCode()).toBe(200)
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8080/api/v1/passport-statuses/_search?dateOfBirth=1972-07-29&fileNumber=A02D85ED&givenName=Yanis&surname=Pi%C3%A9rre'
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

    const url = getUrl({
      esrf: '',
      givenName: '',
      surname: '',
      dateOfBirth: '',
    })

    const { req, res } = createMocks<ApiRequest, ApiResponse>({ url })

    // act
    await handler(req, res)

    // assert
    expect(res._getStatusCode()).toBe(404)
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8080/api/v1/passport-statuses/_search?dateOfBirth=&fileNumber=&givenName=&surname='
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
