import type { ClientEnvironment } from '../../context/ClientEnvironmentContext';

export const serializeClientEnvironment = (clientEnvironment: ClientEnvironment | undefined) =>
  JSON.stringify(clientEnvironment || {})
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
