import type { NextApiRequest, NextApiResponse } from 'next';
import type { createRequest, createResponse } from 'node-mocks-http';
import { createMocks } from 'node-mocks-http';

import handler from '../../src/pages/api/health';

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>;

const environmentVariables = [
  'ADOBE_ANALYTICS_SCRIPT_SRC',
  'PASSPORT_STATUS_API_BASE_URI',
  'APP_BASE_URI',
  'BUILD_DATE',
  'ENVIRONMENT',
  'LOGGING_LEVEL',
] as const;

describe('api/health', () => {
  const originalEnvironment = process.env;

  beforeEach(() => {
    process.env = { ...originalEnvironment };
    environmentVariables.forEach((key) => {
      delete process.env[key];
    });
  });

  afterEach(() => {
    process.env = originalEnvironment;
  });

  it('returns configured environment variables', async () => {
    process.env.ADOBE_ANALYTICS_SCRIPT_SRC = 'https://analytics.example/script.js';
    process.env.PASSPORT_STATUS_API_BASE_URI = 'https://api.example';
    process.env.APP_BASE_URI = 'https://app.example';
    process.env.BUILD_DATE = '20261005';
    process.env.ENVIRONMENT = 'test';
    process.env.LOGGING_LEVEL = 'debug';
    const { req, res } = createMocks<ApiRequest, ApiResponse>({ method: 'GET' });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toMatchObject({
      adobeAnalyticsScriptSrc: 'https://analytics.example/script.js',
      apiBaseUri: 'https://api.example',
      appBaseUri: 'https://app.example',
      buildDate: '20261005',
      environment: 'test',
      loggingLevel: 'debug',
      status: 'UP',
    });
    expect(res._getJSONData().uptime).toMatch(/^\d+(\.\d+)? seconds$/);
  });

  it('returns null for unset environment variables', async () => {
    const { req, res } = createMocks<ApiRequest, ApiResponse>({ method: 'GET' });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toMatchObject({
      adobeAnalyticsScriptSrc: null,
      apiBaseUri: null,
      appBaseUri: null,
      buildDate: null,
      environment: null,
      loggingLevel: null,
      status: 'UP',
    });
  });
});
