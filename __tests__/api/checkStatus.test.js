import handler from '../../pages/api/checkStatus'
import { createMocks } from 'node-mocks-http'

describe('api/checkStatus', () => {
  it('returns a result', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { esrf: '', givenName: '', surname: '', birthDate: '' },
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(404)
  })
})
