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
  it('returns a result', async () => {
    const url = getUrl({
      esrf: 'A02D85ED',
      givenName: 'Yanis',
      surname: 'Piérre',
      dateOfBirth: '1972-07-29',
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
      dateOfBirth: '',
    })
    const { req, res } = createMocks<ApiRequest, ApiResponse>({ url })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(404)
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
