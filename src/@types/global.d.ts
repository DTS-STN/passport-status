import { ClientEnvironment } from '../context/ClientEnvironmentContext';

declare global {
  interface Window {
    __CLIENT_ENV__?: ClientEnvironment;
  }
}
