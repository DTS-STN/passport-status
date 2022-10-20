import handler from '../../pages/api/check-status'
import { createMocks, createRequest, createResponse } from 'node-mocks-http'
import { CheckStatusRequest } from '../../lib/StatusTypes'
import { NextApiRequest, NextApiResponse } from 'next'

/**
 * NextApiRequest, NextApiResponse and node-mocks-http createResponse, createResponse types union
 * @see: https://github.com/howardabrams/node-mocks-http/issues/255#issuecomment-1136674043
 */
type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>

const getUrl = (checkStatusRequest: CheckStatusRequest) =>
  'api/check-status?' +
  new URLSearchParams({ ...checkStatusRequest }).toString()

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
