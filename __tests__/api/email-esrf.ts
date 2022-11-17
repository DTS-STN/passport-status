import handler from '../../pages/api/email-esrf'
import { createMocks, createRequest, createResponse } from 'node-mocks-http'
import { NextApiRequest, NextApiResponse } from 'next'
import { IncomingHttpHeaders } from 'http'
import { EmailEsrfApiRequestBody } from '../../lib/types'

/**
 * NextApiRequest, NextApiResponse and node-mocks-http createResponse, createResponse types union
 * @see: https://github.com/howardabrams/node-mocks-http/issues/255#issuecomment-1136674043
 */
type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>

describe('api/email-esrf', () => {
  it('returns an accepted result', async () => {
    const body: EmailEsrfApiRequestBody = {
      dateOfBirth: '1996-07-23',
      email: 'camille.fontaine@example.com',
      givenName: 'Camille',
      surname: 'Fontainé',
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
    await handler(req, res)
    expect(res._getStatusCode()).toBe(202)
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
