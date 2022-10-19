import handler from '../../pages/api/check-status'
import { createMocks, createRequest, createResponse } from 'node-mocks-http'
import { CheckStatusRequest } from '../../lib/StatusTypes'
import { NextApiRequest, NextApiResponse } from 'next'

/**
 * NextApiRequest and node-mocks-http createRequest types union
 * @see: https://github.com/howardabrams/node-mocks-http/issues/255#issuecomment-1136674043
 */
export type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>

/**
 * NextApiResponse and node-mocks-http createResponse types union
 * @see: https://github.com/howardabrams/node-mocks-http/issues/255#issuecomment-1136674043
 */
export type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>

const getUrl = (checkStatusRequest: CheckStatusRequest) => {
  const query = Object.keys(checkStatusRequest)
    .map(
      (key) => `${key}=${checkStatusRequest[key as keyof CheckStatusRequest]}`
    )
    .join('&')
  return 'api/check-status?' + query
}

describe('api/check-status', () => {
  it('returns a result', async () => {
    const url = getUrl({
      esrf: '35934S87',
      givenName: 'Clara',
      surname: 'Rénard',
      birthDate: '1982-12-08',
    })

    const { req, res } = createMocks<ApiRequest, ApiResponse>({ url })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })

  it('returns a not found', async () => {
    const url = getUrl({
      esrf: '',
      givenName: '',
      surname: '',
      birthDate: '',
    })
    const { req, res } = createMocks<ApiRequest, ApiResponse>({ url })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(404)
  })
})
