/**
 * @jest-environment node
 */
import { getLoggingLevelConfig } from '../../src/logging/log-level';

describe('getLoggingLevelConfig', () => {
  const originalEnvironment = process.env;
  const originalWindowDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'window');

  beforeEach(() => {
    process.env = { ...originalEnvironment };
    delete process.env.LOGGING_LEVEL;
  });

  afterEach(() => {
    process.env = originalEnvironment;
    if (originalWindowDescriptor) {
      Object.defineProperty(globalThis, 'window', originalWindowDescriptor);
    } else {
      Reflect.deleteProperty(globalThis, 'window');
    }
  });

  it('prefers the browser-injected logging level', () => {
    process.env.LOGGING_LEVEL = 'warn';
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: {
        __CLIENT_ENV__: {
          APP_BASE_URI: '',
          ENVIRONMENT: '',
          LOGGING_LEVEL: 'debug',
        },
      },
    });

    expect(getLoggingLevelConfig()).toBe('debug');
  });

  it('defaults to info in the browser without reading the process environment', () => {
    process.env.LOGGING_LEVEL = 'warn';
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: { __CLIENT_ENV__: { APP_BASE_URI: '', ENVIRONMENT: '' } },
    });

    expect(getLoggingLevelConfig()).toBe('info');
  });

  it('uses the process environment on the server', () => {
    process.env.LOGGING_LEVEL = 'warn';

    expect(getLoggingLevelConfig()).toBe('warn');
  });

  it('defaults to info when no logging level is configured', () => {
    expect(getLoggingLevelConfig()).toBe('info');
  });
});
