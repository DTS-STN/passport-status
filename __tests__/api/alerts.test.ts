import type { NextApiRequest, NextApiResponse } from 'next';
import type { createRequest, createResponse } from 'node-mocks-http';
import { createMocks } from 'node-mocks-http';

import handler from '../../src/pages/api/alerts';

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>;

describe('api/alerts', () => {
  const originalEnvironment = process.env;
  const originalFetch = global.fetch;

  beforeEach(() => {
    process.env = { ...originalEnvironment, ALERT_JSON_URI: 'https://www.example.com/alerts.json' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        jsonAlerts: [
          {
            uid: 'alert-1',
            textEn: 'Notice',
            textFr: 'Avis',
            type: 'info',
            validFrom: '2000-01-01T00:00:00.000Z',
            validTo: '2999-12-31T23:59:59.999Z',
          },
        ],
      }),
    });
  });

  afterEach(() => {
    process.env = originalEnvironment;
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('sends the application user-agent and abort signal to the upstream request', async () => {
    const { req, res } = createMocks<ApiRequest, ApiResponse>({ method: 'GET' });

    await handler(req, res);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.example.com/alerts.json',
      expect.objectContaining({
        headers: {
          'Cache-Control': 'max-age=600',
          'User-Agent': `PassportStatus/3 Node.js/${process.version}`,
        },
        signal: expect.any(AbortSignal),
      }),
    );
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual([{ uid: 'alert-1', textEn: 'Notice', textFr: 'Avis', type: 'info' }]);
  });
});
