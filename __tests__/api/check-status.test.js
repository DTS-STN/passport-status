import handler from '../../pages/api/check-status'
import { createMocks } from 'node-mocks-http'

describe('api/check-status', () => {
  it('returns a result', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: JSON.stringify({
        esrf: '35934S87',
        givenName: 'Clara',
        surname: 'Rénard',
        birthDate: '1982-12-08',
      }),
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })

  it('returns a not found', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: JSON.stringify({
        esrf: '',
        givenName: '',
        surname: '',
        birthDate: '',
      }),
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(404)
  })
})
