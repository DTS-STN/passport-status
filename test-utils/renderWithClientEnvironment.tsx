import type { ReactElement } from 'react';

import { render } from '@testing-library/react';

import { ClientEnvironment, ClientEnvironmentProvider } from '../src/context/ClientEnvironmentContext';

const defaultEnvironment: ClientEnvironment = {
  APP_BASE_URI: 'http://localhost',
  ENVIRONMENT: 'test',
};

export function renderWithClientEnvironment(ui: ReactElement, env: Partial<ClientEnvironment> = {}) {
  return render(<ClientEnvironmentProvider env={{ ...defaultEnvironment, ...env }}>{ui}</ClientEnvironmentProvider>);
}
